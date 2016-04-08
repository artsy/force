module.exports = """
  fragment metadata on Artwork {
    id
    href
    title
    series
    date
    artists {
      id
      name
      href
    }
    cultural_maker
    collecting_institution
    medium
    dimensions {
      in
      cm
    }
    image_rights
    sale_message
    is_acquireable
    is_for_sale
    is_contactable
    partner {
      name
      href
      type
      initials
      is_limited_fair_partner
      locations {
        city
        phone
      }
    }
    auction: sale {
      id
      sale_artwork(id: $id) {
        lot_number
      }
    }
    edition_of
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
