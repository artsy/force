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
    sinon.stub(Backbone, 'sync').yieldsTo 'success', { user: { accessToken: 'secrets' } }

  afterEach ->
    Backbone.sync.restore()

  describe '#preInitialize', ->
    it 'can render custom copy', ->
      @view.preInitialize copy: 'Sign up to foobar.'
      @view.templateData.copy.should.containEql 'Sign up to foobar'

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
