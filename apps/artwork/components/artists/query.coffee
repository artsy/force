module.exports = """
  fragment artists on Artwork {
    artists {
      bio
      name
      href
      biography: blurb(format: HTML)
      exhibition_highlights(size: 20) {
        kind
        name
        start_at
        href
        partner {
          ... on ExternalPartner {
            name
          }
          ... on Partner {
            name
          }
        }
        location {
          city
          country
        }
      }
      articles {
        thumbnail_image {
          cropped(width: 100, height: 100) {
            url
          }
        }
        href
        title
        author {
          name
        }
      }
      artists(size: 16) {
        ... artistCell
      }
    }
  }
  #{require '../../../../components/artist_cell/query.coffee'}
"""
