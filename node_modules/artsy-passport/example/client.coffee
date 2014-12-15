sd = require('sharify').data

$ ->
  $('body').append "<br><br>your email from the client-side!<br> " + sd.CURRENT_USER.email

  $('a.logout').click ->
    $.ajax
      url: '/users/sign_out'
      type: 'DELETE'
      success: ->
        window.location = '/'
      error: (xhr, status, error) ->
        alert(error)
