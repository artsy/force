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
markdown = require '../../../components/util/markdown.coffee'


describe 'EOY route', ->

  beforeEach (done) ->
    sinon.stub Backbone, 'sync'
    @req = { params: {} }
    @res = { render: sinon.stub(), locals: { sd: {} }, redirect: sinon.stub() }
    @next = sinon.stub()
    done()

  afterEach (done) ->
    Backbone.sync.restore()
    done()

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

describe 'Gucci route', ->
  beforeEach ->
    sinon.stub Backbone, 'sync'
    Backbone.sync
      .onCall 0
      .yieldsTo 'success', { name: 'Artists For Gender Equality', sections: [{title: 'I. Present'}]}
    @res = { render: sinon.stub(), locals: { sd: {} }, redirect: sinon.stub() }
    @next = sinon.stub()
    routes.__set__ 'sd', {EF_GUCCI: '123'}

  afterEach (done) ->
    Backbone.sync.restore()
    done()

  it 'sets a curation', (done) ->
    @req = { params: { slug: 'past' } }
    routes.gucci(@req, @res, @next)
    _.defer => _.defer =>
      @res.render.args[0][0].should.equal 'components/gucci/templates/index'
      @res.render.args[0][1].curation.get('name').should.eql 'Artists For Gender Equality'
      done()

  it 'defaults to the first video', (done) ->
    @req = { params: { slug: 'blah' } }
    routes.gucci(@req, @res, @next)
    _.defer => _.defer =>
      @res.locals.sd.VIDEO_INDEX.should.eql 0
      done()

  it 'Sets a video index based on slug', (done) ->
    @req = { params: { slug: 'future' } }
    routes.gucci(@req, @res, @next)
    _.defer => _.defer =>
      @res.locals.sd.VIDEO_INDEX.should.eql 2
      done()

describe 'Venice route', ->

  beforeEach ->
    sinon.stub Backbone, 'sync'
    Backbone.sync
      .onCall 0
      .yieldsTo 'success', { name: 'Inside the Biennale', sections: [{slug: 'venice', title: 'venice'}, {slug: 'venice-2'}], sub_articles: ['123'] }
      .onCall 1
      .yieldsTo 'success', {title: 'Video Guide'}
      .onCall 2
      .yieldsTo 'success', [{title: 'Sub Article'}]
    @res = { render: sinon.stub(), locals: { sd: {} }, redirect: sinon.stub() }
    @next = sinon.stub()
    routes.__set__ 'sd', {EF_VENICE: '123', EF_VIDEO_GUIDE: '456'}
    routes.__set__ 'sailthru', sinon.stub()

  afterEach (done) ->
    Backbone.sync.restore()
    done()

  it 'sets a video index', (done) ->
    @req = { params: { slug: 'venice-2' } }
    routes.venice(@req, @res, @next)
    _.defer => _.defer =>
      @res.render.args[0][0].should.equal 'components/venice_2017/templates/index'
      @res.render.args[0][1].videoIndex.should.equal 1
      done()

  it 'defaults to the first video', (done) ->
    @req = { params: { slug: 'blah' } }
    routes.venice(@req, @res, @next)
    _.defer => _.defer =>
      @res.redirect.args[0].should.eql [ 301, '/venice-biennale/toward-venice' ]
      done()

  it 'sets a curation', (done) ->
    @req = { params: { slug: 'venice' } }
    routes.venice(@req, @res, @next)
    _.defer => _.defer =>
      @res.render.args[0][0].should.equal 'components/venice_2017/templates/index'
      @res.render.args[0][1].curation.get('name').should.eql 'Inside the Biennale'
      done()

  it 'sets the 360 video guide', (done) ->
    @req = { params: { slug: 'venice' } }
    routes.venice(@req, @res, @next)
    _.defer => _.defer =>
      @res.render.args[0][1].videoGuide.get('title').should.eql 'Video Guide'
      done()

  xit 'Fetches sub articles', (done) ->
    @req = { params: { slug: 'venice' } }
    routes.venice(@req, @res, @next)
    _.defer => _.defer =>
      @res.render.args[0][1].sub_articles.length.should.eql 1
      done()

  it 'renders json ld', (done) ->
    @req = { params: { slug: 'venice' } }
    routes.venice(@req, @res, @next)
    _.defer => _.defer =>
      @res.locals.jsonLD.should.containEql '"headline":"Inside the Biennale venice"'
      done()

  it 'includes sailthru', (done) ->
    @req = { params: { slug: 'venice' } }
    routes.venice(@req, @res, @next)
    _.defer => _.defer =>
      @res.locals.sd.INCLUDE_SAILTHRU.should.be.true()
      done()

describe 'Vanity route', ->

  beforeEach ->
    @res = { render: sinon.stub(), locals: { sd: {} }, redirect: sinon.stub() }
    @next = sinon.stub()
    routes.__set__ 'proxy',
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

describe 'SMS route', ->
  twilioConstructorArgs = null
  twilioSendSmsArgs = null
  send = null
  status = null
  json = null

  beforeEach ->
    @req = body: to: '+1 555 111 2222', message: 'Explore Venice in 360°: link'
    @res = send: send = sinon.stub(), json: json = sinon.stub(), status: status = sinon.stub()
    twilio = routes.__get__ 'twilio'
    twilio.RestClient = class TwilioClientStub
      constructor: -> twilioConstructorArgs = arguments
      sendSms: -> twilioSendSmsArgs = arguments
    routes.sendSMS @req, @res

  it 'sends a link with a valid phone number', ->
    twilioSendSmsArgs[0].to.should.equal '+15551112222'
    twilioSendSmsArgs[0].body.should.match 'Explore Venice in 360°: link'
    twilioSendSmsArgs[1] null, 'SUCCESS!'
    send.args[0][0].should.equal 201
    send.args[0][1].msg.should.containEql 'success'

  it 'throws an error if twilio doesnt like it', ->
    twilioSendSmsArgs[1] message: 'Error!'
    send.args[0][1].msg.should.equal 'Error!'
