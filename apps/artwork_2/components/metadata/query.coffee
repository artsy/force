module.exports = """
  fragment metadata on Artwork {
    href
    title
    date
    artists {
      id
      name
      href
    }
    cultural_maker
    medium
    dimensions {
      in
      cm
    }
    image_rights
    sale_message
    is_for_sale
    is_contactable
    partner {
      name
      href
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
      edition_of
      price
      dimensions {
        in
        cm
      }
    }
  }
"""
