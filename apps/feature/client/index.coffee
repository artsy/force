_                  = require 'underscore'
sd                 = require('sharify').data
Artworks           = require '../../../collections/artworks.coffee'
ArtworkColumnsView = require '../../../components/artwork_columns/view.coffee'
Backbone           = require 'backbone'
Feature            = require '../../../models/feature.coffee'
artworkColumns     = -> require('../../../components/artwork_columns/template.jade') arguments...

module.exports.FeatureView = class FeatureView extends Backbone.View

  initialize: (options) ->
    # TODO: temp artwork collection to work out artwork columns
    @saleArtworks = new Backbone.Collection []
    @saleArtworks.fetch
      data:
        page: 1
        size: 30
      success: =>
        @renderArtworks()
      url: "#{sd.ARTSY_URL}/api/v1/sale/two-x-two/sale_artworks"

  renderArtworks: ->
    @columnsView = new ArtworkColumnsView
      el:         @$ '.feature-artworks'
      collection: new Artworks @saleArtworks.pluck('artwork')
      gutterWidth: 40
      totalWidth: 1000


module.exports.init = ->

  new FeatureView
    el   : $('#feature')
    model: new Feature sd.FEATURE
