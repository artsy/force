_ = require 'underscore'
sd = require('sharify').data
CTABarView = require '../../cta_bar/view.coffee'
Backbone = require 'backbone'
analyticsHooks = require '../../../lib/analytics_hooks.coffee'
editorialSignupTemplate = -> require('../templates/editorial_signup.jade') arguments...
editorialCTABannerTemplate = -> require('../templates/editorial_cta_banner.jade') arguments...
editorialSignupLushTemplate = -> require('../templates/editorial_signup_lush.jade') arguments...
Cycle = require '../../cycle/index.coffee'
{ crop } = require '../../resizer/index.coffee'
mailcheck = require '../../mailcheck/index.coffee'
mediator = require '../../../lib/mediator.coffee'
FlashMessage = require '../../flash/index.coffee'
splitTest = require '../../split_test/index.coffee'
qs = require 'querystring'

module.exports = class EditorialSignupView extends Backbone.View

  events: ->
    'click .js-article-es': 'onSubscribe'
    'click .js-article-es-dismiss': 'onDismiss'
    'click .modal-bg': 'hideEditorialCTA'
    'click .cta-bar-defer': 'hideEditorialCTA'

  initialize: ->
    @setupAEArticlePage() if @inAEArticlePage()
    @setupAEMagazinePage() if @inAEMagazinePage()

  eligibleToSignUp: ->
    (@inAEArticlePage() or @inAEMagazinePage()) and
    not sd.SUBSCRIBED_TO_EDITORIAL and
    qs.parse(location.search.replace(/^\?/, '')).utm_source isnt 'sailthru'

  inAEArticlePage: ->
    sd.ARTICLE? and
    sd.ARTICLE.channel_id is sd.ARTSY_EDITORIAL_CHANNEL and
    not sd.SUPER_SUB_ARTICLES?.length > 0

  inAEMagazinePage: ->
    sd.CURRENT_PATH is '/articles'

  setupAEMagazinePage: ->
    @ctaBarView = new CTABarView
      name: 'editorial-signup'
      persist: true
    # Show the lush CTA after the 6th article
    @fetchSignupImages (images) =>
      @$('.articles-feed-item').eq(5).after editorialSignupLushTemplate
        email: sd.CURRENT_USER?.email or ''
        images: images
        crop: crop
        isSignup: @eligibleToSignUp()
      mailcheck.run '#articles-es-cta__form-input', '#js--mail-hint', false
      @cycleImages() if images
    if not @ctaBarView.previouslyDismissed() and @eligibleToSignUp()
      @showEditorialCTA 'modal'

  setupAEArticlePage: ->
    @outcome = splitTest('editorial_cta_banner').outcome()
    @ctaBarView = new CTABarView
      mode: 'editorial-signup'
      name: 'editorial-signup-dismissed'
      persist: true
      email: sd.CURRENT_USER?.email or ''
    if not @ctaBarView.previouslyDismissed() and @eligibleToSignUp()
      @showEditorialCTA @outcome
    @fetchSignupImages (images) =>
      @$('.article-content').append editorialSignupLushTemplate
        email: sd.CURRENT_USER?.email or ''
        images: images
        crop: crop
        articlePage: true
        isSignup: @eligibleToSignUp()
      mailcheck.run '#articles-es-cta__form-input', '#js--mail-hint', false
      @cycleImages() if images

  cycleImages: =>
    cycle = new Cycle
      $el: $('.articles-es-cta__background')
      selector: '.articles-es-cta__images'
      speed: 5000
    cycle.start()

  fetchSignupImages: (cb) ->
    $.ajax
      type: 'GET'
      url: "#{sd.POSITRON_URL}/api/curations/#{sd.EMAIL_SIGNUP_IMAGES_ID}"
      success: (results) ->
        cb results.images
      error: ->
        cb null

  showEditorialCTA: (outcome) ->
    #Fire analytics event for A/B split test
    splitTest('editorial_cta_banner').view()

    if outcome is 'modal' or $('body').hasClass('body-transparent-header')
      @$('#modal-container').append editorialCTABannerTemplate
        mode: 'modal'
        email: sd.CURRENT_USER?.email or ''
        image: sd.EDITORIAL_CTA_BANNER_IMG
      @$('#articles-show, .articles-articles-page').waypoint (direction) =>
        if direction is 'down'
          setTimeout((=> @$('.articles-es-cta--banner').attr('data-state', 'in').css('opacity', 1)), 2000)
      analyticsHooks.trigger('view:editorial-signup', type: 'modal' )
    else if outcome is 'banner'
      @$('#main-layout-container').css('margin-top', '53px').before editorialCTABannerTemplate
        mode: outcome
        email: sd.CURRENT_USER?.email or ''
        image: sd.EDITORIAL_CTA_BANNER_IMG
      setTimeout((=> @$('.articles-es-cta--banner').height(315).attr('data-state', 'in') ), 1000)
      analyticsHooks.trigger('view:editorial-signup', type: outcome )
    else if outcome is 'old_modal'
      mediator.on 'auction-reminders:none', @setupCTAWaypoints

  hideEditorialCTA: (e) ->
    e?.preventDefault()
    cta = @$(e.target).closest('.articles-es-cta--banner')
    @onDismiss()
    cta.height(0) if cta.hasClass('banner')
    cta.css('opacity', 0)
    setTimeout((=>
      cta.attr('data-state', 'out')
      cta.hide() if cta.hasClass('modal')
      ), 2000)

  setupCTAWaypoints: =>
    @$el.append @ctaBarView.render().$el
    @$('#articles-show').waypoint (direction) =>
      setTimeout((=> @ctaBarView.transitionIn()), 2000) if direction is 'down'
      analyticsHooks.trigger('view:editorial-signup', type: 'old_modal')

  # Subscribe controls
  onSubscribe: (e) ->
    @$(e.currentTarget).addClass 'is-loading'
    @email = @$(e.currentTarget).prev('input').val()
    $.ajax
      type: 'POST'
      url: '/editorial-signup/form'
      data:
        email: @email
        name: sd.CURRENT_USER?.name or= ''
      error: (res) =>
        new FlashMessage message: 'Whoops, there was an error. Please try again.'
        @$(e.currentTarget).removeClass 'is-loading'
      success: (res) =>
        new FlashMessage message: 'Thank you for signing up.'
        @$(e.currentTarget).removeClass 'is-loading'
        # Inline Signup
        @$('.article-es-header').fadeOut =>
          @$('.article-es-thanks').fadeIn()
          @$('.article-es-header').css('display', 'none')
        # CTA Popup
        @$('.cta-bar-container-editorial').fadeOut()
        # Lush Signup
        @$('.articles-es-cta__container').fadeOut =>
          @$('.articles-es-cta__social').fadeIn()
        @ctaBarView.close()
        # CTA Banner
        @$('.articles-es-cta--banner.banner').height(0)
        @$('.articles-es-cta--banner').css('opacity', 0).attr('data-state', 'out')
        analyticsHooks.trigger('submit:editorial-signup', variation_id: @outcome, type: @getSubmissionType(e), email: @email)

  getSubmissionType: (e)->
    type = $(e.currentTarget).data('type')
    if @inAEMagazinePage()
      'magazine_fixed'
    else if type in ['inline', 'lush', 'banner']
      'article_fixed'
    else
      'article_popup'

  onDismiss: ->
    @ctaBarView.logDimissal()
    analyticsHooks.trigger('dismiss:editorial-signup', type: @outcome)
