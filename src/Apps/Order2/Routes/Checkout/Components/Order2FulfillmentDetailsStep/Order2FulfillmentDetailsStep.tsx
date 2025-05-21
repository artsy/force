import { Box, Flex, Tab, Tabs, Text } from "@artsy/palette"
import {
  CheckoutStepName,
  CheckoutStepState,
} from "Apps/Order2/Routes/Checkout/CheckoutContext/utils"
import { Order2DeliveryForm } from "Apps/Order2/Routes/Checkout/Components/Order2FulfillmentDetailsStep/Order2DeliveryForm"
import { Order2FulfillmentDetailsCompletedView } from "Apps/Order2/Routes/Checkout/Components/Order2FulfillmentDetailsStep/Order2FulfillmentDetailsCompletedView"
import { Order2PickupForm } from "Apps/Order2/Routes/Checkout/Components/Order2FulfillmentDetailsStep/Order2PickupForm"
import { useCheckoutContext } from "Apps/Order2/Routes/Checkout/Hooks/useCheckoutContext"
import type { Order2FulfillmentDetailsStep_order$key } from "__generated__/Order2FulfillmentDetailsStep_order.graphql"

import { graphql, useFragment } from "react-relay"

interface Order2FulfillmentDetailsStepProps {
  order: Order2FulfillmentDetailsStep_order$key
}

export const Order2FulfillmentDetailsStep: React.FC<
  Order2FulfillmentDetailsStepProps
> = ({ order }) => {
  const orderData = useFragment(ORDER_FRAGMENT, order)

  const { editFulfillmentDetails, steps } = useCheckoutContext()!

  const stepState = steps?.find(
    step => step.name === CheckoutStepName.FULFILLMENT_DETAILS,
  )?.state

  // TODO: This is to see saved data coming through and will probably be
  // promoted to some higher-level context/dispatch in the future
  const savedFulfillmentDetails = orderData?.fulfillmentDetails
  const selectedFulfillmentOption = orderData?.selectedFulfillmentOption

  const fulfillmentOptions = orderData?.fulfillmentOptions

  return (
    <Flex
      data-testid="FulfillmentDetailsStep"
      flexDirection="column"
      backgroundColor="mono0"
      py={2}
    >
      <Box
        px={2}
        display={stepState === CheckoutStepState.COMPLETED ? "block" : "none"}
      >
        <Order2FulfillmentDetailsCompletedView
          fulfillmentDetails={savedFulfillmentDetails}
          onClickEdit={() => editFulfillmentDetails()}
          fulfillmentOption={selectedFulfillmentOption} // TODO: should this come from the context where step is?
        />
      </Box>
      {fulfillmentOptions?.some(option => option.type === "PICKUP") ? (
        <Box
          data-testid="FulfillmentDetailsStepTabs"
          display={stepState === CheckoutStepState.ACTIVE ? "block" : "none"}
        >
          <Tabs justifyContent="space-between" initialTabIndex={0}>
            <Tab
              name={
                <Text mx={50} variant="xs">
                  Delivery
                </Text>
              }
            >
              <Box px={2}>
                <Order2DeliveryForm order={orderData} />
              </Box>
            </Tab>
            <Tab
              name={
                <Text mx={50} variant="xs">
                  Pickup
                </Text>
              }
            >
              <Box px={2}>
                <Order2PickupForm order={orderData} />
              </Box>
            </Tab>
          </Tabs>
        </Box>
      ) : (
        <Box
          px={2}
          display={stepState === CheckoutStepState.ACTIVE ? "block" : "none"}
        >
          <Order2DeliveryForm order={orderData} />
        </Box>
      )}
    </Flex>
  )
}

const ORDER_FRAGMENT = graphql`
  fragment Order2FulfillmentDetailsStep_order on Order {
    ...Order2PickupForm_order
    id
    fulfillmentDetails {
      phoneNumber {
        countryCode
        regionCode
        originalNumber
      }
      addressLine1
      addressLine2
      city
      country
      name
      postalCode
      region
    }
    selectedFulfillmentOption {
      type
    }
    fulfillmentOptions {
      type
    }
  }
`
