_ = require 'underscore'
sd = require('sharify').data
benv = require 'benv'
sinon = require 'sinon'
Backbone = require 'backbone'
mediator = require '../../../lib/mediator'
LoggedOutUser = require '../../../models/logged_out_user'
rewire = require 'rewire'

describe 'AuthModalView', ->
  before (done) ->
    benv.setup =>
      benv.expose $: benv.require 'jquery'
      Backbone.$ = $
      @AuthModalView = rewire '../view'
      @AuthModalView.__set__ 'Cookies',
        set: sinon.stub()
        get: sinon.stub()
      sinon.stub @AuthModalView::, 'initialize'
      done()

  after ->
    benv.teardown()

  beforeEach ->
    @view = new @AuthModalView
    sinon.stub(Backbone, 'sync').yieldsTo 'success', user: accessToken: 'secrets'

  afterEach ->
    Backbone.sync.restore()

  describe '#preInitialize', ->
    it 'can render custom copy a single individual mode', ->
      @view.preInitialize copy: 'Log in to foobar', mode: 'login'
      @view.templateData.copy.get('login').should.equal 'Log in to foobar'
      @view.templateData.copy.has('register').should.be.false

    it 'can render custom copy for the default individual mode', ->
      # 'register' is the default mode for the view's State
      @view.preInitialize copy: 'Sign up to foobar'
      @view.templateData.copy.get('register').should.equal 'Sign up to foobar'
      @view.templateData.copy.has('login').should.be.false

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
      @view.preInitialize {}
      @view.templateData.pathname.should.equal 'foobarbaz'
      @AuthModalView.__set__ 'location', _location

  describe '#submit', ->
    beforeEach ->
      sinon.stub location, 'reload'
      @view.validateForm = -> true

      @view.state = new Backbone.Model
      @view.user = new LoggedOutUser

    afterEach ->
      location.reload.restore()

    it 'submits to signup when in that mode', ->
      @view.redirectTo = 'foobarbaz'
      @view.state.set mode: 'register'
      @view.submit $.Event('click')
      Backbone.sync.args[0][2].url.should.equal '/users/invitation/accept'
      location.href.should.containEql 'foobarbaz'

    it 'submits to signup with custom redirect url', ->
      @view.redirectTo = '/awesome-fair'
      @view.state.set mode: 'register'
      @view.submit $.Event('click')
      Backbone.sync.args[0][2].url.should.containEql 'users/invitation/accept'
      location.href.should.containEql '/awesome-fair'

    it 'sets a cookie named destination with whatever the passed in destination is', ->
      @view.destination = '/artist/some-guy/follow'
      @view.state.set mode: 'register'
      @view.submit $.Event('click')
      _.last(@AuthModalView.__get__('Cookies').set.args)[1].should.equal @view.destination

    it 'creates a signed_in cookie', ->
      @view.state.set mode: 'login'
      @view.submit $.Event('click')
      _.last(@AuthModalView.__get__('Cookies').set.args)[1].should.be.true

    it 'redirects to /personalize when mode is register by default', ->
      @view.state.set mode: 'register'
      @view.submit $.Event('click')
      location.href.should.containEql '/personalize'
