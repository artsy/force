import CheckmarkIcon from "@artsy/icons/CheckmarkIcon"
import { Box, Clickable, Flex, Spacer, Text } from "@artsy/palette"
import { AddressDisplay } from "Apps/Order2/Routes/Checkout/Components/FulfillmentDetailsStep/AddressDisplay"
import { useCheckoutContext } from "Apps/Order2/Routes/Checkout/Hooks/useCheckoutContext"

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
              variant={["sm-display", "sm-display", "md"]}
              fontWeight={["bold", "bold", "normal"]}
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
            variant={["sm-display", "sm-display", "md"]}
            fontWeight={["bold", "bold", "normal"]}
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
  return (
    <AddressDisplay
      address={fulfillmentDetails}
      phoneNumber={fulfillmentDetails.phoneNumber}
      textColor="mono100"
    />
  )
}
