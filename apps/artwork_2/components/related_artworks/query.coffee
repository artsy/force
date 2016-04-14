module.exports = """
  fragment related_artworks on Artwork {
    layers {
      id
      name
    }
    layer(id: "main") {
      id
      name
      artworks {
        ... artwork_brick
      }
    }
  }
"""
