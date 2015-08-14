_ = require 'underscore'
_s = require 'underscore.string'
errors =
  'Email not found': 'Sorry, we couldn&rsquo;t find an account with that email.'

module.exports = class Errors
  constructor: (@$form) -> #

  parse: (xhr) ->
    try
      parsed = $.parseJSON(xhr.responseText)
    catch e
      parsed = text: 'There was an error'

    # Pull out the appropriate string
    message = if _.has(parsed, 'text')
      parsed.text

    else if _.has(parsed, 'error')
      parsed.error.message or parsed.error

    else if _.has(parsed, 'details') and _.isArray(parsed.details)
      parsed.details.join('; ')

    else if _.has(parsed, 'detail')
      _.map(parsed.detail, (v, k) =>
        # For param_errors we can point out the problematic fields
        # provided they have name attributes
        @$form.find("[name=#{k}]").attr 'data-state', 'error'

        "#{_s.humanize(k)} #{v}"
      )
        .join('; ')
        # Multiple errors on a single param are
        # returned joined by commas without spaces
        .replace(/(.),(.)/, '$1; $2')

    # Check for alternate copy mapping
    if _.has(errors, message)
      errors[message]
    else
      # Always return a string
      message or ''
