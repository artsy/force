import { createFragmentContainer, graphql } from "react-relay"

const Auction2ArtworksRoute = () => {
  return <>artworks</>
}

export const Auction2ArtworksRouteFragmentContainer = createFragmentContainer(
  Auction2ArtworksRoute,
  {
    sale: graphql`
      fragment Auction2ArtworksRoute_sale on Sale {
        slug
      }
    `,
  }
)
