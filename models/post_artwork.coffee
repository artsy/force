Backbone = require 'backbone'
Artwork  = require('./artwork.coffee')

module.exports = class PostArtwork extends Backbone.Model

  artwork: -> new Artwork(@get('artwork'))
