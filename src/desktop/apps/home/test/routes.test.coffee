sinon = require 'sinon'
Backbone = require 'backbone'
{ extend } = require 'underscore'
{ fabricate } = require '@artsy/antigravity'
rewire = require 'rewire'
routes = rewire '../routes'
Items = require '../../../collections/items'

heroUnit =
  "title_image_url": "https://d32dm0rphc51dk.cloudfront.net/o8z4tRzTn3ObRWxvLg3L0g/untouched-png.png",
  "retina_title_image_url": "https://d32dm0rphc51dk.cloudfront.net/o8z4tRzTn3ObRWxvLg3L0g/untouched-png.png",
  "background_image_url": "https://d32dm0rphc51dk.cloudfront.net/lOFraLWi5vCJJl2FqnzMKA/untouched-jpg.jpg",
  "mode": "LEFT_LIGHT",
  "title": "Heritage: Trending Contemporary (Jan 2017)",
  "subtitle": 'My hero',
  "link_text": "Bid Now",
  "credit_line": "Bjarne Melgaard, The times never will be there again, 2012; Courtesy of Heritage Auctions."

describe 'Home routes', ->
  beforeEach ->
    sinon.stub Backbone, 'sync'
    routes.__set__ 'metaphysics', @metaphysics = sinon.stub()
    @metaphysics.debug = sinon.stub()

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

    @user = {
      hasLabFeature: () -> false
    }

  afterEach ->
    Backbone.sync.restore()

  describe '#index', ->
    describe 'handles failed services gracefully', ->
      it 'passes empty featured links fetch fails', ->
        @metaphysics.returns Promise.resolve
          home_page:
            hero_units: [heroUnit]
            artwork_modules: []
        Backbone.sync
          .onCall 0
          .yieldsTo 'error'
        routes.index extend(@user, @req), @res
          .then =>
            @res.render.args[0][0].should.equal 'index'
            @res.render.args[0][1].featuredLinks.length.should.equal 0

    describe 'logged out', ->

      describe 'first time', ->
        it 'renders the home page with hero units + welcome hero unit at the front', ->

          @metaphysics.returns Promise.resolve home_page: hero_units: [heroUnit]
          Backbone.sync
            .onCall 0
            .yieldsTo 'success', [fabricate 'featured_link']

          routes.index @req, @res
            .then =>
              @res.render.args[0][0].should.equal 'index'
              @res.render.args[0][1].heroUnits[0].subtitle
                .should.equal 'Sign up to get updates on your favorite artists'
              @res.render.args[0][1].heroUnits[1].subtitle
                .should.equal 'My hero'
              @res.cookie.args[0][0].should.equal 'hide-welcome-hero'
              @res.cookie.args[0][1].should.equal '1'

      describe 'after first time', ->
        it 'renders the home page with hero units + welcome hero unit at the end', ->
          @req.cookies = 'hide-welcome-hero': '1'

          @metaphysics.returns Promise.resolve home_page: hero_units: [heroUnit]
          Backbone.sync
            .onCall 0
            .yieldsTo 'success', [fabricate 'featured_link']
          routes.index @req, @res
            .then =>
              @res.render.args[0][0].should.equal 'index'
              @res.render.args[0][1].heroUnits[1].subtitle
                .should.equal 'Sign up to get updates on your favorite artists'

    describe 'logged in', ->
      beforeEach ->
        @req.user = @user

      it 'renders the homepage without the welcome hero unit', ->
        @metaphysics.returns Promise.resolve
          home_page:
            hero_units: [heroUnit]
            artwork_modules: []
        Backbone.sync
            .onCall 0
            .yieldsTo 'success', [fabricate 'featured_link']
        routes.index @req, @res
          .then =>
            @res.render.args[0][0].should.equal 'index'
            @res.render.args[0][1].heroUnits[0].subtitle
              .should.equal 'My hero'

      it 'with lab feature, does not fetch hero units, featured links, or followed artists rail', ->
        @user.hasLabFeature = () -> true
        @metaphysics.returns Promise.resolve
          home_page:
            artwork_modules: [{ key: 'followed_artists' }, { key: 'recommended_works'}]
        routes.index @req, @res
          .then =>
            @res.render.args[0][0].should.equal 'index'
            @res.render.args[0][1].modules[0].key.should.equal 'followed_artists'

      it 'catches error fetching homepage rails and still renders hero units', ->
        err = new Error 'Failed to get rails'
        err.data = home_page: hero_units: [heroUnit]
        @metaphysics.returns Promise.reject err
        Backbone.sync
            .onCall 0
            .yieldsTo 'success', [fabricate 'featured_link']
        routes.index @req, @res
          .then =>
            @res.render.args[0][0].should.equal 'index'
            @res.render.args[0][1].heroUnits[0].subtitle
              .should.equal 'My hero'
