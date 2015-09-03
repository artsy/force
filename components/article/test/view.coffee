_ = require 'underscore'
benv = require 'benv'
sinon = require 'sinon'
Backbone = require 'backbone'
Article = require '../../../models/article'
Articles = require '../../../collections/articles'
CurrentUser = require '../../../models/current_user'
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
      @ArticleView = benv.requireWithJadeify(
        resolve(__dirname, '../view')
        ['artworkItemTemplate', 'editTemplate']
      )
      @ArticleView.__set__ 'CurrentUser', { orNull: ->
        new CurrentUser _.extend( fabricate('user') , { 'id' : '4d8cd73191a5c50ce210002a' } ) }
      @ArticleView.__set__ 'imagesLoaded', sinon.stub()
      stubChildClasses @ArticleView, this,
        ['initCarousel']
        []
      benv.render resolve(__dirname, '../templates/index.jade'), @locals = {
        footerArticles: new Backbone.Collection
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
    @view = new @ArticleView el: $('body'), article: @article

  afterEach ->
    Backbone.sync.restore()

  describe '#renderSlideshow', ->

    it 'renders the slideshow', ->
      @view.renderSlideshow()
      @initCarousel.called.should.be.ok()

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

    it 'does not render an artwork if unpublished', ->
      Backbone.sync.restore()
      sinon.stub Backbone, 'sync'
      @view.renderArtworks()
      for arg in Backbone.sync.args
        arg[2].error()
      @view.$('.article-section-artworks ul').html().length.should.equal 0

  describe '#checkEditable', ->

    it 'shows the edit button when the author_id matches user and the user has \
        partner access', ->
      @view.user.set has_partner_access: true
      @view.article.set author_id: @view.user.id
      @view.checkEditable()
      @view.renderedEditButton.should.be.ok()
