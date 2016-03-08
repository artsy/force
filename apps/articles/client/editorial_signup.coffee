_ = require 'underscore'
sd = require('sharify').data
CTABarView = require '../../../components/cta_bar/view.coffee'
Backbone = require 'backbone'
analyticsHooks = require '../../../lib/analytics_hooks.coffee'
editorialSignupTemplate = -> require('../templates/editorial_signup.jade') arguments...

module.exports = class EditorialSignupView extends Backbone.View

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
    # Show the static CTA after the 6th article
    @$('.articles-feed-item').eq(5).after editorialSignupTemplate
      email: sd.CURRENT_USER?.email or ''

  setupAEArticlePage: ->
    @ctaBarView = new CTABarView
      mode: 'editorial-signup'
      name: 'editorial-signup'
      persist: true
      email: sd.CURRENT_USER?.email or ''
    @setupCTAWaypoints() if not @ctaBarView.previouslyDismissed() and
      sd.MEDIUM in ['social', 'search']

  setupCTAWaypoints: ->
    @$el.append @ctaBarView.render().$el
    @$('#articles-show').waypoint (direction) =>
      setTimeout((=> @ctaBarView.transitionIn()), 2000) if direction is 'down'
    @$('#articles-show').waypoint (direction) =>
      @ctaBarView.transitionOut() if direction is 'down'
      @ctaBarView.transitionIn() if direction is 'up'
    , { offset: 'bottom-in-view' }

  events:
    'click .js-article-es': 'onSubscribe'
    'click .js-article-es-dismiss': 'onDismiss'

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
        @$('.article-es-header').fadeOut =>
          @$('.article-es-thanks').fadeIn()
        @$('.cta-bar-container-editorial').fadeOut =>
          @$('.cta-bar-thanks').fadeIn()
        @$('.article-es-header').css('display', 'none')
        setTimeout((=> @ctaBarView.close()), 2000)
        setTimeout((=> @$('.articles-es-cta').fadeOut()), 2000)
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
