_ = require 'underscore'
Backbone = require 'backbone'
sinon = require 'sinon'
Partner = require '../../../../models/partner.coffee'
Profile = require '../../../../models/profile.coffee'
Articles = require '../../../../collections/articles.coffee'
benv = require 'benv'
{ resolve } = require 'path'
{ fabricate } = require '@artsy/antigravity'
fixtures = require '../../../../test/helpers/fixtures.coffee'

describe 'ArticlesAdapter', ->

  beforeEach (done) ->
    benv.setup =>
      benv.expose
        $: benv.require 'jquery'
        _s: benv.require 'underscore.string'
        sd: ARTSY_EDITORIAL_CHANNEL: '123'
        location.replace = sinon.stub()
      $.fn.imagesLoaded = sinon.stub()
      $.fn.waypoint = sinon.stub()
      $.fn.fillwidthLite = sinon.stub()
      @ArticlesAdapter = benv.requireWithJadeify(
        (resolve __dirname, '../../client/articles'), ['articleTemplate', 'jsonldTemplate']
      )
      @ArticlesGridView = benv.requireWithJadeify(
        (resolve __dirname, '../../../../components/articles_grid/view'), ['template', 'button', 'figure', 'empty']
      )
      @ArticleView = benv.requireWithJadeify(
        (resolve __dirname, '../../../../components/article/client/view'), ['editTemplate']
      )
      @ArticleView.__set__ 'initCarousel', sinon.stub()
      sinon.stub @ArticleView::, 'fillwidth'
      @ArticlesAdapter.__set__ 'ArticlesGridView', @ArticlesGridView
      @ArticlesAdapter.__set__ 'ArticleView', @ArticleView
      Backbone.$ = $
      sinon.stub Backbone, 'sync'
      benv.render resolve(__dirname, '../../templates/index.jade'), {
        profile: new Profile fabricate 'partner_profile'
        sd: { PROFILE: fabricate 'partner_profile' }
        asset: (->)
        params: {}
      }, ->
        done()

  afterEach ->
    Backbone.sync.restore()
    benv.teardown()

  describe '#constructor', ->

    beforeEach ->
      @renderArticlesGrid = sinon.stub @ArticlesAdapter.prototype, 'renderArticlesGrid'
      @renderArticle = sinon.stub @ArticlesAdapter.prototype, 'renderArticle'

    afterEach ->
      @renderArticlesGrid.restore()
      @renderArticle.restore()

    it 'calls #renderArticlesGrid if /articles', ->
      sinon.stub(@ArticlesAdapter.prototype, 'isArticle').returns false
      view = new @ArticlesAdapter
        profile: new Profile fabricate 'partner_profile'
        partner: new Partner fabricate 'partner'
        cache: {}
        el: $('body')
      @renderArticlesGrid.callCount.should.equal 1
      @renderArticle.callCount.should.equal 0
      @ArticlesAdapter.prototype.isArticle.restore()

    it 'calls #renderArticle if /article/', ->
      sinon.stub(@ArticlesAdapter.prototype, 'isArticle').returns true
      view = new @ArticlesAdapter
        profile: new Profile fabricate 'partner_profile'
        partner: new Partner fabricate 'partner'
        cache: {}
        el: $('body')
      @renderArticlesGrid.callCount.should.equal 0
      @renderArticle.callCount.should.equal 1
      @ArticlesAdapter.prototype.isArticle.restore()

  describe '#renderArticlesGrid', ->

    beforeEach ->
      sinon.stub(@ArticlesAdapter.prototype, 'isArticle').returns false
      @view = new @ArticlesAdapter
        profile: new Profile fabricate 'partner_profile'
        partner: new Partner fabricate 'partner'
        cache: {}
        el: $('body')

    afterEach ->
      @ArticlesAdapter.prototype.isArticle.restore()

    it 'renders a loading spinner', ->
      @view.el.html().should.containEql 'loading-spinner'

    it 'removes the loading spinner when articles have loaded', ->
      @view.collection.add fabricate 'article'
      @view.collection.trigger 'sync'
      @view.el.html().should.not.containEql 'loading-spinner'

    it 'renders a grid of articles', ->
      @view.collection.add fabricate 'article'
      @view.collection.trigger 'sync'
      @view.el.html().should.containEql 'On The Heels of A Stellar Year in the West'
      @view.el.html().should.containEql 'Artsy Editorial'

  describe '#renderArticle', ->
    # FIXME: Error: Syntax error,
    # unrecognized expression: .article-container[data-id=0.016085399075416174] .article-content
    beforeEach ->
      sinon.stub(@ArticlesAdapter.prototype, 'isArticle').returns true
      @view = new @ArticlesAdapter
        profile: new Profile fabricate 'partner_profile'
        partner: new Partner fabricate 'partner'
        cache: {}
        el: $('body')

    afterEach ->
      @ArticlesAdapter.prototype.isArticle.restore()

    xit 'redirects to the partner overview if the article is not found', ->
      Backbone.sync.args[0][2].error()
      window.location.replace.called.should.be.true()
      window.location.replace.args[0][0].should.equal '/gagosian'

    xit 'displays an article', ->
      Backbone.sync.args[0][2].success fixtures.article
      @view.el.html().should.containEql 'Just before the lines start forming'
      @view.el.html().should.containEql 'article-container'

    xit 'shows a header, and omits the More button', ->
      Backbone.sync.args[0][2].success fixtures.article
      @view.collection.add fabricate 'article'
      @view.collection.trigger 'sync'
      @view.el.html().should.containEql 'More From Gagosian Gallery'
      @view.el.html().should.not.containEql 'articles-grid__more-button'

    xit 'renders the json-ld', ->
      article = _.extend {}, fixtures.article,
        channel_id: null
        partner_channel_id: '123'
      Backbone.sync.args[0][2].success article
      html = @view.el.html()
      html.should.containEql 'json-ld'
      html.should.containEql 'Partner'
