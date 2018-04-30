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
      @$el = $('
        <div>
          <div id="modal-container"></div>
          <div id="main-layout-container"></div>
          <div class="article-es-header"></div>
        </div>')
      @EditorialSignupView = benv.requireWithJadeify resolve(__dirname, '../client/editorial_signup'), ['editorialCTABannerTemplate']
      stubChildClasses @EditorialSignupView, this,
        ['CTABarView']
        ['previouslyDismissed', 'render', 'logDismissal', 'transitionIn', 'transitionOut', 'close']
      @CTABarView::render.returns @$el
      @CTABarView::previouslyDismissed.returns false
      @EditorialSignupView.__set__ 'mediator',
        trigger: @mediatorTrigger = sinon.stub(),
        on: @mediatorOn = sinon.stub()
      @EditorialSignupView.__set__ 'analyticsHooks', trigger: @trigger = sinon.stub()
      done()

  afterEach ->
    $.ajax.restore()
    @clock.restore()
    benv.teardown()

  describe '#initialize', ->

    beforeEach ->
      @EditorialSignupView::setupMobileCTA = sinon.spy()
      @EditorialSignupView::setupDesktopCTA = sinon.spy()

    it 'returns if the CTA bar was previously dismissed', ->
      @CTABarView::previouslyDismissed.returns true
      view = new @EditorialSignupView el: @$el
      view.setupDesktopCTA.callCount.should.equal 0
      view.setupMobileCTA.callCount.should.equal 0

    it 'returns if the user is coming from Sailthru', ->
      @EditorialSignupView.__set__ 'qs', parse: sinon.stub().returns utm_source: 'sailthru'
      view = new @EditorialSignupView el: @$el
      view.setupDesktopCTA.callCount.should.equal 0
      view.setupMobileCTA.callCount.should.equal 0

    it 'sets up CTA for mobile users', ->
      @EditorialSignupView.__set__ 'sd',
        IS_MOBILE: true
      view = new @EditorialSignupView el: @$el
      view.setupDesktopCTA.callCount.should.equal 0
      view.setupMobileCTA.callCount.should.equal 1

    it 'sets up CTA for desktop users', ->
      @EditorialSignupView.__set__ 'sd',
        IS_MOBILE: false
      view = new @EditorialSignupView el: @$el
      view.setupDesktopCTA.callCount.should.equal 1
      view.setupMobileCTA.callCount.should.equal 0

  describe '#setupMobileCTA', ->

    beforeEach ->
      @EditorialSignupView::showCTA = sinon.spy()
      @EditorialSignupView.__set__ 'sd',
        IS_MOBILE: true
      @view = new @EditorialSignupView el: @$el

    it 'adds the CTA banner to the page', ->
      $(@view.el).find('#modal-container').html().should.containEql 'articles-es-cta--banner modal'

    it 'shows the CTA banner', ->
      @view.showCTA.callCount.should.equal 1

  describe '#setupDesktopCTA', ->

    beforeEach ->
      @EditorialSignupView::showCTA = sinon.spy()
      @EditorialSignupView::setDismissCookie = sinon.spy()
      @EditorialSignupView.__set__ 'sd',
        IS_MOBILE: false
      @view = new @EditorialSignupView el: @$el

    it 'sets the cookie when the user modal is closed or if the user has signed up', ->
      @mediatorOn.args.length.should.equal 2
      @mediatorOn.args[0][0].should.equal 'modal:closed'
      @mediatorOn.args[1][0].should.equal 'auth:sign_up:success'

    it 'shows the user modal', ->
      @view.showCTA.callCount.should.equal 1

    it 'returns early if the user is logged in', ->
      @EditorialSignupView.__set__ 'sd',
        IS_MOBILE: false,
        CURRENT_USER: { name: 'Joe' }
      @EditorialSignupView::showCTA = sinon.spy()
      view = new @EditorialSignupView el: @$el
      view.showCTA.callCount.should.equal 0

  describe '#fromSailthru', ->

    it 'checks if the utm_source is sailthru', ->
      @EditorialSignupView.__set__ 'qs', parse: sinon.stub().returns utm_source: 'sailthru'
      view = new @EditorialSignupView el: @$el
      view.fromSailthru().should.be.true()

    it 'checks if the utm_content starts with st-', ->
      @EditorialSignupView.__set__ 'qs', parse: sinon.stub().returns utm_content: 'st-lala'
      view = new @EditorialSignupView el: @$el
      view.fromSailthru().should.be.true()

  describe '#showCTA && #revealArticlePopup', ->

    it 'reveals the banner after 2000 ms on mobile', ->
      @EditorialSignupView.__set__ 'sd',
        IS_MOBILE: true
      view = new @EditorialSignupView el: @$el
      $(window).scroll()
      @clock.tick(2000)
      @trigger.args[0][0].should.equal 'view:editorial-signup'
      view.$el.find('.articles-es-cta--banner').css('opacity').should.equal '1'

    it 'reveals the user modal after 2000 ms on desktop', ->
      @EditorialSignupView.__set__ 'sd',
        IS_MOBILE: false
      view = new @EditorialSignupView el: @$el
      $(window).scroll()
      @clock.tick(2000)
      @mediatorTrigger.args[0][0].should.equal 'open:auth'

  describe '#onSubscribe', ->

    beforeEach ->
      @view = new @EditorialSignupView el: @$el

    it 'removes the form when successful', ->
      $.ajax.yieldsTo('success')
      @view.ctaBarView = {
        close: sinon.stub()
        logDismissal: sinon.stub()
      }
      @view.onSubscribe({currentTarget: $('<div></div>')})
      @view.$el.find('.articles-es-cta--banner').length.should.equal 0
      @view.ctaBarView.logDismissal.callCount.should.equal 1

    it 'removes the loading spinner if there is an error', ->
      $.ajax.yieldsTo('error')
      $subscribe = $('<div></div>')
      @view.onSubscribe({currentTarget: $subscribe})
      $($subscribe).hasClass('loading-spinner').should.be.false()

  describe 'Dismisses modals and logs cookies', ->

    beforeEach ->
      @EditorialSignupView.__set__ 'sd',
        IS_MOBILE: true
      @view = new @EditorialSignupView el: @$el
      $(window).scroll()
      @clock.tick(2000)

    it 'sets a dismiss cookie and tracks analytics', ->
      @view.$el.find('.cta-bar-defer').click()
      @trigger.args[1][0].should.equal 'dismiss:editorial-signup'
