import { Box, Text } from "@artsy/palette"
import { createFragmentContainer, graphql } from "react-relay"
import styled from "styled-components"
import { MyCollectionArtworkSidebarMetadata_artwork } from "__generated__/MyCollectionArtworkSidebarMetadata_artwork.graphql"

export interface MyCollectionArtworkSidebarMetadataProps {
  artwork: MyCollectionArtworkSidebarMetadata_artwork
}

export const MyCollectionArtworkSidebarMetadata: React.FC<MyCollectionArtworkSidebarMetadataProps> = ({
  artwork,
}) => {
  const {
    artworkLocation,
    attributionClass,
    category,
    dimensions,
    medium,
    pricePaid,
    provenance,
  } = artwork

  return (
    <>
      <MetadataField label="Medium" value={category} />
      <MetadataField label="Materials" value={medium} />
      <MetadataField
        label="Rarity"
        value={attributionClass?.shortDescription}
      />
      <MetadataField
        label="Size"
        value={[dimensions?.in, dimensions?.cm].filter(d => d).join("\n")}
      />

      <MetadataField label="Location" value={artworkLocation} />
      <MetadataField label="Provenance" value={provenance} />
      <MetadataField label="Price Paid" value={pricePaid?.display} />
    </>
  )
}

export const MyCollectionArtworkSidebarMetadataFragmentContainer = createFragmentContainer(
  MyCollectionArtworkSidebarMetadata,
  {
    artwork: graphql`
      fragment MyCollectionArtworkSidebarMetadata_artwork on Artwork {
        category
        medium
        dimensions {
          in
          cm
        }
        provenance
        attributionClass {
          shortDescription
        }
        pricePaid {
          display
        }
        artworkLocation
      }
    `,
  }
)

const MetadataField = ({ label, value }) => {
  const emptyValue = "----"

  return (
    <Box mb={[1, 0.5]} display="flex" flexDirection={["column", "row"]}>
      <Text variant="sm" minWidth={[null, 100, 190]} mr={2}>
        {label}
      </Text>

      <Box display="flex" flexDirection="column">
        <WrappedText variant="sm" color="black60">
          {value || emptyValue}
        </WrappedText>
      </Box>
    </Box>
  )
}

const WrappedText = styled(Text)`
  white-space: pre-line;
`
