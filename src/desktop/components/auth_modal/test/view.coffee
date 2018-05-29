_ = require 'underscore'
sd = require('sharify').data
benv = require 'benv'
sinon = require 'sinon'
rewire = require 'rewire'
Backbone = require 'backbone'
mediator = require '../../../lib/mediator'
LoggedOutUser = rewire '../../../models/logged_out_user'
jade = require 'jade'
path = require 'path'
fs = require 'fs'

render = (templateName) ->
  filename = path.resolve __dirname, "../templates/#{templateName}.jade"
  jade.compile(
    fs.readFileSync(filename),
    { filename: filename }
  )

describe 'AuthModalView', ->
  before (done) ->
    benv.setup =>
      benv.expose
        $: benv.require('jquery'),
        jQuery: benv.require('jquery')
        analyticsHooks: {
          trigger: sinon.stub()
        }
      Backbone.$ = $
      @AuthModalView = rewire '../view'
      @AuthModalView.__set__ 'Cookies',
        set: sinon.stub()
        get: sinon.stub()
      LoggedOutUser.__set__ 'sd', AP: {}
      sinon.stub @AuthModalView::, 'initialize'
      done()

  after ->
    benv.teardown()

  beforeEach ->
    @view = new @AuthModalView()
    sinon.stub(Backbone, 'sync').yieldsTo 'success', user: accessToken: 'secrets'
    analyticsHooks.trigger = sinon.stub()

  afterEach ->
    Backbone.sync.restore()

  describe '#preInitialize', ->
    it 'can render custom copy a single individual mode', ->
      @view.preInitialize copy: 'Log in to foobar', mode: 'login'
      @view.templateData.copy.get('login').should.equal 'Log in to foobar'
      @view.templateData.copy.has('register').should.be.false()

    it 'can render custom copy for the default individual mode', ->
      # 'register' is the default mode for the view's State
      @view.preInitialize copy: 'Sign up to foobar'
      @view.templateData.copy.get('register').should.equal 'Sign up to foobar'
      @view.templateData.copy.has('login').should.be.false()

    it 'can render custom copy for multiple individual modes', ->
      @view.preInitialize copy:
        register: 'Sign up to foobar'
        signup: 'Create an account to foobar'
        login: 'Log in to foobar'
      @view.templateData.copy.attributes.should.eql
        register: 'Sign up to foobar'
        signup: 'Create an account to foobar'
        login: 'Log in to foobar'

    it 'always returns an object for copy templateData', ->
      @view.preInitialize()
      @view.templateData.copy.attributes.should.containEql {}

    it 'returns custom copy for the redirecTo route if present', ->
      @view.redirectTo = '/following/profiles'
      @view.preInitialize()
      @view.templateData.copy.attributes.should.eql
        signup: null
        register: 'Sign up to follow galleries and museums'
        login: 'Login to follow galleries and museums'

    it 'can render custom redirect', ->
      @view.redirectTo = '/awesome-fair'
      @view.preInitialize copy: 'Sign up to foobar.'
      @view.templateData.redirectTo.should.containEql '/awesome-fair'

    it 'passes the pathname to the template', ->
      _location = @AuthModalView.__get__ 'location'
      @AuthModalView.__set__ 'location', pathname: 'foobarbaz'
      @view.preInitialize mode: 'login'
      @view.templateData.redirectTo.should.equal 'foobarbaz'
      @AuthModalView.__set__ 'location', _location

    it 'accepts optional userData that gets passed to the template', ->
      @view.preInitialize userData: email: 'foo@bar.com'
      @view.templateData.email.should.containEql 'foo@bar.com'

    it 'sets up tracking options', ->
      @view.preInitialize context_module: 'intext tooltips', intent: 'follow artist'
      @view.trackingOptions.context_module.should.containEql 'intext tooltips'
      @view.trackingOptions.intent.should.containEql 'follow artist'

  describe '#submit', ->
    beforeEach ->
      sinon.stub location, 'assign'
      sinon.stub location, 'reload'
      @view.validateForm = -> true

      @view.state = new Backbone.Model
      @view.user = new LoggedOutUser

    afterEach ->
      location.assign.restore()
      location.reload.restore()

    it 'sets a cookie named destination with whatever the passed in destination is', ->
      @view.destination = '/artist/some-guy/follow'
      @view.state.set mode: 'register'
      @view.submit $.Event('click')
      _.last(@AuthModalView.__get__('Cookies').set.args)[1].should.equal @view.destination

    it 'creates a signed_in cookie', ->
      @view.state.set mode: 'login'
      @view.submit $.Event('click')
      _.last(@AuthModalView.__get__('Cookies').set.args)[1].should.be.true()

    it 'sends a CSRF token', ->
      @view.$el.html $ "<form>" + render('register')(
        copy: new Backbone.Model
        sd: CSRF_TOKEN: 'csrfoo', AP: loginPagePath: 'foo'
      ) + "</form>"
      @view.state.set mode: 'register'
      @view.submit $.Event('click')
      Backbone.sync.args[1][1].toJSON()._csrf.should.equal 'csrfoo'

    it 'submits user data with gdpr fields', ->
      @view.state.set mode: 'register'
      @view.serializeForm = -> {
        name: 'Sam'
        password: 'foo'
        email: 'foo@bar.com'
        accepted_terms_of_service: true
      }
      @view.submit $.Event('click')
      Backbone.sync.args[0][1].toJSON().name.should.equal 'Sam'
      Backbone.sync.args[0][1].toJSON().email.should.equal 'foo@bar.com'
      Backbone.sync.args[0][1].toJSON().password.should.equal 'foo'
      Backbone.sync.args[0][1].toJSON().accepted_terms_of_service.should.equal true
      Backbone.sync.args[0][1].toJSON().agreed_to_receive_emails.should.equal true

    it 'returns early if validateForm has an error', ->
      @view.$el.html $ "<form>" + render('register')(
        copy: new Backbone.Model
        sd: AP: loginPagePath: 'foo'
      ) + "</form>"
      @view.state.set mode: 'register'
      @view.validateForm = -> false
      @view.submit $.Event('click')
      Backbone.sync.args.length.should.equal 0

  describe '#onSubmitSuccess', ->
    beforeEach ->
      @view.state = new Backbone.Model mode: 'reset'
      @view.user = new LoggedOutUser
      sinon.stub @view, 'reenableForm'
      @submitSpy = sinon.spy $.fn, 'submit'
      mediator.trigger = sinon.stub()

    afterEach ->
      @view.reenableForm.restore()
      @submitSpy.restore()

    it 'does not submit form if the the mode is password reset', ->
      @view.onSubmitSuccess @view.user, { success: 200 }
      @submitSpy.should.be.calledOnce

    it 'triggers analytics hook on login', ->
      @view.trackingOptions = context_module: 'intext tooltips', intent: 'follow artist'
      @view.state.set mode: 'login'
      @view.onSubmitSuccess @view.user, { success: 200 }

      analyticsHooks.trigger.args[0][0].should.eql 'auth:login'
      analyticsHooks.trigger.args[0][1].context_module.should.eql 'intext tooltips'
      analyticsHooks.trigger.args[0][1].intent.should.eql 'follow artist'

    it 'triggers mediator for analytics with trackingOptions on register', ->
      @view.preInitialize context_module: 'intext tooltips', intent: 'follow artist'
      @view.onSubmitSuccess @view.user, { success: 200 }

      mediator.trigger.args[0][0].should.eql 'auth:sign_up:success'
      mediator.trigger.args[0][1].context_module.should.eql 'intext tooltips'
      mediator.trigger.args[0][1].intent.should.eql 'follow artist'

  describe '#trackSignup', ->
    it 'extends trackingOptions with args', ->
      @view.preInitialize()
      @view.trackSignup {intent: 'follow artist'}

      @view.trackingOptions.intent.should.eql 'follow artist'

  describe '#trackFacebookSignup', ->
    it 'calls #trackSignup and sets a cookie with @trackingOptions', ->
      @view.preInitialize()
      @view.trackFacebookSignup {intent: 'follow artist'}
      cookie = _.last(@AuthModalView.__get__('Cookies').set.args)

      @view.trackingOptions.intent.should.eql 'follow artist'
      cookie[0].should.eql 'analytics-signup'
      JSON.parse(cookie[1]).intent.should.eql 'follow artist'
