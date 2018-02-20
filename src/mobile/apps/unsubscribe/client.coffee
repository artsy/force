_ = require 'underscore'
bootstrap = require '../../components/layout/bootstrap.coffee'
Backbone = require 'backbone'
sd = require('sharify').data

module.exports = class UnsubscribeView extends Backbone.View

  initialize: (options) ->
    { @unsubToken } = options

  events:
    "click input[name='selectAll']": 'toggleSelectAll'
    "click button.submit": 'submitUnsubscribe'

  toggleSelectAll: (e) ->
    checked = $(e.currentTarget).is(':checked')
    for input in @$("input")
      if checked
        $(input).click() unless $(input).is(':checked')
      else
        $(input).click() if $(input).is(':checked')

  submitUnsubscribe: (e) ->
    if @$("input[name='selectAll']").prop('checked')
      types = ['all']
    else
      types = _.without @$('input:checked').map(-> $(this).attr('name')), 'selectAll'
    new Backbone.Model().save { authentication_token: @unsubToken, type: types },
      url: "#{sd.API_URL}/api/v1/me/unsubscribe"
      success: =>
        @$el.append "<div class='unsubscribe-message'>You've been unsubscribed.</div>"
      error: =>
        @$el.append "<div class='unsubscribe-message'>Whoops, there was an error.</div>"

module.exports.init = ->
  bootstrap()
  unsubToken = sd.UNSUB_TOKEN
  new UnsubscribeView
    el: $ '#unsubscribe-content'
    unsubToken: unsubToken
