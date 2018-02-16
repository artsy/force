_ = require 'underscore'
sd = require('sharify').data
Backbone = require 'backbone'
{ resize } = require '../../../components/resizer/index.coffee'
CTABarView = require '../../../components/cta_bar/view.coffee'
cookies = require '../../../components/cookies/index.coffee'
analyticsHooks = require '../../../lib/analytics_hooks.coffee'

module.exports = class EditorialSignupView extends Backbone.View

  events: ->
    'click .js-article-es': 'onSubscribe'

  initialize: ->
    @setupAEMagazinePage() if @inAEMagazinePage()

  eligibleToSignUp: ->
    @inAEMagazinePage() and not sd.SUBSCRIBED_TO_EDITORIAL

  inAEMagazinePage: ->
    sd.CURRENT_PATH is '/articles'

  setupCTAWaypoints: =>
    @$el.append @ctaBarView.render().$el
    @ctaBarView.transitionIn()

  setupAEMagazinePage: ->
    @initCTABarView()
    if not @ctaBarView.previouslyDismissed() and @eligibleToSignUp()
      @setupCTAWaypoints()
      @trackImpression @ctaBarView.email

  initCTABarView: ->
    @ctaBarView = new CTABarView
      mode: 'editorial-signup'
      name: 'editorial-signup-dismissed'
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
