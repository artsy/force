import { Box, Spacer, Text } from "@artsy/palette"
import { COUNTRY_CODE_TO_COUNTRY_NAME } from "Components/CountrySelect"
import type { OrderDetailsFulfillmentInfo_order$key } from "__generated__/OrderDetailsFulfillmentInfo_order.graphql"
import type React from "react"
import { useFragment } from "react-relay"
import { graphql } from "relay-runtime"

interface OrderDetailsFulfillmentInfoProps {
  order: OrderDetailsFulfillmentInfo_order$key
}

export const OrderDetailsFulfillmentInfo: React.FC<
  OrderDetailsFulfillmentInfoProps
> = ({ order }) => {
  const orderData = useFragment(fragment, order)

  const { fulfillmentDetails, selectedFulfillmentOption, shippingOrigin } =
    orderData

  const isBlankFulfillmentDetails =
    !fulfillmentDetails ||
    Object.values(fulfillmentDetails).every(
      part =>
        !part ||
        part === undefined ||
        (typeof part === "string" && part.trim() === ""),
    )
  const isPickup = selectedFulfillmentOption?.type === "PICKUP"

  if (
    (isPickup && !shippingOrigin) ||
    (!isPickup && isBlankFulfillmentDetails)
  ) {
    return null
  }

  return (
    <Box px={[2, 4]} py={2} backgroundColor="mono0">
      <Text variant="sm" fontWeight="bold" color="mono100">
        {isPickup ? "Pickup" : "Ship to"}
      </Text>

      <Spacer y={0.5} />

      <Text variant={["xs", "sm"]} color="mono100">
        {isPickup ? shippingOrigin : getShippingContent(fulfillmentDetails)}
      </Text>
    </Box>
  )
}

const getShippingContent = (fulfillmentDetails): React.ReactNode => {
  const {
    name,
    addressLine1,
    addressLine2,
    city,
    region,
    postalCode,
    country,
    phoneNumber,
  } = fulfillmentDetails
  return (
    <>
      {name && (
        <Text variant={["xs", "sm-display"]} color="mono100">
          {name}
        </Text>
      )}
      {addressLine1 && (
        <Text variant={["xs", "sm-display"]} color="mono100">
          {addressLine1}
        </Text>
      )}
      {addressLine2 && (
        <Text variant={["xs", "sm-display"]} color="mono100">
          {addressLine2}
        </Text>
      )}
      {(city || region || postalCode) && (
        <Text variant={["xs", "sm-display"]} color="mono100">
          {[city, region, postalCode].filter(Boolean).join(", ")}
        </Text>
      )}
      {country && (
        <Text variant={["xs", "sm-display"]} color="mono100">
          {country && (COUNTRY_CODE_TO_COUNTRY_NAME[country] || country)}
        </Text>
      )}
      {phoneNumber && (
        <Text variant={["xs", "sm-display"]} color="mono100">
          {phoneNumber.display}
        </Text>
      )}
    </>
  )
}

const fragment = graphql`
  fragment OrderDetailsFulfillmentInfo_order on Order {
    fulfillmentDetails {
      addressLine1
      addressLine2
      city
      country
      name
      postalCode
      region
      phoneNumber {
        display(format: INTERNATIONAL)
      }
    }
    selectedFulfillmentOption {
      type
    }
    shippingOrigin
  }
`
