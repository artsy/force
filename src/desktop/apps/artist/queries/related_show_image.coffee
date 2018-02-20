module.exports = """
  fragment relatedShowImage on Show {
    cover_image {
      cropped(width: 400, height: 300) {
        url
      }
    }
  }
"""
