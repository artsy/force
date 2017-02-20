module.exports = """
  highlights {
    __typename
    ... on HighlightedArticle {
      title
      href
      author {
        name
      }
      image: thumbnail_image {
        thumb: cropped(width: 200, height: 200) {
          url
          width
          height
        }
      }
    }
    ... on HighlightedShow {
      name
      href
      partner {
        href
        name
      }
      location {
        city
      }
      status
      start_at(format: "MMM D")
      end_at(format: "MMM D")
      images(size: 2) {
        thumb: cropped(width: 200, height: 200) {
          width
          height
          url
        }
      }
    }

  }
"""
