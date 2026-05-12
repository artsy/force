import { Box, Flex, Text } from "@artsy/palette"
import { SectionHeading } from "Apps/Order2/Components/SectionHeading"
import {
  CheckoutStepName,
  CheckoutStepState,
} from "Apps/Order2/Routes/Checkout/CheckoutContext/types"
import { Order2DeliveryOptionsCompletedView } from "Apps/Order2/Routes/Checkout/Components/DeliveryOptionsStep/Order2DeliveryOptionsCompletedView"
import { Order2DeliveryOptionsForm } from "Apps/Order2/Routes/Checkout/Components/DeliveryOptionsStep/Order2DeliveryOptionsForm"
import { useCompleteDeliveryOptionData } from "Apps/Order2/Routes/Checkout/Components/DeliveryOptionsStep/useCompleteDeliveryOptionData"
import { useCompleteFulfillmentDetailsData } from "Apps/Order2/Routes/Checkout/Components/FulfillmentDetailsStep/useCompleteFulfillmentDetailsData"
import { useCheckoutContext } from "Apps/Order2/Routes/Checkout/Hooks/useCheckoutContext"
import { STEP_JUMP_MAP } from "Apps/Order2/Routes/Checkout/Hooks/useCheckoutAutoScroll"
import type { Order2DeliveryOptionsStep_order$key } from "__generated__/Order2DeliveryOptionsStep_order.graphql"
import { Jump } from "Utils/Hooks/useJump"
import { graphql, useFragment } from "react-relay"

type Order2DeliveryOptionsStepProps = {
  order: Order2DeliveryOptionsStep_order$key
}

const DeliveryOptionsPlaceholder = () => {
  return (
    <Flex flexDirection="column" backgroundColor="mono0">
      <Box py={2} px={[2, 2, 4]} data-testid="DeliveryOptionsStep">
        <Flex flexDirection="column">
          <SectionHeading>Shipping method</SectionHeading>
          <Text variant="sm" color="mono60">
            Methods vary based on location and artwork size
          </Text>
        </Flex>
      </Box>
    </Flex>
  )
}

export const Order2DeliveryOptionsStep: React.FC<
  Order2DeliveryOptionsStepProps
> = ({ order }) => {
  const { steps, isFulfillmentDetailsSaving } = useCheckoutContext()
  const orderData = useFragment(FRAGMENT, order)
  const completedViewProps = useCompleteDeliveryOptionData(orderData)
  const hasFulfillmentDetails =
    useCompleteFulfillmentDetailsData(orderData) !== null

  const stepState = steps?.find(
    step => step.name === CheckoutStepName.DELIVERY_OPTION,
  )?.state

  if (stepState === CheckoutStepState.HIDDEN) {
    return null
  }

  if (stepState === CheckoutStepState.UPCOMING) {
    return (
      <Box>
        <Jump id={STEP_JUMP_MAP.DELIVERY_OPTION} />
        <DeliveryOptionsPlaceholder />
      </Box>
    )
  }

  if (stepState === CheckoutStepState.ACTIVE) {
    // Show the placeholder when no delivery address is confirmed.
    // Pickup fulfillment details don't count — if the user is on the delivery
    // tab after having previously selected pickup, we haven't submitted a
    // delivery address yet.
    const hasDeliveryAddress =
      hasFulfillmentDetails &&
      orderData.selectedFulfillmentOption?.type !== "PICKUP"

    if (!hasDeliveryAddress && !isFulfillmentDetailsSaving) {
      return (
        <Box>
          <Jump id={STEP_JUMP_MAP.DELIVERY_OPTION} />
          <DeliveryOptionsPlaceholder />
        </Box>
      )
    }

    return (
      <Box>
        <Jump id={STEP_JUMP_MAP.DELIVERY_OPTION} />
        <Order2DeliveryOptionsForm
          order={orderData}
          refreshingOptions={isFulfillmentDetailsSaving}
        />
      </Box>
    )
  }

  if (stepState === CheckoutStepState.COMPLETED && completedViewProps) {
    const selectableOptions = orderData.fulfillmentOptions.filter(
      o => !["PICKUP", "SHIPPING_TBD"].includes(o.type),
    )
    const allowEdit = selectableOptions.length > 1
    return (
      <Box>
        <Jump id={STEP_JUMP_MAP.DELIVERY_OPTION} />
        <Order2DeliveryOptionsCompletedView
          {...completedViewProps}
          allowEdit={allowEdit}
        />
      </Box>
    )
  }

  return null
}

const FRAGMENT = graphql`
  fragment Order2DeliveryOptionsStep_order on Order {
    ...useCompleteDeliveryOptionData_order
    ...useCompleteFulfillmentDetailsData_order
    ...Order2DeliveryOptionsForm_order
    internalID
    fulfillmentOptions {
      type
    }
    selectedFulfillmentOption {
      type
      amount {
        display
      }
    }
  }
`
