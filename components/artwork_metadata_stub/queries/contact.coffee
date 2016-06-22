module.exports = """
  fragment artwork_metadata_stub_contact on Artwork {
    _id
    href
    is_inquireable
    partner(shallow: true) {
      type
      is_limited_fair_partner
      href
    }
  }
"""
