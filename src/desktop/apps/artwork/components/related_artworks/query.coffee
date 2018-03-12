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
      artworks {
        ... artwork_brick
      }
    }
    related(size: 1) {
      _id
    }
  }
"""
