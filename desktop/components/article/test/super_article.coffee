Q = require 'bluebird-q'
_ = require 'underscore'
benv = require 'benv'
sinon = require 'sinon'
Backbone = require 'backbone'
Article = require '../../../models/article'
Articles = require '../../../collections/articles'
CurrentUser = require '../../../models/current_user'
fixtures = require '../../../test/helpers/fixtures'
sd = require('sharify').data
{ resolve } = require 'path'
{ fabricate } = require 'antigravity'
{ stubChildClasses } = require '../../../test/helpers/stubs'

describe 'SuperArticleView', ->

  beforeEach (done) ->
    benv.setup =>
      benv.expose $: benv.require('jquery'), jQuery: benv.require('jquery')
      window.resize = ->
      $.fn.waypoint = sinon.stub()
      Backbone.$ = $
      @ArticleView = benv.requireWithJadeify(
        resolve(__dirname, '../client/super_article'), []
      )
      stubChildClasses @ArticleView, this,
        ['initCarousel']
        []
      benv.render resolve(__dirname, '../templates/index.jade'), @locals = {
        footerArticles: new Backbone.Collection
        slideshowArtworks: null
        article: @article = new Article _.extend {}, fixtures.article,
          author_id: '4d8cd73191a5c50ce210002a'
          sections: []
          super_article: new Article fixtures.article
        superArticle: new Article fixtures.article
        superSubArticles: new Articles [fixtures.article]
        author: new Backbone.Model fabricate 'user'
        asset: (->)
        sd: APP_URL: 'http://artsy.net'
        embed: require('particle')
        moment: require('moment')
        crop: ->
        resize: sinon.stub()
      }, =>
        done()

  afterEach ->
    benv.teardown()

  describe 'on mobile screen', ->

    beforeEach ->
      window.matchMedia = sinon.stub().returns { matches: true }
      sinon.stub Backbone, 'sync'
      @view = new @ArticleView
        article: @article
      @view.setElement $('body')
      @view.article = @article

    afterEach ->
      Backbone.sync.restore()

    xit 'sets defaults and caches selectors', ->
      @view.$content.selector.should.equal '.article-content'

    it '#setupSuperArticle', ->
      @initCarousel.called.should.not.be.ok()
      @view.$superArticleNavToc.html().should.containEql 'Back to the Magazine Homepage'

    it '#toggleHamburgerNav', ->
      @view.toggleHamburgerNav()
      @view.$body.hasClass('is-open').should.be.true()

  describe 'on wide screen', ->

    beforeEach ->
      window.matchMedia = sinon.stub().returns { matches: false }
      sinon.stub Backbone, 'sync'
      @view = new @ArticleView
        article: @article
      @view.setElement $('body')
      @view.article = @article

    afterEach ->
      Backbone.sync.restore()

    xit 'sets defaults and caches selectors', ->
      @view.$content.selector.should.equal '.article-content'

    it '#setupSuperArticle', ->
      @initCarousel.called.should.be.ok()

    it 'opens nav on mouseenter', ->
      @view.$stickyHeader.mouseenter()
      @view.$superArticleNavToc.hasClass 'visible'

    it 'closes nav on mouseleave', ->
      @view.$stickyHeader.hover()
      @view.$superArticleNavToc.hasClass('visible').should.be.false()

    it 'hides the nav on scroll', ->
      @view.$superArticleNavToc.addClass 'visible'
      @view.$window.scroll()
      @view.$superArticleNavToc.hasClass('visible').should.be.false()

    it '#setWaypoints', ->
      $.fn.waypoint.args[0][0]('down')
      @view.$stickyHeader.hasClass('visible').should.be.true()
