_ = require 'underscore'
benv = require 'benv'
sinon = require 'sinon'
Backbone = require 'backbone'
{ resolve } = require 'path'
mediator = require '../../../lib/mediator.coffee'
{ stubChildClasses } = require '../../../test/helpers/stubs'

describe 'EditorialSignupView', ->

  beforeEach (done) ->
    benv.setup =>
      benv.expose $: benv.require('jquery'), jQuery: benv.require('jquery')
      $.fn.waypoint = sinon.stub()
      sinon.stub($, 'ajax')
      Backbone.$ = $
      $el = $('
        <div>
          <div id="modal-container"></div>
          <div id="main-layout-container"></div>
          <div class="article-es-header"></div>
          <div class="articles-feed-item"></div>
          <div class="articles-feed-item"></div>
          <div class="articles-feed-item"></div>
          <div class="articles-feed-item"></div>
          <div class="articles-feed-item"></div>
          <div class="articles-feed-item"></div>
        </div>')
      @EditorialSignupView = benv.requireWithJadeify resolve(__dirname, '../client/editorial_signup'), ['editorialSignupLushTemplate', 'editorialCTABannerTemplate']
      stubChildClasses @EditorialSignupView, this,
        ['CTABarView', 'splitTest']
        ['previouslyDismissed', 'render', 'transitionIn', 'transitionOut', 'close']
      @CTABarView::render.returns $el
      @CTABarView::previouslyDismissed.returns false
      sinon.stub(@EditorialSignupView::, 'fetchSignupImages').yields()
      sinon.stub @EditorialSignupView::, 'cycleImages'
      @EditorialSignupView.__set__ 'analyticsHooks', trigger: @trigger = sinon.stub()
      @view = new @EditorialSignupView el: $el
      done()

  afterEach ->
    $.ajax.restore()
    benv.teardown()

  describe '#setupAEMagazinePage', ->

    it 'renders a lush signup after the 6th article in the feed', ->
      @view.setupAEMagazinePage()
      $(@view.el).html().should.containEql 'Enter your email address'
      $(@view.el).html().should.containEql 'articles-es-cta'

    it 'opens a signup modal', ->
      @EditorialSignupView.__set__ 'sd',
        ARTICLE: null
        SUBSCRIBED_TO_EDITORIAL: false
        CURRENT_PATH: '/articles'
      @view.setupAEMagazinePage()
      $(@view.el).find('#modal-container').html().should.containEql 'articles-es-cta--banner modal'

    it 'doesnt show a modal for subscribed user', ->
      @EditorialSignupView.__set__ 'sd',
        ARTICLE: null
        SUBSCRIBED_TO_EDITORIAL: true
        CURRENT_PATH: '/articles'
      @view.setupAEMagazinePage()
      $(@view.el).find('#modal-container').html().should.not.containEql 'articles-es-cta--banner modal'

  describe '#eligibleToSignUp', ->

    it 'checks is not in editorial article or magazine', ->
      @EditorialSignupView.__set__ 'sd',
        ARTICLE: null
        SUBSCRIBED_TO_EDITORIAL: false
        CURRENT_PATH: ''
      @view.eligibleToSignUp().should.not.be.ok()

    it 'checks if in article or magazine', ->
      @EditorialSignupView.__set__ 'sd',
        ARTICLE: null
        SUBSCRIBED_TO_EDITORIAL: false
        CURRENT_PATH: '/articles'
      @view.eligibleToSignUp().should.be.ok()

    it 'checks if in article is in the editorial channel', ->
      @EditorialSignupView.__set__ 'sd',
        ARTICLE: channel_id: '333'
        ARTSY_EDITORIAL_CHANNEL: '123'
        SUBSCRIBED_TO_EDITORIAL: false
      @view.eligibleToSignUp().should.not.be.ok()

    it 'checks if the utm_source is sailthru', ->
      @EditorialSignupView.__set__ 'qs', parse: sinon.stub().returns utm_source: 'sailthru'
      @EditorialSignupView.__set__ 'sd',
        ARTICLE: channel_id: '333'
        SUBSCRIBED_TO_EDITORIAL: false
        ARTSY_EDITORIAL_CHANNEL: '333'
      @view.eligibleToSignUp().should.not.be.ok()

  describe '#showEditorialCTA', ->

    it 'displays modal', ->
      @EditorialSignupView.__set__ 'sd',
        ARTICLE: channel_id: '123'
        ARTSY_EDITORIAL_CHANNEL: '123'
        SUBSCRIBED_TO_EDITORIAL: false
        EDITORIAL_CTA_BANNER_IMG: 'img.jpg'
      @view.initialize({ isArticle: true })
      @view.$el.find('.articles-es-cta--banner').hasClass('modal').should.be.true()

  describe '#onSubscribe', ->

    it 'removes the form when successful', ->
      $.ajax.yieldsTo('success')
      @EditorialSignupView.__set__ 'sd',
        ARTICLE: channel_id: '123'
        ARTSY_EDITORIAL_CHANNEL: '123'
        SUBSCRIBED_TO_EDITORIAL: false
      @view.ctaBarView = {close: sinon.stub()}
      @view.onSubscribe({currentTarget: $('<div></div>')})
      @view.$el.find('.articles-es-cta--banner').length.should.equal 0

    it 'removes the loading spinner if there is an error', ->
      $.ajax.yieldsTo('error')
      @EditorialSignupView.__set__ 'sd',
        ARTICLE: channel_id: '123'
        ARTSY_EDITORIAL_CHANNEL: '123'
        SUBSCRIBED_TO_EDITORIAL: false
      $subscribe = $('<div></div>')
      @view.onSubscribe({currentTarget: $subscribe})
      $($subscribe).hasClass('loading-spinner').should.be.false()
