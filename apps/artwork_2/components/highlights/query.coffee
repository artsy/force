module.exports = """
  fragment highlights on Artwork {
    highlights {
      __typename
      ... on HighlightedArticle {
        title
        href
        author {
          name
        }
        image: thumbnail_image {
          thumb: resized(width: 259) {
            url
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
        start_at(format: "MMM. Do")
        end_at(format: "MMM. Do")
        images(size: 2) {
          thumb: resized(height: 145) {
            width
            height
            url
          }
        }
      }
    }
  }
"""
