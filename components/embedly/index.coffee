_ = require 'underscore'
qs = require 'querystring'
moment = require 'moment'
Backbone = require 'backbone'
{ EMBEDLY_KEY } = require('sharify').data
{ crop, resize } = require '../resizer/index.coffee'

class Embed extends Backbone.Model
  resizeUrlFor: ->
    resize @get('thumbnail_url'), arguments...

  cropUrlFor: ->
    crop @get('thumbnail_url'), arguments...

  date: (attr) ->
    moment @get(attr)

module.exports = class Embedly extends Backbone.Collection
  model: Embed

  url: 'https://api.embed.ly/1/oembed'

  parse: (response) ->
    # Filter out embeds without images; for now
    _.filter response, (embed) ->
      _.has embed, 'thumbnail_url'

  fetch: (options = {}) ->
    data = qs.stringify _.extend(options.data, key: EMBEDLY_KEY)
    Backbone.Collection::fetch.call this, _.extend options,
      data: data, processData: false
