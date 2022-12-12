import { Spacer, Text } from "@artsy/palette"
import { useTranslation } from "react-i18next"
import * as DeprecatedSchema from "@artsy/cohesion/dist/DeprecatedSchema"
import { createFragmentContainer, graphql } from "react-relay"
import { useTracking } from "react-tracking"
import { RouterLink } from "System/Router/RouterLink"
import { ArtworkSidebarLinks_artwork$data } from "__generated__/ArtworkSidebarLinks_artwork.graphql"

interface ArtworkSidebarLinksProps {
  artwork: ArtworkSidebarLinks_artwork$data
}

const ArtworkSidebarLinks: React.FC<ArtworkSidebarLinksProps> = ({
  artwork,
}) => {
  const { t } = useTranslation()
  const tracking = useTracking()
  const { sale, isInAuction } = artwork

  const isInOpenAuction = isInAuction && sale && !sale.isClosed

  const trackClickedConditionsOfSale = () => {
    tracking.trackEvent({
      action_type: DeprecatedSchema.ActionType.Click,
      subject: DeprecatedSchema.Subject.AuctionConditionsOfSale,
      type: DeprecatedSchema.Type.Link,
    })
  }

  const trackClickedSellWithArtsy = () => {
    tracking.trackEvent({
      action_type: DeprecatedSchema.ActionType.Click,
      subject: "sell with artsy",
      type: DeprecatedSchema.Type.Link,
    })
  }

  return (
    <>
      <Spacer y={2} />
      {isInOpenAuction && (
        <>
          <Text variant="xs" color="black60">
            {t("artworkPage.sidebar.conditionsOfSale")}{" "}
            <RouterLink
              to="/conditions-of-sale"
              onClick={trackClickedConditionsOfSale}
            >
              {t("artworkPage.sidebar.conditionsOfSaleLink")}
            </RouterLink>
          </Text>
          <Spacer y={1} />
        </>
      )}
      <Text variant="xs" color="black60">
        {t("artworkPage.sidebar.sellWithArtsy")}{" "}
        <RouterLink to="/sell" onClick={trackClickedSellWithArtsy}>
          {t("artworkPage.sidebar.sellWithArtsyLink")}
        </RouterLink>
      </Text>
    </>
  )
}

export const ArtworkSidebarLinksFragmentContainer = createFragmentContainer(
  ArtworkSidebarLinks,
  {
    artwork: graphql`
      fragment ArtworkSidebarLinks_artwork on Artwork {
        isInAuction
        sale {
          isClosed
        }
      }
    `,
  }
)
