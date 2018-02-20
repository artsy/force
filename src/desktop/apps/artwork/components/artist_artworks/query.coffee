module.exports = """
  fragment artist_artworks on Artwork {
    artist {
      name
      href
      counts {
        artworks(format: "0,0", label: "work")
      }
      artworks(size: 20, sort: published_at_desc, filter: [IS_FOR_SALE], exclude: [$id]) {
        ... artwork_brick
      }
    }
  }
"""
