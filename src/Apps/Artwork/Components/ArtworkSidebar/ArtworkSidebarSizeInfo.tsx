import { Box, Text } from "@artsy/palette"
import { useArtworkDimensions } from "Apps/Artwork/useArtworkDimensions"
import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { Media } from "Utils/Responsive"
import { ArtworkSidebarSizeInfo_piece$data } from "__generated__/ArtworkSidebarSizeInfo_piece.graphql"

interface ArtworkSidebarSizeInfoProps {
  piece: ArtworkSidebarSizeInfo_piece$data
}

const ArtworkSidebarSizeInfo: React.FC<ArtworkSidebarSizeInfoProps> = ({
  piece,
}) => {
  const { dimensions, editionOf } = piece

  const {
    hasCmDimensions,
    hasInDimensions,
    dimensionsLabel: label,
  } = useArtworkDimensions(dimensions)

  const sizeInfoMissing = (dimensions, editionOf) => {
    const dimensionsPresent =
      /\d/.test(dimensions?.in) || /\d/.test(dimensions?.cm)

    return !editionOf?.length && !dimensionsPresent
  }

  if (sizeInfoMissing(dimensions, editionOf)) {
    return null
  }

  return (
    <React.Fragment data-testid="size-info">
      <Media greaterThanOrEqual="md">
        <Box color="black60">
          {!!label && <Text variant="sm-display">{label}</Text>}
          {editionOf && <Text variant="sm-display">{editionOf}</Text>}
        </Box>
      </Media>

      <Media lessThan="md">
        <Box color="black60">
          {hasInDimensions && (
            <Text variant="sm-display">{dimensions?.in}</Text>
          )}
          {hasCmDimensions && (
            <Text variant="sm-display">{dimensions?.cm}</Text>
          )}
          {editionOf && <Text variant="sm-display">{editionOf}</Text>}
        </Box>
      </Media>
    </React.Fragment>
  )
}

export const ArtworkSidebarSizeInfoFragmentContainer = createFragmentContainer(
  ArtworkSidebarSizeInfo,
  {
    piece: graphql`
      fragment ArtworkSidebarSizeInfo_piece on Sellable {
        dimensions {
          in
          cm
        }
        editionOf
      }
    `,
  }
)
