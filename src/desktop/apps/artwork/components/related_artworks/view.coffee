Backbone = require 'backbone'
metaphysics = require '../../../../../lib/metaphysics.coffee'
ArtworkMasonryView = require '../../../../components/artwork_masonry/view.coffee'
sd = require('sharify').data
helpers = require './helpers.coffee'
template = -> require('./templates/masonry.jade') arguments...

layerQuery = """
  query artwork($id: String!, $artwork_id: String!) {
    artwork(id: $artwork_id) {
      layer(id: $id) {
        id
        name
        href
        artworks {
          ... artwork_brick
        }
      }
    }
  }
  #{require '../../../../components/artwork_brick/query.coffee'}
"""

relatedQuery = """
  query artwork($artwork_id: String!) {
    artwork(id: $artwork_id) {
      related {
        ... artwork_brick
      }
    }
  }
  #{require '../../../../components/artwork_brick/query.coffee'}
"""

module.exports = class ArtworkRelatedArtworksView extends Backbone.View
  events:
    'click .js-artwork-tabs-link': 'activate'

  @cache: (selector) -> ->@[selector] ?= @$(selector)

  links: @cache '.js-artwork-tabs-link'
  sections: @cache '.js-artwork-tabs-section'

  initialize: ({ @id }) -> #

  activate: (e) ->
    e.preventDefault()
    @links()
      .attr 'data-state', 'inactive'

    { id } = $(e.currentTarget)
      .attr 'data-state', 'active'
      .data()

    relatedTab = id is 'users-also-viewed'

    @sections()
      .attr 'data-loading', true

    query = if relatedTab then relatedQuery else layerQuery

    metaphysics query: query, variables: id: id, artwork_id: @id
      .then ({ artwork }) =>
        if relatedTab
          artwork.layer =
            id: 'related-artworks'
            artworks: artwork.related

        @sections()
          .attr 'data-loading', false
          .html template
            layer: artwork.layer
            helpers: related_artworks: helpers
            sd: sd

        @postRender artwork.layer.artworks

  postRender: (artworks) ->
    (@masonryView ?= new ArtworkMasonryView el: @sections(), context_page: 'Artwork page', context_module: 'Related artworks module')
      .reset artworks
      .postRender()
