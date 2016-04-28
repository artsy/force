module.exports = """
  fragment banner on Artwork {
    banner: context {
      __typename
      ... on ArtworkContextSale {
        name
        href
        start_at
        end_at
        is_auction
      }
      ... on ArtworkContextFair {
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
      ... on ArtworkContextPartnerShow {
        name
        href
        status
        partner {
          name
        }
        thumbnail: cover_image {
          image: cropped(width: 100, height: 50, version: ["medium", "featured"]) {
            url
            width
            height
          }
        }
      }
    }
  }
"""
