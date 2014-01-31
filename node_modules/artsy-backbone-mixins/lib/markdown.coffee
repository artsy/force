Showdown = require 'showdown'
converter = new Showdown.converter()

module.exports =

  mdToHtml: (attr) ->
    converter.makeHtml @get(attr) or ''

  mdToHtmlToText: (attr) ->
    @mdToHtml(attr).replace(/<(?:.|\n)*?>/gm, '')

  htmlToText: (attr) ->
    @get(attr).replace(/<(?:.|\n)*?>/gm, '')