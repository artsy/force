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
    contact_message
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
    }
    fair {
      id
      name
    }
    edition_sets {
      id
      is_acquireable
      edition_of
      sale_message
      dimensions {
        in
        cm
      }
    }
  }
"""
