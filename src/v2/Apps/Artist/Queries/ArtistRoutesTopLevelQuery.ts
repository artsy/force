import { graphql } from "relay-runtime"

export const ArtistRoutesTopLevelQuery = graphql`
  query ArtistRoutesTopLevelQuery($artistID: String!) {
    artist(id: $artistID) @principalField {
      ...ArtistApp_artist
      slug
      statuses {
        shows
        cv(minShowCount: 0)
        articles
      }
      counts {
        forSaleArtworks
      }
      related {
        genes {
          edges {
            node {
              slug
            }
          }
        }
      }
      highlights {
        # Alias due to obscure Graphql validation warning
        artistPartnersConnection: partnersConnection(
          first: 10
          displayOnPartnerProfile: true
          representedBy: true
          partnerCategory: ["blue-chip", "top-established", "top-emerging"]
        ) {
          edges {
            node {
              categories {
                slug
              }
            }
          }
        }
      }
      insights {
        type
      }
      biographyBlurb(format: HTML, partnerBio: true) {
        text
      }
    }
  }
`
