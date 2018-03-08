module.exports = """
  fragment metadata on Artwork {
    _id
    id
    href
    title
    series
    date
    edition_of
    attribution_class {
      short_description
      long_description
    }
    artists {
      _id
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
    website
    image_rights
    is_downloadable
    is_inquireable
    sale_artwork {
      lot_label
    }
  }
"""
