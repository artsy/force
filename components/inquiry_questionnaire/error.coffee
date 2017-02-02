FlashMessage = require '../flash/index.coffee'
Errors = require '../form/errors.coffee'
sd = require('sharify').data

module.exports = (error) ->
  if sd.RAYGUN_KEY
    rg4js = require 'raygun4js'
    rg4js 'send', error

  parser = new Errors $('<form></form>')

  message = parser.parse error

  subject = encodeURIComponent 'Problem with sending inquiry'

  body = encodeURIComponent "
    URL: #{window.location.href}
    Message: #{message}
  "

  new FlashMessage
    message: "
      There has been an error:<br>
      #{message}<br>
      Click here to contact support@artsy.net
    "
    href: "mailto:support@artsy.net?subject=#{subject}&body=#{body}"
    autoclose: false
    safe: false
