import { Box, Text } from "@artsy/palette"
import { Component } from "react"
import { createFragmentContainer, graphql } from "react-relay"

import { ArtworkSidebarSizeInfo_piece$data } from "v2/__generated__/ArtworkSidebarSizeInfo_piece.graphql"

export interface ArtworkSidebarSizeInfoProps {
  piece: ArtworkSidebarSizeInfo_piece$data
}

export class ArtworkSidebarSizeInfo extends Component<
  ArtworkSidebarSizeInfoProps
> {
  sizeInfoMissing = (dimensions, edition_of) => {
    const dimensionsPresent =
      /\d/.test(dimensions?.in) || /\d/.test(dimensions?.cm)

    return !edition_of?.length && !dimensionsPresent
  }

  render() {
    const {
      piece: { dimensions, edition_of },
    } = this.props

    if (this.sizeInfoMissing(dimensions, edition_of)) {
      return null
    }

    return (
      <Box color="black60">
        {dimensions?.in && <Text variant="md">{dimensions.in}</Text>}
        {dimensions?.cm && <Text variant="md">{dimensions.cm}</Text>}
        {edition_of && <Text variant="md">{edition_of}</Text>}
      </Box>
    )
  }
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
        edition_of: editionOf
      }
    `,
  }
)
