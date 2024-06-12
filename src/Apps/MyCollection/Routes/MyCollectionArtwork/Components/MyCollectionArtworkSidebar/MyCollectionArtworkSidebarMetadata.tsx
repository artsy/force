import { Box, Clickable, ModalDialog, Text, THEME } from "@artsy/palette"
import { MyCollectionArtworkSidebarMetadata_artwork$data } from "__generated__/MyCollectionArtworkSidebarMetadata_artwork.graphql"
import { buildLocationDisplay } from "Components/LocationAutocompleteInput"
import { useState } from "react"
import { createFragmentContainer, graphql } from "react-relay"
import styled from "styled-components"
import { __internal__useMatchMedia } from "Utils/Hooks/useMatchMedia"

export interface MyCollectionArtworkSidebarMetadataProps {
  artwork: MyCollectionArtworkSidebarMetadata_artwork$data
}

export const MyCollectionArtworkSidebarMetadata: React.FC<MyCollectionArtworkSidebarMetadataProps> = ({
  artwork,
}) => {
  const {
    attributionClass,
    category,
    collectorLocation,
    confidentialNotes,
    dimensions,
    editionOf,
    medium,
    metric,
    pricePaid,
    provenance,
  } = artwork

  const rarityText = `${attributionClass?.shortDescription || ""}${
    editionOf ? `\n ${editionOf}` : ""
  }`

  return (
    <>
      <MetadataField label="Medium" value={category} />
      <MetadataField label="Materials" value={medium} />
      <MetadataField label="Rarity" value={rarityText} />
      <MetadataField
        label="Dimensions"
        value={metric === "in" ? dimensions?.in : dimensions?.cm}
      />

      <MetadataField
        label="Location"
        value={buildLocationDisplay(collectorLocation)}
      />
      <MetadataField label="Provenance" value={provenance} />
      <MetadataField label="Price Paid" value={pricePaid?.display} />
      {confidentialNotes ? (
        <MetadataField
          label="Notes"
          value={confidentialNotes}
          truncateLimit={70}
        />
      ) : null}
    </>
  )
}

export const MyCollectionArtworkSidebarMetadataFragmentContainer = createFragmentContainer(
  MyCollectionArtworkSidebarMetadata,
  {
    artwork: graphql`
      fragment MyCollectionArtworkSidebarMetadata_artwork on Artwork {
        category
        confidentialNotes
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
        editionOf
        pricePaid {
          display
        }
        collectorLocation {
          city
          state
          country
          countryCode
        }
      }
    `,
  }
)

export const MetadataField = ({
  label,
  value,
  truncateLimit = 0,
}: {
  label: string
  value?: string | null
  truncateLimit?: number
}) => {
  const emptyValue = "----"
  const [expanded, setExpanded] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)
  const isMobile = __internal__useMatchMedia(THEME.mediaQueries.xs)

  const truncatedValue = truncateLimit ? value?.slice(0, truncateLimit) : value
  const canExpand = (truncatedValue?.length ?? 0) < (value?.length ?? 0)

  const toggle = () => {
    if (isMobile) {
      setExpanded(!expanded)
      return
    }
    setModalOpen(true)
  }

  return (
    <Box mb={[1, 0.5]} display="flex">
      <Text color="black60" variant="sm" minWidth={[105, 105, 190]} mr={2}>
        {label}
      </Text>

      <Box display="flex" flex={1} flexDirection="column">
        <WrappedText variant="sm" color={value ? "black100" : "black60"}>
          {expanded ? value || emptyValue : truncatedValue || emptyValue}
        </WrappedText>
        {canExpand && (
          <Clickable mt={0.5} onClick={toggle} textDecoration="underline">
            <Text variant="xs">{expanded ? "Read Less" : "Read More"}</Text>
          </Clickable>
        )}
      </Box>
      {modalOpen && (
        <ModalDialog onClose={() => setModalOpen(false)} title={label}>
          <WrappedText>{value}</WrappedText>
        </ModalDialog>
      )}
    </Box>
  )
}

const WrappedText = styled(Text)`
  white-space: pre-line;
`
