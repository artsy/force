import { useCheckoutContext } from "Apps/Order2/Routes/Checkout/Hooks/useCheckoutContext"
import CheckmarkIcon from "@artsy/icons/CheckmarkIcon"
import { Box, Clickable, Flex, Spacer, Text } from "@artsy/palette"

export interface FulfillmentDetails {
  name?: string | null
  addressLine1?: string | null
  addressLine2?: string | null
  city?: string | null
  region?: string | null
  postalCode?: string | null
  country?: string | null
  phoneNumber?: string | null
}

export interface Order2FulfillmentDetailsCompletedViewProps {
  isPickup: boolean
  fulfillmentDetails: FulfillmentDetails
}

export const Order2FulfillmentDetailsCompletedView: React.FC<
  Order2FulfillmentDetailsCompletedViewProps
> = ({ isPickup, fulfillmentDetails }) => {
  const { editFulfillmentDetails, checkoutTracking } = useCheckoutContext()

  const onClickEdit = () => {
    checkoutTracking.clickedChangeShippingAddress()
    editFulfillmentDetails()
  }

  if (isPickup) {
    return (
      <Flex flexDirection="column" backgroundColor="mono0">
        <Flex justifyContent="space-between">
          <Flex alignItems="center">
            <CheckmarkIcon fill="mono100" />
            <Spacer x={1} />
            <Text
              variant={["sm-display", "md"]}
              fontWeight={["bold", "normal"]}
              color="mono100"
            >
              Pickup
            </Text>
          </Flex>
          <Clickable
            textDecoration="underline"
            cursor="pointer"
            type="button"
            onClick={onClickEdit}
          >
            <Text variant="sm" fontWeight="normal" color="mono100">
              Edit
            </Text>
          </Clickable>
        </Flex>
        <Flex alignItems="center" ml="30px" mt={1}>
          <Text variant="sm" fontWeight="normal" color="mono100">
            After your order is confirmed, a specialist will contact you within
            2 business days to coordinate pickup.
          </Text>
        </Flex>
      </Flex>
    )
  }

  return (
    <Flex flexDirection="column" backgroundColor="mono0">
      <Flex justifyContent="space-between">
        <Flex alignItems="center">
          <CheckmarkIcon height={20} width={20} fill="mono100" />
          <Box flexGrow={1} mx={0.5} />
          <Text
            variant={["sm-display", "md"]}
            fontWeight={["bold", "normal"]}
            color="mono100"
          >
            Delivery
          </Text>
        </Flex>
        <Clickable
          textDecoration="underline"
          cursor="pointer"
          type="button"
          onClick={onClickEdit}
        >
          <Text variant="sm" fontWeight="normal" color="mono100">
            Edit
          </Text>
        </Clickable>
      </Flex>

      <Box ml="30px" mt={1}>
        <ShippingContent fulfillmentDetails={fulfillmentDetails} />
      </Box>
    </Flex>
  )
}

const ShippingContent: React.FC<{ fulfillmentDetails: FulfillmentDetails }> = ({
  fulfillmentDetails,
}) => {
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
        <Text variant="sm" color="mono100">
          {name}
        </Text>
      )}
      {addressLine1 && (
        <Text variant="sm" color="mono100">
          {addressLine1}
        </Text>
      )}
      {addressLine2 && (
        <Text variant="sm" color="mono100">
          {addressLine2}
        </Text>
      )}
      {(city || region || postalCode) && (
        <Text variant="sm" color="mono100">
          {[city, region, country, postalCode].filter(Boolean).join(", ")}
        </Text>
      )}

      {phoneNumber && (
        <Text variant="sm" color="mono100">
          {phoneNumber}
        </Text>
      )}
    </>
  )
}
