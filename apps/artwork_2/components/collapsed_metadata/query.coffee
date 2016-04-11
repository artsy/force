module.exports = """
  fragment collapsed_metadata on Artwork {
    id
    title
    date
    artists {
      name
    }
    sale_message
    is_contactable
    partner {
      type
    }
    auction: sale {
      id
      sale_artwork(id: $id) {
        lot_number
      }
    }
  }
"""
