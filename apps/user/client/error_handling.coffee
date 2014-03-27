#
# Common Error Handling Functions
#
_ = require 'underscore'

module.exports =

  parseErrors: (model, resp, options) ->
    @renderErrors model, resp.responseJSON.detail

  clearErrors: ->
    @$('.settings-form-error')
      .removeClass('settings-form-message').text ''

  renderErrors: (model, errors, options) ->
    _.each errors, (error, key, list) =>
      error = error[0] if _.isArray error
      @$(".settings-form-error[data-attr='#{key}']").text error
