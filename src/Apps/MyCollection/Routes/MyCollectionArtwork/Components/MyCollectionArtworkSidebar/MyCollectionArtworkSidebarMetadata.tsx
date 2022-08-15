import { Box, Spacer, Text } from "@artsy/palette"
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
    artistNames,
    artworkLocation,
    attributionClass,
    category,
    date,
    dimensions,
    medium,
    pricePaid,
    provenance,
    title,
  } = artwork

  return (
    <>
      <Text as="h1" variant="lg-display">
        {artistNames}
      </Text>
      <Text as="h1" variant="lg-display" color="black60" mb={[0.5, 0]}>
        <i>{title?.trim()}</i>
        {date && date.replace(/\s+/g, "").length > 0 && ", " + date}
      </Text>

      <Spacer m={[1, 2]} />

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
        artistNames
        title
        date
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
      <Text variant="sm" minWidth={190} mr={2}>
        {label}
      </Text>

      <Box display="flex" flexDirection="column">
        <WrappedTest variant="sm" color="black60">
          {value || emptyValue}
        </WrappedTest>
      </Box>
    </Box>
  )
}

const WrappedTest = styled(Text)`
  white-space: pre-line;
`
