module.exports = """
  fragment metadata on Artwork {
    href
    title
    artists {
      id
      name
      href
    }
    medium
    dimensions {
      in
      cm
    }
    is_contactable
    partner {
      name
      href
    }
  }
"""
