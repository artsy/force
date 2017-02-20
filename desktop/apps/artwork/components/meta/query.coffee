module.exports = """
  fragment meta on Artwork {
    href
    is_shareable
    meta_image: image {
      resized(width: 640, height: 640, version: ["large", "medium", "tall"]) {
        width
        height
        url
      }
    }
    meta {
      title
      description(limit: 155)
      long_description: description(limit: 200)
    }
  }
"""
