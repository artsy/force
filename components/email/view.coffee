_ = require 'underscore'
Backbone = require 'backbone'
template = -> require('./template.jade') arguments...

module.exports = class EmailView extends Backbone.View
  initialize: ({ @el, @buttonText = 'Submit', @listId, @email = '', @autofocus = false }) ->

  render: ->
    @$el.html template
      email: @email
      buttonText: @buttonText
      autofocus: @autofocus

  submit: ->
    # Hit route to subscribe with email and list ID