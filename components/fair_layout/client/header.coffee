_ = require 'underscore'
Backbone = require 'backbone'
sd = require('sharify').data
Profile = require '../../../models/profile.coffee'
Fair = require '../../../models/fair.coffee'
SearchBar = require './search_bar.coffee'

mediator = require '../../../lib/mediator.coffee'
CurrentUser = require '../../../models/current_user.coffee'
analytics = require '../../../lib/analytics.coffee'

module.exports = class FairHeaderView extends Backbone.View
  _.extend @prototype, SearchBar

  events:
    'click .mlh-login': 'login'
    'click .mlh-signup': 'signup'
    'click .mlh-logout': 'logout'

  initialize: (options) ->
    { @fair } = options
    @currentUser = CurrentUser.orNull()
    @setupSearch @model, @fair

  signup: (e) ->
    e.preventDefault()
    analytics.track.funnel 'Clicked sign up via the header'
    mediator.trigger 'open:auth', mode: 'signup'

  login: (e) ->
    e.preventDefault()
    analytics.track.funnel 'Clicked login via the header'
    mediator.trigger 'open:auth', mode: 'login'

  logout: (e) ->
    e.preventDefault()
    analytics.track.funnel 'Clicked logout via the header'
    console.log 'logout triggered'
    $.ajax
      url: '/users/sign_out'
      type: 'DELETE'
      success: ->
        location.reload()
      error: (xhr, status, errorMessage) ->
        new FlashMessage message: errorMessage