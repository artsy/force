_ = require 'underscore'
sd = require('sharify').data
Backbone = require 'backbone'
editorialSignupLushTemplate = -> require('../templates/editorial_signup_lush.jade') arguments...
Cycle = require '../../../components/cycle/index.coffee'
{ resize } = require '../../../components/resizer/index.coffee'
CTABarView = require '../../../components/cta_bar/view.coffee'
cookies = require '../../../components/cookies/index.coffee'
analyticsHooks = require '../../../lib/analytics_hooks.coffee'
imagesLoaded = require 'imagesloaded'

module.exports = class EditorialSignupView extends Backbone.View

  events: ->
    'click .js-article-es': 'onSubscribe'

  initialize: ->
    @setupAEMagazinePage() if @inAEMagazinePage()

  eligibleToSignUp: ->
    @inAEMagazinePage() and not sd.SUBSCRIBED_TO_EDITORIAL

  inAEMagazinePage: ->
    sd.CURRENT_PATH is '/articles'

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
    @ctaBarView.transitionIn()

  setupAEMagazinePage: ->
    @initCTABarView()
    if not @ctaBarView.previouslyDismissed() and @eligibleToSignUp()
      @setupCTAWaypoints()
      @trackImpression @ctaBarView.email
    # Show the lush CTA after the 3rd article
    @fetchSignupImages (images) =>
      @$('.article-item')
        .eq(2)
        .after editorialSignupLushTemplate
          email: sd.CURRENT_USER?.email or ''
          images: images
          resize: resize
          isSignup: @eligibleToSignUp()
          page: 'magazine'
        .css('border-bottom', 'none')
      @cycleImages() if images

  initCTABarView: ->
    @ctaBarView = new CTABarView
      mode: 'editorial-signup'
      name: 'dismissed-editorial-signup'
      persist: true
      email: sd.CURRENT_USER?.email or ''
      expires: 2592000

  onSubscribe: (e) ->
    @$(e.currentTarget).addClass 'is-loading'
    @email = @$(e.currentTarget).prev('input').val()
    analyticsHooks.trigger('click:editorial-signup', type: 'magazine_fixed')
    $.ajax
      type: 'POST'
      url: '/editorial-signup/form'
      data:
        email: @email
        name: sd.CURRENT_USER?.name or ''
      error: (res) =>
        @$(e.currentTarget).removeClass 'is-loading'
      success: (res) =>
        @$(e.currentTarget).removeClass 'is-loading'
        @$('.articles-es-cta__container').fadeOut =>
          @$('.articles-es-cta__social').fadeIn()

        @ctaBarView.close()
        @trackSignup @email

  trackSignup: (email) ->
    analyticsHooks.trigger('submit:editorial-signup', type: 'magazine_fixed', email: email)

  trackImpression: (email) ->
    setTimeout( =>
      analyticsHooks.trigger('impression:editorial-signup', article_id: sd.ARTICLE?.id, type: 'magazine_fixed', email: email)
    ,2000)
