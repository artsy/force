_ = require 'underscore'
Backbone = require 'backbone'
{ API_URL } = require('sharify').data

module.exports = class Introduction extends Backbone.Model
  url: "#{API_URL}/api/v1/me/inquiry_introduction"

  generate: (user, userInterests, attendance, options = {}) ->
    attributes = user.pick 'name', 'profession', 'collector_level'
    attributes.location = user.location()?.attributes if user.location()?
    artistNames = _.pluck userInterests?.pluck('interest'), 'name'
    attributes.collection = artistNames if artistNames.length
    attributes.attending = attendance.get('name') if attendance
    @save attributes, options
