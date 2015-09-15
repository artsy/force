_ = require 'underscore'
sd = require('sharify').data

module.exports.init = ->
  $('body').css background: 'white'

  $('.js-toolkit-download').click (e)->
  $(e.currentTarget).attr 'data-state', 'loading'
  $.ajax
    type: 'POST'
    url: '/social-media-toolkit/form'
    data:
      fname: $('input[name=FNAME]').val()
      lname: $('input[name=LNAME]').val()
      email: $('input[name=EMAIL]').val()
      galleryname: $('input[name=GALLERYNAME]').val()
      url: $('input[name=URL]').val()
    error: (xhr) ->
      $(e.currentTarget).attr 'data-state', 'error'
      $('.toolkit-error').text(xhr.responseText)
    success: (res) =>
      $(e.currentTarget).attr 'data-state', null
      $('.toolkit-form').fadeOut ->
        $('.toolkit-thank-you').fadeIn()