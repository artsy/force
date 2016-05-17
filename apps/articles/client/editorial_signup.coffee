_ = require 'underscore'
sd = require('sharify').data
CTABarView = require '../../../components/cta_bar/view.coffee'
Backbone = require 'backbone'
analyticsHooks = require '../../../lib/analytics_hooks.coffee'
editorialSignupTemplate = -> require('../templates/editorial_signup.jade') arguments...
editorialSignupLushTemplate = -> require('../templates/editorial_signup_lush.jade') arguments...
Cycle = require '../../../components/cycle/index.coffee'
{ crop } = require '../../../components/resizer/index.coffee'
mailcheck = require '../../../components/mailcheck/index.coffee'
mediator = require '../../../lib/mediator.coffee'
FlashMessage = require '../../../components/flash/index.coffee'

module.exports = class EditorialSignupView extends Backbone.View

  events: ->
    'click .js-article-es': 'onSubscribe'
    'click .js-article-es-dismiss': 'onDismiss'

  initialize: ({@article}) ->
    @setupAEArticlePage() if @inAEArticlePage()
    @setupAEMagazinePage() if @inAEMagazinePage()

  eligibleToSignUp: ->
    (@inAEArticlePage() or @inAEMagazinePage()) and not sd.SUBSCRIBED_TO_EDITORIAL

  inAEArticlePage: ->
    sd.ARTICLE? and sd.ARTICLE.author_id is sd.ARTSY_EDITORIAL_ID

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
      name: 'editorial-signup'
      persist: true
      email: sd.CURRENT_USER?.email or ''
       # and sd.MEDIUM in ['social', 'search']
    if not @ctaBarView.previouslyDismissed()
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
    @$(".article-container[data-id=#{@article.id}] .article-social").waypoint (direction) =>
      @ctaBarView.transitionOut() if direction is 'down'
      @ctaBarView.transitionIn() if direction is 'up'
    , { offset: '90%' }
    @$(".article-container[data-id=#{@article.id}] .article-social").waypoint (direction) =>
      @ctaBarView.transitionOut() if direction is 'up'
      @ctaBarView.transitionIn() if direction is 'down'
    , { offset: '-10%' }

  # Subscribe controls
  onSubscribe: (e) ->
    @$(e.currentTarget).addClass 'is-loading'
    $.ajax
      type: 'POST'
      url: '/editorial-signup/form'
      data:
        email: @$(e.currentTarget).prev('input').val()
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

        analyticsHooks.trigger('submit:editorial-signup', type: @getSubmissionType(e))

  getSubmissionType: (e)->
    if @inAEMagazinePage()
      'magazine page'
    else if $(e.currentTarget).data('type') is 'inline'
      'article in-line'
    else
      'article footer'

  onDismiss: ->
    analyticsHooks.trigger('dismiss:editorial-signup')
