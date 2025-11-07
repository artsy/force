import {
  type CheckoutStep,
  CheckoutStepName,
  CheckoutStepState,
} from "Apps/Order2/Routes/Checkout/CheckoutContext/types"
import { useCompleteDeliveryOptionData } from "Apps/Order2/Routes/Checkout/Components/DeliveryOptionsStep/useCompleteDeliveryOptionData"
import { useCompleteFulfillmentDetailsData } from "Apps/Order2/Routes/Checkout/Components/FulfillmentDetailsStep/useCompleteFulfillmentDetailsData"
import { useCompleteOfferData } from "Apps/Order2/Routes/Checkout/Components/OfferStep/useCompleteOfferData"
import { useCompletePaymentData } from "Apps/Order2/Routes/Checkout/Components/PaymentStep/useCompletePaymentData"
import type { useBuildInitialSteps_order$key } from "__generated__/useBuildInitialSteps_order.graphql"
import { graphql, useFragment } from "react-relay"

/**
 * Hook that builds the initial checkout steps based on order completion status.
 * This determines which steps are complete, active, upcoming, or hidden.
 *
 * Uses completion hooks that check order data.
 */
export const useBuildInitialSteps = (
  order: useBuildInitialSteps_order$key,
): CheckoutStep[] => {
  const orderData = useFragment(FRAGMENT, order)

  // Check completion status for each step using hooks
  const offerComplete = useCompleteOfferData(orderData) !== null
  const fulfillmentComplete =
    useCompleteFulfillmentDetailsData(orderData) !== null
  const deliveryComplete = useCompleteDeliveryOptionData(orderData) !== null
  const paymentComplete = useCompletePaymentData(orderData) !== null

  const completeOrUpcoming = (isComplete: boolean) =>
    isComplete ? CheckoutStepState.COMPLETED : CheckoutStepState.UPCOMING

  const offerStep = orderData.mode === "OFFER" && {
    name: CheckoutStepName.OFFER_AMOUNT,
    state: completeOrUpcoming(offerComplete),
  }

  const fulfillmentDetailsStep = {
    name: CheckoutStepName.FULFILLMENT_DETAILS,
    state: completeOrUpcoming(fulfillmentComplete),
  }

  const isPickup = orderData.selectedFulfillmentOption?.type === "PICKUP"
  const deliveryOptionStep = {
    name: CheckoutStepName.DELIVERY_OPTION,
    state: isPickup
      ? CheckoutStepState.HIDDEN
      : completeOrUpcoming(deliveryComplete),
  }

  const paymentStep = {
    name: CheckoutStepName.PAYMENT,
    state: completeOrUpcoming(paymentComplete),
  }

  const confirmationStep = {
    name: CheckoutStepName.CONFIRMATION,
    state: CheckoutStepState.UPCOMING,
  }

  const steps: CheckoutStep[] = [
    offerStep,
    fulfillmentDetailsStep,
    deliveryOptionStep,
    paymentStep,
    confirmationStep,
  ].filter((step): step is CheckoutStep => step !== false)

  const firstUpcomingStep = steps.find(
    step => step.state === CheckoutStepState.UPCOMING,
  )

  if (firstUpcomingStep) {
    firstUpcomingStep.state = CheckoutStepState.ACTIVE
  }

  return steps
}

const FRAGMENT = graphql`
  fragment useBuildInitialSteps_order on Order {
    ...useCompleteOfferData_order
    ...useCompleteFulfillmentDetailsData_order
    ...useCompleteDeliveryOptionData_order
    ...useCompletePaymentData_order
    mode
    selectedFulfillmentOption {
      type
    }
  }
`
