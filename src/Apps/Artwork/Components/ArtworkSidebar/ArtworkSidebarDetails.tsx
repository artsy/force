import { createFragmentContainer, graphql } from "react-relay"
import { ArtworkSidebarDetails_artwork$data } from "__generated__/ArtworkSidebarDetails_artwork.graphql"
import { Box, Spacer, Text } from "@artsy/palette"
import { ArtworkSidebarClassificationFragmentContainer } from "./ArtworkSidebarClassification"
import { ArtworkSidebarAuthenticityCertificateFragmentContainer } from "./ArtworkSidebarAuthenticityCertificate"
import { useTranslation } from "react-i18next"

interface ArtworkSidebarDetailsProps {
  artwork: ArtworkSidebarDetails_artwork$data
}

const ArtworkSidebarDetails: React.FC<ArtworkSidebarDetailsProps> = ({
  artwork,
}) => {
  const { medium, dimensions, framed, editionOf, editionSets } = artwork
  const { t } = useTranslation()

  const dimensionsPresent = dimensions =>
    /\d/.test(dimensions?.in) || /\d/.test(dimensions?.cm)

  const getFrameString = (frameDetails?: string | null) => {
    if (frameDetails !== "Included") {
      return
    }

    return `${t`artworkPage.sidebar.details.frame`} ${frameDetails.toLowerCase()}`
  }

  return (
    <Box color="black60">
      <Text variant="sm">{medium}</Text>
      {!!dimensionsPresent(dimensions) && (editionSets?.length ?? 0) < 2 && (
        <Text variant="sm">{`${dimensions?.in} | ${dimensions?.cm}`}</Text>
      )}
      {!!getFrameString(framed?.details) && (
        <Text variant="sm">{getFrameString(framed?.details)}</Text>
      )}
      {!!editionOf && <Text variant="sm">{editionOf}</Text>}

      <Spacer y={1} />

      {/* classification */}

      <ArtworkSidebarClassificationFragmentContainer artwork={artwork} />
      <Spacer y={1} />
      {/* authenticity */}
      <ArtworkSidebarAuthenticityCertificateFragmentContainer
        artwork={artwork}
      />
      <Spacer y={2} />
    </Box>
  )
}

export const ArtworkSidebarDetailsFragmentContainer = createFragmentContainer(
  ArtworkSidebarDetails,
  {
    artwork: graphql`
      fragment ArtworkSidebarDetails_artwork on Artwork {
        medium
        dimensions {
          in
          cm
        }
        framed {
          details
        }
        editionOf
        isEdition
        editionSets {
          internalID
        }
        ...ArtworkSidebarClassification_artwork
        ...ArtworkSidebarAuthenticityCertificate_artwork
      }
    `,
  }
)
