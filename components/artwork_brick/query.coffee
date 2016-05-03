module.exports = """
  fragment artwork_brick on Artwork {
    id
    href
    title
    date
    sale_message
    is_contactable
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
    partner(shallow: true) {
      href
      name
      type
    }
  }
"""
