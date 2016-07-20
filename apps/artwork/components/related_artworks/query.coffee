module.exports = """
  fragment related_artworks on Artwork {
    layers {
      id
      name
    }
    layer {
      id
      name
      href
      artworks (size: 10) {
        ... artwork_brick
      }
    }
  }
"""
