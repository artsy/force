module.exports = """
  query artworks($ids: [String]) {
    artworks(ids: $ids) {
      _id
      id
      href
      image {
        thumb: resized(height: 170, version: "large") {
          url
        }
      }
    }
  }
"""
