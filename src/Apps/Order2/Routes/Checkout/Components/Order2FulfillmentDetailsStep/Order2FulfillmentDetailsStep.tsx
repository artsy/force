import { Box, Flex, Tab, Tabs, Text } from "@artsy/palette"
import { Order2DeliveryForm } from "Apps/Order2/Routes/Checkout/Components/Order2FulfillmentDetailsStep/Order2DeliveryForm"
import { Order2FulfillmentDetailsCompletedView } from "Apps/Order2/Routes/Checkout/Components/Order2FulfillmentDetailsStep/Order2FulfillmentDetailsCompletedView"
import { Order2PickupForm } from "Apps/Order2/Routes/Checkout/Components/Order2FulfillmentDetailsStep/Order2PickupForm"
import type { Order2FulfillmentDetailsStep_order$key } from "__generated__/Order2FulfillmentDetailsStep_order.graphql"
import { useEffect, useState } from "react"
import { graphql, useFragment } from "react-relay"

interface Order2FulfillmentDetailsStepProps {
  order: Order2FulfillmentDetailsStep_order$key
}

enum TempStepStatus {
  ACTIVE = "ACTIVE",
  COMPLETE = "COMPLETE",
}

export const Order2FulfillmentDetailsStep: React.FC<
  Order2FulfillmentDetailsStepProps
> = ({ order }) => {
  const orderData = useFragment(ORDER_FRAGMENT, order)

  // TODO: This is to see saved data coming through and will probably be
  // promoted to some higher-level context/dispatch in the future
  const savedFulfillmentDetails = orderData?.fulfillmentDetails
  const selectedFulfillmentOption = orderData?.selectedFulfillmentOption

  const [stepStatus, setStepStatus] = useState<TempStepStatus>(
    TempStepStatus.ACTIVE,
  )
  useEffect(() => {
    if (savedFulfillmentDetails && selectedFulfillmentOption) {
      setStepStatus(TempStepStatus.COMPLETE)
    }
  }, [savedFulfillmentDetails, selectedFulfillmentOption])

  const fulfillmentOptions = orderData?.fulfillmentOptions

  return (
    <Flex
      data-testid="FulfillmentDetailsStep"
      flexDirection="column"
      backgroundColor="mono0"
      py={2}
    >
      {stepStatus === TempStepStatus.COMPLETE ? (
        <Box px={2}>
          <Order2FulfillmentDetailsCompletedView
            fulfillmentDetails={savedFulfillmentDetails}
            onClickEdit={() => setStepStatus(TempStepStatus.ACTIVE)}
            fulfillmentOption={orderData?.selectedFulfillmentOption}
          />
        </Box>
      ) : fulfillmentOptions?.some(option => option.type === "PICKUP") ? (
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
      ) : (
        <Box px={2}>
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
