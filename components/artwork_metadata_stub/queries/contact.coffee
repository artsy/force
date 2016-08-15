module.exports = """
  fragment artwork_metadata_stub_contact on Artwork {
    _id
    href
    is_inquireable
    is_in_auction
    is_biddable
    partner(shallow: true) {
      type
      href
    }
  }
"""
