module.exports = """
  fragment artwork_brick on Artwork {
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
    artists {
      href
      name
    }
    partner {
      href
      name
    }
  }
"""
