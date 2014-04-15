{ ASSET_PATH, JS_EXT } = require('sharify').data

module.exports = (packageName, callback) ->
  $.ajax
    cache    : true
    type     : 'GET'
    dataType : 'script'
    url      : ASSET_PATH + packageName + JS_EXT
    success  : callback
