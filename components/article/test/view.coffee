Q = require 'bluebird-q'
_ = require 'underscore'
benv = require 'benv'
sinon = require 'sinon'
Backbone = require 'backbone'
Article = require '../../../models/article'
Articles = require '../../../collections/articles'
CurrentUser = require '../../../models/current_user'
fixtures = require '../../../test/helpers/fixtures.coffee'
sd = require('sharify').data
{ resolve } = require 'path'
{ fabricate } = require 'antigravity'
{ stubChildClasses } = require '../../../test/helpers/stubs'

describe 'ArticleView', ->

  before (done) ->
    benv.setup =>
      benv.expose $: benv.require 'jquery'
      $.fn.imagesLoaded = sinon.stub()
      $.fn.waypoint = sinon.stub()
      Backbone.$ = $
      sd.SCROLL_ARTICLE = 'static'
      @ArticleView = benv.requireWithJadeify(
        resolve(__dirname, '../view')
        ['artworkItemTemplate', 'editTemplate', 'embedTemplate', 'calloutTemplate' ]
      )
      @ArticleView.__set__ 'imagesLoaded', sinon.stub()
      @ArticleView.__set__ 'Sticky', -> { add: sinon.stub() }
      @ArticleView.__set__ 'CurrentUser', fabricate 'user'
      stubChildClasses @ArticleView, this,
        ['initCarousel']
        []
      benv.render resolve(__dirname, '../templates/index.jade'), @locals = {
        footerArticles: new Backbone.Collection
        slideshowArtworks: null
        article: @article = new Article _.extend fixtures.article,
          author_id: '4d8cd73191a5c50ce210002a'
          sections: [
            { type: 'text', body: '<p><a class="is-follow-link">Damon Zucconi</a><a class="artist-follow" data-id="damon-zucconi"></a></p>' }
            {
              type: 'artworks',
              ids: ['5321b73dc9dc2458c4000196', '5321b71c275b24bcaa0001a5'],
              layout: 'overflow_fillwidth'
            }
            {
              type: 'embed',
              layout: 'overflow',
              url: 'http://files.artsy.net/data.pdf',
              height: ''
            }
            {
              type: 'callout',
              article: '123',
              text: '',
              title: ''
              hide_image: false
            }
          ]
        author: new Backbone.Model fabricate 'user'
        sd:
          SCROLL_ARTICLE: 'static'
        asset: (->)
        embedVideo: require('embed-video')
        moment: require('moment')
        resize: sinon.stub()
      }, =>
        done()

  after ->
    benv.teardown()

  beforeEach ->
    sinon.stub Backbone, 'sync'
    sinon.stub($, 'get').returns { html: '<iframe>Test</iframe>' }
    sinon.stub @ArticleView.prototype, 'initialize'
    @view = new @ArticleView
    @view.setElement $('body')
    @view.article = @article

  afterEach ->
    Backbone.sync.restore()
    $.get.restore()
    @ArticleView.prototype.initialize.restore()

  describe '#renderSlideshow', ->

    it 'renders the slideshow', ->
      @view.renderSlideshow()
      @initCarousel.called.should.be.ok()

  describe '#renderArtworks', ->

    it 'renders artworks from the article', ->
      Backbone.sync.restore()
      sinon.stub Backbone, 'sync'
      @view.renderArtworks(->)
      for arg in Backbone.sync.args
        arg[2].success fabricate 'artwork',
          title: 'Andy Foobar Flowers'
          _id: '5321b73dc9dc2458c4000196'
      @view.$el.html().should.containEql 'Andy Foobar Flowers'

    it 'does not render an artwork if unpublished', ->
      Backbone.sync.restore()
      sinon.stub Backbone, 'sync'
      @view.renderArtworks(->)
      for arg in Backbone.sync.args
        arg[2].error()
      @view.$('.article-section-artworks ul').html().length.should.equal 0

  describe '#checkEditable', ->

    it 'shows the edit button when the author_id matches user and the user has \
        partner access', ->
      @view.user = _.extend( fabricate('user') , { 'id' : '4d8cd73191a5c50ce210002a', has_partner_access: true } )
      @view.checkEditable()
      @view.renderedEditButton.should.be.ok()

  describe '#renderEmbedSections', ->

    it 'renders embedded content from the article', ->
      @view.renderEmbedSections()
      _.defer => _.defer =>
        @view.$('.article-section-embed').html().should.containEql '<iframe>Test</iframe>'

    it 'removes the loading spinner after loading', ->
      @view.renderEmbedSections()
      @view.$('.article-section-embed').html().should.not.containEql 'loading-spinner'

  describe '#renderCalloutSections', ->

    it 'renders callout content from the article', ->
      Backbone.sync.restore()
      sinon.stub Backbone, 'sync'
      Backbone.sync
        .onCall 0
        .yieldsTo 'success', article = fabricate 'article', { thumbnail_title: 'Callout title', id: '123'}
        .returns Q.resolve(article)
      @view.renderCalloutSections()
      _.defer =>
        @view.$('.article-section-callout-container').html().should.containEql 'Callout title'

  describe '#setupFollowButtons', ->

    it 'sets the list of artists in an article with ids', ->
      @view.setupFollowButtons()
      @view.artists[0].id.should.equal 'damon-zucconi'
