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
import type { Order2DeliveryOptionsStep_order$key } from "__generated__/Order2DeliveryOptionsStep_order.graphql"
import { graphql, useFragment } from "react-relay"

type Order2DeliveryOptionsStepProps = {
  order: Order2DeliveryOptionsStep_order$key
}

const Placeholder = () => {
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
    return <Placeholder />
  }

  if (stepState === CheckoutStepState.ACTIVE) {
    if (!hasFulfillmentDetails || isFulfillmentDetailsSaving) {
      return <Placeholder />
    }
    return <Order2DeliveryOptionsForm order={orderData} />
  }

  if (stepState === CheckoutStepState.COMPLETED && completedViewProps) {
    const selectableOptions = orderData.fulfillmentOptions.filter(
      o => !["PICKUP", "SHIPPING_TBD"].includes(o.type),
    )
    const allowEdit = selectableOptions.length > 1
    return (
      <Order2DeliveryOptionsCompletedView
        {...completedViewProps}
        allowEdit={allowEdit}
      />
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
