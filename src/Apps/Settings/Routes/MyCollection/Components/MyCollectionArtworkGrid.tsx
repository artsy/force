import { ArtworkGridContainer } from "Components/ArtworkGrid/ArtworkGrid"
import type { MyCollectionArtworkGrid_artworks$data } from "__generated__/MyCollectionArtworkGrid_artworks.graphql"
import type { FC } from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { _FragmentRefs } from "relay-runtime"

interface MyCollectionArtworkGridProps {
  artworks: MyCollectionArtworkGrid_artworks$data
  onLoadMore: () => void
}

const MyCollectionArtworksGrid: FC<
  React.PropsWithChildren<MyCollectionArtworkGridProps>
> = ({ artworks, onLoadMore }) => {
  return (
    <ArtworkGridContainer
      artworks={artworks}
      columnCount={[2, 3, 4]}
      showHoverDetails={false}
      showArtworksWithoutImages
      hideSaleInfo
      to={artwork =>
        `/collector-profile/my-collection/artwork/${artwork.internalID}`
      }
      showHighDemandIcon
      showSaveButton={false}
      onLoadMore={onLoadMore}
    />
  )
}

export const MyCollectionArtworkGrid = createFragmentContainer(
  MyCollectionArtworksGrid,
  {
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
            artist(shallow: true) {
              targetSupply {
                priority
              }
            }
            ...GridItem_artwork @arguments(includeAllImages: true)
            ...FlatGridItem_artwork @arguments(includeAllImages: true)
          }
        }
      }
    `,
  },
)
