_ = require 'underscore'
Backbone = require 'backbone'
{ API_URL } = require('sharify').data

module.exports = class Introduction extends Backbone.Model
  url: "#{API_URL}/api/v1/me/inquiry_introduction"

  generate: (user, bookmarks, options = {}) ->
    attributes = user.pick 'name', 'profession', 'collector_level'
    attributes.location = user.location()?.attributes if user.location()?
    artistNames = _.pluck bookmarks?.pluck('interest'), 'name'
    attributes.collection = artistNames if artistNames.length
    @save attributes, options
