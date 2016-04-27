module.exports = """
  fragment artist_artworks on Artwork {
    artist {
      name
      href
      artworks(size: 10, filter: [IS_FOR_SALE]) {
        ... artwork_brick
      }
    }
  }
"""
