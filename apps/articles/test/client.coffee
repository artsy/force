_ = require 'underscore'
benv = require 'benv'
sinon = require 'sinon'
Backbone = require 'backbone'
Article = require '../../../models/article'
Articles = require '../../../collections/articles'
fixtures = require '../../../test/helpers/fixtures.coffee'
{ resolve } = require 'path'
{ fabricate } = require 'antigravity'
{ stubChildClasses } = require '../../../test/helpers/stubs'

describe 'ArticleView', ->

  before (done) ->
    benv.setup =>
      benv.expose $: benv.require 'jquery'
      $.fn.imagesLoaded = sinon.stub()
      Backbone.$ = $
      { @ArticleView } = mod = benv.requireWithJadeify(
        resolve(__dirname, '../client/show')
        ['artworkItemTemplate']
      )
      mod.__set__ 'imagesLoaded', sinon.stub()
      stubChildClasses mod, this,
        ['CarouselView']
        ['postRender', 'render']
      benv.render resolve(__dirname, '../templates/show.jade'), @locals = {
        footerArticles: []
        slideshowArtworks: null
        article: @article = new Article _.extend fixtures.article,
          sections: [
            { type: 'text', body: 'Foo' }
            {
              type: 'artworks',
              ids: ['5321b73dc9dc2458c4000196', '5321b71c275b24bcaa0001a5'],
              layout: 'overflow_fillwidth'
            }
        ]
        author: new Backbone.Model fabricate 'user'
        sd: {}
        embedVideo: require('embed-video')
        moment: require('moment')
        resize: sinon.stub()
      }, =>
        done()

  after ->
    benv.teardown()

  beforeEach ->
    sinon.stub Backbone, 'sync'
    @view = new @ArticleView el: $('body'), article: @article

  afterEach ->
    Backbone.sync.restore()

  describe '#renderSlideshow', ->

    it 'renders the slideshow', ->
      @view.renderSlideshow()
      @CarouselView.called.should.be.ok

  describe '#renderArtworks', ->

    it 'renders artworks from the article', ->
      Backbone.sync.restore()
      sinon.stub Backbone, 'sync'
      @view.renderArtworks()
      for arg in Backbone.sync.args
        arg[2].success fabricate 'artwork',
          title: 'Andy Foobar Flowers'
          _id: '5321b73dc9dc2458c4000196'
      @view.$el.html().should.containEql 'Andy Foobar Flowers'

describe 'MagazineView', ->

  before (done) ->
    benv.setup =>
      benv.expose $: benv.require 'jquery'
      Backbone.$ = $
      { @MagazineView } = mod = benv.requireWithJadeify(
        resolve(__dirname, '../client/magazine')
        ['feedTemplate']
      )
      benv.render resolve(__dirname, '../templates/magazine.jade'), @locals = {
        articlesFeed: []
        featuredArticles: []
        sd: {}
        moment: require('moment')
        resize: sinon.stub()
      }, =>
        done()

  after ->
    benv.teardown()

  beforeEach ->
    sinon.stub Backbone, 'sync'
    @view = new @MagazineView el: $('body'), articles: new Articles

  afterEach ->
    Backbone.sync.restore()

  describe '#renderArticles', ->

    it 'renders the feed of articles', ->
      @view.articles.set [fixtures.article, _.extend
        fixtures.article, thumbnail_title: "Moo"]
      @view.renderArticles()
      @view.$el.html().should.containEql 'Moo'

  describe '#moreArticles', ->

    it 'fetches the next page of articles', ->
      @view.moreArticles()
      Backbone.sync.args[0][2].data.offset.should.equal 50
      @view.moreArticles()
      Backbone.sync.args[1][2].data.offset.should.equal 100
