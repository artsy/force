_ = require 'underscore'
benv = require 'benv'
sinon = require 'sinon'
Backbone = require 'backbone'
Article = require '../../../models/article'
Articles = require '../../../collections/articles'
fixtures = require '../../../test/helpers/fixtures.coffee'
sd = require('sharify').data
{ resolve } = require 'path'
{ fabricate } = require '@artsy/antigravity'
{ stubChildClasses } = require '../../../test/helpers/stubs'
embed = require 'particle'

xdescribe 'ArticleView', ->

  before ->
    benv.setup =>
      benv.expose
        $: benv.require('jquery')
        jQuery: benv.require('jquery')
        _s: benv.require('underscore.string')
      Backbone.$ = $
      $.fn.imagesLoaded = sinon.stub()
      $.fn.waypoint = sinon.stub()
      $.fn.fillwidthLite = sinon.stub().yieldsTo('done', [{ $el: $('img') }])
      @ArticleView = benv.requireWithJadeify(
        resolve(__dirname, '../client/view')
        ['editTemplate' ]
      )
      stubChildClasses @ArticleView, this,
        ['initCarousel']
        []
      @ArticleView.__set__ 'imagesLoaded', sinon.stub()
      @ArticleView.__set__ 'Sticky', -> { add: sinon.stub() }
      @locals = {
        footerArticles: new Backbone.Collection
        slideshowArtworks: null
        article: @article = new Article _.extend {}, fixtures.article,
          author_id: '4d8cd73191a5c50ce210002a'
          sections: [
            { type: 'text', body: '<p><a class="is-follow-link">Damon Zucconi</a><a class="artist-follow" data-id="damon-zucconi"></a></p>' }
            {
              type: "image_set",
              images: [
                {
                  type: 'image',
                  url: 'https://image.png',
                  caption: 'Trademarked'
                }
              ]
            },
            {
              type: "image",
              url: 'https://image2.png',
              caption: 'Trademarked 2',
              layout: 'column_width'
            },
            {
              type: "image_collection",
              layout: 'overflow_fillwidth',
              images: [
                {
                  type: 'image',
                  url: 'https://image.png',
                  caption: 'Trademarked',
                },
                {
                  type: 'artwork'
                  id: '5321b73dc9dc2458c4000196'
                  slug: "govinda-sah-azad-in-between-1",
                  date: "2015",
                  title: "In Between",
                  image: "https://d32dm0rphc51dk.cloudfront.net/zjr8iMxGUQAVU83wi_oXaQ/larger.jpg",
                  partner: {
                    name: "October Gallery",
                    slug: "october-gallery"
                  },
                  artists: [{
                    name: "Govinda Sah 'Azad'",
                    slug: "govinda-sah-azad"
                  }]
                }
              ]
            }
          ]
        author: new Backbone.Model fabricate 'user'
        sd:
          SCROLL_ARTICLE: 'static'
        asset: (->)
        embed: embed
        moment: sinon.stub()
        resize: sinon.stub()
        crop: sinon.stub()
        _s: _s
      }

  after ->
    benv.teardown()

  beforeEach (done) ->
    sinon.stub Backbone, 'sync'
    @fillwidth = sinon.spy(@ArticleView::, 'fillwidth')
    @imgsFillContainer = sinon.spy(@ArticleView::, 'imgsFillContainer')
    @setupMaxImageHeights = sinon.spy(@ArticleView::, 'setupMaxImageHeights')
    @resetImageSetPreview = sinon.spy(@ArticleView::, 'resetImageSetPreview')
    benv.render resolve(__dirname, '../templates/index.jade'), @locals, =>
      @view = new @ArticleView
        el: $('body')
        article: @article
        _s: _s
      done()

  afterEach ->
    Backbone.sync.restore()
    @fillwidth.restore()
    @imgsFillContainer.restore()
    @setupMaxImageHeights.restore()
    @resetImageSetPreview.restore()

  describe '#renderSlideshow', ->

    it 'renders the slideshow', ->
      @view.renderSlideshow()
      @initCarousel.called.should.be.ok()

  describe '#resizeImages', ->

    it 'fillwidth is called on each image section', ->
      @view.resizeImages()
      _.defer =>
        @fillwidth.callCount.should.be above 1

  describe '#checkEditable', ->

    it 'shows the edit button when the author_id matches user and the user has \
        partner access', ->
      @view.user = _.extend( fabricate('user') , { 'id' : '4d8cd73191a5c50ce210002a', has_partner_access: true } )
      @view.checkEditable()
      @view.renderedEditButton.should.be.ok()

  describe '#setupFollowButtons', ->

    it 'sets the list of artists in an article with ids', ->
      @view.setupFollowButtons()
      @view.artists[0].id.should.equal 'damon-zucconi'

  describe '#refreshWindowSize', ->

    it 'resets image sizes for imageset previews', ->
      @resetImageSetPreview.callCount.should.equal 1

    it 'calls fillwidth on images', ->
      @view.refreshWindowSize()
      @fillwidth.callCount.should.equal 1

    it 'calls setupMaxImageHeights on single images', ->
      @view.refreshWindowSize()
      @setupMaxImageHeights.callCount.should.equal 1

  describe '#resetImageSetPreview', ->

    it 'on large screens, images are full height', ->
      @view.windowWidth = 900
      @view.resetImageSetPreview()
      @view.$('.article-section-image-set__image-container').height().should.equal 150

    it 'on small screens, resets image sizes for imageset previews', ->
      @view.windowWidth = 600
      @imgsFillContainer.callCount.should.equal 1

  describe '#imgsFillContainer', ->
    it 'returns true if images are narrower than their container', ->
      container = @view.$('.article-section-artworks ul').width(1400)
      imgsFillContainer = @view.imgsFillContainer([{width: 600}, {width:700}], container, 5)
      imgsFillContainer.isFilled.should.equal true
