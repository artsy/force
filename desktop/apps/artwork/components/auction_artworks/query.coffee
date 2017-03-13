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

module.exports.followed_artist_ids = (CurrentUser) =>
  isLoggedIn = Boolean(CurrentUser)

  """
  fragment followed_artist_ids on RootQueryType {
    followed_artist_ids: filter_artworks(
      sale_id: $auctionId
      size: #{ARTWORK_DISPLAY_NUM},
      #{
        # Guard against this query field as it will throw, even if false, if
        # not logged in.
        if isLoggedIn
          "include_artworks_by_followed_artists: true"
        else
          ""
      }
    ) {
      hits {
        id
      }
    }
  }
  """
