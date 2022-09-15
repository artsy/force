import { Spacer, Text } from "@artsy/palette"
import { useTranslation } from "react-i18next"
import { createFragmentContainer, graphql } from "react-relay"
import { RouterLink } from "System/Router/RouterLink"
import { ArtworkSidebar2Links_artwork } from "__generated__/ArtworkSidebar2Links_artwork.graphql"

interface ArtworkSidebar2LinksProps {
  artwork: ArtworkSidebar2Links_artwork
}

const ArtworkSidebar2Links: React.FC<ArtworkSidebar2LinksProps> = ({
  artwork,
}) => {
  const { sale, isInAuction } = artwork
  const { t } = useTranslation()

  const isInOpenAuction = isInAuction && sale && !sale.isClosed

  return (
    <>
      <Spacer mt={2} />
      {isInOpenAuction && (
        <>
          <Text variant="xs" color="black60">
            {t("artworkPage.sidebar.conditionsOfSale")}
            <RouterLink to="/conditions-of-sale">
              {t("artworkPage.sidebar.conditionsOfSaleLink")}
            </RouterLink>
          </Text>
          <Spacer mt={1} />
        </>
      )}
      <Text variant="xs" color="black60">
        {t("artworkPage.sidebar.sellWithArtsy")}
        <RouterLink to="/sell">
          {t("artworkPage.sidebar.sellWithArtsyLink")}
        </RouterLink>
      </Text>
    </>
  )
}

export const ArtworkSidebar2LinksFragmentContainer = createFragmentContainer(
  ArtworkSidebar2Links,
  {
    artwork: graphql`
      fragment ArtworkSidebar2Links_artwork on Artwork {
        isInAuction
        sale {
          isClosed
        }
      }
    `,
  }
)
