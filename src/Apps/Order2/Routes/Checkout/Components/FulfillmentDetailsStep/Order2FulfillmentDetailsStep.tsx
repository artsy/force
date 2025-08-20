import { Box, Flex, Tab, Tabs, Text } from "@artsy/palette"
import {
  CheckoutStepName,
  CheckoutStepState,
} from "Apps/Order2/Routes/Checkout/CheckoutContext/types"
import { Order2DeliveryForm } from "Apps/Order2/Routes/Checkout/Components/FulfillmentDetailsStep/Order2DeliveryForm"
import { Order2FulfillmentDetailsCompletedView } from "Apps/Order2/Routes/Checkout/Components/FulfillmentDetailsStep/Order2FulfillmentDetailsCompletedView"
import { Order2PickupForm } from "Apps/Order2/Routes/Checkout/Components/FulfillmentDetailsStep/Order2PickupForm"
import { useCheckoutContext } from "Apps/Order2/Routes/Checkout/Hooks/useCheckoutContext"
import type { Order2FulfillmentDetailsStep_me$key } from "__generated__/Order2FulfillmentDetailsStep_me.graphql"
import type { Order2FulfillmentDetailsStep_order$key } from "__generated__/Order2FulfillmentDetailsStep_order.graphql"
import { useMemo } from "react"

import { graphql, useFragment } from "react-relay"

interface Order2FulfillmentDetailsStepProps {
  order: Order2FulfillmentDetailsStep_order$key
  me: Order2FulfillmentDetailsStep_me$key
}

export const Order2FulfillmentDetailsStep: React.FC<
  Order2FulfillmentDetailsStepProps
> = ({ order, me }) => {
  const orderData = useFragment(ORDER_FRAGMENT, order)
  const meData = useFragment(ME_FRAGMENT, me)

  const { steps, setActiveFulfillmentDetailsTab, checkoutTracking } =
    useCheckoutContext()

  const stepState = steps?.find(
    step => step.name === CheckoutStepName.FULFILLMENT_DETAILS,
  )?.state

  const fulfillmentOptions = orderData?.fulfillmentOptions
  const pickupOption = fulfillmentOptions.find(
    option => option.type === "PICKUP",
  )

  // biome-ignore lint/correctness/useExhaustiveDependencies: we don't want this to update
  const initialPickupSelected = useMemo(() => {
    return pickupOption?.selected ?? false
  }, [])

  return (
    <Flex
      data-testid="FulfillmentDetailsStep"
      flexDirection="column"
      backgroundColor="mono0"
      py={2}
    >
      {stepState === CheckoutStepState.COMPLETED && (
        <Box px={[2, 4]}>
          <Order2FulfillmentDetailsCompletedView order={orderData} />
        </Box>
      )}
      <Box hidden={stepState !== CheckoutStepState.ACTIVE}>
        {pickupOption ? (
          <Tabs
            fill
            data-testid="FulfillmentDetailsStepTabs"
            justifyContent="space-between"
            initialTabIndex={initialPickupSelected ? 1 : 0}
            onChange={tabInfo => {
              const { tabIndex } = tabInfo ?? {}
              if (tabIndex === 1) {
                checkoutTracking.clickedFulfillmentTab("Pickup")
                setActiveFulfillmentDetailsTab("PICKUP")
              } else {
                checkoutTracking.clickedFulfillmentTab("Delivery")
                setActiveFulfillmentDetailsTab("DELIVERY")
              }
            }}
          >
            <Tab name={<Text variant="sm-display">Delivery</Text>}>
              <Box px={[2, 4]}>
                <Order2DeliveryForm order={orderData} me={meData} />
              </Box>
            </Tab>
            <Tab name={<Text variant="sm-display">Pickup</Text>}>
              <Box px={[2, 4]}>
                <Order2PickupForm order={orderData} />
              </Box>
            </Tab>
          </Tabs>
        ) : (
          <Box px={[2, 4]} hidden={stepState !== CheckoutStepState.ACTIVE}>
            <Order2DeliveryForm order={orderData} me={meData} />
          </Box>
        )}
      </Box>
    </Flex>
  )
}

const ME_FRAGMENT = graphql`
  fragment Order2FulfillmentDetailsStep_me on Me {
    ...Order2DeliveryForm_me
  }
`

const ORDER_FRAGMENT = graphql`
  fragment Order2FulfillmentDetailsStep_order on Order {
    ...Order2PickupForm_order
    ...Order2DeliveryForm_order
    ...Order2FulfillmentDetailsCompletedView_order
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
      selected
    }
    availableShippingCountries
  }
`
