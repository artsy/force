{ fabricate } = require 'antigravity'
_ = require 'underscore'
sinon = require 'sinon'
Backbone = require 'backbone'
routes = require '../routes'

describe 'Home routes', ->

  beforeEach ->
    sinon.stub Backbone, 'sync'
    @req = { }
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