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
    @res = { render: sinon.stub(), locals: { sd: {} } }
    sinon.stub Article.prototype, 'fetchWithRelated'

  afterEach ->
    Backbone.sync.restore()
    Article::fetchWithRelated.restore()

  describe '#show', ->

    it 'fetches an article, its related content, and renders it', ->
      @fetchWithRelated =
      routes.show @req, @res
      Article::fetchWithRelated.args[0][0].success(
        new Article(_.extend fixtures.article, title: 'Foo')
        new Backbone.Model(fabricate 'user', name: 'Tess')
        new Articles([_.extend fixtures.article, title: 'Bar'])
        null
      )
      @res.render.args[0][0].should.equal 'show'
      @res.render.args[0][1].article.get('title').should.equal 'Foo'
      @res.render.args[0][1].author.get('name').should.equal 'Tess'
      @res.render.args[0][1].footerArticles[0].get('title')
        .should.equal 'Bar'