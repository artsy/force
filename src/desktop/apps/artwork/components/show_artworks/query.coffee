module.exports = """
  fragment show_artworks on Artwork {
    show: context {
      ... on ArtworkContextPartnerShow {
        name
        href
        type
        counts {
          eligible_artworks
        }
        artworks(size: 20, exclude: [$id]) {
          ... artwork_brick
        }
      }
    }
  }
"""
