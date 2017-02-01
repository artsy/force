module.exports = """
  fragment commercial on Artwork {
    _id
    id
    is_acquireable
    is_inquireable
    is_purchasable
    is_in_auction
    sale_message
    availability
    is_price_range
    price
    artists {
      name
      is_consignable
    }
    partner {
      id
      name
      type
      is_pre_qualify
      contact_message
    }
    fair {
      id
      name
    }
    edition_sets {
      id
      is_sold
      is_acquireable
      edition_of
      price
      dimensions {
        in
        cm
      }
    }
  }
"""
