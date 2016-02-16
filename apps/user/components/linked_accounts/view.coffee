sd = require('sharify').data
Backbone = require 'backbone'
template = -> require('./index.jade') arguments...

module.exports = class LinkedAccountsView extends Backbone.View
  className: 'settings-linked-accounts'

  events:
    'click .js-settings-linked-accounts__service__toggle': 'toggleService'

  initialize: ({ @user }) ->

  toggleService: (e) ->
    $button = $(e.currentTarget)
    service = $button
      .attr 'data-state', 'loading'
      .data 'service'

    return true unless @user.isLinkedTo service

    e.preventDefault()

    @user.unlinkAccount service,
      success: ->
        $button.attr
          'data-state': null
          'data-connected': 'disconnected'
      error: (model, response, options) =>
        @$('.js-form-errors').text response.responseJSON.error
        $button.attr 'data-state', null

  render: ->
    @$el.html template
      sd: sd
      user: @user
    this
