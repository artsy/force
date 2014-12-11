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
      Backbone.sync.args[0][2].success fixtures.article
      Backbone.sync.args[1][2].success fabricate 'user'
      @res.render.args[0][0].should.equal 'show'
      @res.render.args[0][1].article.get('title').should.equal 'Foo'