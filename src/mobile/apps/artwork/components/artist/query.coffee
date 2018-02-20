module.exports = """
  artists {
    id
    name
    counts {
      artworks(format: "0,0")
      for_sale_artworks
    }
    href
    carousel {
      images {
        resized(height:200) {
          factor
          width
          height
          url
        }
        id
        title
        url
      }
    }
    bio
    blurb(format: HTML)
    biography_blurb(format: HTML, partner_bio: true) {
      text
      credit
      partner_id
    }
    articles {
      title
      href
      author {
        name
      }
      image: thumbnail_image {
        thumb: cropped(width: 100, height: 100) {
          width
          height
          url
        }
      }
    }
    exhibition_highlights(size: 16) {
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
    }
  }

"""
