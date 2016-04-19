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
    sale {
      id
      is_auction
      sale_artwork(id: $id) {
        lot_number
      }
    }
  }
"""
