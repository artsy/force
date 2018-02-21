module.exports = """
  fragment client on Artwork {
    id
    context {
      __typename

      ... on ArtworkContextAuction {
        is_closed
      }
    }
  }
"""
