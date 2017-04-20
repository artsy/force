_ = require 'underscore'
sinon = require 'sinon'
moment = require 'moment'
Backbone = require 'backbone'
Article = require '../../../models/article'
Articles = require '../../../collections/articles'
Curation = require '../../../models/curation'
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

describe 'Venice route', ->

  beforeEach ->
    sinon.stub Backbone, 'sync'
    Backbone.sync.yieldsTo 'success', { name: 'Inside the Biennale', sections: [{slug: 'venice'}, {slug: 'venice-2'}] }
    @res = { render: sinon.stub(), locals: { sd: {} }, redirect: sinon.stub() }
    @next = sinon.stub()
    routes.__set__ 'sd', {EF_VENICE: '123'}

  afterEach ->
    Backbone.sync.restore()

  it 'sets a video index', ->
    @req = { params: { slug: 'venice-2' } }
    routes.venice(@req, @res, @next)
    @res.render.args[0][0].should.equal 'components/venice_2017/templates/index'
    @res.render.args[0][1].videoIndex.should.equal 1

  it 'defaults to the first video', ->
    @req = { params: { slug: 'blah' } }
    routes.venice(@req, @res, @next)
    @res.render.args[0][0].should.equal 'components/venice_2017/templates/index'
    @res.render.args[0][1].videoIndex.should.equal 0

  it 'sets a curation', ->
    @req = { params: {slug: 'venice'} }
    routes.venice(@req, @res, @next)
    @res.render.args[0][0].should.equal 'components/venice_2017/templates/index'
    @res.render.args[0][1].curation.get('name').should.eql 'Inside the Biennale'


describe 'Vanity route', ->

  beforeEach ->
    @res = { render: sinon.stub(), locals: { sd: {} }, redirect: sinon.stub() }
    @next = sinon.stub()
    routes.__set__ 'httpProxy',
      createProxyServer: sinon.stub().returns
        web: @web = sinon.stub()

  it 'checks that the asset is whitelisted and sets up proxy', ->
    routes.__set__ 'WHITELISTED_VANITY_ASSETS', 'videos/final-video.mp4'
    @req = { params: ['videos/final-video.mp4'], headers: host: '' }
    routes.vanity @req, @res, @next
    @web.args[0][2].target.should.containEql '/videos/final-video.mp4'

  it 'rejects assets that are not whitelisted', ->
    routes.__set__ 'WHITELISTED_VANITY_ASSETS', 'videos/final-video.mp4'
    @req = { params: ['videos/demo-video.mp4'], headers: host: '' }
    routes.vanity @req, @res, @next
    @next.called.should.be.true()

  it 'redirects to articles page if there is a proxy error', ->
    routes.__set__ 'WHITELISTED_VANITY_ASSETS', 'videos/final-video.mp4'
    @req = { params: ['videos/final-video.mp4'], headers: host: '' }
    routes.vanity @req, @res, @next
    @web.args[0][3]('Error')
    @res.redirect.args[0][0].should.equal 301
    @res.redirect.args[0][1].should.equal '/articles'