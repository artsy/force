module.exports =
  """
  fragment relatedShow on Show {
    kind
    partner {
      ... on ExternalPartner {
        name
      }
      ... on Partner {
        name
      }
    }
    city
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
    is_reference
  }
  """
