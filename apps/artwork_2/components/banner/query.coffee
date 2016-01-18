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
        profile {
          icon {
            img: cropped(width: 80, height: 35, version: "square140") {
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
