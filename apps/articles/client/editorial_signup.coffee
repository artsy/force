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

module.exports = class EditorialSignupView extends Backbone.View

  events: ->
    'click .js-article-es': 'onSubscribe'
    'click .js-article-es-dismiss': 'onDismiss'

  initialize: ->
    return unless @eligibleToSignUp()
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
    return if @ctaBarView.previouslyDismissed()
    # Show the lush CTA after the 6th article
    @fetchSignupImages (images) =>
      @$('.articles-feed-item').eq(5).after editorialSignupLushTemplate
        email: sd.CURRENT_USER?.email or ''
        images: images
        crop: crop
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
      url: "#{sd.POSITRON_URL}/api/curations/#{sd.EMAIL_SIGNUP_IMAGES}"
      success: (results) ->
        cb results.images
      error: ->
        cb null

  setupAEArticlePage: ->
    @ctaBarView = new CTABarView
      mode: 'editorial-signup'
      name: 'editorial-signup'
      persist: true
      email: sd.CURRENT_USER?.email or ''
    @setupCTAWaypoints() if not @ctaBarView.previouslyDismissed() and
      sd.MEDIUM in ['social', 'search']
    @fetchSignupImages (images) =>
      @$('.article-content').append editorialSignupLushTemplate
        email: sd.CURRENT_USER?.email or ''
        images: images
        crop: crop
        articlePage: true
      mailcheck.run '#articles-es-cta__form-input', '#js--mail-hint', false
      @cycleImages() if images

  setupCTAWaypoints: ->
    @$el.append @ctaBarView.render().$el
    @$('#articles-show').waypoint (direction) =>
      setTimeout((=> @ctaBarView.transitionIn()), 2000) if direction is 'down'
    @$('#articles-show').waypoint (direction) =>
      @ctaBarView.transitionOut() if direction is 'down'
      @ctaBarView.transitionIn() if direction is 'up'
    , { offset: 'bottom-in-view' }

  onSubscribe: (e) ->
    @$(e.currentTarget).addClass 'is-loading'
    $.ajax
      type: 'POST'
      url: '/editorial-signup/form'
      data:
        email: @$(e.currentTarget).prev('input').val()
        name: sd.CURRENT_USER?.name or= ''
      error: (res) =>
        @$(e.currentTarget).removeClass 'is-loading'
      success: (res) =>
        @$(e.currentTarget).removeClass 'is-loading'
        # Inline Signup
        @$('.article-es-header').fadeOut =>
          @$('.article-es-thanks').fadeIn()
          @$(this).css('display', 'none')
        # CTA Popup
        @$('.cta-bar-container-editorial').fadeOut =>
          @$('.cta-bar-thanks').fadeIn()
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
