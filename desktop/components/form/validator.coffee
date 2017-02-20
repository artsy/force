_ = require 'underscore'
_s = require 'underscore.string'
Messenger = require './messenger.coffee'

module.exports = class Validator
  constructor: ({ @$form, @$errors }) ->
    @$confirmables = @$form.find('input[data-confirm]')
    @messenger = new Messenger arguments...

  # Checks for required fileds then sets the data-state to error
  # if they are empty
  isValid: ->
    @$form.addClass 'is-validated' # Enables the display of form states

    if @isEligible()
      # Check for any confirmable fields
      @confirm() if @$confirmables.length

      unless isValid = @$form[0].checkValidity()
        try
          @messenger.start()
        catch
          # Ignore; may not support :invalid/:valid selector
          # (In this case for jsdom's benefit)
          # Potential workaround?

      isValid

    else # Let the server handle it
      true

  isEligible: ->
    _.isFunction @$form[0].checkValidity

  setValidity: ($el, message) ->
    $el[0].setCustomValidity? message

  clearValidity: ($el) ->
    $el[0].setCustomValidity? ''

  # Ensures fields with data-confirm='some_name' has a value matching the value
  # of the field called out in the data-confirm attribute
  confirm: ->
    @$confirmables.each (i, el) =>
      $el = $(el)
      confirm = $el.data('confirm')
      $confirm = @$form.find("input[name='#{confirm}']")

      if $confirm.length and $el.val() isnt $confirm.val()
        @setValidity $el, "#{_s.humanize(confirm)} must match"
      else
        @clearValidity $el
