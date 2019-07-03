Backbone = require 'backbone'
sd = require('sharify').data
{ Markdown } = require 'artsy-backbone-mixins'
sanitizeHtml = require('sanitize-html')
_ = require 'underscore'

module.exports = class Page extends Backbone.Model

  _.extend @prototype, Markdown

  urlRoot: "#{sd.API_URL}/api/v1/page"

  sanitizedHtml: (attr) ->
    clean = sanitizeHtml(@get(attr), {
      allowedTags: sanitizeHtml.defaults.allowedTags.concat([ 'h1', 'h2', 'summary', 'details' ])
    })
    Markdown.mdToHtml.apply { get: -> clean }, [null, sanitize: false]
