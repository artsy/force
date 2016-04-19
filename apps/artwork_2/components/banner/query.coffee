module.exports = """
  fragment banner on Artwork {
    banner: related {
      __typename
      ... on RelatedSale {
        name
        href
        start_at
        end_at
        is_auction
      }
      ... on RelatedFair {
        name
        href
        profile {
          icon {
            img: resized(width: 80, height: 45, version: "square140") {
              width
              height
              url
            }
          }
        }
      }
    }
  }
"""
