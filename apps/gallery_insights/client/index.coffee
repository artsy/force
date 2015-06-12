_ = require 'underscore'
sd = require('sharify').data

module.exports.init = ->

  $('.js-gallery-insights-show-form').click (e) ->
    $('.gallery-insights').attr 'data-state', 'unsubscribed'

  $('.js-gallery-insights-subscribe').click (e)->
    $(e.currentTarget).attr 'data-state', 'loading'
    $.ajax
      type: 'POST'
      url: '/gallery-insights/form'
      data:
        email: $('input[name=EMAIL]').val()
        fname: $('input[name=FNAME]').val()
        lname: $('input[name=LNAME]').val()
      error: (xhr) ->
        $(e.currentTarget).attr 'data-state', 'error'
        $('.gallery-insights-error').text(xhr.responseText)
      success: (res) =>
        $(e.currentTarget).attr 'data-state', null
        $('.gallery-insights-form').fadeOut ->
          $('.gallery-insights-thank-you').fadeIn()