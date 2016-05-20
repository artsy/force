module.exports =
  """
  fragment relatedShow on PartnerShow {
    cover_image {
      cropped(width: 150, height: 104) {
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