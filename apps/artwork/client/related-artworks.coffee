_         = require 'underscore'
sd        = require('sharify').data
Backbone  = require 'backbone'

Artworks            = require '../../../collections/artworks.coffee'
ArtworkColumnsView  = require '../../../components/artwork_columns/view.coffee'
Transition          = require '../../../components/mixins/transition.coffee'

module.exports = class RelatedArtworksView extends Backbone.View
  initialize: (options = {}) ->
    { @model } = options

    @$container = @$('#artwork-related-artworks-container')

    @collection = new Artworks
    @collection.url = "#{sd.ARTSY_URL}/api/v1/related/layer/synthetic/main/artworks"
    @collection.fetch data: 'artwork[]': @model.id
    @listenTo @collection, 'sync', @render

  render: ->
    if @collection.length
      Transition.fade @$el.show(),
        duration: 500
        in: =>
          @artworkColumnsView = new ArtworkColumnsView
            el: @$container
            collection: @collection
            numberOfColumns: 4
            gutterWidth: 40
            maxArtworkHeight: 400
            isOrdered: false
            seeMore: false
    else
      @remove()
