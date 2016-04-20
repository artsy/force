module.exports = """
  fragment show_artworks on Artwork {
    shows(size: 1, active: true) {
      name
      href
      artworks {
        ... artwork_brick
      }
    }
  }
"""
