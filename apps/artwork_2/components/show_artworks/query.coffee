module.exports = """
  fragment show_artworks on Artwork {
    shows(size: 1, active: true) {
      name
      href
      artworks(all: true, size: 50, exclude: [$id]) {
        ... artwork_brick
      }
    }
  }
"""
