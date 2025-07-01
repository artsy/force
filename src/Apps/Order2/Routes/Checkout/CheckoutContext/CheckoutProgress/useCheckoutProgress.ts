import type {
  CheckoutState,
  Order2CheckoutContextValue,
} from "Apps/Order2/Routes/Checkout/CheckoutContext/Order2CheckoutContext"

import createLogger from "Utils/logger"
import { useEffect, useMemo } from "react"
import { useFragment } from "react-relay"
import { graphql } from "relay-runtime"
import type {
  useCheckoutProgress_order$data,
  useCheckoutProgress_order$key,
} from "/__generated__/useCheckoutProgress_order.graphql"

const logger = createLogger("useCheckoutProgress.ts")

export enum CheckoutStepName {
  OFFER_AMOUNT = "OFFER_AMOUNT",
  FULFILLMENT_DETAILS = "FULFILLMENT_DETAILS",
  DELIVERY_OPTION = "DELIVERY_OPTION",
  PAYMENT = "PAYMENT",
  CONFIRMATION = "CONFIRMATION",
}

export enum Checkoutstepstate {
  UPCOMING = "UPCOMING",
  ACTIVE = "ACTIVE",
  COMPLETED = "COMPLETED",
  HIDDEN = "HIDDEN",
}

export type CheckoutStep = {
  name: CheckoutStepName
  state: Checkoutstepstate
}

interface UseCheckoutProgressArgs {
  order: useCheckoutProgress_order$key
  context: Order2CheckoutContextValue
  freshStart?: boolean
}

export interface CheckoutProgress {
  steps: CheckoutStep[]
}

const FRAGMENT = graphql`
  fragment useCheckoutProgress_order on Order {
    internalID
    mode
    selectedFulfillmentOption {
      type
    }
    fulfillmentDetails {
      __typename
    }
  }
`

export const useCheckoutProgress = ({
  order,
  context,
  // freshStart = false,
}: UseCheckoutProgressArgs): CheckoutProgress => {
  const orderData = useFragment(FRAGMENT, order)

  const steps = useMemo(() => {
    const steps = calculateStepCompletion(orderData, context)
    const stepToActivate = determineActiveStep(steps, context)
    if (stepToActivate) {
      stepToActivate.state = Checkoutstepstate.ACTIVE
    } else {
      logger.error("No step to activate found. This should not happen.")
    }
    return steps
  }, [orderData, context])

  // TODO: How to handle unsetting a step that is being edited?
  // concept: export a 'stepCompleted' action that lets the step
  // say it is completed, then the context can update the currently editing step?

  // update the steps in the context
  useEffect(() => {
    context.setCheckoutsteps(steps)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [steps, context.setCheckoutsteps])

  return { steps }
}

const DEFAULT_steps = [
  CheckoutStepName.FULFILLMENT_DETAILS,
  CheckoutStepName.DELIVERY_OPTION,
  CheckoutStepName.PAYMENT,
  CheckoutStepName.CONFIRMATION,
]

const determineActiveStep = (
  steps: CheckoutStep[],
  checkoutState: Order2CheckoutContextValue,
  // freshStart: boolean,
): CheckoutStep | undefined => {
  // if (freshStart) {
  //   return steps[0]
  // }
  if (checkoutState.editingStep) {
    return steps.find(step => step.name === checkoutState.editingStep)
  }
  return steps.find(step => step.state === Checkoutstepstate.UPCOMING)
}

/**
 * Get the basic list of steps for checkout progress with their completion state.
 */
const calculateStepCompletion = (
  orderData: useCheckoutProgress_order$data,
  localState: UseCheckoutProgressArgs["context"],
): CheckoutStep[] => {
  const stepNamesInOrder = [...DEFAULT_steps]
  if (orderData.mode === "OFFER") {
    stepNamesInOrder.unshift(CheckoutStepName.OFFER_AMOUNT)
  }

  // All steps start as upcoming
  const steps: CheckoutStep[] = DEFAULT_steps.map(name => ({
    name,
    state: Checkoutstepstate.UPCOMING,
  }))

  logger.warn(
    "Calculating checkout steps for order",
    orderData.internalID,
    steps,
  )

  // Mark steps finished if they have required data on the order
  if (
    !!(
      orderData.selectedFulfillmentOption?.type && orderData.fulfillmentDetails
    )
  ) {
    const fulfillmentDetailsStep = steps.find(
      step => step.name === CheckoutStepName.FULFILLMENT_DETAILS,
    )

    if (!fulfillmentDetailsStep) {
      logger.error(
        "Fulfillment details step not found in the steps array. This should not happen.",
      )
      return steps
    }
    fulfillmentDetailsStep.state = Checkoutstepstate.COMPLETED

    if (
      orderData.selectedFulfillmentOption.type === "PICKUP" ||
      localState.activeFulfillmentDetailsTab === "PICKUP"
    ) {
      const deliveryOptionStep = steps.find(
        step => step.name === CheckoutStepName.DELIVERY_OPTION,
      )
      if (!deliveryOptionStep) {
        logger.error(
          "Delivery option step not found in the steps array. This should not happen.",
        )
        return steps
      }
      deliveryOptionStep.state = Checkoutstepstate.HIDDEN
    }

    if (
      orderData.selectedFulfillmentOption.type === "DOMESTIC_FLAT" ||
      orderData.selectedFulfillmentOption.type === "INTERNATIONAL_FLAT"
    ) {
      const deliveryOptionStep = steps.find(
        step => step.name === CheckoutStepName.DELIVERY_OPTION,
      )
      if (!deliveryOptionStep) {
        logger.error(
          "Delivery option step not found in the steps array. This should not happen.",
        )
        return steps
      }
      deliveryOptionStep.state = Checkoutstepstate.COMPLETED
    }
  }

  // mark payment step finished if we have a confirmation tokens stored
  if (!!localState.confirmationToken) {
    const paymentStep = steps.find(
      step => step.name === CheckoutStepName.PAYMENT,
    )
    if (!paymentStep) {
      logger.error(
        "Payment step not found in the steps array. This should not happen.",
      )
      return steps
    }
    paymentStep.state = Checkoutstepstate.COMPLETED
  }

  // TODO: Support clicking edit to go back to previous steps?
  return steps
}
