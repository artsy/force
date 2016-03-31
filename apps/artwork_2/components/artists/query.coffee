module.exports = """
  fragment artists on Artwork {
    artists {
      name
      href
      biography: blurb(format: HTML)
      articles {
        title
        href
        author {
          name
        }
        image: thumbnail_image {
          thumb: cropped(width: 185, height: 130) {
            width
            height
            url
          }
        }
      }
      exhibition_highlights: partner_shows {
        kind
        year: start_at(format: "YYYY")
        name
        href
        partner {
          name
        }
        location {
          city
        }
      }
    }
  }
"""
