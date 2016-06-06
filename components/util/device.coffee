module.exports =
  isIPad: isIPad = ->
    navigator.userAgent.toLowerCase()
      .indexOf('ipad') > -1

  isEigen: ->
    navigator.userAgent.toLowerCase()
      .indexOf('Artsy-Mobile') > -1

  # http://stackoverflow.com/questions/4817029/whats-the-best-way-to-detect-a-touch-screen-device-using-javascript
  isTouchDevice: isTouchDevice = ->
    'ontouchstart' of window or 'onmsgesturechange' of window

  isPhoneLike: ->
    isTouchDevice() and not isIPad()

  autofocus: ->
    if isTouchDevice() then undefined else true

  isRetina: ->
    (window.devicePixelRatio or 1) > 1

  isFirefox: ->
    navigator.userAgent.toLowerCase()
      .indexOf('firefox') > -1
