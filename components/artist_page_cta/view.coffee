Backbone = require 'backbone'
_ = require 'underscore'
Form = require '../mixins/form.coffee'
LoggedOutUser = require '../../models/logged_out_user.coffee'
template = -> require('./templates/index.jade') arguments...
overlayTemplate = -> require('./templates/overlay.jade') arguments...

module.exports = class ArtistPageCTAView extends Backbone.View
  _.extend @prototype, Form

  className: 'artist-page-cta'

  events:
    'click': 'fullScreenOverlay'
    'submit .artist-page-cta-overlay__register': 'submit'

  fullScreenOverlay: (e)->
    return if @$el.hasClass 'fullscreen'
    @$el.addClass 'fullscreen'
    @$('.main-layout-container').html overlayTemplate
      artist: @artist
    @$('.artist-page-cta-overlay__close').on 'click', @closeOverlay

  closeOverlay: (e) =>
    e.stopPropagation()
    @$el.removeClass 'fullscreen'
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
        mediator.trigger 'auth:error', message

  onRegisterSuccess: (model, response, options) =>
    # TODO: Payoff Screen

  initialize: ({ artist }) ->
    @artist = artist
    @user = new LoggedOutUser

  render: ->
    @$el.html template
      artist: @artist 
    @
