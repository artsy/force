import { Box, Spacer, Text } from "@artsy/palette"
import { useEditionSetDimensions } from "Apps/Artwork/Components/useEditionSetDimensions"
import { useArtworkDimensions } from "Apps/Artwork/useArtworkDimensions"
import type { ArtworkSidebarDetails_artwork$data } from "__generated__/ArtworkSidebarDetails_artwork.graphql"
import { createFragmentContainer, graphql } from "react-relay"
import { ArtworkSidebarAuthenticityCertificateFragmentContainer } from "./ArtworkSidebarAuthenticityCertificate"
import { ArtworkSidebarClassificationFragmentContainer } from "./ArtworkSidebarClassification"
import { ArtworkSidebarCollectorSignal } from "./ArtworkSidebarCollectorSignal"

interface ArtworkSidebarDetailsProps {
  artwork: ArtworkSidebarDetails_artwork$data
}

const ArtworkSidebarDetails: React.FC<
  React.PropsWithChildren<ArtworkSidebarDetailsProps>
> = ({ artwork }) => {
  const {
    medium,
    dimensions,
    framed,
    framedDimensions,
    editionOf,
    editionSets,
    isUnlisted,
  } = artwork

  const {
    dimensions: dimensionsToUse,
    framedDimensions: framedDimensionsToUse,
  } = useEditionSetDimensions({ editionSets, dimensions, framedDimensions })

  const { dimensionsLabel, frameText } = useArtworkDimensions({
    dimensions: dimensionsToUse,
    framedDimensions: framedDimensionsToUse,
    framed,
    isUnlisted,
  })

  return (
    <Box color="mono60">
      <Text variant="sm">{medium}</Text>
      {dimensionsLabel && (editionSets?.length ?? 0) < 2 && (
        <Text variant="sm">{dimensionsLabel}</Text>
      )}
      {frameText && <Text variant="sm">{frameText}</Text>}
      {!!editionOf && <Text variant="sm">{editionOf}</Text>}

      {/* classification */}
      <ArtworkSidebarClassificationFragmentContainer artwork={artwork} />

      {/* authenticity */}
      <ArtworkSidebarAuthenticityCertificateFragmentContainer
        artwork={artwork}
      />

      {/* collector signal */}
      <ArtworkSidebarCollectorSignal artwork={artwork} />

      <Spacer y={2} />
    </Box>
  )
}

export const ArtworkSidebarDetailsFragmentContainer = createFragmentContainer(
  ArtworkSidebarDetails,
  {
    artwork: graphql`
      fragment ArtworkSidebarDetails_artwork on Artwork {
        isUnlisted
        medium
        dimensions {
          in
          cm
        }
        framed {
          details
        }
        framedDimensions {
          in
          cm
        }
        editionOf
        isEdition
        editionSets {
          internalID
          dimensions {
            in
            cm
          }
          framedDimensions {
            in
            cm
          }
        }
        ...ArtworkSidebarClassification_artwork
        ...ArtworkSidebarAuthenticityCertificate_artwork
        ...ArtworkSidebarCollectorSignal_artwork
      }
    `,
  },
)
