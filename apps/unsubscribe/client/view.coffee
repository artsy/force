_ = require 'underscore'
Backbone = require 'backbone'
sd = require('sharify').data

module.exports = class UnsubscribeView extends Backbone.View

  events:
    "click input[name='selectAll']"  : 'toggleSelectAll'
    "click button.submit"            : 'submitUnsubscribe'

  toggleSelectAll: (e) ->
    checked = $(e.currentTarget).is(':checked')
    for input in @$("input[name!='selectAll']")
      if checked
        $(input).click() unless $(input).is(':checked')
      else
        $(input).click() if $(input).is(':checked')

  submitUnsubscribe: (e) ->
    types = []
    for input in @$("input[name!='selectAll']:checked")
      types.push $(input).attr('name')
    new Backbone.Model().save { authentication_token: sd.UNSUB_AUTH_TOKEN, type: types },
      url: "#{sd.API_URL}/api/v1/me/unsubscribe"
      success: =>
        @$('#error-handler').append "<div class='unsubscribe-message'>You've been unsubscribed.</div>"
      error: =>
        @$('#error-handler').append "<div class='unsubscribe-message'>Whoops, there was an error.</div>"
