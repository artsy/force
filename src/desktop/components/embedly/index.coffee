_ = require 'underscore'
qs = require 'querystring'
Backbone = require 'backbone'
{ EMBEDLY_KEY } = require('sharify').data

module.exports = class Embedly extends Backbone.Collection
  initialize: (models, options = {}) ->
    { @method } = _.defaults options, method: 'oembed'

  url: ->
    "https://api.embed.ly/1/#{@method}"

  fetch: (options = {}) ->
    data = qs.stringify _.extend(options.data, key: EMBEDLY_KEY)
    Backbone.Collection::fetch.call this, _.extend options,
      data: data, processData: false
