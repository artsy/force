_ = require 'underscore'
benv = require 'benv'
Backbone = require 'backbone'
sinon = require 'sinon'
path = require 'path'
{ fabricate } = require '@artsy/antigravity'
Articles = require '../../../../collections/articles'
Article = require '../../../../models/article'
fixtures = require '../../../../test/helpers/fixtures'
request = require 'superagent'

describe 'MagazineView', ->

  beforeEach (done) ->
    benv.setup =>
      benv.expose
        $: benv.require 'jquery'
        sd: ARTSY_EDITORIAL_CHANNEL: '123'
      Backbone.$ = $
      $.onInfiniteScroll = sinon.stub()
      $.fn.error = sinon.stub()
      sinon.stub request, 'post'
        .returns
          send: sinon.stub().returns
            end: sinon.stub().yields(null, body: data: articles: @articles)

      @articles = [
        {
          "slug": "artsy-editorial-contemporary-istanbul-tests-turkish-market-rocked-by-terrorism-and-coup-attempt",
          "thumbnail_title": "Contemporary Istanbul Tests Turkish Market Rocked by Terrorism and Coup Attempt",
          "thumbnail_image": "https://artsy-media-uploads.s3.amazonaws.com/8mgvDzCBMloFC6Ee6snHTg%2F9h3a2807_46634.jpg",
          "tier": 1,
          "published_at": "Fri Oct 28 2016 20:14:10 GMT+0000 (UTC)",
          "channel_id": "5759e3efb5989e6f98f77993",
          "author": {
            "name": "Artsy Editorial"
          },
          "contributing_authors": [
            {
              "name": "Isaac Kaplan"
            }
          ]
        },
        {
          "slug": "artsy-editorial-american-couple-donates-380-million-collection-to-musee-d-orsay-and-the-9-other-biggest-news-stories-this-week",
          "thumbnail_title": "American Couple Donates $380 Million Collection to Musée d’Orsay—and the 9 Other Biggest News Stories This Week",
          "thumbnail_image": "https://artsy-media-uploads.s3.amazonaws.com/jc8HvTWVMJdvLmeW6e5iwg%2F2985973992_fcc2d924f3_o.jpg",
          "tier": 1,
          "published_at": "Fri Oct 28 2016 18:16:15 GMT+0000 (UTC)",
          "channel_id": "5759e3efb5989e6f98f77993",
          "author": {
            "name": "Artsy Editorial"
          },
          "contributing_authors": []
        },
        {
          "slug": "artsy-editorial-the-mumbai-jeweler-who-amassed-the-world-s-largest-camera-collection",
          "thumbnail_title": "The Mumbai Jeweler Who Amassed the World’s Largest Camera Collection",
          "thumbnail_image": "https://artsy-media-uploads.s3.amazonaws.com/pK14REBIusHqvlycE695fQ%2FA+%282%29.jpg",
          "tier": 1,
          "published_at": "Fri Oct 28 2016 16:50:00 GMT+0000 (UTC)",
          "channel_id": "5759e3efb5989e6f98f77993",
          "author": {
            "name": "Artsy Editorial"
          },
          "contributing_authors": [
            {
              "name": "Himali Singh Soin"
            }
          ]
        }
      ]
      benv.render path.resolve(__dirname, '../../templates/articles.jade'),
        sd: {}
        asset: (->)
        articles: @articles
        crop: ->
        toSentence: ->
        pluck: ->
      , =>
        filename = path.resolve(__dirname, '../../client/articles.coffee')
        { MagazineView } = module = benv.requireWithJadeify filename, ['articleTemplate']

        @view = new MagazineView
          el: $ 'body'
          collection: @articles
          offset: 0
        done()

  afterEach ->
    request.post.restore()
    benv.teardown()

  describe '#initialize', ->

    it 'offset should be zero', ->
      @view.offset.should.equal 0

    it 'renders articles', ->
      $('.article-item').length.should.equal 3

    it 'sets up infinite scroll on click', (done) ->
      $('.is-show-more-button').click()
      _.defer ->
        $('.is-show-more-button').hasClass('is-hidden').should.be.true()
        done()

  describe '#onInfiniteScroll', ->

    it 'fetches more articles', ->
      @view.onInfiniteScroll()
      request.post.callCount.should.equal 1
      $('.article-item').length.should.equal 6

    it 'sets a finishedScrolling flag if there are no articles', ->
      request.post.restore()
      sinon.stub request, 'post'
        .returns
          send: sinon.stub().returns
            end: sinon.stub().yields(null, body: data: null)
      @view.onInfiniteScroll()
      @view.finishedScrolling.should.be.true()

    it 'returns if there are no more articles to fetch', ->
      @view.finishedScrolling = true
      @view.onInfiniteScroll()
      request.post.callCount.should.equal 0
