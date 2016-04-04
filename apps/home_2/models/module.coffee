_ = require 'underscore'
Backbone = require 'backbone'
Artworks = require '../../../collections/artworks.coffee'

module.exports = class Module extends Backbone.Model
  idAttribute: 'key'

  artworks: ->
    new Artworks @get('results')
