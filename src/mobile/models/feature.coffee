_ = require 'underscore'
Backbone = require 'backbone'
sd = require('sharify').data
ABM = require 'artsy-backbone-mixins'
FeaturedLinks = require '../collections/featured_links.coffee'
FeaturedSet = require '../models/featured_set.coffee'
Artworks = require '../collections/artworks.coffee'
Sale = require '../models/sale.coffee'

module.exports = class Feature extends Backbone.Model

  _.extend @prototype, ABM.Markdown
  _.extend @prototype, ABM.Feature(sd.API_URL, Sale, Artworks, FeaturedSet, FeaturedLinks)
  _.extend @prototype, ABM.Image(sd.API_URL)

  urlRoot: -> "#{sd.API_URL}/api/v1/feature"
