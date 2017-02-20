{ Markdown } = require 'artsy-backbone-mixins'

module.exports = (string) ->
  Markdown.mdToHtml.apply { get: -> string }, [null, sanitize: false]
