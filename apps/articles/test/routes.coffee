_ = require 'underscore'
sinon = require 'sinon'
moment = require 'moment'
Backbone = require 'backbone'
Article = require '../../../models/article'
Articles = require '../../../collections/articles'
rewire = require 'rewire'
routes = rewire '../routes'
fixtures = require '../../../test/helpers/fixtures.coffee'
{ fabricate } = require 'antigravity'

describe 'Articles routes', ->

  beforeEach ->
    sinon.stub Backbone, 'sync'
    @req = { params: {} }
    @res = { render: sinon.stub(), locals: { sd: {} }, redirect: sinon.stub() }
    @next = sinon.stub()
    routes.__set__ 'topParselyArticles', sinon.stub().yields [fixtures.parselyArticle, fixtures.parselyArticle, fixtures.parselyArticle]

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
      Backbone.sync.args[1][2].success fixtures.article
      @res.render.args[0][0].should.equal 'section'
      @res.render.args[0][1].section.get('title').should.equal section.title

    it 'nexts for an error b/c it uses a root url that should be passed on', ->
      routes.section @req, @res, @next
      Backbone.sync.args[0][2].error()
      @next.called.should.be.ok()

  describe '#teamChannel', ->

    it 'renders the channel with its articles', ->
      channel = _.extend _.clone(fixtures.channel), slug: 'foo', type: 'team'
      @req.params.slug = 'foo'
      routes.teamChannel @req, @res, @next
      Backbone.sync.args[0][2].success channel
      Backbone.sync.args[1][2].data.ids.length.should.equal 4
      Backbone.sync.args[1][2].success fixtures.article
      @res.render.args[0][0].should.equal 'team_channel'
      @res.render.args[0][1].channel.get('name').should.equal channel.name

    it 'nexts if channel is not a team channel', ->
      channel = _.extend _.clone(fixtures.channel), slug: 'foo', type: 'editorial'
      @req.params.slug = 'foo'
      routes.teamChannel @req, @res, @next
      Backbone.sync.args[0][2].success channel
      @next.called.should.be.ok()

    it 'falls back to checking for a section if channel is not found', ->
      @req.params.slug = 'foo'
      routes.teamChannel @req, @res, @next
      routes.section = sinon.stub()
      Backbone.sync.args[0][2].error()
      routes.section.called.should.be.ok()
      routes.section.args[0][0].params.slug.should.equal 'foo'
