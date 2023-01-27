import ArtworkGrid from "Components/ArtworkGrid"
import { createFragmentContainer, graphql } from "react-relay"

export const MyCollectionArtworkGrid = createFragmentContainer(ArtworkGrid, {
  artworks: graphql`
    fragment MyCollectionArtworkGrid_artworks on MyCollectionConnection {
      edges {
        node {
          id
          slug
          href
          internalID
          image(includeAll: true) {
            aspectRatio
          }
          ...GridItem_artwork @arguments(includeAllImages: true)
          ...FlatGridItem_artwork @arguments(includeAllImages: true)
        }
      }
    }
  `,
})
