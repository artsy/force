Backbone = require 'backbone'
track = require('../../../lib/analytics.coffee').track

StepView = class StepView extends Backbone.View
  initialize: (options) ->
    @state = options.state
    @user = options.user

  events: ->
    'focus .autocomplete-input': 'focus'
    'blur .autocomplete-input': 'blur'

  advance: (e) ->
    e?.preventDefault()
    track.funnel "Finishing #{@state.get('current_step')}", { label: "User:#{@user.id}" }
    @state.trigger 'transition:next'

  focus: (e) ->
    @$('.autocomplete-input-container').addClass('is-active')

  blur: ->
    @$('.autocomplete-input-container').removeClass('is-active')

module.exports = StepView
