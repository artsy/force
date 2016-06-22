module.exports = """
  fragment artwork_metadata_stub_contact on Artwork {
    _id
    href
    is_inquireable
    is_in_auction
    partner(shallow: true) {
      type
      is_limited_fair_partner
      href
    }
  }
"""
