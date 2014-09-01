{ fabricate } = require 'antigravity'
_ = require 'underscore'
sinon = require 'sinon'
Backbone = require 'backbone'
rewire = require 'rewire'
routes = rewire '../routes'
CurrentUser = require '../../../models/current_user.coffee'
HeroUnits = require '../../../collections/hero_units'

describe 'Home routes', ->

  beforeEach ->
    sinon.stub Backbone, 'sync'
    @req = { body: {}, query: {}, get: @getStub = sinon.stub() }
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

    it 'redirects logged in users to home if they log in from /log_in', ->
      @getStub.returns '/log_in'
      @req.url = '/log_in'
      @req.user = {}
      routes.redirectLoggedInHome @req, @res
      @res.redirect.args[0][0].should.equal '/'

    it 'redirects logged in users to home if they log in from /sign_up', ->
      @getStub.returns '/sign_up'
      @req.url = '/sign_up'
      @req.user = {}
      routes.redirectLoggedInHome @req, @res
      @res.redirect.args[0][0].should.equal '/'

  describe 'cache busting', ->

    beforeEach ->
      routes.__set__ 'client', @client = { del: sinon.stub() }

    describe '#bustCache', ->

      beforeEach ->
        @req = { }
        @res = { redirect: sinon.stub() }

      it 'deletes the hero unit key in redis when navigated to by an admin user', ->
        @req.user = new CurrentUser fabricate 'user', type: 'Admin'
        routes.bustHeroCache @req, @res, ->
        @client.del.args[0][0].should.containEql '/api/v1/site_hero_units?enabled=true'
        @res.redirect.args[0][0].should.equal '/'

      it 'does nothing when not an admin user', ->
        routes.bustHeroCache @req, @res, (next = sinon.stub())
        @client.del.called.should.not.be.ok
        @res.redirect.called.should.not.be.ok
        next.called.should.be.ok
