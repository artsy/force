sinon = require 'sinon'
Backbone = require 'backbone'
{ extend } = require 'underscore'
{ fabricate } = require 'antigravity'
rewire = require 'rewire'
routes = rewire '../routes'

describe 'Home routes', ->
  beforeEach ->
    sinon.stub Backbone, 'sync'
    @req =
      body: {}
      query: {}
      get: @getStub = sinon.stub()
      cookies: {}

    @res =
      locals: sd: {}
      render: sinon.stub()
      redirect: sinon.stub()
      cookie: @cookieStub = sinon.stub()

  afterEach ->
    Backbone.sync.restore()

  describe '#index', ->

    describe 'logged out', ->
      describe 'first time', ->
        it 'renders the home page with hero units + welcome hero unit at the front', ->
          Backbone.sync
            .onCall 0
            .yieldsTo 'success', [fabricate 'site_hero_unit']
            .onCall 1
            .yieldsTo 'success', [fabricate 'featured_link']
            .onCall 2
            .yieldsTo 'success', [fabricate 'featured_link']

          routes.index @req, @res
            .then =>
              @res.render.args[0][0].should.equal 'index'
              @res.render.args[0][1].heroUnits.at(0).get 'description'
                .should.equal 'Sign up to get updates on your favorite artists'
              @res.render.args[0][1].heroUnits.at(1).get 'description'
                .should.equal 'My hero'
              @res.cookie.args[0][0].should.equal 'hide-welcome-hero'
              @res.cookie.args[0][1].should.equal '1'

      describe 'after first time', ->
        it 'renders the home page with hero units + welcome hero unit at the end', ->
          @req.cookies = 'hide-welcome-hero': '1'

          Backbone.sync
            .onCall 0
            .yieldsTo 'success', [fabricate 'site_hero_unit']
            .onCall 1
            .yieldsTo 'success', [fabricate 'featured_link']
            .onCall 2
            .yieldsTo 'success', [fabricate 'featured_link']

          routes.index @req, @res
            .then =>
              @res.render.args[0][0].should.equal 'index'
              @res.render.args[0][1].heroUnits.last().get 'description'
                .should.equal 'Sign up to get updates on your favorite artists'

    describe 'logged in', ->
      it 'renders the homepage without the welcome hero unit', ->
        Backbone.sync
          .onCall 0
          .yieldsTo 'success', [fabricate 'site_hero_unit']
          .onCall 1
          .yieldsTo 'success', [fabricate 'featured_link']

        routes.index extend({ user: 'existy' }, @req), @res
          .then =>
            @res.render.args[0][0].should.equal 'index'
            @res.render.args[0][1].modules[0].key.should.equal 'followed_artists'
            @res.render.args[0][1].heroUnits.first().get 'description'
              .should.equal 'My hero'

  describe '#redirectToSignup', ->
    it 'redirects to signup', ->
      routes.redirectToSignup @req, @res
      @res.redirect.args[0][0].should.equal '/sign_up'

  describe '#redirectLoggedInHome', ->
    it 'redirects logged in users home', ->
      @req.user = {}
      routes.redirectLoggedInHome @req, @res
      @res.redirect.args[0][0].should.equal '/'

    it 'redirects logged in users (with a redirect_uri query param) to redirect location', ->
      @req.query['redirect_uri'] = '/awesome-fair'
      @req.user = {}
      routes.redirectLoggedInHome @req, @res
      @res.redirect.args[0][0].should.equal '/awesome-fair'

    it 'redirects logged in users (with redirect-to in the POST params) to redirect location', ->
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