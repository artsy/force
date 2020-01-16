_ = require 'underscore'
benv = require 'benv'
sinon = require 'sinon'
Backbone = require 'backbone'
Article = require '../../../models/article'
Articles = require '../../../collections/articles'
sd = require('sharify').data
{ resolve } = require 'path'
{ fabricate } = require '@artsy/antigravity'

describe 'ArticleView', ->

  beforeEach (done) ->
    benv.setup =>
      benv.expose
        $: benv.require 'jquery'
        Element: window.Element
      # benv bug that doesn't attach globals to window
      Backbone.$ = $
      @article = fabricate 'article',
        sections: [
          {
            type: 'video'
            url: 'http://youtube.com'
            caption: 'caption'
            cover_image_url: 'http://artsy.net/cover_image_url.jpg'
            layout: 'full-width'
            background_color: 'black'
          }
        ]
        contributing_authors: []
        section_ids: []

      benv.render resolve(__dirname, '../templates/index.jade'), {
        article: new Article @article
        asset: (->)
        sd: {}
        resize: ->
        crop: ->
        embed: sinon.stub().returns '<iframe>Test-video</iframe>'
        footerArticles: new Backbone.Collection
        superArticle: new Article { super_article: {} }
        relatedArticles: new Articles
      }, =>
        @ArticleView = benv.requireWithJadeify(
          resolve(__dirname, '../client/view'),
          []
        )
        sinon.stub Backbone, 'sync'
        done()

  afterEach ->
    benv.teardown()
    Backbone.sync.restore()

  describe '#clickPlay', ->

    it 'replaces iFrame with an autoplay attribute', ->
      @view = new @ArticleView el: $('body')
      $('.article-video-play-button').click()
      $('.article-section-video iframe').attr('src').should.containEql('autoplay=1')
