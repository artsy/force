markdown = require('markdown').markdown

stripTags = (str) ->
  return '' unless str?
  String(str).replace(/<\/?[^>]+>/g, '')

module.exports =
  mdToHtml: (attr) ->
    markdown.toHTML @get(attr) or ''

  mdToHtmlToText: (attr) ->
    stripTags(@mdToHtml attr)

  htmlToText: (attr) ->
    stripTags(@get attr)
