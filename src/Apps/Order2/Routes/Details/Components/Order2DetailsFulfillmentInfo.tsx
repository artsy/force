import { Box, Spacer, Text } from "@artsy/palette"
import type { Order2DetailsFulfillmentInfo_order$key } from "__generated__/Order2DetailsFulfillmentInfo_order.graphql"
import type React from "react"
import { useFragment } from "react-relay"
import { graphql } from "relay-runtime"

interface Props {
  order: Order2DetailsFulfillmentInfo_order$key
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
        <Text variant="xs" color="mono100">
          {name}
        </Text>
      )}
      {addressLine1 && (
        <Text variant="xs" color="mono100">
          {addressLine1}
        </Text>
      )}
      {addressLine2 && (
        <Text variant="xs" color="mono100">
          {addressLine2}
        </Text>
      )}
      {(city || region || postalCode) && (
        <Text variant="xs" color="mono100">
          {[city, region, postalCode].join(", ")}
        </Text>
      )}
      {country && (
        <Text variant="xs" color="mono100">
          {country}
        </Text>
      )}
      {phoneNumber && (
        <Text variant="xs" color="mono100">
          {phoneNumber.display}
        </Text>
      )}
    </>
  )
}
export const Order2DetailsFulfillmentInfo: React.FC<Props> = ({ order }) => {
  const orderData = useFragment(fragment, order)

  const { fulfillmentDetails, selectedFulfillmentOption, shippingOrigin } =
    orderData

  const isPickup = selectedFulfillmentOption?.type === "PICKUP"

  return (
    <Box p={2} backgroundColor="mono0">
      <Text variant="sm" fontWeight={500} color="mono100">
        {isPickup ? "Pick up" : "Ship to"}
      </Text>

      <Spacer y={0.5} />

      <Text variant="xs" color="mono100">
        {isPickup ? shippingOrigin : getShippingContent(fulfillmentDetails)}
      </Text>
    </Box>
  )
}

const fragment = graphql`
  fragment Order2DetailsFulfillmentInfo_order on Order {
    fulfillmentDetails {
      addressLine1
      addressLine2
      city
      country
      name
      postalCode
      region
      phoneNumber {
        display
      }
    }
    selectedFulfillmentOption {
      type
    }
    shippingOrigin
  }
`
