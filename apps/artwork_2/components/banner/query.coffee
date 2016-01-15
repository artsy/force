module.exports = """
  fragment banner on Artwork {
    banner: related {
      __typename
      ... on RelatedSale {
        name
        href
        end_at
      }
      ... on RelatedFair {
        name
        href
      }
    }
  }
"""
