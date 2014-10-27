_ = require 'underscore'
qs = require 'querystring'
moment = require 'moment'
Backbone = require 'backbone'
{ EMBEDLY_KEY } = require('sharify').data
{ crop, resize } = require '../resizer/index.coffee'

class Response extends Backbone.Model
  resizeUrlFor: ->
    resize @get('thumbnail_url'), arguments...

  cropUrlFor: ->
    crop @get('thumbnail_url'), arguments...

  date: (attr) ->
    moment @get(attr)

module.exports = class Embedly extends Backbone.Collection
  model: Response

  url: 'https://api.embed.ly/1/oembed'

  fetch: (options = {}) ->
    data = qs.stringify _.extend(options.data, key: EMBEDLY_KEY)
    Backbone.Collection::fetch.call this, _.extend options,
      data: data, processData: false
