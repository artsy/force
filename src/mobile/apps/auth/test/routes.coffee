{ fabricate } = require 'antigravity'
_ = require 'underscore'
sinon = require 'sinon'
rewire = require 'rewire'
routes = rewire '../routes'
Backbone = require 'backbone'

describe '#submitForgotPassword', ->
  beforeEach ->
    sinon.stub Backbone, 'sync'

    @res =
      render: @render = sinon.stub(),

  afterEach ->
    Backbone.sync.restore()

  it 'articles to the reset password API and renders the confirmation page', ->
    routes.submitForgotPassword { body: { email: 'foo@bar.com' } }, @res
    Backbone.sync.args[0][2].url.should.containEql 'send_reset_password_instructions?email=foo@bar.com'
    Backbone.sync.args[0][2].success { success: true }
    @render.args[0][0].should.equal 'forgot_password_confirmation'

  it 'bubbles error', ->
    routes.submitForgotPassword(
      { body: email: 'foo@bar.com' }
      @res
    )
    Backbone.sync.args[0][2].error response: body: error: 'Fail whale'
    @render.args[0][1].error.should.equal 'Fail whale'

  it 'doesnt choke on errors without bodies', ->
    routes.submitForgotPassword(
      { body: email: 'foo@bar.com' }
      @res
    )
    Backbone.sync.args[0][2].error response: text: 'Whomp'
    @render.args[0][1].error.should.containEql 'try again'

describe '#resetPassword', ->
  it 'renders the reset form', ->
    @res =
      render: @render = sinon.stub(),
    routes.resetPassword {}, @res
    @render.args[0][0].should.equal 'reset_password'

describe '#login', ->
  beforeEach ->
    @redirectURL = '/artwork/matthew-abbott-lobby-and-supercomputer'
    @req =
      session: null
      get: (-> @redirectURL)
      query: {}
      body: {}
      params: {}

    @res =
      render: @render = sinon.stub(),

  it 'redirects to new login page', ->
    req =
      query: { 'redirect-to': '/'}
      body: {}
      params: {}
      get: (-> false)

    res =
      redirect: @redirect = sinon.stub()

    routes.login req, res
    @redirect.args[0][0].should.equal '/login?redirect-to=%2F&redirectTo=%2F'

describe '#signUp', ->
  beforeEach ->
    @req = { session: {}, get: (-> '/auctions/two-x-two'), query: {}, body: {}, params: {}}
    @res =
      render: @render = sinon.stub()
    sinon.stub Backbone, 'sync'

  afterEach ->
    @render.restore?()
    Backbone.sync.restore()

  it 'redirects to new signup page', ->
    req =
      query: { 'redirect-to': '/'}
      body: {}
      params: {}
      get: (-> false)

    res =
      redirect: @redirect = sinon.stub()

    routes.signUp req, res
    @redirect.args[0][0].should.containEql '/signup?redirect-to=%2F&redirectTo=%2F'

