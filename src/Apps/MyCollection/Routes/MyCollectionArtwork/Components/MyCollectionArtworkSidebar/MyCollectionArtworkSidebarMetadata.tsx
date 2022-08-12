import { Box, Spacer, Text } from "@artsy/palette"
import { createFragmentContainer, graphql } from "react-relay"
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
    dimensions,
    medium,
    pricePaid,
    provenance,
    title,
  } = artwork

  return (
    <>
      <Text variant="lg">{artistNames}</Text>
      <Text variant="lg" fontStyle="italic" color="black60" mb={[0.5, 0]}>
        {title}
      </Text>

      <Spacer m={[1, 2]} />

      <MetadataField label="Medium" value={category} />
      <MetadataField label="Materials" value={medium} />
      <MetadataField
        label="Rarity"
        value={attributionClass?.shortDescription}
      />

      <Box mb={[1, 0.5]} display="flex" flexDirection={["column", "row"]}>
        <Text variant="sm" minWidth={190} mr={2}>
          Size
        </Text>

        {dimensions ? (
          <Box>
            {!!dimensions.in && (
              <Text variant="sm" color="black60">
                {dimensions.in}
              </Text>
            )}
            {!!dimensions.cm && (
              <Text variant="sm" color="black60">
                {dimensions.cm}
              </Text>
            )}
          </Box>
        ) : (
          <Text variant="sm" color="black60">
            ----
          </Text>
        )}
      </Box>

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
        category
        medium
        dimensions {
          in
          cm
        }
        date
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
  return (
    <Box mb={[1, 0.5]} display="flex" flexDirection={["column", "row"]}>
      <Text variant="sm" minWidth={190} mr={2}>
        {label}
      </Text>

      <Box display="flex" flexDirection="column">
        <Text variant="sm" color="black60">
          {value || "----"}
        </Text>
      </Box>
    </Box>
  )
}
