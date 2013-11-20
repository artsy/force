Backbone = require 'backbone'
sd = require('sharify').data
Artwork = require '../models/artworks'

module.exports = class Artworks extends Backbone.Collection

  model: Artwork