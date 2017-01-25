module.exports = """
  fragment artwork on Artwork {
    id
    _id
    href
    title
    date
    images {
      id
      image_url: url(version: ["tall"])
      image_versions: versions
      placeholder: resized(width: 30, height: 30, version: "tall") {
        image_url: url
      }
    }
    artists {
      id
      name
      href
      public
    }
    cultural_maker
    medium
    dimensions {
      in
      cm
    }
    acquireable: is_acquireable
    ecommerce: is_acquireable
    image_rights
    sale_message
    is_for_sale
    is_inquireable
    is_biddable
    partner {
      name
      href
      type
      default_profile_public: is_default_profile_public
      default_profile_id
      locations {
        city
        phone
      }
    }
    sale {
      name
      is_live_open
    }
    sale_artwork {
      lot_number
      counts {
        bidder_positions
      }
      current_bid {
        display
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
