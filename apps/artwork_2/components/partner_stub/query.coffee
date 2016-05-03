module.exports = """
  fragment partner_stub on Artwork {
    collecting_institution
    is_in_auction
    is_contactable
    is_for_sale
    partner {
      type
      href
      name
      locations {
        city
        phone
      }
    }
  }
"""
