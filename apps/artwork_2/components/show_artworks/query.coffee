module.exports = """
  fragment show_artworks on Artwork {
    shows(size: 1, active: false) {
      name
      href
      type
      artworks(all: true, size: 50, exclude: [$id]) {
        ... artwork_brick
      }
    }
  }
"""
