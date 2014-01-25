_        = require 'underscore'
Backbone = require 'backbone'
Artwork  = require('./artwork.coffee')
{ Image } = require 'artsy-backbone-mixins'

module.exports = class PostImage extends Backbone.Model
  _.extend @prototype, Image

  artwork: ->
    if @get('artwork')
      new Artwork(@get('artwork'))
    else
      new Artwork(@attributes)
