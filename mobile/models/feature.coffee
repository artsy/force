_ = require 'underscore'
Backbone = require 'backbone'
sd = require('sharify').data
ABM = require 'artsy-backbone-mixins'
FeaturedLinks = require '../collections/featured_links'
FeaturedSet = require '../models/featured_set'
Artworks = require '../collections/artworks'
Sale = require '../models/sale'

module.exports = class Feature extends Backbone.Model

  _.extend @prototype, ABM.Markdown
  _.extend @prototype, ABM.Feature(sd.API_URL, Sale, Artworks, FeaturedSet, FeaturedLinks)
  _.extend @prototype, ABM.Image(sd.API_URL)

  urlRoot: -> "#{sd.API_URL}/api/v1/feature"
