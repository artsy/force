module.exports = """
  fragment auction_artworks on Artwork {
    sale {
      name
      href
      name
      href
      is_open
      artworks(all: true, size: 50, exclude: [$id]) {
        sale_artwork {
          lot_number
        }
        #{require('./index.coffee')}
      }
    }
  }
"""
