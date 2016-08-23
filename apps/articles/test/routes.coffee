_ = require 'underscore'
sinon = require 'sinon'
moment = require 'moment'
Backbone = require 'backbone'
Article = require '../../../models/article'
Articles = require '../../../collections/articles'
routes = require '../routes'
fixtures = require '../../../test/helpers/fixtures.coffee'

describe 'Articles routes', ->

  beforeEach ->
    sinon.stub Backbone, 'sync'
    @req = { params: {} }
    @res = { render: sinon.stub(), locals: { sd: {} }, redirect: sinon.stub() }
    @next = sinon.stub()

  afterEach ->
    Backbone.sync.restore()

  describe '#articles', ->
    it 'fetches published articles', ->
      Backbone.sync
        .onCall 0
        .yieldsTo 'success', results: [fixtures.section]
        .onCall 1
        .yieldsTo 'success', results: [
          { tier: 1, id: 'a' }
          { tier: 1, id: 'b' }
          { tier: 1, id: 'c' }
          { tier: 1, id: 'd' }
          { tier: 2, id: 'e' }
          { tier: 2, id: 'f' }
          { tier: 1, id: 'g' }
          { tier: 2, id: 'h' }
        ]

      routes.articles @req, @res, @next
        .then =>
          @res.render.args[0][1].articles.should.have.lengthOf 8

    it 'gets the running section', ->
      section = _.extend _.clone(fixtures.section),
        title: 'Foo Bar'
        start_at: moment().subtract 1, 'days'
        end_at: moment().add 1, 'days'

      Backbone.sync
        .onCall 0
        .yieldsTo 'success', results: [section]
        .onCall 1
        .yieldsTo 'success', results: [
          { tier: 1, id: 'a' }
          { tier: 1, id: 'b' }
          { tier: 1, id: 'c' }
          { tier: 1, id: 'd' }
          { tier: 2, id: 'e' }
          { tier: 2, id: 'f' }
          { tier: 1, id: 'g' }
          { tier: 2, id: 'h' }
        ]
      routes.articles @req, @res, @next
        .then =>
          @res.render.args[0][1].section.get('title').should.equal 'Foo Bar'

    it 'requests less than 100 pages!', ->
      routes.articles @req, @res, @next
      Backbone.sync.args[1][2].data.limit.should.be.below 100

  describe '#section', ->

    it 'renders the section with its articles', ->
      section = _.extend _.clone(fixtures.section), slug: 'foo'
      @req.params.slug = 'foo'
      routes.section @req, @res, @next
      Backbone.sync.args[0][2].success section
      Backbone.sync.args[1][2].data.section_id.should.equal section.id
      Backbone.sync.args[1][2].success fixtures.articles
      @res.render.args[0][0].should.equal 'section'
      @res.render.args[0][1].section.get('title').should.equal section.title

    it 'nexts for an error b/c it uses a root url that should be passed on', ->
      routes.section @req, @res, @next
      Backbone.sync.args[0][2].error()
      @next.called.should.be.ok()
