Backbone = require 'backbone'
sd = require('sharify').data
{ Markdown } = require 'artsy-backbone-mixins'
insane = require('insane')
_ = require 'underscore'

module.exports = class Page extends Backbone.Model

  _.extend @prototype, Markdown

  urlRoot: "#{sd.API_URL}/api/v1/page"

  sanitizedHtml: (attr) ->
    clean = insane(@get(attr))
    Markdown.mdToHtml.apply { get: -> clean }, [null, sanitize: false]
