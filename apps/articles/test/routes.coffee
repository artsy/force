_ = require 'underscore'
sinon = require 'sinon'
Backbone = require 'backbone'
Article = require '../../../models/article'
routes = require '../routes'
fixtures = require '../../../test/helpers/fixtures.coffee'
{ fabricate } = require 'antigravity'

describe 'Article routes', ->

  beforeEach ->
    sinon.stub Backbone, 'sync'
    @req = { params: {} }
    @res = { render: sinon.stub(), locals: { sd: {} } }
  afterEach ->
    Backbone.sync.restore()

  describe '#show', ->

    it 'fetches an article and renders it', ->
      @req.article = new Article _.extend fixtures.article, title: 'Foo'
      routes.show @req, @res
      Backbone.sync.args[0][2].success fabricate 'user'
      @res.render.args[0][0].should.equal 'show'
      @res.render.args[0][1].article.get('title').should.equal 'Foo'

  describe '#getArticle', ->

    it 'fetches the article and attaches it to req', ->
      @req.params.id = 'foo'
      routes.getArticle @req, @res, ->
      Backbone.sync.args[0][1].url().should.containEql 'articles/foo'
      Backbone.sync.args[0][2].success _.extend fixtures.article, title: 'Foo'
      @req.article.get('title').should.equal 'Foo'

  describe '#redirectToFullUrl', ->

    it 'redirects partial urls to the full article', ->
      @req.article = new Article _.extend fixtures.article,
        id: 'foo', slug: 'foo-bar'
      @res.redirect = sinon.stub()
      routes.redirectToFullUrl @req, @res
      @res.redirect.args[0][0].should.equal '/articles/foo/foo-bar'