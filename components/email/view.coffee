_ = require 'underscore'
Backbone = require 'backbone'
template = -> require('./template.jade') arguments...
Q = require 'bluebird-q'
{ APP_URL } = require('sharify').data
Mailcheck = require '../mailcheck/index.coffee'

module.exports = class EmailView extends Backbone.View
  events:
    'submit form': 'submit'

  initialize: ({ @el, @buttonText = 'Submit', @listId, @mergeVars, @email = '', @autofocus = false }) ->
    @render()
    Mailcheck.run('#js-email-view-input', '#js-email-view-hint', false)
    @whenSubmitted = Q.defer().promise

  render: ->
    @$el.html template
      email: @email
      buttonText: @buttonText
      autofocus: @autofocus

  submit: ->
    subscribePromise = $.post "#{APP_URL}/mailchimp_subscribe",
      listId: @listId
      mergeVars: @mergeVars
      email: @$('input[name=email]').val()

    subscribePromise.then @whenSubmitted.resolve, @whenSubmitted.reject

    false
