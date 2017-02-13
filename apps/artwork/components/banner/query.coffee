module.exports = """
  fragment banner on Artwork {
    banner: context {
      __typename
      ... on ArtworkContextAuction {
        name
        href
        start_at
        end_at
        live_start_at
        is_auction
        is_live_open
      }
      ... on ArtworkContextSale {
        name
        href
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
        type
        status
        partner {
          name
        }
        thumbnail: cover_image {
          image: cropped(width: 75, height: 50, version: ["medium", "featured"]) {
            url
            width
            height
          }
        }
      }
    }
  }
"""
