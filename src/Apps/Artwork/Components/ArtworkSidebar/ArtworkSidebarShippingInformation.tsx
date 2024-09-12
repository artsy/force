import { createFragmentContainer, graphql } from "react-relay"
import { Spacer, Text } from "@artsy/palette"
import { ArtworkSidebarShippingInformation_artwork$data } from "__generated__/ArtworkSidebarShippingInformation_artwork.graphql"
import { useTranslation } from "react-i18next"
import { RouterLink } from "System/Components/RouterLink"
import { useTracking } from "react-tracking"
import { ActionType, ClickedOnLearnMore } from "@artsy/cohesion"

export interface ShippingInformationProps {
  artwork: ArtworkSidebarShippingInformation_artwork$data
}

const ArtworkSidebarShippingInformation: React.FC<ShippingInformationProps> = ({
  artwork: {
    isUnlisted,
    priceIncludesTaxDisplay,
    shippingOrigin,
    shippingInfo,
    taxInfo,
  },
}) => {
  const { t } = useTranslation()
  const { trackEvent } = useTracking()

  const handleMoreInfoClick = () => {
    const payload: ClickedOnLearnMore = {
      action: ActionType.clickedOnLearnMore,
      context_module: "Sidebar",
      subject: "Learn more",
      type: "Link",
      flow: "Shipping",
    }

    trackEvent(payload)
  }

  if (isUnlisted) {
    return (
      <>
        {!!shippingOrigin && (
          <Text variant="sm" color="black60">
            {t`artworkPage.sidebar.shippingAndTaxes.shipsFrom`} {shippingOrigin}
          </Text>
        )}

        {!!taxInfo && (
          <Text variant="xs" color="black60">
            {taxInfo.displayText}{" "}
            <RouterLink
              inline
              to="https://support.artsy.net/s/article/How-are-taxes-and-customs-fees-calculated"
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleMoreInfoClick}
            >
              {taxInfo.moreInfo.displayText}
            </RouterLink>
          </Text>
        )}
      </>
    )
  }

  return (
    <>
      <Spacer y={1} />
      {!!shippingOrigin && (
        <Text variant="sm" color="black60">
          {t`artworkPage.sidebar.shippingAndTaxes.shipsFrom`} {shippingOrigin}
        </Text>
      )}

      {!!shippingInfo && (
        <Text variant="sm" color="black60" data-testid="shipping-info">
          {shippingInfo}
        </Text>
      )}

      {!!priceIncludesTaxDisplay && (
        <Text variant="sm" color="black60">
          {priceIncludesTaxDisplay}
        </Text>
      )}

      {!!taxInfo && (
        <Text variant="sm" color="black60">
          {taxInfo.displayText}{" "}
          <RouterLink
            inline
            to="https://support.artsy.net/s/article/How-are-taxes-and-customs-fees-calculated"
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleMoreInfoClick}
          >
            {taxInfo.moreInfo.displayText}
          </RouterLink>
        </Text>
      )}
      <Spacer y={1} />
    </>
  )
}

export const ArtworkSidebarShippingInformationFragmentContainer = createFragmentContainer(
  ArtworkSidebarShippingInformation,
  {
    artwork: graphql`
      fragment ArtworkSidebarShippingInformation_artwork on Artwork {
        isUnlisted
        priceIncludesTaxDisplay
        shippingOrigin
        shippingInfo
        taxInfo {
          displayText
          moreInfo {
            displayText
            url
          }
        }
      }
    `,
  }
)
