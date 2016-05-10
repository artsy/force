module.exports = """
  fragment artwork_brick on Artwork {
    _id
    id
    href
    title
    date
    sale_message
    is_inquireable
    image {
      placeholder
      thumb: resized(width: 350, version: ["large", "larger"]) {
        url
        height
      }
    }
    artists(shallow: true) {
      href
      name
    }
    collecting_institution
    partner(shallow: true) {
      href
      name
      type
    }
  }
"""
