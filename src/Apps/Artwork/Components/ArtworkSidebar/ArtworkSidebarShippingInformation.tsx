import { Spacer, Text } from "@artsy/palette"
import type { ArtworkSidebarShippingInformation_artwork$data } from "__generated__/ArtworkSidebarShippingInformation_artwork.graphql"
import { createFragmentContainer, graphql } from "react-relay"
import { ActionType, type ClickedOnLearnMore } from "@artsy/cohesion"
import { RouterLink } from "System/Components/RouterLink"
import { useTracking } from "react-tracking"
import { ArtsyShippingEstimate } from "Components/ArtsyShippingEstimate"

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
  const globalArtsyShipping =
    !!artwork.artsyShippingDomestic || !!artwork.artsyShippingInternational

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
            Ships from {shippingOrigin}
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
        {globalArtsyShipping && <ArtsyShippingEstimate artwork={artwork} />}
      </>
    )
  }

  return (
    <>
      <Spacer y={1} />
      {!!shippingOrigin && (
        <Text variant="sm" color="black60">
          Ships from {shippingOrigin}
        </Text>
      )}

      {!!shippingInfo && (
        <Text
          variant="sm"
          color="black60"
          data-testid="shipping-info"
          style={{ whiteSpace: "pre-line" }}
        >
          {shippingInfo}
        </Text>
      )}
      {!!pickupAvailable && (
        <Text variant="sm" color="black60">
          Pickup available
        </Text>
      )}

      {(!!priceIncludesTaxDisplay || !!taxInfo) && <Spacer y={2} />}

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
      {globalArtsyShipping && <ArtsyShippingEstimate artwork={artwork} />}
      <Spacer y={1} />
    </>
  )
}

export const ArtworkSidebarShippingInformationFragmentContainer =
  createFragmentContainer(ArtworkSidebarShippingInformation, {
    artwork: graphql`
      fragment ArtworkSidebarShippingInformation_artwork on Artwork {
        ...ArtsyShippingEstimate_artwork
        isUnlisted
        priceIncludesTaxDisplay
        shippingOrigin
        artsyShippingDomestic
        artsyShippingInternational
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
