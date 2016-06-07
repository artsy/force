module.exports =
  """
  fragment relatedShow on PartnerShow {
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