module.exports = """
  fragment artists on Artwork {
    artists {
      bio
      name
      href
      blurb(format: HTML)
      biography_blurb(format: HTML, partner_bio: true) {
        text
        credit
        partner_id
      }
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
            is_linkable
            href
          }
        }
        city
        fair {
          id
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
