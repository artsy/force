Backbone = require 'backbone'
qs = require 'qs'
_ = require 'underscore'
sd = require('sharify').data
Cookies = require 'cookies-js'
Form = require '../mixins/form.coffee'
Mailcheck = require '../mailcheck/index.coffee'
mediator = require '../../lib/mediator.coffee'
LoggedOutUser = require '../../models/logged_out_user.coffee'
AuthModalView = require '../auth_modal/view.coffee'
template = -> require('./templates/index.jade') arguments...
overlayTemplate = -> require('./templates/overlay.jade') arguments...

module.exports = class ArtistPageCTAView extends Backbone.View
  _.extend @prototype, Form

  className: 'artist-page-cta initial'

  events:
    'click': 'fullScreenOverlay'
    'submit form': 'submit'
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
    @afterAuthPath = "/personalize"
    @signupIntent = "landing full page modal"
    @gdprDisabled = sd.GDPR_COMPLIANCE_TEST is 'control'
    @$window.on 'scroll', _.throttle(@maybeShowOverlay, 200)
    mediator.on 'clickFollowButton', @fullScreenOverlay
    mediator.on 'clickHeaderAuth', @fullScreenOverlay

    # This 'invalid' event doesn't seem to work in the @events property
    $('#accepted_terms_of_service').on('invalid', @checkAcceptedTerms)

  maybeShowOverlay: (e) =>
    @fullScreenOverlay() if @$window.scrollTop() > @desiredScrollPosition and not @alreadyDismissed

  triggerLoginModal: (e) ->
    e.stopPropagation()
    new AuthModalView
      width: '500px'
      mode: 'login'
      redirectTo: @afterAuthPath
      signupIntent: @signupIntent

  currentParams: ->
    qs.parse(location.search.replace(/^\?/, ''))

  fullScreenOverlay: (e) =>
    return if @$el.hasClass 'fullscreen'
    @$overlay.fadeIn 300
    @$banner.fadeOut 300
    fragment = qs.stringify @currentParams()
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
    analyticsHooks.trigger 'artist_page:cta:hidden'

  checkAcceptedTerms: () ->
    input = $('input#accepted_terms_of_service').get(0)
    input.setCustomValidity? ''
    if $(input).prop('checked')
      $('.tos-error').text ''
      $boxContainer = $('.gdpr-signup__form__checkbox__accept-terms')
      $boxContainer.attr('data-state', null)
      true
    else
      $boxContainer = $('.gdpr-signup__form__checkbox__accept-terms')
      $boxContainer.attr('data-state', 'error')
      input = $('input#accepted_terms_of_service').get(0)
      input.setCustomValidity('')
      $('.tos-error').text 'Please agree to our terms to continue'
      false

  fbSignup: (e) ->
    e.preventDefault()
    queryData =
      'signup-intent': @signupIntent
      'redirect-to': @afterAuthPath
      'modal_id': 'artist_page_cta'
    queryString = $.param(queryData)
    fbUrl = sd.AP.facebookPath + '?' + queryString
    return window.location.href = fbUrl if @gdprDisabled

    if @checkAcceptedTerms()
      gdprString = $.param(@gdprData(@serializeForm()))
      gdprFbUrl = fbUrl + "&" + gdprString
      window.location.href = gdprFbUrl

  # accomodate AB test for checkboxes
  gdprData: (formData) ->
    return {} if @gdprDisabled
    if sd.GDPR_COMPLIANCE_TEST is 'separated_checkboxes'
      'receive_emails': !!formData['receive_emails']
      'accepted_terms_of_service': !!formData['accepted_terms_of_service']
    else if sd.GDPR_COMPLIANCE_TEST is 'combined_checkboxes'
      'receive_emails': !!formData['accepted_terms_of_service']
      'accepted_terms_of_service': !!formData['accepted_terms_of_service']

  submit: (e) ->
    return unless @validateForm()
    return if @formIsSubmitting()

    e.preventDefault()

    @$('button').attr 'data-state', 'loading'

    @user.set (data = @serializeForm())
    @user.set(signupIntent: @signupIntent)
    @user.signup
      success: @onRegisterSuccess
      error: (model, response, options) =>
        @reenableForm()
        message = @errorMessage response
        @$('button').attr 'data-state', 'error'
        @$('.auth-errors').text message
        mediator.trigger 'auth:error', message
      context: 'artist_page_cta'

  onRegisterSuccess: (model, response, options) =>
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
