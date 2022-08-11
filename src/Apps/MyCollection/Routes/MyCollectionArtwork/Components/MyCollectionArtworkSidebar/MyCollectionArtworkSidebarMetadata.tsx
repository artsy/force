// import { Text } from "@artsy/palette"
// import { Component } from "react"
// import { createFragmentContainer, graphql } from "react-relay"
// import { ArtworkSidebarClassificationFragmentContainer } from "./ArtworkSidebarClassification"
// import { ArtworkSidebarSizeInfoFragmentContainer } from "./ArtworkSidebarSizeInfo"
// import { ArtworkSidebarTitleInfoFragmentContainer } from "./ArtworkSidebarTitleInfo"
// import { ArtworkSidebarMetadata_artwork } from "__generated__/ArtworkSidebarMetadata_artwork.graphql"

import { Box, Spacer, Text } from "@artsy/palette"

// export interface ArtworkSidebarMetadataProps {
//   artwork: ArtworkSidebarMetadata_artwork
// }

const MetadataField = ({ label, value }) => {
  return (
    <Box mb={[1, 0.5]} display="flex" flexDirection={["column", "row"]}>
      <Text variant="sm" minWidth={190} mr={2}>
        {label}
      </Text>
      <Text variant="sm" color="black60">
        {value || "----"}
      </Text>
    </Box>
  )
}

export const MyCollectionArtworkSidebarMetadata: React.FC<any> = ({
  artwork,
}) => {
  return (
    <>
      <Text variant="lg">Artist Name</Text>
      <Text variant="lg" fontStyle="italic" color="black60" mb={[0.5, 0]}>
        Artwork title
      </Text>

      <Spacer m={[1, 2]} />

      <MetadataField label="Medium" value="Painting" />
      <MetadataField
        label="Materials"
        value="Paint &Paint &Paint &Paint &Paint &"
      />
      <MetadataField label="Rarity" value="Very rare" />
      <MetadataField label="Size" value={null} />
      <MetadataField label="Location" value="Berlin" />
      <MetadataField label="Provenance" value="" />
      <MetadataField label="Price Paid" value="$20,000" />
    </>
  )
}

// export class ArtworkSidebarMetadata extends Component<any
// > {
//   render() {
//     const { artwork } = this.props

//     const lotLabel = artwork.is_biddable
//       ? artwork.sale_artwork?.lot_label
//       : null

//     return (
//       <>
//         {lotLabel && (
//           <Text variant="xs" color="black100" mb={0.5}>
//             Lot {lotLabel}
//           </Text>
//         )}

//         <ArtworkSidebarTitleInfoFragmentContainer artwork={artwork} />

//         {(artwork.edition_sets?.length ?? 0) < 2 && (
//           <ArtworkSidebarSizeInfoFragmentContainer piece={artwork} />
//         )}

//         <ArtworkSidebarClassificationFragmentContainer artwork={artwork} />
//       </>
//     )
//   }
// }

// export const ArtworkSidebarMetadataFragmentContainer = createFragmentContainer(
//   ArtworkSidebarMetadata,
//   {
//     artwork: graphql`
//       fragment ArtworkSidebarMetadata_artwork on Artwork {
//         is_biddable: isBiddable
//         edition_sets: editionSets {
//           __typename
//         }
//         sale_artwork: saleArtwork {
//           lot_label: lotLabel
//         }
//         ...ArtworkSidebarTitleInfo_artwork
//         ...ArtworkSidebarSizeInfo_piece
//         ...ArtworkSidebarClassification_artwork
//       }
//     `,
//   }
// )
