sd = require('sharify').data

$ ->
  $('body').append "<br><br>your email from the client-side!<br> " + sd.CURRENT_USER.email