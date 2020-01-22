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
{ fabricate } = require '@artsy/antigravity'
{ stubChildClasses } = require '../../../test/helpers/stubs'

describe 'SuperArticleView', ->

  beforeEach ->
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
      $('body').html('<div class="article-sa-sticky-header"><div class="article-sa-sticky-related-container"></div></div><div class="article-content"></div>')

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

    it '#setupSuperArticle', ->
      @initCarousel.called.should.be.ok()

    it 'opens nav on mouseenter', ->
      @view.$stickyHeader.mouseenter()
      @view.$superArticleNavToc.hasClass('visible').should.be.true()

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
