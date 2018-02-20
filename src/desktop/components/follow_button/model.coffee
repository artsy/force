_ = require 'underscore'
sd = require('sharify').data
Backbone = require 'backbone'

module.exports = class Follow extends Backbone.Model
  urlRoot: ->
    "#{sd.API_URL}/api/v1/me/follow/#{@kind}"

  initialize: (attributes, options = {}) ->
    { @kind } = _.defaults(options, kind: @kind)
    super

  parse: (response) ->
    @kind or= response.kind
    response
