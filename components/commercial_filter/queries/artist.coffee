module.exports = """
  fragment artist on Artist {
    id
    _id
    href
    public
    name
    image {
      thumb: resized(width: 50, version: "square") {
        url
      }
    }
  }
"""
