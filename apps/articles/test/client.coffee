_ = require 'underscore'
benv = require 'benv'
sinon = require 'sinon'
Backbone = require 'backbone'
Article = require '../../../models/article'
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
        ['artworkItemTemplate', 'carouselTemplate']
      )
      stubChildClasses mod, this,
        ['CarouselView', 'FillwidthView']
        ['postRender', 'render', 'hideSecondRow']
      benv.render resolve(__dirname, '../templates/show.jade'), @locals = {
        footerArticles: []
        article: @article = new Article fixtures.article
        author: new Backbone.Model fabricate 'user'
        sd: {}
        embedVideo: require('embed-video')
        moment: require('moment')
      }, =>
        done()

  after ->
    benv.teardown()

  beforeEach ->
    sinon.stub Backbone, 'sync'
    @view = new @ArticleView el: $('body'), article: @article

  afterEach ->
    Backbone.sync.restore()

  describe '#setupSlideshow', ->

    beforeEach ->
      artworks = [
        fabricate 'artwork',
          title: 'Foo on the Bar', _id: '54276766fd4f50996aeca2b8'
        fabricate 'artwork',
          title: 'Moo on the Baz', _id: '54276766fd4f50996aeca2bz'
      ]
      @view.article.slideshowArtworks.set artworks
      @view.setupSlideshow()
      arg[2].success(artworks[i]) for arg, i in Backbone.sync.args

    it 'renders the articles artworks', ->
      @view.$('#articles-slideshow-inner').html()
        .should.containEql 'Foo on the Bar'

    it 'adds a carousel view', ->
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

    xit 'adds fillwidth if theres fillwidth sections', (done) ->
      sections = [{
        type: 'artworks'
        layout: 'overflow_fillwidth'
        ids: ['5321b73dc9dc2458c4000196']
      }]
      Backbone.sync.restore()
      sinon.stub Backbone, 'sync'
      @locals.article.set sections: sections
      @view.article.set sections: sections
      benv.render resolve(__dirname, '../templates/show.jade'), @locals, =>
        @view.renderArtworks()
        Backbone.sync.args[0][2].success fabricate 'artwork',
          title: 'Andy Foobar Flowers'
          _id: '5321b73dc9dc2458c4000196'
        @FillwidthView.called.should.be.ok
