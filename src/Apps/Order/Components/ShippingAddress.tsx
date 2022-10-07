import { Text } from "@artsy/palette"

import { ShippingAddress_ship$data } from "__generated__/ShippingAddress_ship.graphql"
import { COUNTRY_CODE_TO_COUNTRY_NAME } from "Components/CountrySelect"
import { createFragmentContainer, graphql } from "react-relay"

export interface ShippingAddressProps {
  ship: ShippingAddress_ship$data
  textColor?: string
}

export const ShippingAddress = ({
  ship: {
    name,
    addressLine1,
    addressLine2,
    city,
    region,
    postalCode,
    country,
    phoneNumber,
  },
  textColor = "black100",
}: ShippingAddressProps) => (
  <>
    <Text color={textColor} variant="sm">
      {name}
    </Text>
    <Text color={textColor} variant="sm">
      {[addressLine1, (addressLine2 || "").trim()].filter(Boolean).join(", ")}
    </Text>
    <Text color={textColor} variant="sm">
      {city}, {region} {postalCode}
    </Text>
    <Text color={textColor} variant="sm">
      {country && (COUNTRY_CODE_TO_COUNTRY_NAME[country] || country)}
    </Text>
    {phoneNumber && (
      <Text color={textColor} variant="sm">
        {phoneNumber}
      </Text>
    )}
  </>
)

export const ShippingAddressFragmentContainer = createFragmentContainer(
  ShippingAddress,
  {
    ship: graphql`
      fragment ShippingAddress_ship on CommerceRequestedFulfillmentUnion {
        ... on CommerceShip {
          name
          addressLine1
          addressLine2
          city
          postalCode
          region
          country
          phoneNumber
        }
        ... on CommerceShipArta {
          name
          addressLine1
          addressLine2
          city
          postalCode
          region
          country
          phoneNumber
        }
      }
    `,
  }
)
