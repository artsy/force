Backbone = require 'backbone'
_ = require 'underscore'
Form = require '../mixins/form.coffee'
mediator = require '../../lib/mediator.coffee'
LoggedOutUser = require '../../models/logged_out_user.coffee'
AuthModalView = require '../auth_modal/view.coffee'
template = -> require('./templates/index.jade') arguments...
overlayTemplate = -> require('./templates/overlay.jade') arguments...

module.exports = class ArtistPageCTAView extends Backbone.View
  _.extend @prototype, Form

  className: 'artist-page-cta'

  events:
    'click': 'fullScreenOverlay'
    'submit .artist-page-cta-overlay__register': 'submit'
    'click .auth-toggle': 'triggerLoginModal'

  initialize: ({ artist }) ->
    @artist = artist
    @user = new LoggedOutUser
    @$window = $ window
    @targetScrollPosition = @$window.height() * 2
    @alreadyDismissed = false
    @$window.on 'scroll', _.throttle(@maybeShowOverlay, 200)

  maybeShowOverlay: (e) =>
    @fullScreenOverlay() if @$window.scrollTop() > @desiredScrollPosition and not @alreadyDismissed

  triggerLoginModal: (e) ->
    e.stopPropagation()
    new AuthModalView
      width: '500px'
      mode: 'login'
      redirectTo: "#{@artist.get('href')}/payoff"

  fullScreenOverlay: (e) ->
    return if @$el.hasClass 'fullscreen'
    @$el.addClass 'fullscreen'
    @$('.main-layout-container').html overlayTemplate
      artist: @artist
    @$('.artist-page-cta-overlay__close').on 'click', @closeOverlay

  closeOverlay: (e) =>
    e.stopPropagation()
    @$el.removeClass 'fullscreen'
    @alreadyDismissed = true
    @render()

  submit: (e) ->
    return unless @validateForm()
    return if @formIsSubmitting()

    e.preventDefault()

    @$('button').attr 'data-state', 'loading'

    @user.set (data = @serializeForm())
    @user.signup
      success: @onRegisterSuccess
      error: (model, response, options) =>
        @reenableForm()
        message = @errorMessage response
        @$('button').attr 'data-state', 'error'
        @$('.auth-errors').text message
        mediator.trigger 'auth:error', message

  onRegisterSuccess: (model, response, options) =>
    window.location = "#{@artist.get('href')}/payoff"

  render: ->
    @$el.html template
      artist: @artist 
    @
