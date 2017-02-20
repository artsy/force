Backbone = require 'backbone'
{ API_URL } = require('sharify').data
Representative = require '../models/representative.coffee'

module.exports = class Representatives extends Backbone.Collection
  model: Representative

  url: "#{API_URL}/api/v1/admins/available_representatives"

  fetch: ->
    dfd = $.Deferred()
    Backbone.Collection::fetch.call this, success: =>
      promises = @map (representative) ->
        representative.fetch()
      $.when.apply(null, promises).then dfd.resolve
    dfd.promise()
