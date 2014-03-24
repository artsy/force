{ fabricate } = require 'antigravity'
_ = require 'underscore'
sinon = require 'sinon'
Backbone = require 'backbone'
routes = require '../routes'

describe 'Home routes', ->

  beforeEach ->
    sinon.stub Backbone, 'sync'
    @req = { body: {}, query: {}, get: sinon.stub() }
    @res = { render: sinon.stub(), redirect: sinon.stub() }

  afterEach ->
    Backbone.sync.restore()

  describe '#index', ->

    it 'renders the home page with hero units', ->
      routes.index @req, @res
      Backbone.sync.args[0][2].success [fabricate 'site_hero_unit']
      Backbone.sync.args[1][2].success [fabricate 'set']
      Backbone.sync.args[2][2].success [fabricate 'featured_link']
      @res.render.args[0][0].should.equal 'index'
      @res.render.args[0][1].heroUnits[0].get('description').should.equal 'My hero'

  describe '#redirectToSignup', ->

    it 'redirects to signup', ->
      routes.redirectToSignup @req, @res
      @res.redirect.args[0][0].should.equal '/sign_up'

  describe '#redirectLoggedInHome', ->

    it 'redirects logged in users home', ->
      @req.user = {}
      routes.redirectLoggedInHome @req, @res
      @res.redirect.args[0][0].should.equal '/'

    it 'redirects logged in users to redirect location', ->
      @req.query['redirect_uri'] = '/awesome-fair'
      @req.user = {}
      routes.redirectLoggedInHome @req, @res
      @res.redirect.args[0][0].should.equal '/awesome-fair'

    it 'redirects logged in users to redirect location', ->
      @req.body['redirect-to'] = '/awesome-fair'
      @req.user = {}
      routes.redirectLoggedInHome @req, @res
      @res.redirect.args[0][0].should.equal '/awesome-fair'

describe '#unsubscribe', ->
  
  beforeEach ->
    sinon.stub Backbone, 'sync'

  afterEach ->
    Backbone.sync.restore()

  it 'posts to the unsubscribe API and redirects to the homepage when no type specified', ->
    routes.unsubscribe { query: { authentication_token: 'bitty' } }, redirect: redirectStub = sinon.stub()
    Backbone.sync.args[0][1].url.should.include '/api/v1/me/unsubscribe?authentication_token=bitty'
    Backbone.sync.args[0][2].success { success: true }
    redirectStub.args[0][0].should.equal '/'

  it 'posts to the unsubscribe API and redirects to the homepage with an email type', ->
    routes.unsubscribe { query: { authentication_token: 'bitty', type: 'personalized_email' } }, redirect: redirectStub = sinon.stub()
    Backbone.sync.args[0][1].url.should.include '/api/v1/me/unsubscribe?authentication_token=bitty&type=personalized_email'
    Backbone.sync.args[0][2].success { success: true }
    redirectStub.args[0][0].should.equal '/'
