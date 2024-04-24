import { useDismissibleContext } from "@artsy/dismissible"
import ArtworkGrid from "Components/ArtworkGrid/ArtworkGrid"
import { FC } from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { Text } from "@artsy/palette"
import { PROGRESSIVE_ONBOARDING } from "Components/ProgressiveOnboarding/progressiveOnboardingKeys"
import { _FragmentRefs } from "relay-runtime"

const POPOVER_KEY = PROGRESSIVE_ONBOARDING.startSelling

interface MyCollectionArtworkGridProps {
  artworks: _FragmentRefs<"MyCollectionArtworkGrid_artworks">
  onLoadMore: () => void
}

const MyCollectionArtworksGrid: FC<MyCollectionArtworkGridProps> = ({
  artworks,
  onLoadMore,
}) => {
  const { dismiss, isDismissed } = useDismissibleContext()

  const displayPopover = !isDismissed(POPOVER_KEY).status

  return (
    <ArtworkGrid
      artworks={artworks}
      columnCount={[2, 3, 4, 4]}
      showHoverDetails={false}
      showArtworksWithoutImages
      hideSaleInfo
      to={artwork =>
        `/collector-profile/my-collection/artwork/${artwork.internalID}`
      }
      showHighDemandIcon
      showSaveButton={false}
      onLoadMore={onLoadMore}
      popoverContent={
        displayPopover && (
          <Text variant="xs">
            <strong>Interested in Selling This Work?</strong>
            <br />
            Let our experts find the best sales option for you.
          </Text>
        )
      }
      onPopoverDismiss={() => dismiss(POPOVER_KEY)}
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
            artist {
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
  }
)
