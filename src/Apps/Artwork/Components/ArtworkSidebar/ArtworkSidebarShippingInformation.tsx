import { ActionType, type ClickedOnLearnMore } from "@artsy/cohesion"
import { Spacer, Text } from "@artsy/palette"
import { RouterLink } from "System/Components/RouterLink"
import type { ArtworkSidebarShippingInformation_artwork$data } from "__generated__/ArtworkSidebarShippingInformation_artwork.graphql"
import { createFragmentContainer, graphql } from "react-relay"
import { useTracking } from "react-tracking"

export interface ShippingInformationProps {
  artwork: ArtworkSidebarShippingInformation_artwork$data
}

const ArtworkSidebarShippingInformation: React.FC<
  React.PropsWithChildren<ShippingInformationProps>
> = ({ artwork }) => {
  const {
    isUnlisted,
    priceIncludesTaxDisplay,
    shippingOrigin,
    shippingInfo,
    pickupAvailable,
    taxInfo,
  } = artwork
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
          <Text variant="sm" color="mono60">
            Ships from {shippingOrigin}
          </Text>
        )}

        {!!taxInfo && (
          <Text variant="xs" color="mono60">
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
        <Text variant="sm" color="mono60">
          Ships from {shippingOrigin}
        </Text>
      )}

      {!!shippingInfo && (
        <Text
          variant="sm"
          color="mono60"
          data-testid="shipping-info"
          style={{ whiteSpace: "pre-line" }}
        >
          {shippingInfo}
        </Text>
      )}
      {!!pickupAvailable && (
        <Text variant="sm" color="mono60">
          Pickup available
        </Text>
      )}

      {(!!priceIncludesTaxDisplay || !!taxInfo) && <Spacer y={2} />}

      {!!priceIncludesTaxDisplay && (
        <Text variant="sm" color="mono60">
          {priceIncludesTaxDisplay}
        </Text>
      )}

      {!!taxInfo && (
        <Text variant="sm" color="mono60">
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

export const ArtworkSidebarShippingInformationFragmentContainer =
  createFragmentContainer(ArtworkSidebarShippingInformation, {
    artwork: graphql`
      fragment ArtworkSidebarShippingInformation_artwork on Artwork {
        isUnlisted
        priceIncludesTaxDisplay
        shippingOrigin
        shippingInfo
        pickupAvailable
        taxInfo {
          displayText
          moreInfo {
            displayText
            url
          }
        }
      }
    `,
  })
