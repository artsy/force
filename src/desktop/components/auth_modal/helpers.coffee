sd = require('sharify').data

module.exports =
  fbSignup: (e) ->
    e.preventDefault()
    queryData =
      'signup-intent': @signupIntent
      'signup-referer': @signupReferer
      'redirect-to': @afterAuthPath
    queryString = $.param(queryData)
    fbUrl = sd.AP.facebookPath + '?' + queryString
    return window.location.href = fbUrl
