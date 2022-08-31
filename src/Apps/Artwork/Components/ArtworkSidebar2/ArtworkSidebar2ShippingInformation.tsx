import { createFragmentContainer, graphql } from "react-relay"
import { Text } from "@artsy/palette"
import { ArtworkSidebar2ShippingInformation_artwork } from "__generated__/ArtworkSidebar2ShippingInformation_artwork.graphql"

export interface ShippingInformationProps {
  artwork: ArtworkSidebar2ShippingInformation_artwork
}

const ArtworkSidebar2ShippingInformation: React.FC<ShippingInformationProps> = ({
  artwork: { shippingOrigin, shippingInfo },
}) => {
  return (
    <>
      {/* TODO: use i18n here */}
      <Text variant="sm" color="black60">
        Taxes may apply at checkout.{" "}
        <a
          href="https://support.artsy.net/hc/en-us/articles/360047294733-How-is-sales-tax-and-VAT-handled-on-works-listed-with-secure-checkout-"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn more.
        </a>
      </Text>
      {shippingOrigin && (
        <Text variant="sm" color="black60">
          {/* TODO: and here */}
          Ships from {shippingOrigin}
        </Text>
      )}

      {shippingInfo && (
        <Text variant="sm" color="black60">
          {shippingInfo}
        </Text>
      )}
    </>
  )
}

export const ArtworkSidebar2ShippingInformationFragmentContainer = createFragmentContainer(
  ArtworkSidebar2ShippingInformation,
  {
    artwork: graphql`
      fragment ArtworkSidebar2ShippingInformation_artwork on Artwork {
        shippingOrigin
        shippingInfo
      }
    `,
  }
)
