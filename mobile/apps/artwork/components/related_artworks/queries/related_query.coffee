module.exports = """
  fragment related_artworks on Artwork {
    layer(id: "main") {
      name
      artworks {
        #{require('./index.coffee')}
      }
    }
  }
"""
