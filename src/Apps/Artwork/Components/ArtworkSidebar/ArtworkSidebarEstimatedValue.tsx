import { Text } from "@artsy/palette"

import type { ArtworkSidebarEstimatedValue_artwork$data } from "__generated__/ArtworkSidebarEstimatedValue_artwork.graphql"
import { createFragmentContainer, graphql } from "react-relay"

interface ArtworkSidebarEstimatedValueProps {
  artwork: ArtworkSidebarEstimatedValue_artwork$data
}

const ArtworkSidebarEstimatedValue: React.FC<
  React.PropsWithChildren<ArtworkSidebarEstimatedValueProps>
> = ({ artwork }) => {
  const { saleArtwork, sale } = artwork
  if (!!sale?.isClosed || !saleArtwork?.estimate) {
    return null
  }

  return (
    <Text variant="sm" color="mono100">
      Estimated value: {saleArtwork?.estimate}
    </Text>
  )
}

export const ArtworkSidebarEstimatedValueFragmentContainer =
  createFragmentContainer(ArtworkSidebarEstimatedValue, {
    artwork: graphql`
      fragment ArtworkSidebarEstimatedValue_artwork on Artwork {
        saleArtwork {
          estimate
        }
        sale {
          isClosed
        }
      }
    `,
  })
