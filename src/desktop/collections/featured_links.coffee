Backbone = require 'backbone'
sd = require('sharify').data
_ = require 'underscore'
FeaturedLink = require '../models/featured_link.coffee'
{ Fetch } = require 'artsy-backbone-mixins'

module.exports = class FeaturedLinks extends Backbone.Collection

  _.extend @prototype, Fetch(sd.API_URL)

  model: FeaturedLink
