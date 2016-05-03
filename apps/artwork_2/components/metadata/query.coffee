module.exports = """
  fragment metadata on Artwork {
    id
    href
    title
    series
    date
    edition_of
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
    website
    image_rights
    is_downloadable
    is_contactable
    sale {
      sale_artwork(id: $id) {
        lot_number
      }
    }
  }
"""
