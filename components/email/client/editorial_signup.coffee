_ = require 'underscore'
sd = require('sharify').data
CTABarView = require '../../cta_bar/view.coffee'
Backbone = require 'backbone'
analyticsHooks = require '../../../lib/analytics_hooks.coffee'
editorialSignupTemplate = -> require('../templates/editorial_signup.jade') arguments...
editorialBannerSignupTemplate = -> require('../templates/editorial_banner_signup.jade') arguments...
editorialSignupLushTemplate = -> require('../templates/editorial_signup_lush.jade') arguments...
Cycle = require '../../cycle/index.coffee'
{ crop } = require '../../resizer/index.coffee'
mailcheck = require '../../mailcheck/index.coffee'
mediator = require '../../../lib/mediator.coffee'
FlashMessage = require '../../flash/index.coffee'

module.exports = class EditorialSignupView extends Backbone.View

  events: ->
    'click .js-article-es': 'onSubscribe'
    'click .js-article-es-dismiss': 'onDismiss'
    'click .cta-bar-defer': 'close'

  initialize: ->
    @setupAEArticlePage() if @inAEArticlePage()
    @setupAEMagazinePage() if @inAEMagazinePage()

  eligibleToSignUp: ->
    (@inAEArticlePage() or @inAEMagazinePage()) and not sd.SUBSCRIBED_TO_EDITORIAL

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

  setupAEArticlePage: ->
    @ctaBarView = new CTABarView
      mode: 'editorial-signup'
      name: 'editorial-signup-dismissed'
      persist: true
      email: sd.CURRENT_USER?.email or ''
    @$('#main-layout-container').prepend editorialBannerSignupTemplate
    # @$('#modal-container').append editorialBannerSignupATemplate
      email: sd.CURRENT_USER?.email or ''
      mode: 'editorial-signup-banner-b'
      name: 'editorial-signup-dismissed'
    if not @ctaBarView.previouslyDismissed() #and sd.MEDIUM in ['social', 'search']
      mediator.on 'auction-reminders:none', @setupCTAWaypoints
    @fetchSignupImages (images) =>
      @$('.article-content').append editorialSignupLushTemplate
        email: sd.CURRENT_USER?.email or ''
        images: images
        crop: crop
        articlePage: true
        isSignup: @eligibleToSignUp()
      mailcheck.run '#articles-es-cta__form-input', '#js--mail-hint', false
      @cycleImages() if images
    setTimeout((=> @$('.articles-es-cta--banner').slideDown(500) ), 2000)

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

  setupCTAWaypoints: =>
    @$el.append @ctaBarView.render().$el
    @$('#articles-show').waypoint (direction) =>
      setTimeout((=> @ctaBarView.transitionIn()), 2000) if direction is 'down'
      analyticsHooks.trigger('view:editorial-signup')
    @$(".article-container[data-id=#{sd.ARTICLE?.id}] .article-social").waypoint (direction) =>
      @ctaBarView.transitionOut() if direction is 'down'
      @ctaBarView.transitionIn() if direction is 'up'
    , { offset: '90%' }
    @$(".article-container[data-id=#{sd.ARTICLE?.id}] .article-social").waypoint (direction) =>
      @ctaBarView.transitionOut() if direction is 'up'
      @ctaBarView.transitionIn() if direction is 'down'
    , { offset: '-10%' }

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
        setTimeout((=> @ctaBarView.close()), 2000)

        analyticsHooks.trigger('submit:editorial-signup', type: @getSubmissionType(e), email: @email)

  getSubmissionType: (e)->
    type = $(e.currentTarget).data('type')
    if @inAEMagazinePage()
      'magazine_fixed'
    else if type in ['inline', 'lush']
      'article_fixed'
    else
      'article_popup'

  close: (e) ->
    e?.preventDefault()
    @onDismiss()
    @$('.articles-es-cta--banner').slideUp(500)

  onDismiss: ->
    analyticsHooks.trigger('dismiss:editorial-signup')
