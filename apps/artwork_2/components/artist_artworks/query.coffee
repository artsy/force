module.exports = """
  fragment artist_artworks on Artwork {
    artist {
      name
      href
      counts {
        artworks(format: "0,0", label: "work")
      }
      artworks(size: 10, filter: [IS_FOR_SALE], exclude: [$id]) {
        ... artwork_brick
      }
    }
  }
"""
