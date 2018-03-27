module.exports = """
  fragment auction_artworks on Artwork {
    sale {
      name
      href
      name
      href
      is_open
      eligible_sale_artworks_count
      artworks(size: 20, exclude: [$id]) {
        sale_artwork {
          lot_label
        }
        #{require('./index.coffee')}
      }
    }
  }
"""
