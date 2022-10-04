import { createFragmentContainer, graphql } from "react-relay"
import { ArtworkSidebar2Details_artwork$data } from "__generated__/ArtworkSidebar2Details_artwork.graphql"
import { Box, Spacer, Text } from "@artsy/palette"
import { ArtworkSidebar2ClassificationFragmentContainer } from "./ArtworkSidebar2Classification"
import { ArtworkSidebar2AuthenticityCertificateFragmentContainer } from "./ArtworkSidebar2AuthenticityCertificate"
import { useTranslation } from "react-i18next"

interface ArtworkSidebar2DetailsProps {
  artwork: ArtworkSidebar2Details_artwork$data
}

const ArtworkSidebar2Details: React.FC<ArtworkSidebar2DetailsProps> = ({
  artwork,
}) => {
  const { medium, dimensions, framed, editionOf } = artwork
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
      <Text variant="sm-display">{medium}</Text>
      {!!dimensionsPresent(dimensions) && (
        <Text variant="sm-display">{`${dimensions?.in} | ${dimensions?.cm}`}</Text>
      )}
      {!!getFrameString(framed?.details) && (
        <Text variant="sm-display">{getFrameString(framed?.details)}</Text>
      )}
      {!!editionOf && <Text variant="sm-display">{editionOf}</Text>}

      <Spacer mt={1} />

      {/* classification */}

      <ArtworkSidebar2ClassificationFragmentContainer artwork={artwork} />
      <Spacer mt={1} />
      {/* authenticity */}
      <ArtworkSidebar2AuthenticityCertificateFragmentContainer
        artwork={artwork}
      />
      <Spacer mt={2} />
    </Box>
  )
}

export const ArtworkSidebar2DetailsFragmentContainer = createFragmentContainer(
  ArtworkSidebar2Details,
  {
    artwork: graphql`
      fragment ArtworkSidebar2Details_artwork on Artwork {
        medium
        dimensions {
          in
          cm
        }
        framed {
          details
        }
        editionOf
        ...ArtworkSidebar2Classification_artwork
        ...ArtworkSidebar2AuthenticityCertificate_artwork
      }
    `,
  }
)
