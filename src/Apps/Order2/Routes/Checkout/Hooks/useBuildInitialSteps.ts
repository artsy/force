import {
  type CheckoutStep,
  CheckoutStepName,
  CheckoutStepState,
} from "Apps/Order2/Routes/Checkout/CheckoutContext/types"
import { applyDeliveryOptionLogic } from "Apps/Order2/Routes/Checkout/CheckoutContext/stepUtils"
import { useCompleteDeliveryOptionData } from "Apps/Order2/Routes/Checkout/Components/DeliveryOptionsStep/useCompleteDeliveryOptionData"
import { useCompleteFulfillmentDetailsData } from "Apps/Order2/Routes/Checkout/Components/FulfillmentDetailsStep/useCompleteFulfillmentDetailsData"
import { useCompleteOfferData } from "Apps/Order2/Routes/Checkout/Components/OfferStep/Hooks/useCompleteOfferData"
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

  const firstUpcomingIndex = steps.findIndex(
    step => step.state === CheckoutStepState.UPCOMING,
  )

  if (firstUpcomingIndex !== -1) {
    const firstUpcomingStep = steps[firstUpcomingIndex]
    const prevStep =
      firstUpcomingIndex > 0 ? steps[firstUpcomingIndex - 1] : null

    // Don't jump directly to PAYMENT on load when a delivery option has
    // already been selected. Keep the user on DELIVERY_OPTION (ACTIVE) so
    // they can explicitly confirm and continue to payment themselves.
    if (
      firstUpcomingStep.name === CheckoutStepName.PAYMENT &&
      prevStep?.name === CheckoutStepName.DELIVERY_OPTION &&
      prevStep.state === CheckoutStepState.COMPLETED
    ) {
      prevStep.state = CheckoutStepState.ACTIVE
    } else {
      firstUpcomingStep.state = CheckoutStepState.ACTIVE
    }
  }

  return applyDeliveryOptionLogic(steps)
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
