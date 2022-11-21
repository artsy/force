import { Box, Flex, Text } from "@artsy/palette"
import { createFragmentContainer, graphql } from "react-relay"
import styled from "styled-components"
import { Media } from "Utils/Responsive"
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
      <Media greaterThan="xs">
        <MetadataField
          label="Rarity"
          value={attributionClass?.shortDescription}
        />
      </Media>
      <Media at="xs">
        <MetadataField label="Rarity" value={attributionClass?.name} />
      </Media>
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
          name
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
    <>
      <Media greaterThan="xs">
        <Box mb={0.5} display="flex">
          <Text color="black60" variant="sm" minWidth={[100, 100, 190]} mr={2}>
            {label}
          </Text>

          <Box display="flex" flex={1} flexDirection="column">
            <WrappedText variant="sm" color={value ? "black100" : "black60"}>
              {value || emptyValue}
            </WrappedText>
          </Box>
        </Box>
      </Media>
      <Media at="xs">
        <Flex flexDirection="row" justifyContent="space-between" mb={1}>
          <Text variant="sm" color="black100" pr={1}>
            {label}
          </Text>

          <Text
            style={{ flex: 1, maxWidth: "70%" }}
            variant="sm"
            textAlign="right"
            color={value ? "black100" : "black60"}
          >
            {value || emptyValue}
          </Text>
        </Flex>
      </Media>
    </>
  )
}

const WrappedText = styled(Text)`
  white-space: pre-line;
`
