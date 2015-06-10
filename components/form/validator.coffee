_ = require 'underscore'
_s = require 'underscore.string'

module.exports = class Validator
  constructor: (@$form) ->
    @$confirmables = @$form.find('input[data-confirm]')

  # Checks for required fileds then sets the data-state to error
  # if they are empty
  valid: ->
    @$form.addClass 'is-validated' # Enables the display of form states

    if @$form[0].checkValidity
      # Check for any confirmable fields
      @confirm() if @$confirmables.length
      @$form[0].checkValidity()
    else # Let the server handle it
      true

  # Ensures fields with data-confirm='some_name' has a value matching the value
  # of the field called out in the data-confirm attribute
  confirm: ->
    _.each @$confirmables, (el) =>
      $el = $(el)
      confirm = $el.data('confirm')
      $confirm = @$form.find("input[name='#{confirm}']")

      if $confirm.length and $el.val() isnt $confirm.val()
        $el[0].setCustomValidity? "#{_s.humanize(confirm)} must match"
      else
        $el[0].setCustomValidity? ''
