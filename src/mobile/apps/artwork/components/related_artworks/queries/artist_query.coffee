module.exports = """
  fragment artist_artworks on Artwork {
    artist {
      name
      href
      counts {
        artworks(format: "0,0")
      }
      artworks(filter: [IS_FOR_SALE], exclude: [$id], size: 20, sort: partner_updated_at_desc) {
        #{require('./index.coffee')}
      }
    }
  }
"""
