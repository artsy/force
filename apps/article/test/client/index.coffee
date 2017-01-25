_ = require 'underscore'
benv = require 'benv'
sinon = require 'sinon'
Backbone = require 'backbone'
{ resolve } = require 'path'
fixtures = require '../../../../test/helpers/fixtures'
{ fabricate } = require 'antigravity'
Article = require '../../../../models/article.coffee'
Channel = require '../../../../models/channel.coffee'
Articles = require '../../../../collections/articles.coffee'
{ crop, resize } = require '../../../../components/resizer'
sd = require('sharify').data
moment = require 'moment'

describe 'ArticleIndexView', ->

  before (done) ->
    benv.setup =>
      benv.expose $: benv.require('jquery'), jQuery: benv.require('jquery')
      Backbone.$ = $
      @model = new Article _.extend fixtures.article,
        sections: [
          { type: 'text', body: 'Foo' }
          {
            type: 'artworks',
            ids: ['5321b73dc9dc2458c4000196', '5321b71c275b24bcaa0001a5'],
            layout: 'overflow_fillwidth'
            artworks: []
          }
        ]
      @channel = new Channel _.extend fixtures.channel,
        type: 'team'
      @options = {
        sd: _.extend sd, {
          PC_ARTSY_CHANNEL: '5086df098523e60002000013'
          PC_AUCTION_CHANNEL: '5086df098523e60002000012'
          ARTICLE: @model.attributes
          SUPER_SUB_ARTICLES: []
          ARTICLE_CHANNEL: @channel
        }
        resize: resize
        crop: crop
        article: @model
        moment: moment
        asset: ->
      }
      $.onInfiniteScroll = sinon.stub()
      $.fn.waypoint = sinon.stub()
      sinon.stub Backbone, 'sync'
      @ArticleIndexView = benv.requireWithJadeify resolve(__dirname, '../../client/index'), ['articleTemplate', 'promotedTemplate']
      @ArticleIndexView.__set__ 'ArticleView', sinon.stub()
      @ArticleIndexView.__set__ 'ArticlesGridView', @ArticlesGridView = sinon.stub()
      @ArticleIndexView.__set__ 'TeamChannelNavView', @TeamChannelNavView = sinon.stub()
      done()

  after ->
    benv.teardown()
    Backbone.sync.restore()

  describe '#initialize static articles', ->

    before (done) ->
      @options.sd.SCROLL_ARTICLE = 'static'
      benv.render resolve(__dirname, '../../templates/article.jade'), @options, =>
        @view = new @ArticleIndexView
          el: $('body')
        done()

    it 'calls renders a grid view with appropriate arguments', ->
      @ArticlesGridView.args[0][0].header.should.equal 'More from Artsy'
      @ArticlesGridView.args[0][0].hideMore.should.be.true()
      @ArticlesGridView.args[0][0].el.selector.should.equal '#articles-footer'

    it 'does not display promoted content banner for non-promoted', ->
      $('.articles-promoted').length.should.equal 0

    it 'sets up the TeamChannelNavView', ->
      @view.channel = @channel
      @view.setupTeamChannel()
      @TeamChannelNavView.args[0][0].$content.selector.should.containEql '.article-content'
      @TeamChannelNavView.args[0][0].offset.should.equal 0

  describe '#initialize infinite scroll articles', ->

    before (done) ->
      @options.sd.SCROLL_ARTICLE = 'infinite'
      @ArticlesGridView.reset()
      benv.render resolve(__dirname, '../../templates/article.jade'), _.extend(@options, {
        sd: sd
      }), =>
        @ArticleIndexView.__set__ 'ArticleView', sinon.stub()
        @view = new @ArticleIndexView
          el: $('body')
        done()

    it 'renders the template with footer', ->
      $('#articles-footer').text().should.not.containEql 'What to Read Next'

    it '#nextPage should set offset', ->
      @view.nextPage()
      @view.params.get('offset').should.equal 0
      @view.nextPage()
      @view.params.get('offset').should.equal 5

    it 'excludes super articles', ->
      @view.params.get('is_super_article').should.be.false()

    it 'renders the next page on #render', ->
      articles = [_.extend fixtures.article, { id: '343', sections: [{ type: 'text', body: 'FooLa' }] } ]
      @view.render(@view.collection, results: articles )
      $('.article-container').length.should.equal 2

    it 'does not display promoted content banner for non-promoted', ->
      $('.articles-promoted').length.should.equal 0

    it 'does not try to render a grid view', ->
      @ArticlesGridView.called.should.be.false()

  describe 'promoted content gallery', ->

    before (done) ->
      @options.sd.PC_ARTSY_CHANNEL = '5086df098523e60002000011'
      benv.render resolve(__dirname, '../../templates/article.jade'), @options, =>
        @view = new @ArticleIndexView
          el: $('body')
        done()

    it 'displays promoted content banner for partner', ->
      Backbone.sync.args[3][2].success fabricate 'partner'
      Backbone.sync.args[4][2].success fabricate 'partner_profile'
      $('.articles-promoted__img').attr('src').should.equal '/images/missing_image.png'
      $('.articles-promoted__name').text().should.equal 'Gagosian Gallery'
      $('.articles-promoted__explore-button').text().should.equal 'Explore Institution'
      $('.articles-promoted__explore').attr('href').should.equal '/getty'

  describe 'promoted content auction', ->

    before (done) ->
      @options.sd.PC_AUCTION_CHANNEL = '5086df098523e60002000011'
      @options.sd.PC_ARTSY_CHANNEL = '5086df098523e60002000012'
      benv.render resolve(__dirname, '../../templates/article.jade'), @options, =>
        @view = new @ArticleIndexView
          el: $('body')
        done()

    it 'displays promoted content banner for auction', ->
      Backbone.sync.args[5][2].success fabricate 'sale'
      $('.articles-promoted__img').attr('src').should.equal 'https://i.embed.ly/1/display/crop?url=%2Fimages%2Fmissing_image.png&width=250&height=165&quality=95'
      $('.articles-promoted__name').text().should.equal 'Whitney Art Party'
      $('.articles-promoted__explore-button').text().should.equal 'Explore Auction'
      $('.articles-promoted__explore').attr('href').should.equal '/sale/whtney-art-party'
