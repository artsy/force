{ CLIENT } = require('sharify').data
metaphysics = require '../../../../lib/metaphysics.coffee'
masonry = require '../../../../components/artwork_masonry/index.coffee'
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

  $content = $el.find '.js-artwork-tab'
  $links = $el.find '.js-artwork-tabs__nav__link'

  $links
    .click ->
      $links
        .attr 'data-state', 'inactive'

      { id } = $(this)
        .attr 'data-state', 'active'
        .data()

      $content
        .attr 'data-loading', true

      metaphysics query: query, variables: id: id, artwork_id: CLIENT.id
        .then (data) ->
          $content
            .attr 'data-loading', false
            .html template
              columns: masonry data.artwork.layer.artworks
