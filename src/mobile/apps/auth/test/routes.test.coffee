{ fabricate } = require 'antigravity'
_ = require 'underscore'
sinon = require 'sinon'
rewire = require 'rewire'
routes = rewire '../routes'
Backbone = require 'backbone'

describe '#forgotPassword', ->
  it 'renders the reset form', ->
    @res =
      render: @render = sinon.stub(),
      locals:
        sd:
          MOBILE_NEW_AUTH_MODAL: false
    routes.forgotPassword {}, @res
    @render.args[0][0].should.equal 'forgot_password'

describe '#submitForgotPassword', ->
  beforeEach ->
    sinon.stub Backbone, 'sync'

    @res =
      render: @render = sinon.stub(),
      locals:
        sd:
          MOBILE_NEW_AUTH_MODAL: false

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
      locals:
        sd:
          MOBILE_NEW_AUTH_MODAL: false
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
      locals:
        sd:
          MOBILE_NEW_AUTH_MODAL: false
    
  it 'renders the login page', ->
    routes.login @req, @res
    @render.args[0][0].should.equal 'login'

  it 'renders the call_to_action page', ->
    req =
      session: null
      get: (=> @redirectURL)
      query: {
        action: 'artwork-save',
        'redirect-to': @redirectURL
      }
      body: {}
      params: {}
  
    routes.login req, @res
    @render.args[0][0].should.equal 'call_to_action'

  it 'passes the redirect param to the template', ->
    req =
      query: { 'redirect-to': '%2Ffollowing%2Fprofiles' }
      body: {}
      params: {}
      get: (-> false)

    routes.login req, @res
    @render.args[0][1].redirectTo.should.equal '%2Ffollowing%2Fprofiles'

  it 'passes the redirect query param to the template', ->
    @req.query = { 'redirect_uri': '%2Ffollowing%2Fprofiles' }
    @req.get = (-> false)

    routes.login @req, @res
    @render.args[0][1].redirectTo.should.equal '%2Ffollowing%2Fprofiles'

  it 'redirects to new login page if env variable is set', ->
    req =
      query: { 'redirect-to': '/'}
      body: {}
      params: {}
      get: (-> false)
    
    res =
      redirect: @redirect = sinon.stub()
      locals:
        sd:
          MOBILE_NEW_AUTH_MODAL: true

    routes.login req, res
    @redirect.args[0][0].should.equal '/login?redirect-to=%2F&redirectTo=%2F'

describe '#signUp', ->
  beforeEach ->
    @req = { session: {}, get: (-> '/auctions/two-x-two'), query: {}, body: {}, params: {}}
    @res =
      render: @render = sinon.stub()
      locals:
        sd:
          MOBILE_NEW_AUTH_MODAL: false
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

  it 'redirects to new signup page if env variable is set', ->
    req =
      query: { 'redirect-to': '/'}
      body: {}
      params: {}
      get: (-> false)
    
    res =
      redirect: @redirect = sinon.stub()
      locals:
        sd:
          MOBILE_NEW_AUTH_MODAL: true

    routes.signUp req, res
    @redirect.args[0][0].should.containEql '/signup?redirect-to=%2F&redirectTo=%2F'

