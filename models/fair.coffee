sd        = require('sharify').data
Backbone  = require 'backbone'

module.exports = class Fair extends Backbone.Model

  href: ->
    "/#{@get('id')}"

  fetchOptions: (options) ->
    new Backbone.Model(null,
      url: "#{sd.GRAVITY_URL}/api/v1/search/filtered/fair/#{@get 'id'}/options"
    ).fetch options