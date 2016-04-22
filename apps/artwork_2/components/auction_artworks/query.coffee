module.exports = """
  fragment auction_artworks on Artwork {
    sale {
      name
      href
      artworks(all: true, size: 50) {
        ... artwork_brick
      }
    }
  }
"""
