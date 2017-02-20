module.exports = """
  fragment show_artworks on Artwork {
    show: context {
      ... on ArtworkContextPartnerShow {
        name
        href
        type
        artworks(all: true, size: 50, exclude: [$id]) {
          ... artwork_brick
        }
      }
    }
  }
"""
