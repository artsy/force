module.exports = """
  fragment commercial on Artwork {
    id
    is_acquireable
    is_contactable
    is_in_auction
    sale_message
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
