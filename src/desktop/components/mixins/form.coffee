_ = require 'underscore'
_s = require 'underscore.string'

# Extract out into a site-wide language file (?)
en =
  errors:
    'Email not found': 'Sorry, we couldn&rsquo;t find an account with that email.'

module.exports =
  # Returns false the first time it is called,
  # true everytime thereafter, until `@submitting`
  # becomes undefined (#reenableForm)
  #
  # Example: `return if @formIsSubmitting()`
  #
  # @returns {Boolean}
  formIsSubmitting: ($button) ->
    return @submitting if @submitting?
    @submitting = true
    $button ?= @$('button')
    $button.prop 'disabled', true
    false

  resetFormState: ($form) ->
    ($form ?= @$('form'))
      .find('button, input, textarea')
      .attr('data-state', null)

  reenableForm: ($button, options = {}) ->
    options = _.defaults options, reset: true
    @resetFormState() if options.reset
    @submitting = undefined
    $button ?= @$('button')
    $button.prop 'disabled', false

  serializeCheckboxes: ($checkboxes) ->
    $checkboxes ?= @$('input:checkbox')
    _.reduce $checkboxes, (memo, checkbox) ->
      memo[checkbox.name] = checkbox.checked
      memo
    , {}

  serializeInputs: ($form) ->
    $form ?= @$('form')
    _.reduce $form.serializeArray(), (memo, input) ->
      value = _s.trim input.value
      if memo[input.name]? # Convert to array
        target = _.flatten [memo[input.name]]
        target.push value
        memo[input.name] = target
      else
        memo[input.name] = value
      memo
    , {}

  # Serializes the form object
  #
  # @param {$Object} $form
  # @returns {Object}
  serializeForm: ($form, $checkboxes) ->
    booleans = @serializeCheckboxes $checkboxes
    form = @serializeInputs $form
    _.extend form, booleans

  # Checks for required fields then sets the data-state to error
  # if they are empty
  #
  # @param {$Object} $form
  # @returns {Boolean}
  validateForm: ($form) ->
    $form ?= @$('form')
    $form.addClass 'is-validated'
    if $form[0].checkValidity
      # Check for any confirmable fields
      if ($confirmables = $form.find('input[data-confirm]')).length
        @validateConfirmables $form, $confirmables
      console.log('herererere')
      $form[0].checkValidity()
    else # Let the server handle it
      true

  # Ensures fields with data-confirm='some_name' has a value matching the value
  # of the field called out in the data-confirm attribute
  validateConfirmables: ($form, $confirmables) ->
    _.each $confirmables, (el) ->
      $el = $(el)
      confirm = $el.data('confirm')
      $confirm = $form.find("input[name='#{confirm}']")
      if $confirm.length and $el.val() isnt $confirm.val()
        $el[0].setCustomValidity? "#{_s.humanize(confirm)} must match"
      else
        $el[0].setCustomValidity? ''

  # Attempt to normalize the error response and pull out a message
  #
  # @param {Object} xhr
  # @returns {String}
  errorMessage: (xhr) ->
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
        @$("[name=#{k}]").attr 'data-state', 'error'

        "#{_s.humanize(k)} #{v}"
      )
        .join('; ')
        # Multiple errors on a single param are
        # returned joined by commas without spaces
        .replace(/(.),(.)/, '$1; $2')

    # Check for alternate copy mapping
    if _.has(en.errors, message)
      en.errors[message]
    else
      # Always return a string
      message or ''

