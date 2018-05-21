module.exports = """
  fragment partner_stub on Artwork {
    _id
    collecting_institution
    is_in_auction
    is_inquireable
    is_for_sale
    partner {
      _id
      type
      is_linkable
      href
      name
      # TODO: Either uncomment or remove based on Credit Card logo feature timeline
      # acceptsCardPayments
      locations {
        city
      }
    }
  }
"""
