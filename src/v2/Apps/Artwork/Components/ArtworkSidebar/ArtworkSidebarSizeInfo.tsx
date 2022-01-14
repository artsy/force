import { Box, Text } from "@artsy/palette"
import { Component } from "react"
import { createFragmentContainer, graphql } from "react-relay"

import { ArtworkSidebarSizeInfo_piece } from "v2/__generated__/ArtworkSidebarSizeInfo_piece.graphql"
import { getNFTMetadata } from "./ArtworkSidebarTitleInfo"

export interface ArtworkSidebarSizeInfoProps {
  piece: ArtworkSidebarSizeInfo_piece
  isNFT?: boolean
}

export class ArtworkSidebarSizeInfo extends Component<
  ArtworkSidebarSizeInfoProps
> {
  state = { metadata: { attributes: [] } }

  async componentDidMount() {
    const metadata = await getNFTMetadata("1")
    this.setState({ metadata })
  }

  render() {
    const {
      piece: { dimensions, edition_of },
    } = this.props

    const isNFT = this.props.isNFT ?? false

    if (isNFT) {
      return (
        <Box color="black60">
          {this.state.metadata.attributes.map(attr => (
            <Text variant="md">
              {attr.trait_type}: {attr.value}
            </Text>
          ))}
        </Box>
      )
    }

    if (
      !(edition_of && edition_of.length) &&
      !(dimensions && (dimensions.in || dimensions.cm))
    ) {
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
