import { createFragmentContainer, graphql } from "react-relay"
import { Text } from "@artsy/palette"
import { ArtworkSidebarShippingInformation_artwork$data } from "__generated__/ArtworkSidebarShippingInformation_artwork.graphql"
import { useTranslation } from "react-i18next"

export interface ShippingInformationProps {
  artwork: ArtworkSidebarShippingInformation_artwork$data
}

const ArtworkSidebarShippingInformation: React.FC<ShippingInformationProps> = ({
  artwork: { shippingOrigin, shippingInfo },
}) => {
  const { t } = useTranslation()

  return (
    <>
      <Text variant="sm" color="black60">
        {t`artworkPage.sidebar.shippingAndTaxes.taxInformation`}{" "}
        <a
          href="https://support.artsy.net/hc/en-us/articles/360047294733-How-is-sales-tax-and-VAT-handled-on-works-listed-with-secure-checkout-"
          target="_blank"
          rel="noopener noreferrer"
        >
          {t`artworkPage.sidebar.shippingAndTaxes.taxInformationLearnMore`}
        </a>
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
        shippingOrigin
        shippingInfo
      }
    `,
  }
)
