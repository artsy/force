{ CLIENT } = require('sharify').data
metaphysics = require '../../../../lib/metaphysics.coffee'
ArtworkMasonryView = require '../../../../components/artwork_masonry/view.coffee'
template = -> require('../../../../components/artwork_masonry/index.jade') arguments...

query = """
  query artwork($id: String!, $artwork_id: String!) {
    artwork(id: $artwork_id) {
      layer(id: $id) {
        id
        name
        artworks {
          ... artwork_brick
        }
      }
    }
  }
  #{require '../../../../components/artwork_brick/query.coffee'}
"""

module.exports = ->
  $el = $('.js-artwork-related-artworks')

  return unless $el.length

  $links = $el.find '.js-artwork-tabs-link'
  $sections = $el.find '.js-artwork-tabs-section'

  masonryView = new ArtworkMasonryView el: $sections

  artworks = $sections
    .find '[data-id]'
    .map -> $(this).data 'id'
    .get()
    .map (id) -> id: id

  masonryView
    .reset artworks
    .postRender()

  $links
    .click ->
      $links
        .attr 'data-state', 'inactive'

      { id } = $(this)
        .attr 'data-state', 'active'
        .data()

      $sections
        .attr 'data-loading', true

      metaphysics query: query, variables: id: id, artwork_id: CLIENT.id
        .then (data) ->
          masonryView
            .reset data.artwork.layer.artworks
            .render()
            .$el.attr 'data-loading', false
