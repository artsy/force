_ = require 'underscore'

module.exports =
  # Serializes the form object
  #
  # @param {$Object} $form
  # @returns {Object}
  serializeForm: ($form) ->
    _.reduce($form.serializeArray(), (memo, input) ->
      memo[input.name] = input.value
      memo
    , {})

  # Checks for required fileds then sets the data-state to error
  # if they are empty
  #
  # @param {$Object} $form
  # @returns {Boolean}
  validateForm: ($form) ->
    values = _.map $form.find(':input[required]'), (el) ->
      $el   = $(el)
      val   = $el.val()
      $el.attr 'data-state', (if _.isEmpty val then 'error' else 'ok')
      val
    not _.some values, (val) -> _.isEmpty val
