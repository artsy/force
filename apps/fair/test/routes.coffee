{ fabricate } = require 'antigravity'
_ = require 'underscore'
sinon = require 'sinon'
Backbone = require 'backbone'
routes = require '../routes'
CurrentUser = require '../../../models/current_user.coffee'

describe 'Fair routes', ->

  beforeEach ->
    sinon.stub Backbone, 'sync'
    @req = { params: { id: 'some-fair' } }
    @res = { render: sinon.stub(), redirect: sinon.stub(), locals: { sd: { ARTSY_URL: 'http://localhost:5000'} } }

  afterEach ->
    Backbone.sync.restore()

  describe '#info', ->

    it 'renders the info template', ->
      routes.info @req, @res
      _.last(Backbone.sync.args)[2].success fabricate 'fair_profile'
      _.last(Backbone.sync.args)[2].success fabricate 'fair'
      @res.render.args[0][0].should.equal 'templates/index'
      @res.render.args[0][1].profile.isFairOranizer()

  describe '#overview', ->

    it 'renders the overview template', ->
      routes.overview @req, @res
      _.last(Backbone.sync.args)[2].success fabricate 'fair_profile'
      _.last(Backbone.sync.args)[2].success fabricate 'fair'
      _.last(Backbone.sync.args)[2].success []
      _.last(Backbone.sync.args)[2].success []
      _.last(Backbone.sync.args)[2].success []
      _.last(Backbone.sync.args)[2].success []
      _.last(Backbone.sync.args)[2].success []
      @res.render.args[0][0].should.equal '../fair/templates/overview'
      @res.render.args[0][1].profile.isFairOranizer()

  describe '#foryou', ->

    it 'renders the foryou template', ->
      routes.forYou @req, @res
      _.last(Backbone.sync.args)[2].success fabricate 'fair_profile'
      _.last(Backbone.sync.args)[2].success fabricate 'fair'
      _.last(Backbone.sync.args)[2].success []
      _.last(Backbone.sync.args)[2].success []
      _.last(Backbone.sync.args)[2].success []
      _.last(Backbone.sync.args)[2].success []
      _.last(Backbone.sync.args)[2].success []
      @res.render.args[0][0].should.equal 'templates/index'
      @res.render.args[0][1].profile.isFairOranizer()

  describe '#fairPosts', ->

    it 'renders the posts template', ->
      routes.fairPosts @req, @res
      _.last(Backbone.sync.args)[2].success fabricate 'fair_profile'
      _.last(Backbone.sync.args)[2].success fabricate 'fair'
      @res.render.args[0][0].should.equal '../fair/templates/index'
      @res.render.args[0][1].profile.isFairOranizer()

  describe '#favorites', ->

    it 'redirects to the homepage without a user', ->
      routes.favorites @req, @res
      @res.redirect.args[0][0].should.equal '/some-fair'

    it 'renders the favorites template', ->
      @req.user = new CurrentUser fabricate 'user'
      routes.favorites @req, @res
      _.last(Backbone.sync.args)[2].success fabricate 'fair_profile'
      _.last(Backbone.sync.args)[2].success fabricate 'fair'
      @res.render.args[0][0].should.equal 'templates/favorites'
      @res.render.args[0][1].profile.isFairOranizer()

  describe '#follows', ->

    it 'redirects to the homepage without a user', ->
      routes.follows @req, @res
      @res.redirect.args[0][0].should.equal '/some-fair'

    it 'renders the follows template', ->
      @req.user = new CurrentUser fabricate 'user'
      @req.params.type = 'artists'
      routes.follows @req, @res
      _.last(Backbone.sync.args)[2].success fabricate 'fair_profile'
      _.last(Backbone.sync.args)[2].success fabricate 'fair'
      @res.render.args[0][0].should.equal 'templates/favorites'
      @res.render.args[0][1].profile.isFairOranizer()

  describe '#search', ->

    it 'searches', ->
      req = { params: { id: 'some-fair' }, query: { q: 'foobar' } }
      routes.search req, @res
      _.last(Backbone.sync.args)[2].success fabricate 'fair_profile'
      _.last(Backbone.sync.args)[2].success fabricate 'fair'
      _.last(Backbone.sync.args)[0].should.equal 'read'
      _.last(Backbone.sync.args)[2].data.term.should.equal 'foobar'

    it 'redirects without query', ->
      req = { params: { id: 'some-fair' }, query: { } }
      res = { render: sinon.stub(), redirect: sinon.stub(), locals: { sd: {} } }
      routes.search req, res
      res.redirect.args[0][0].should.equal '/some-fair'

  describe '#browse', ->

    it 'renders index', ->
      routes.browse @req, @res
      _.last(Backbone.sync.args)[2].success fabricate 'fair_profile'
      _.last(Backbone.sync.args)[2].success fabricate 'fair'
      _.last(Backbone.sync.args)[2].success []
      _.last(Backbone.sync.args)[2].success []
      _.last(Backbone.sync.args)[2].success []
      _.last(Backbone.sync.args)[2].success []
      _.last(Backbone.sync.args)[2].success []
      @res.render.args[0][0].should.equal 'templates/index'
      @res.render.args[0][1].profile.isFairOranizer()

  describe '#showRedirect', ->

    it 'redirects to show page', ->
      show = fabricate('show')
      routes.showRedirect @req, @res
      _.last(Backbone.sync.args)[2].success fabricate 'fair_profile'
      _.last(Backbone.sync.args)[2].success [
        results: [show]
        next: 'foo'
      ]
      @res.redirect.args[0][0].should.include '/show/gagosian-gallery-inez-and-vinood'
