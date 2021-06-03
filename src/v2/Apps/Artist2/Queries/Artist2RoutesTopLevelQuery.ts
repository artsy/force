import { graphql } from "relay-runtime"

export const Artist2RoutesTopLevelQuery = graphql`
  query Artist2RoutesTopLevelQuery($artistID: String!) {
    artist(id: $artistID) @principalField {
      ...Artist2App_artist
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
