import { Text } from "@artsy/palette"
import { Component } from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { ArtworkSidebarClassificationFragmentContainer } from "./ArtworkSidebarClassification"
import { ArtworkSidebarSizeInfoFragmentContainer } from "./ArtworkSidebarSizeInfo"
import { ArtworkSidebarTitleInfoFragmentContainer } from "./ArtworkSidebarTitleInfo"
import { ArtworkSidebarMetadata_artwork$data } from "v2/__generated__/ArtworkSidebarMetadata_artwork.graphql"

export interface ArtworkSidebarMetadataProps {
  artwork: ArtworkSidebarMetadata_artwork$data
}

export class ArtworkSidebarMetadata extends Component<
  ArtworkSidebarMetadataProps
> {
  render() {
    const { artwork } = this.props

    const lotLabel = artwork.is_biddable
      ? artwork.sale_artwork?.lot_label
      : null

    return (
      <>
        {lotLabel && (
          <Text
            variant="xs"
            textTransform="uppercase"
            color="black100"
            mb={0.5}
          >
            Lot {lotLabel}
          </Text>
        )}

        <ArtworkSidebarTitleInfoFragmentContainer artwork={artwork} />

        {(artwork.edition_sets?.length ?? 0) < 2 && (
          <ArtworkSidebarSizeInfoFragmentContainer piece={artwork} />
        )}

        <ArtworkSidebarClassificationFragmentContainer artwork={artwork} />
      </>
    )
  }
}

export const ArtworkSidebarMetadataFragmentContainer = createFragmentContainer(
  ArtworkSidebarMetadata,
  {
    artwork: graphql`
      fragment ArtworkSidebarMetadata_artwork on Artwork {
        is_biddable: isBiddable
        edition_sets: editionSets {
          __typename
        }
        sale_artwork: saleArtwork {
          lot_label: lotLabel
        }
        ...ArtworkSidebarTitleInfo_artwork
        ...ArtworkSidebarSizeInfo_piece
        ...ArtworkSidebarClassification_artwork
      }
    `,
  }
)
