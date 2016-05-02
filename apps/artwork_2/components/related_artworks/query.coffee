module.exports = """
  fragment related_artworks on Artwork {
    layers {
      id
      name
    }
    layer(id: "main") {
      id
      name
      href
      artworks {
        ... artwork_brick
      }
    }
  }
"""
