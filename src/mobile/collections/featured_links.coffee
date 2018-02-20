Backbone = require 'backbone'
sd = require('sharify').data
_ = require 'underscore'
FeaturedLink = require '../models/featured_link.coffee'
{ Fetch } = require 'artsy-backbone-mixins'

module.exports = class FeaturedLinks extends Backbone.Collection

  _.extend @prototype, Fetch(sd.API_URL)

  model: FeaturedLink

  url: -> "#{sd.API_URL}/api/v1/set/5172bbb97695afc60a000001/items"

  @fetchHomepageSet: (options = {}) ->
    sets = new Backbone.Collection
    sets.url = "#{sd.API_URL}/api/v1/sets?key=homepage:features"
    sets.fetch success: (sets) ->
      links = new FeaturedLinks id: sets.first().get 'id'
      links.fetch _.extend options, data: { size: 4 }
