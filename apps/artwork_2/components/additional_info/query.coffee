module.exports = """
  fragment additional_info on Artwork {
    articles(size: 2) {
      title
      href
      thumbnail: thumbnail_image {
        image: cropped(width: 150, height: 100) {
          width
          height
          url
        }
      }
      author {
        name
      }
    }
    publisher
    manufacturer
    signature
    provenance(format: HTML)
    description(format: HTML)
    additional_information(format: HTML)
    exhibition_history(format: HTML)
    bibliography: literature(format: HTML)
  }
"""
