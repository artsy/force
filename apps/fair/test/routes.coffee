{ fabricate } = require 'antigravity'
_ = require 'underscore'
sinon = require 'sinon'
Backbone = require 'backbone'
routes = require '../routes'

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

    it 'renders the posts template', ->
      routes.overview @req, @res
      _.last(Backbone.sync.args)[2].success fabricate 'fair_profile'
      _.last(Backbone.sync.args)[2].success fabricate 'fair'
      @res.render.args[0][0].should.equal '../fair/templates/index'
      @res.render.args[0][1].profile.isFairOranizer()

  describe '#foryou', ->

    it 'renders the posts template', ->
      routes.forYou @req, @res
      _.last(Backbone.sync.args)[2].success fabricate 'fair_profile'
      _.last(Backbone.sync.args)[2].success fabricate 'fair'
      @res.render.args[0][0].should.equal 'templates/index'
      @res.render.args[0][1].profile.isFairOranizer()

  describe '#fairPosts', ->

    it 'renders the posts template', ->
      routes.fairPosts @req, @res
      _.last(Backbone.sync.args)[2].success fabricate 'fair_profile'
      _.last(Backbone.sync.args)[2].success fabricate 'fair'
      @res.render.args[0][0].should.equal '../fair/templates/index'
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
      @res.render.args[0][0].should.equal 'templates/index'
      @res.render.args[0][1].profile.isFairOranizer()
