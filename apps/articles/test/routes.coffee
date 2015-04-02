_ = require 'underscore'
sinon = require 'sinon'
Backbone = require 'backbone'
Article = require '../../../models/article'
Articles = require '../../../collections/articles'
routes = require '../routes'
fixtures = require '../../../test/helpers/fixtures.coffee'
{ fabricate } = require 'antigravity'

describe 'Article routes', ->

  beforeEach ->
    sinon.stub Backbone, 'sync'
    @req = { params: {} }
    @res = { render: sinon.stub(), locals: { sd: {} }, redirect: sinon.stub() }
    @next = sinon.stub()
    sinon.stub Article.prototype, 'fetchWithRelated'

  afterEach ->
    Backbone.sync.restore()
    Article::fetchWithRelated.restore()

  describe '#show', ->

    it 'redirects old slugs', ->
      @req.params.slug = 'foo'
      routes.show @req, @res
      Article::fetchWithRelated.args[0][0].success(
        new Article(_.extend fixtures.article, title: 'Foo', slug: 'bar')
        new Articles([_.extend fixtures.article, title: 'Bar'])
        null
      )
      @res.redirect.args[0][0].should.equal '/article/bar'

   xit 'fetches an article, its related content, and renders it', ->
      routes.show @req, @res
      Article::fetchWithRelated.args[0][0].success(
        new Article(_.extend fixtures.article, title: 'Foo')
        new Articles([_.extend fixtures.article, title: 'Bar'])
        null
      )
      @res.render.args[0][0].should.equal 'show'
      @res.render.args[0][1].article.get('title').should.equal 'Foo'
      @res.render.args[0][1].footerArticles[0].get('title')
        .should.equal 'Bar'

  describe '#magazine', ->

    it 'fetches published articles', ->
      routes.magazine @req, @res, @next
      Backbone.sync.args[0][2].success results: [
        { tier: 1, id: 'a' }
        { tier: 1, id: 'b' }
        { tier: 1, id: 'c' }
        { tier: 1, id: 'd' }
        { tier: 2, id: 'e' }
        { tier: 2, id: 'f' }
        { tier: 1, id: 'g' }
        { tier: 2, id: 'h' }
      ]
      @res.render.args[0][1].articles.should.have.lengthOf 8

  describe '#redirectPost', ->

    it 'redirects posts to articles', ->
      @req.params.id = 'foo'
      routes.redirectPost @req, @res, @next
      @res.redirect.args[0][1].should.containEql 'article/foo' 
