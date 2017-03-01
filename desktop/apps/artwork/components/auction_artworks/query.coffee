module.exports = """
  fragment auction_artworks on Artwork {
    auction: context {
      ... on ArtworkContextAuction {
        name
        href
        artworks(all: true, size: 50, exclude: [$id]) {
          ... auction_artwork_brick
        }
      }
    }
  }
  #{require '../../../../components/auction_artwork_brick/query.coffee'}
"""
