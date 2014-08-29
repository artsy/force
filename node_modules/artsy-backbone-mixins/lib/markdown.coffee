_ = require 'underscore'
marked = require 'marked'
renderer = new marked.Renderer
stripTags = (str) ->
  return '' unless str?
  String(str).replace(/<\/?[^>]+>/g, '')

module.exports =
  mdToHtml: (attr, options = {}) ->
    marked.setOptions _.defaults options,
      renderer: renderer
      gfm: true
      tables: true
      breaks: true
      pedantic: false
      sanitize: true
      smartypants: false
    marked @get(attr) or ''

  mdToHtmlToText: (attr) ->
    stripTags(@mdToHtml attr)

  htmlToText: (attr) ->
    stripTags(@get attr)
