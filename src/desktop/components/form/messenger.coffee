_ = require 'underscore'
_s = require 'underscore.string'
isExisty = _.negate _.isEmpty
utilities = require './utilities.coffee'

module.exports = class Messenger
  constructor: ({ @$form, @$errors }) ->
    # Disable default validation error bubbles
    @$form[0].addEventListener 'invalid', (e) ->
      e.preventDefault()
    , true

  clear: ->
    @$errors.empty()

    @$form.find(':valid').prev('label').find('.is-error')
      .remove()

  start: ($invalids) ->
    @render $invalids ?= @$form.find ':invalid'

    render = _.debounce _.bind(@render, this, null), 250

    @$form.find('input, textarea').off 'input.validation'
    $invalids.on 'input.validation', render

    utilities.autofocus $invalids.first()

  render: ($invalids) ->
    @clear()

    $invalids ?= @$form.find ':invalid'

    # If there is a label then render inline,
    # otherwise attempt to render into the errors div
    [inline, aggregate] = _.partition @messages($invalids), ({ $el }) -> $el.length

    @$errors.html _.pluck(aggregate, 'message').join '<br>'

    inline.map ({ $el, message }) ->
      if ($error = $el.find('.is-error')).length
        $error.text message
      else
        $el.append "<span class='is-error'>#{message}</span>"

    # remove after gdpr compliance test closes
    $('.gdpr-signup__form__checkbox__accept-terms .is-error').hide() 

  # A field might have multiple validity errors simultaneously,
  # as a user interacts with a form they will all be exposed: not really necessary
  # to display everything at once.
  messages: ($fields) ->
    $fields
      .map (i, el) =>
        $el: @$form.find "label[for='#{el.name}']"
        message: @message el
      .get()

  message: (el) ->
    message = @custom(el) or @fallback(el)
    message += if isExisty(el.title) then ": (#{el.title})" else '.'

  custom: ({ name, type, validity }) ->
    if validity.valueMissing
      if name then "Please enter your #{_s.humanize(name).toLowerCase()}" else 'Please fill out this field'
    else if validity.patternMismatch
      'Please match the requested format'
    else if validity.typeMismatch
      "Please enter a valid #{type}"

  fallback: ({ validationMessage }) ->
    _s.humanize validationMessage.replace /\.$/, ''
