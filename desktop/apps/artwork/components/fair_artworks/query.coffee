module.exports = """
  fragment fair_artworks on Artwork {
    show(at_a_fair: true) {
      name
      href
      type
      artworks(all: true, size: 50, exclude: [$id]) {
        ... artwork_brick
      }
    }
  }
"""
