_         = require 'underscore'
Backbone  = require 'backbone'

_.mixin(require 'underscore.string')

# Extract out into a site-wide language file (?)
en =
  errors:
    'Email not found': 'Sorry, we couldn&rsquo;t find an account with that email.'

module.exports =
  # Serializes the form object
  #
  # @param {$Object} $form
  # @returns {Object}
  serializeForm: ($form) ->
    debugger
    $form ||= @$('form')
    _.reduce($form.serializeArray(), (memo, input) ->
      memo[input.name] = _.trim input.value
      memo
    , {})

  # Checks for required fileds then sets the data-state to error
  # if they are empty
  #
  # @param {$Object} $form
  # @returns {Boolean}
  validateForm: ($form) ->
    $form ||= @$('form')
    values = _.map $form.find(':input[required]'), (el) ->
      $el   = $(el)
      val   = $el.val()
      $el.attr 'data-state', (if _.isEmpty val then 'error' else 'ok')
      val
    not _.some values, (val) -> _.isEmpty val

  # Attempt to normalize the error response and pull out a message
  #
  # @param {Object} xhr
  # @returns {String}
  errorMessage: (xhr) ->
    parsed = $.parseJSON(xhr.responseText)

    # Pull out the appropriate string
    message = if _.has(parsed, 'text')
      parsed.text
    else if _.has(parsed, 'error')
      parsed.error
    else if _.has(parsed, 'details') and _.isArray(parsed.details)
      parsed.details.join('; ')
    else if _.has(parsed, 'detail')
      _.map(parsed.detail, (v, k) =>
        # For param_errors we can point out the problematic fields
        # provided they have name attributes
        @$("input[name=#{k}]").attr 'data-state', 'error'

        "#{_.capitalize(k)} #{v}"
      ).join('; ')

    # Check for alternate copy mapping
    if _.has(en.errors, message)
      en.errors[message]
    else
      message
