{ ARTWORK_DISPLAY_NUM } = require './config.coffee'

module.exports = """
  fragment auction_artworks on Artwork {
    auction: context {
      ... on ArtworkContextAuction {
        name
        status
        href
        start_at
        live_start_at
        end_at

        artworks(size: #{ARTWORK_DISPLAY_NUM}, exclude: [$id]) {
          ... auction_artwork_brick
        }
      }
    }
  }
  #{require '../../../../components/auction_artwork_brick/query.coffee'}
"""
