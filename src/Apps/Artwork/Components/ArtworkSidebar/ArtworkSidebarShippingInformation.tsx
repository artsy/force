import { createFragmentContainer, graphql } from "react-relay"
import { Text } from "@artsy/palette"
import { ArtworkSidebarShippingInformation_artwork$data } from "__generated__/ArtworkSidebarShippingInformation_artwork.graphql"
import { useTranslation } from "react-i18next"
import { RouterLink } from "System/Router/RouterLink"
import { useTracking } from "react-tracking"

export interface ShippingInformationProps {
  artwork: ArtworkSidebarShippingInformation_artwork$data
}

const ArtworkSidebarShippingInformation: React.FC<ShippingInformationProps> = ({
  artwork: { shippingOrigin, shippingInfo, isUnlisted },
}) => {
  const { t } = useTranslation()
  const { trackEvent } = useTracking()
  const payload = {
    context_module: "Sidebar",
    subject: "Learn more",
    type: "Link",
    flow: "Shipping",
  }

  if (isUnlisted) {
    return (
      <>
        {shippingOrigin && (
          <Text variant="sm" color="black60">
            {t`artworkPage.sidebar.shippingAndTaxes.shipsFrom`} {shippingOrigin}
          </Text>
        )}

        <Text variant="xs" color="black60">
          Shipping and taxes may apply at checkout.{" "}
          <RouterLink
            inline
            to="https://support.artsy.net/s/article/How-are-taxes-customs-VAT-and-import-fees-handled-on-works-listed-with-secure-checkout"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => {
              trackEvent(payload)
            }}
          >
            {t`artworkPage.sidebar.shippingAndTaxes.taxInformationLearnMore`}
          </RouterLink>
        </Text>
      </>
    )
  }

  return (
    <>
      <Text variant="sm" color="black60">
        {t`artworkPage.sidebar.shippingAndTaxes.taxInformation`}{" "}
        <RouterLink
          inline
          to="https://support.artsy.net/s/article/How-are-taxes-customs-VAT-and-import-fees-handled-on-works-listed-with-secure-checkout"
          target="_blank"
          rel="noopener noreferrer"
        >
          {t`artworkPage.sidebar.shippingAndTaxes.taxInformationLearnMore`}
        </RouterLink>
      </Text>

      {shippingOrigin && (
        <Text variant="sm" color="black60">
          {t`artworkPage.sidebar.shippingAndTaxes.shipsFrom`} {shippingOrigin}
        </Text>
      )}

      {shippingInfo && (
        <Text variant="sm" color="black60" data-testid="shipping-info">
          {shippingInfo}
        </Text>
      )}
    </>
  )
}

export const ArtworkSidebarShippingInformationFragmentContainer = createFragmentContainer(
  ArtworkSidebarShippingInformation,
  {
    artwork: graphql`
      fragment ArtworkSidebarShippingInformation_artwork on Artwork {
        isUnlisted
        shippingOrigin
        shippingInfo
      }
    `,
  }
)
