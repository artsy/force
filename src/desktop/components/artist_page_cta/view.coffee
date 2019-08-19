Backbone = require 'backbone'
qs = require 'qs'
_ = require 'underscore'
Cookies = require 'cookies-js'
Form = require '../mixins/form.coffee'
Mailcheck = require '../mailcheck/index.coffee'
mediator = require '../../lib/mediator.coffee'
LoggedOutUser = require '../../models/logged_out_user.coffee'
template = -> require('./templates/index.jade') arguments...
overlayTemplate = -> require('./templates/overlay.jade') arguments...
FormErrorHelpers = require('../auth_modal/helpers')
{ repcaptcha } = require "@artsy/reaction/dist/Utils/repcaptcha"

module.exports = class ArtistPageCTAView extends Backbone.View
  _.extend @prototype, Form
  _.extend @prototype, FormErrorHelpers

  className: 'artist-page-cta initial'

  events:
    'click': 'fullScreenOverlay'
    'click .gdpr-signup__form button': 'onSubmit'
    'submit form': 'onSubmit'
    'click .auth-toggle': 'triggerLoginModal'
    'keydown': 'keyAction'
    'click #signup-fb': 'fbSignup'
    'change #accepted_terms_of_service': 'checkAcceptedTerms'

  initialize: ({ artist }) ->
    @artist = artist
    @user = new LoggedOutUser
    @$window = $ window
    @$body = $('body')
    @desiredScrollPosition = @$window.height() * 2
    @alreadyDismissed = false
    @signupIntent = 'Artist CTA Banner'
    @afterAuthPath = window.location
    @$window.on('scroll', _.once(@maybeShowOverlay))
    mediator.on("artist_cta:account_creation", (options) => analytics.track("Created Account", options))

  maybeShowOverlay: (event) =>
    if !@alreadyDismissed
      setTimeout (=> @fullScreenOverlay(event)), 4000

  triggerLoginModal: (e) ->
    e.stopPropagation()
    mediator.trigger 'open:auth',
      mode: 'login'
      trigger: 'click'
      context_module: 'Header'
      destination: location.href
      intent: @signupIntent
      signupIntent: @signupIntent

  currentParams: ->
    qs.parse(location.search.replace(/^\?/, ''))

  fullScreenOverlay: (event) =>
    if event.type != "scroll"
      contextModule = "Footer" if event.currentTarget.className?.includes("artist-page-cta")
    eventType = event.type
    return if @$el.hasClass 'fullscreen'
    @$overlay.fadeIn 300
    @$banner.fadeOut 300
    fragment = qs.stringify @currentParams()
    @trackImpression(eventType, contextModule)
    # This handles the redirect for the new onboarding flow
    @afterAuthPath += "?redirectTo=#{@artist.get('href')}"
    @afterAuthPath += "?#{fragment}" if fragment

    # This handles the redirect for the old onboarding flow
    Cookies.set('destination', @artist.get('href'), expires: 60 * 60 * 24)

    @$el.addClass 'fullscreen'
    @$(".gdpr-signup input[name='name']").focus()
    @$('.artist-page-cta-overlay__close').on 'click', @closeOverlay
    analyticsHooks.trigger 'artist_page:cta:shown'
    setTimeout (=> @disableScroll()), 400

    $('#accepted_terms_of_service').on('invalid', @checkAcceptedTerms)

  keyAction: (e) =>
    if e.keyCode == 27 || e.which == 27
      @closeOverlay(e)

  disableScroll: ->
    @$body.addClass('is-scrolling-disabled')

  reenableScroll: ->
    @$body.removeClass('is-scrolling-disabled')

  closeOverlay: (e) =>
    e.stopPropagation()
    @$overlay.fadeOut 300
    @$banner.fadeIn 300
    @$el.removeClass 'fullscreen'
    setTimeout (=> @reenableScroll()), 400
    @alreadyDismissed = true
    analytics.track("Click", {
      context_module: "artist page signup prompt",
      type: "dismiss",
      flow: "auth",
      label: "dismiss auth modal",
    })

  submit: (recaptcha_token) =>
    formData = @serializeForm()
    data = Object.assign {},
      formData,
      @gdprData(formData),
      signupIntent: @signupIntent,
      signupReferer: location.href
      recaptcha_token: recaptcha_token
    @user.set data

    @user.signup
      success: @onRegisterSuccess
      error: (model, response, options) =>
        @reenableForm()
        message = @errorMessage response
        @$('button').attr 'data-state', 'error'
        @$('.auth-errors').text message
        mediator.trigger 'auth:error', message
      context: 'artist_page_cta'

  onSubmit: (e) ->
    return unless @validateForm()
    return if @formIsSubmitting()
    e.preventDefault()
    @$('button').attr 'data-state', 'loading'
    repcaptcha("signup_submit", (token) =>
      @submit(token)
    )


  onRegisterSuccess: (model, response, options) =>
    hasEmailAndPassword = true if model.get("email") && model.get("password")
    service = if hasEmailAndPassword then "email" else "facebook"

    accountCreationData = _.extend(_.omit(@analyticsData, "onboarding"), {
      user_id: response.user.id,
      service: service,
    })

    mediator.trigger 'artist_cta:account_creation', accountCreationData
    window.location = @afterAuthPath

  render: ->
    @$el.html template
      artist: @artist
      afterAuthPath: @afterAuthPath
      signupIntent: encodeURIComponent(@signupIntent)
    @$banner = @$('.artist-page-cta-banner')
    @$overlay = @$('.artist-page-cta-overlay')
    @

  initializeMailcheck: ->
    Mailcheck.run('#js-mailcheck-input-modal', '#js-mailcheck-hint-modal', false)

  trackImpression:(triggerType, contextModule) =>
    @analyticsData = {
      modal_copy: "Join Artsy to discover new works by #{@artist.get('name')} and more artists you love",
      trigger: if triggerType == "scroll" then "scroll" else triggerType,
      trigger_seconds: 4 if triggerType == "scroll",
      type: "signup",
      intent: "signup",
      context_module: contextModule,
      auth_redirect: location.href,
      onboarding: true
    }
    
    analytics.track("Auth Impression", @analyticsData)
