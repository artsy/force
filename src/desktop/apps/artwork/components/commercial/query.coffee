module.exports = """
  fragment commercial on Artwork {
    _id
    id
    is_acquireable
    is_offerable
    is_inquireable
    is_in_auction
    sale_message
    availability
    contact_message
    is_price_hidden
    is_price_range
    price
    price_currency
    shippingInfo
    shippingOrigin
    artists {
      name
      is_consignable
    }
    partner {
      _id
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
      is_offerable
      edition_of
      sale_message
      dimensions {
        in
        cm
      }
    }
  }
"""
