import { Box, Text } from "@artsy/palette"
import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { Media } from "Utils/Responsive"
import { ArtworkSidebar2SizeInfo_piece$data } from "__generated__/ArtworkSidebar2SizeInfo_piece.graphql"

interface ArtworkSidebar2SizeInfoProps {
  piece: ArtworkSidebar2SizeInfo_piece$data
}

const ArtworkSidebar2SizeInfo: React.FC<ArtworkSidebar2SizeInfoProps> = ({
  piece,
}) => {
  const { dimensions, editionOf } = piece

  const hasInDimensions = !!dimensions?.in
  const hasCmDimensions = !!dimensions?.cm

  const renderDimensions = () => {
    if (hasInDimensions && hasCmDimensions) {
      return `${dimensions.in} | ${dimensions.cm}`
    }

    return dimensions?.in ?? dimensions?.cm
  }

  const label = renderDimensions()

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
          {hasInDimensions && <Text variant="sm-display">{dimensions.in}</Text>}
          {hasCmDimensions && <Text variant="sm-display">{dimensions.cm}</Text>}
          {editionOf && <Text variant="sm-display">{editionOf}</Text>}
        </Box>
      </Media>
    </React.Fragment>
  )
}

export const ArtworkSidebar2SizeInfoFragmentContainer = createFragmentContainer(
  ArtworkSidebar2SizeInfo,
  {
    piece: graphql`
      fragment ArtworkSidebar2SizeInfo_piece on Sellable {
        dimensions {
          in
          cm
        }
        editionOf
      }
    `,
  }
)
