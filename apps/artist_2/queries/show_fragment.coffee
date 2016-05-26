module.exports =
  """
  fragment relatedShow on PartnerShow {
    cover_image {
      cropped(width: 400, height: 300) {
        url
      }
    }
    partner {
      name
    }
    location {
      city
    }
    href
    fair {
      id
      location {
        city
      }
    }
    name
    start_at
    end_at
    exhibition_period
  }
  """