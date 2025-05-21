import { Box, Flex, Tab, Tabs, Text } from "@artsy/palette"
import {
  CheckoutStepName,
  CheckoutStepState,
} from "Apps/Order2/Routes/Checkout/CheckoutContext/types"
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

  const { editFulfillmentDetails, steps, setActiveFulfillmentDetailsTab } =
    useCheckoutContext()!

  const stepState = steps?.find(
    step => step.name === CheckoutStepName.FULFILLMENT_DETAILS,
  )?.state

  // TODO: This is to see saved data coming through and may be
  // promoted to some higher-level context/dispatch in the future
  // Question: should this come from the context where step is?
  const savedFulfillmentDetails = orderData?.fulfillmentDetails
  const selectedFulfillmentOption = orderData?.selectedFulfillmentOption

  const fulfillmentOptions = orderData?.fulfillmentOptions

  const isPickupAvailable = fulfillmentOptions?.some(
    option => option.type === "PICKUP",
  )

  return (
    <Flex
      data-testid="FulfillmentDetailsStep"
      flexDirection="column"
      backgroundColor="mono0"
      py={2}
    >
      <Box px={2} hidden={stepState !== CheckoutStepState.COMPLETED}>
        <Order2FulfillmentDetailsCompletedView
          fulfillmentDetails={savedFulfillmentDetails}
          onClickEdit={() => editFulfillmentDetails()}
          fulfillmentOption={selectedFulfillmentOption}
        />
      </Box>
      <Box hidden={stepState !== CheckoutStepState.ACTIVE}>
        {isPickupAvailable ? (
          <Tabs
            data-testid="FulfillmentDetailsStepTabs"
            justifyContent="space-between"
            initialTabIndex={0}
            onChange={tabInfo => {
              const { tabIndex } = tabInfo ?? {}
              console.log("**", tabInfo)
              if (tabIndex === 1) {
                setActiveFulfillmentDetailsTab("PICKUP")
              } else {
                setActiveFulfillmentDetailsTab("DELIVERY")
              }
            }}
          >
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
        ) : (
          <Box px={2} hidden={stepState !== CheckoutStepState.ACTIVE}>
            <Order2DeliveryForm order={orderData} />
          </Box>
        )}
      </Box>
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
