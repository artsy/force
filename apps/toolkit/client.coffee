_ = require 'underscore'
sd = require('sharify').data
ShareView = require '../../components/share/view.coffee'

module.exports.init = ->
  $('body').css background: 'white'

  new ShareView el: $('.toolkit-share')

  $('.js-toolkit-download').click (e)->
    $(e.currentTarget).attr 'data-state', 'loading'
    $.ajax
      type: 'POST'
      url: '/social-media-toolkit'
      data:
        fname: $('input[name=FNAME]').val()
        lname: $('input[name=LNAME]').val()
        email: $('input[name=EMAIL]').val()
        gname: $('input[name=GNAME]').val()
        gsite: $('input[name=GSITE]').val()
      # error: (xhr) ->
      #   $(e.currentTarget).attr 'data-state', 'error'
      #   $('.toolkit-error').text(xhr.responseText) **handle this error once Mailchimp endpoint issue is
      success: (res) =>
        $(e.currentTarget).attr 'data-state', null
        $('.toolkit-form').fadeOut ->
          $('.toolkit-thank-you').fadeIn()