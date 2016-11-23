_ = require 'underscore'
sinon = require 'sinon'
moment = require 'moment'
Backbone = require 'backbone'
Article = require '../../../models/article'
Articles = require '../../../collections/articles'
rewire = require 'rewire'
routes = rewire '../routes'
fixtures = require '../../../test/helpers/fixtures.coffee'

describe 'EOY route', ->

  beforeEach ->
    sinon.stub Backbone, 'sync'
    @req = { params: {} }
    @res = { render: sinon.stub(), locals: { sd: {} }, redirect: sinon.stub() }
    @next = sinon.stub()

  afterEach ->
    Backbone.sync.restore()

  it 'fetches a curation and superArticle, and superSubArticles', (done) ->
    Backbone.sync
      .onCall 0
      .yieldsTo 'success', { name: 'EOY Curation' }
      .onCall 1
      .yieldsTo 'success', _.extend {}, fixtures.article,
        title: 'Moo'
        super_article: {
          related_articles: ['12345', '67890']
        }
      .onCall 2
      .yieldsTo 'success', _.extend {}, fixtures.article, id: '12345'
      .onCall 3
      .yieldsTo 'success', _.extend {}, fixtures.article, id: '67890'

    routes.eoy(@req, @res, @next)
    _.defer => _.defer =>
      @res.render.args[0][0].should.containEql 'components/eoy/templates/index'
      @res.render.args[0][1].curation.get('name').should.equal 'EOY Curation'
      @res.render.args[0][1].article.get('title').should.equal 'Moo'
      @res.render.args[0][1].superSubArticles.length.should.equal 2
      done()
