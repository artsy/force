Showdown = require 'showdown'
converter = new Showdown.converter()

module.exports =
  
  mdToHtml: (attr) ->
    converter.makeHtml @get attr