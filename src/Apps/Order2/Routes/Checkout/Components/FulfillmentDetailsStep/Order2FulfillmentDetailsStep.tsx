import { Box, Flex, Tab, Tabs, Text } from "@artsy/palette"
import { SectionHeading } from "Apps/Order2/Components/SectionHeading"
import {
  CheckoutStepName,
  CheckoutStepState,
} from "Apps/Order2/Routes/Checkout/CheckoutContext/types"
import { Order2DeliveryForm } from "Apps/Order2/Routes/Checkout/Components/FulfillmentDetailsStep/Order2DeliveryForm"
import { Order2FulfillmentDetailsCompletedView } from "Apps/Order2/Routes/Checkout/Components/FulfillmentDetailsStep/Order2FulfillmentDetailsCompletedView"
import { Order2PickupForm } from "Apps/Order2/Routes/Checkout/Components/FulfillmentDetailsStep/Order2PickupForm"
import { useCompleteFulfillmentDetailsData } from "Apps/Order2/Routes/Checkout/Components/FulfillmentDetailsStep/useCompleteFulfillmentDetailsData"
import { useCheckoutContext } from "Apps/Order2/Routes/Checkout/Hooks/useCheckoutContext"
import { useOrder2UnsetOrderFulfillmentOptionMutation } from "Apps/Order2/Routes/Checkout/Mutations/useOrder2UnsetOrderFulfillmentOptionMutation"
import createLogger from "Utils/logger"
import type { Order2FulfillmentDetailsStep_me$key } from "__generated__/Order2FulfillmentDetailsStep_me.graphql"
import type { Order2FulfillmentDetailsStep_order$key } from "__generated__/Order2FulfillmentDetailsStep_order.graphql"
import { useCallback, useMemo } from "react"

import { graphql, useFragment } from "react-relay"

const logger = createLogger("Order2FulfillmentDetailsStep")

interface Order2FulfillmentDetailsStepProps {
  order: Order2FulfillmentDetailsStep_order$key
  me: Order2FulfillmentDetailsStep_me$key
}

export const Order2FulfillmentDetailsStep: React.FC<
  Order2FulfillmentDetailsStepProps
> = ({ order, me }) => {
  const orderData = useFragment(ORDER_FRAGMENT, order)
  const meData = useFragment(ME_FRAGMENT, me)
  const completedViewProps = useCompleteFulfillmentDetailsData(orderData)

  const {
    steps,
    setActiveFulfillmentDetailsTab,
    checkoutTracking,
    setUserAddressMode,
    setIsFulfillmentDetailsSaving,
  } = useCheckoutContext()

  const unsetOrderFulfillmentOption =
    useOrder2UnsetOrderFulfillmentOptionMutation()

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

  const handleTabChange = useCallback(
    async (tabInfo?: { tabIndex: number }) => {
      const isPickup = tabInfo?.tabIndex === 1

      if (!isPickup) {
        checkoutTracking.clickedFulfillmentTab("Delivery")
        setActiveFulfillmentDetailsTab("DELIVERY")
        return
      }

      checkoutTracking.clickedFulfillmentTab("Pickup")
      setActiveFulfillmentDetailsTab("PICKUP")
      setUserAddressMode(null)

      const currentType = orderData.selectedFulfillmentOption?.type
      if (!currentType || currentType === "PICKUP") return

      try {
        setIsFulfillmentDetailsSaving(true)
        await unsetOrderFulfillmentOption.submitMutation({
          variables: { input: { id: orderData.internalID } },
        })
      } catch (error) {
        logger.error("Error unsetting fulfillment option:", error)
      } finally {
        setIsFulfillmentDetailsSaving(false)
      }
    },
    [
      checkoutTracking,
      setActiveFulfillmentDetailsTab,
      setUserAddressMode,
      orderData.selectedFulfillmentOption?.type,
      orderData.internalID,
      setIsFulfillmentDetailsSaving,
      unsetOrderFulfillmentOption,
    ],
  )

  return (
    <Flex
      data-testid="FulfillmentDetailsStep"
      flexDirection="column"
      backgroundColor="mono0"
      py={2}
    >
      <Box px={[2, 2, 4]} hidden={stepState !== CheckoutStepState.UPCOMING}>
        <Flex flexDirection="column">
          <SectionHeading>Delivery</SectionHeading>
          <Text variant="sm" color="mono60">
            Pickup availability and shipping costs vary by location
          </Text>
        </Flex>
      </Box>
      {stepState === CheckoutStepState.COMPLETED && completedViewProps && (
        <Box px={[2, 2, 4]}>
          <Order2FulfillmentDetailsCompletedView {...completedViewProps} />
        </Box>
      )}
      <Box hidden={stepState !== CheckoutStepState.ACTIVE}>
        {pickupOption ? (
          <Tabs
            fill
            data-testid="FulfillmentDetailsStepTabs"
            justifyContent="space-between"
            initialTabIndex={initialPickupSelected ? 1 : 0}
            onChange={handleTabChange}
          >
            <Tab name={<Text variant="sm-display">Delivery</Text>}>
              <Box px={[2, 2, 4]}>
                <Order2DeliveryForm
                  order={orderData}
                  me={meData}
                  hasFulfillmentDetails={completedViewProps !== null}
                />
              </Box>
            </Tab>
            <Tab name={<Text variant="sm-display">Pickup</Text>}>
              <Box px={[2, 2, 4]}>
                <Order2PickupForm order={orderData} me={meData} />
              </Box>
            </Tab>
          </Tabs>
        ) : (
          <Box px={[2, 2, 4]} hidden={stepState !== CheckoutStepState.ACTIVE}>
            <Order2DeliveryForm
              order={orderData}
              me={meData}
              hasFulfillmentDetails={completedViewProps !== null}
            />
          </Box>
        )}
      </Box>
    </Flex>
  )
}

const ME_FRAGMENT = graphql`
  fragment Order2FulfillmentDetailsStep_me on Me {
    ...Order2DeliveryForm_me
    ...Order2PickupForm_me
  }
`

const ORDER_FRAGMENT = graphql`
  fragment Order2FulfillmentDetailsStep_order on Order {
    ...useCompleteFulfillmentDetailsData_order
    ...Order2PickupForm_order
    ...Order2DeliveryForm_order
    id
    internalID
    fulfillmentDetails {
      phoneNumber {
        countryCode
        regionCode
        originalNumber
        display(format: INTERNATIONAL)
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
