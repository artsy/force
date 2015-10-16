_ = require 'underscore'
Backbone = require 'backbone'
template = -> require('./template.jade') arguments...
Q = require 'bluebird-q'
{ APP_URL } = require('sharify').data
Mailcheck = require '../mailcheck/index.coffee'
Form = require '../form/index.coffee'

module.exports = class EmailView extends Backbone.View
  deferred = Q.defer()

  events:
    'submit form': 'submit'

  initialize: ({ @el, @buttonText = 'Submit', @listId, @mergeVars, @email = '', @autofocus = false }) ->
    @render()
    Mailcheck.run('#js-email-view-input', '#js-email-view-hint', false)

    @result = deferred.promise

  render: ->
    @$el.html template
      email: @email
      buttonText: @buttonText
      autofocus: @autofocus

  submit: (e) ->
    model = new Backbone.Model
      listId: @listId
      mergeVars: @mergeVars

    model.url = "#{APP_URL}/mailchimp_subscribe"

    form = new Form model: model, $form: @$('form')
    form.submit e,
      success: =>
        deferred.resolve form.data()['email']
        form.reenable true

    false
