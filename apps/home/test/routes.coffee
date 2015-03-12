{ fabricate } = require 'antigravity'
_ = require 'underscore'
sinon = require 'sinon'
Backbone = require 'backbone'
rewire = require 'rewire'
routes = rewire '../routes'
CurrentUser = require '../../../models/current_user.coffee'
HeroUnits = require '../../../collections/hero_units'
Q = require 'q'

describe 'Home routes', ->
  beforeEach ->
    sinon.stub Backbone, 'sync'
    @req = { body: {}, query: {}, get: @getStub = sinon.stub(), cookies: {} }
    @res = { locals: { sd: {} }, render: sinon.stub(), redirect: sinon.stub(), \
      cookie: @cookieStub = sinon.stub() }

  afterEach ->
    Backbone.sync.restore()

  describe '#index', ->
    describe 'logged out', ->
      describe 'first time', ->
        it 'renders the home page with hero units + welcome hero unit at the front', (done) ->
          routes.index @req, @res
          Backbone.sync.args[0][2].success [fabricate 'site_hero_unit']
          Backbone.sync.args[1][2].success [fabricate 'featured_link']
          Backbone.sync.args[2][2].success [fabricate 'featured_link']
          _.defer =>
            @res.render.args[0][0].should.equal 'index'
            @res.render.args[0][1].heroUnits.at(0).get('description').should.equal 'Sign up to get updates on your favorite artists'
            @res.render.args[0][1].heroUnits.at(1).get('description').should.equal 'My hero'
            @res.cookie.args[0][0].should.equal 'hide-welcome-hero'
            @res.cookie.args[0][1].should.equal '1'
            done()

      describe 'after first time', ->
        it 'renders the home page with hero units + welcome hero unit at the end', (done) ->
          @req.cookies = 'hide-welcome-hero': '1'
          routes.index @req, @res
          Backbone.sync.args[0][2].success [fabricate 'site_hero_unit']
          Backbone.sync.args[1][2].success [fabricate 'featured_link']
          Backbone.sync.args[2][2].success [fabricate 'featured_link']
          _.defer =>
            @res.render.args[0][0].should.equal 'index'
            @res.render.args[0][1].heroUnits.last().get('description').should.equal 'Sign up to get updates on your favorite artists'
            done()

    describe 'logged in', ->
      it 'renders the homepage without the welcome hero unit', (done) ->
        routes.index _.extend({ user: 'existy' }, @req), @res
        Backbone.sync.args[0][2].success [fabricate 'site_hero_unit']
        Backbone.sync.args[1][2].success [fabricate 'featured_link']
        _.defer =>
          @res.render.args[0][0].should.equal 'index'
          @res.render.args[0][1].heroUnits.first().get('description').should.equal 'My hero'
          done()

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
