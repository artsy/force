{ ARTWORK_DISPLAY_NUM } = require './config.coffee'

module.exports.auction_artworks = """
  fragment auction_artworks on Artwork {
    auction: context {
      ... on ArtworkContextAuction {
        name
        status
        href
        start_at
        live_start_at
        end_at
        eligible_sale_artworks_count

        artworks(size: #{ARTWORK_DISPLAY_NUM}, exclude: [$id]) {
          ... auction_artwork_brick
        }
      }
    }
  }
  #{require '../../../../components/auction_artwork_brick/query.coffee'}
"""

module.exports.followed_artist_ids = """
  fragment followed_artist_ids on RootQueryType {
    followed_artist_ids: filter_artworks(
      sale_id: $auctionId
      size: #{ARTWORK_DISPLAY_NUM},
      include_artworks_by_followed_artists: true
    ) {
      hits {
        id
      }
    }
  }
"""
