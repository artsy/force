{ fabricate } = require 'antigravity'
_ = require 'underscore'
sinon = require 'sinon'
rewire = require 'rewire'
routes = rewire '../routes'
Backbone = require 'backbone'

describe '#forgotPassword', ->
  it 'renders the reset form', ->
    routes.forgotPassword {}, render: renderStub = sinon.stub()
    renderStub.args[0][0].should.equal 'forgot_password'

describe '#submitForgotPassword', ->
  beforeEach ->
    sinon.stub Backbone, 'sync'

  afterEach ->
    Backbone.sync.restore()

  it 'articles to the reset password API and renders the confirmation page', ->
    routes.submitForgotPassword { body: { email: 'foo@bar.com' } }, render: renderStub = sinon.stub()
    Backbone.sync.args[0][2].url.should.containEql 'send_reset_password_instructions?email=foo@bar.com'
    Backbone.sync.args[0][2].success { success: true }
    renderStub.args[0][0].should.equal 'forgot_password_confirmation'

describe '#resetPassword', ->
  it 'renders the reset form', ->
    routes.resetPassword {}, render: renderStub = sinon.stub()
    renderStub.args[0][0].should.equal 'reset_password'

describe '#login', ->
  it 'renders the login page', ->
    @redirectURL = '/artwork/matthew-abbott-lobby-and-supercomputer'
    @req =
      session: null
      get: (=> @redirectURL)
      query: {}
      body: {}
      params: {}

    @res = { render: @render = sinon.stub() }

    routes.login @req, @res
    @render.args[0][0].should.equal 'login'

  it 'renders the call_to_action page', ->
    @redirectURL = '/artwork/matthew-abbott-lobby-and-supercomputer'
    @req =
      session: null
      get: (=> @redirectURL)
      query: {
        action: 'artwork-save',
        'redirect-to': @redirectURL
      }
      body: {}
      params: {}

    @res = { render: @render = sinon.stub() }

    routes.login @req, @res
    @render.args[0][0].should.equal 'call_to_action'

  it 'passes the referrer to the template', ->
    routes.login @req, @res
    @render.args[0][1].redirectTo.should.equal @redirectURL

  it 'passes the redirect param to the template', ->
    req =
      query: { 'redirect-to': '%2Ffollowing%2Fprofiles' }
      body: {}
      params: {}
      get: (-> false)
    res = { render: @render = sinon.stub() }

    routes.login req, res
    @render.args[0][1].redirectTo.should.equal '%2Ffollowing%2Fprofiles'

  it 'ignores malicious redirects', ->
    req =
      query: { 'redirect-to': 'http://www.iamveryverysorry.com/' }
      body: {}
      params: {}
      get: (-> false)

    res = { render: @render = sinon.stub() }

    routes.login req, res
    @render.args[0][1].redirectTo.should.equal '/'

describe '#signUp', ->
  beforeEach ->
    @req = { session: {}, get: (-> '/auctions/two-x-two'), query: {}, body: {}, params: {}}
    @res = { render: @render = sinon.stub() }
    sinon.stub Backbone, 'sync'

  afterEach ->
    @render.restore?()
    Backbone.sync.restore()

  it 'renders the call_to_action if coming from an action', ->
    @req.query.action = 'register-for-auction'
    routes.signUp @req, @res
    @render.args[0][1].action.should.equal 'register-for-auction'
    @render.args[0][0].should.equal 'call_to_action'

  it 'renders the create account page if ?email=1', ->
    @req.query['email'] = '1'
    routes.signUp @req, @res
    @render.args[0][0].should.equal 'signup_email'

  it 'renders the create account page if ?email=1', ->
    @req.query['email'] = '1'
    routes.signUp @req, @res
    @render.args[0][0].should.equal 'signup_email'

  it 'sets redirectTo if redirect-to was passed', ->
    @req.query['email'] = '1'
    @req.query['redirect-to'] = '/auction-registration'
    routes.signUp @req, @res
    @render.args[0][1].redirectTo.should.equal '/auction-registration'

  it 'ignores malicious redirects', ->
    req = query: { 'redirect-to': 'http://www.iamveryverysorry.com/' }, body: {}, session: {}, params: {}
    routes.signUp req, @res
    @render.args[0][1].redirectTo.should.equal '/'

  it 'sets the prefill var', ->
    @req.query.prefill = 'foo@bar.com'
    routes.signUp @req, @res
    @render.args[0][1].prefill.should.equal 'foo@bar.com'

