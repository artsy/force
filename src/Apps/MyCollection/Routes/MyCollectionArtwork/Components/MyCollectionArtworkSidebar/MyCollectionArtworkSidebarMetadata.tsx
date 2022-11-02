import { Box, Text } from "@artsy/palette"
import { createFragmentContainer, graphql } from "react-relay"
import styled from "styled-components"
import { MyCollectionArtworkSidebarMetadata_artwork$data } from "__generated__/MyCollectionArtworkSidebarMetadata_artwork.graphql"

export interface MyCollectionArtworkSidebarMetadataProps {
  artwork: MyCollectionArtworkSidebarMetadata_artwork$data
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
    metric,
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
        label="Dimensions"
        value={metric === "in" ? dimensions?.in : dimensions?.cm}
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
        metric
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
    <Box mb={[1, 0.5]} display="flex">
      <Text color="black60" variant="sm" minWidth={[100, 100, 190]} mr={2}>
        {label}
      </Text>

      <Box display="flex" flex={1} flexDirection="column">
        <WrappedText variant="sm" color={value ? "black100" : "black60"}>
          {value || emptyValue}
        </WrappedText>
      </Box>
    </Box>
  )
}

const WrappedText = styled(Text)`
  white-space: pre-line;
`
