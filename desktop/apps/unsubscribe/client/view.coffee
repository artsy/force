_ = require 'underscore'
Backbone = require 'backbone'
sd = require('sharify').data
FlashMessage = require '../../../components/flash/index'

module.exports = class UnsubscribeView extends Backbone.View
  events:
    'click input[name="selectAll"]': 'toggleSelectAll'
    'submit form': 'submit'
    'click button': 'submit'

  toggleSelectAll: (e) ->
    @$('input[name!="selectAll"]').prop 'checked', $(e.currentTarget).is(':checked')

  submit: (e) ->
    e.preventDefault()
    if @$("input[name='selectAll']").prop('checked')
      types = ['all']
    else
      types = _.without @$('input:checked').map(-> $(this).attr('name')), 'selectAll'
    (@$button ?= @$('button')).attr 'data-state', 'loading'
    new Backbone.Model().save { authentication_token: sd.UNSUB_AUTH_TOKEN, type: types },
      url: "#{sd.API_URL}/api/v1/me/unsubscribe"
      success: =>
        @$button.attr 'data-state', null
        new FlashMessage message: 'You’ve been unsubscribed.'
      error: =>
        @$button.attr 'data-state', 'error'
        new FlashMessage message: 'Whoops, there was an error.'
