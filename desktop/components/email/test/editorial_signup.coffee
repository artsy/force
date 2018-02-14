_ = require 'underscore'
benv = require 'benv'
sinon = require 'sinon'
Backbone = require 'backbone'
{ resolve } = require 'path'
{ stubChildClasses } = require '../../../test/helpers/stubs'

describe 'EditorialSignupView', ->

  beforeEach (done) ->
    benv.setup =>
      benv.expose $: benv.require('jquery'), jQuery: benv.require('jquery')
      $.fn.waypoint = sinon.stub()
      sinon.stub($, 'ajax')
      Backbone.$ = $
      @clock = sinon.useFakeTimers()
      $el = $('
        <div>
          <div id="modal-container"></div>
          <div id="main-layout-container"></div>
          <div class="article-es-header"></div>
        </div>')
      @EditorialSignupView = benv.requireWithJadeify resolve(__dirname, '../client/editorial_signup'), ['editorialCTABannerTemplate']
      stubChildClasses @EditorialSignupView, this,
        ['CTABarView']
        ['previouslyDismissed', 'render', 'logDismissal', 'transitionIn', 'transitionOut', 'close']
      @CTABarView::render.returns $el
      @CTABarView::previouslyDismissed.returns false
      @EditorialSignupView.__set__ 'mediator',
        trigger: @mediatorTrigger = sinon.stub(),
        on: @mediatorOn = sinon.stub()
      @EditorialSignupView.__set__ 'analyticsHooks', trigger: @trigger = sinon.stub()
      @view = new @EditorialSignupView el: $el
      done()

  afterEach ->
    $.ajax.restore()
    @clock.restore()
    benv.teardown()

  describe '#setupAEMagazinePage', ->

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

    it 'checks if the utm_content starts with st-', ->
      @EditorialSignupView.__set__ 'qs', parse: sinon.stub().returns utm_content: 'st-lala'
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

    it 'reveals the popup after 2 seconds after scroll', ->
      @EditorialSignupView.__set__ 'sd',
        ARTICLE: channel_id: '123'
        ARTSY_EDITORIAL_CHANNEL: '123'
        SUBSCRIBED_TO_EDITORIAL: false
        EDITORIAL_SIGNUP_TEST: 'experiment'
      @view.initialize({ isArticle: true })
      $(window).scroll()
      @clock.tick(2000)
      @mediatorTrigger.args[0][0].should.equal 'open:auth'

  describe '#onSubscribe', ->

    it 'removes the form when successful', ->
      $.ajax.yieldsTo('success')
      @EditorialSignupView.__set__ 'sd',
        ARTICLE: channel_id: '123'
        ARTSY_EDITORIAL_CHANNEL: '123'
        SUBSCRIBED_TO_EDITORIAL: false
      @view.ctaBarView = {
        close: sinon.stub()
        logDismissal: sinon.stub()
      }
      @view.onSubscribe({currentTarget: $('<div></div>')})
      @view.$el.find('.articles-es-cta--banner').length.should.equal 0
      @view.ctaBarView.logDismissal.callCount.should.equal 1

    it 'removes the loading spinner if there is an error', ->
      $.ajax.yieldsTo('error')
      @EditorialSignupView.__set__ 'sd',
        ARTICLE: channel_id: '123'
        ARTSY_EDITORIAL_CHANNEL: '123'
        SUBSCRIBED_TO_EDITORIAL: false
      $subscribe = $('<div></div>')
      @view.onSubscribe({currentTarget: $subscribe})
      $($subscribe).hasClass('loading-spinner').should.be.false()

  describe '#revealArticlePopup', ->
    it 'tracks a view if AB test', ->
      @view.isABTest = true
      @view.revealArticlePopup()
      @splitTestView.callCount.should.equal 1

    it 'opens the user signup modal if desktop', ->
      @EditorialSignupView.__set__ 'sd',
        IS_MOBILE: false
      @view.revealArticlePopup()
      @mediatorTrigger.args[0][0].should.equal 'open:auth'

    it 'shows the editorial signup if modal', ->
      @EditorialSignupView.__set__ 'sd',
        IS_MOBILE: true
      @view.initialize({ isArticle: true })
      @view.revealArticlePopup()
      @mediatorTrigger.callCount.should.equal 0
      @view.$el.find('.articles-es-cta--banner').css('opacity').should.equal '1'
