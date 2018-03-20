_ = require 'underscore'
sd = require('sharify').data
Backbone = require 'backbone'
CTABarView = require '../../cta_bar/view.coffee'
analyticsHooks = require '../../../lib/analytics_hooks.coffee'
editorialCTABannerTemplate = -> require('../templates/editorial_cta_banner.jade') arguments...
{ crop } = require '../../resizer/index.coffee'
mailcheck = require '../../mailcheck/index.coffee'
mediator = require '../../../lib/mediator.coffee'
FlashMessage = require '../../flash/index.coffee'
qs = require 'querystring'

module.exports = class EditorialSignupView extends Backbone.View

  events: ->
    'click .js-article-es': 'onSubscribe'
    'click .js-article-es-dismiss': 'onDismiss'
    'click .modal-bg': 'hideEditorialCTA'
    'click .cta-bar-defer': 'hideEditorialCTA'

  initialize: () ->
    @params = qs.parse(location.search.replace(/^\?/, ''))
    @ctaBarView = new CTABarView
      mode: 'editorial-signup'
      name: 'editorial-signup-dismissed'
      persist: true
      email: sd.CURRENT_USER?.email or ''
    return if @ctaBarView.previouslyDismissed() or @fromSailthru()
    if sd.IS_MOBILE
      @setupMobileCTA()
    else
      @setupDesktopCTA()
    @revealArticlePopup = _.once(@revealArticlePopup)

  setupMobileCTA: ->
    @$('#modal-container').append editorialCTABannerTemplate
      mode: 'modal'
      email: sd.CURRENT_USER?.email or ''
      image: sd.EDITORIAL_CTA_BANNER_IMG
    @showCTA()

  setupDesktopCTA: ->
    mediator.on 'modal:closed', @setDismissCookie
    mediator.on 'auth:sign_up:success', @setDismissCookie
    @showCTA()

  fromSailthru: ->
    @params.utm_source is 'sailthru' or
    @params.utm_content?.includes('st-', 0)

  showCTA: ->
    $(window).on 'scroll', () =>
      setTimeout(@revealArticlePopup, 2000)

  revealArticlePopup: =>
    if sd.IS_MOBILE
      @$('.articles-es-cta--banner').css('opacity', 1)
      analyticsHooks.trigger('view:editorial-signup', type: 'modal' )
    else
      mediator.trigger('open:auth', {
        mode: 'register',
        copy: 'Sign up for the Best Stories in Art and Visual Culture'
      })

  hideEditorialCTA: (e) ->
    e?.preventDefault()
    cta = @$(e.target).closest('.articles-es-cta--banner')
    @onDismiss(e)
    cta.fadeOut()

  setDismissCookie: =>
    @ctaBarView.logDismissal()

  onSubscribe: (e) =>
    @$(e.currentTarget).addClass 'is-loading'
    @email = @$(e.currentTarget).prev('input').val()
    $.ajax
      type: 'POST'
      url: '/signup/editorial'
      data:
        email: @email
        name: sd.CURRENT_USER?.name or= ''
      error: (res) =>
        new FlashMessage message: 'Whoops, there was an error. Please try again.'
        @$(e.currentTarget).removeClass 'is-loading'
      success: (res) =>
        new FlashMessage
          message: 'Thank you for signing up.'
          visibleDuration: 2000
        @$(e.currentTarget).removeClass 'is-loading'
        @$('.articles-es-cta--banner').fadeOut()

        @ctaBarView.logDismissal()
        analyticsHooks.trigger('submit:editorial-signup', type: @getSubmissionType(e), email: @email)

  onDismiss: (e) ->
    @ctaBarView.logDismissal()
    analyticsHooks.trigger('dismiss:editorial-signup', type: @getSubmissionType(e))

  getSubmissionType: (e)->
    if sd.CURRENT_PATH is '/articles'
      'magazine_popup'
    else
      'article_popup'
