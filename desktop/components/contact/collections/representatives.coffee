Backbone = require 'backbone'
{ API_URL } = require('sharify').data

Profile = require '../../../models/profile'
class Representative extends Profile
  idAttribute: 'default_profile_id'

module.exports = class Representatives extends Backbone.Collection
  url: "#{API_URL}/api/v1/admins/available_representatives"
  model: Representative

  fetch: ->
    dfd = $.Deferred()
    Backbone.Collection::fetch.call this, success: =>
      promises = @map (representative) ->
        representative.fetch()
      $.when.apply(null, promises).then dfd.resolve
    dfd.promise()
