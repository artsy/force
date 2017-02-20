mailcheck = require 'mailcheck'

module.exports.run = (input, hint, br) ->
  input = $(input)
  hint = $(hint)
  input.on 'blur', ->
    input.mailcheck
      suggested: (element, suggestion) ->
        if hint.length
          suggestionBreak = if br then "Did you mean: <br><span class='js-suggestion'><a href=''>" else "Did you mean: <span class='js-suggestion'><a href=''>"
          suggestion =  suggestionBreak + suggestion.full + "</a></span>?"
          hint.html(suggestion).fadeIn(150)
        else
          $('.js-suggestion').html suggestion.full
  hint.on 'click', '.js-suggestion', ->
    input.val($('.js-suggestion').text())
    hint.fadeOut 200, ->
      hint.empty()
    false
