module.exports =
  isIPad: ->
    userAgent = navigator.userAgent.toLowerCase()
    userAgent.search('ipad') > -1

  # http://stackoverflow.com/questions/4817029/whats-the-best-way-to-detect-a-touch-screen-device-using-javascript
  isTouchDevice: ->
    'ontouchstart' of window or 'onmsgesturechange' of window

  autofocus: ->
    if @isTouchDevice() then undefined else true
