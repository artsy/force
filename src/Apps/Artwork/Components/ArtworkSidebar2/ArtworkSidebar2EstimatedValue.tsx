import { Text } from "@artsy/palette"
import { useTranslation } from "react-i18next"
import { createFragmentContainer, graphql } from "react-relay"
import { ArtworkSidebar2EstimatedValue_artwork } from "__generated__/ArtworkSidebar2EstimatedValue_artwork.graphql"

interface ArtworkSidebar2EstimatedValueProps {
  artwork: ArtworkSidebar2EstimatedValue_artwork
}

const ArtworkSidebar2EstimatedValue: React.FC<ArtworkSidebar2EstimatedValueProps> = ({
  artwork,
}) => {
  const { t } = useTranslation()
  const { saleArtwork, sale } = artwork
  if (!!sale?.isClosed || !saleArtwork?.estimate) {
    return null
  }

  return (
    <Text variant="sm" color="black100">
      {t(`artworkPage.sidebar.auction.estimatedValue`, {
        value: saleArtwork?.estimate,
      })}
    </Text>
  )
}

export const ArtworkSidebar2EstimatedValueFragmentContainer = createFragmentContainer(
  ArtworkSidebar2EstimatedValue,
  {
    artwork: graphql`
      fragment ArtworkSidebar2EstimatedValue_artwork on Artwork {
        saleArtwork {
          estimate
        }
        sale {
          isClosed
        }
      }
    `,
  }
)
