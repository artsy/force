{ CDN_URL, JS_EXT } = require('sharify').data

module.exports = (packageName, callback) ->
  $.ajax
    cache: true
    type: 'GET'
    dataType: 'script'
    url: (CDN_URL or '') + '/assets/' + packageName + JS_EXT
    success: callback
