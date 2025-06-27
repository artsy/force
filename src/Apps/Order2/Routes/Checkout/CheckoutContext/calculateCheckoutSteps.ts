import type { Order2CheckoutContextValue } from "Apps/Order2/Routes/Checkout/CheckoutContext/Order2CheckoutContext"
import {
  type CheckoutStep,
  CheckoutStepName,
  CheckoutStepState,
} from "Apps/Order2/Routes/Checkout/CheckoutContext/types"
import createLogger from "Utils/logger"

const logger = createLogger("useCalculateCheckoutSteps.ts")

interface CalculateStepsArgs {
  order: any
  context: {
    confirmationToken?: Order2CheckoutContextValue["confirmationToken"]
  }
  freshStart?: boolean
  forceHideDeliveryOption?: boolean
}

export const calculateCheckoutSteps = ({
  order,
  context,
  freshStart = false,
  forceHideDeliveryOption = false,
}: CalculateStepsArgs): CheckoutStep[] => {
  const stepNamesInOrder = [
    CheckoutStepName.FULFILLMENT_DETAILS,
    CheckoutStepName.DELIVERY_OPTION,
    CheckoutStepName.PAYMENT,
    CheckoutStepName.CONFIRMATION,
  ]

  if (order.mode === "OFFER") {
    stepNamesInOrder.unshift(CheckoutStepName.OFFER_AMOUNT)
  }

  const steps: CheckoutStep[] = stepNamesInOrder.map(name => ({
    name,
    state: CheckoutStepState.UPCOMING,
  }))

  // for now, support starting from the first step with an early return
  if (freshStart) {
    steps[0].state = CheckoutStepState.ACTIVE
    return steps
  }

  logger.warn("Calculating checkout steps for order", order.internalID, steps)

  // Mark steps finished if they have required data on the order
  if (!!(order.selectedFulfillmentOption?.type && order.fulfillmentDetails)) {
    const fulfillmentDetailsStep = steps.find(
      step => step.name === CheckoutStepName.FULFILLMENT_DETAILS,
    )

    if (!fulfillmentDetailsStep) {
      logger.error(
        "Fulfillment details step not found in the steps array. This should not happen.",
      )
      return steps
    }
    fulfillmentDetailsStep.state = CheckoutStepState.COMPLETED

    if (
      order.selectedFulfillmentOption.type === "PICKUP" ||
      forceHideDeliveryOption
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
      deliveryOptionStep.state = CheckoutStepState.HIDDEN
    }

    if (
      order.selectedFulfillmentOption.type === "DOMESTIC_FLAT" ||
      order.selectedFulfillmentOption.type === "INTERNATIONAL_FLAT"
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
      deliveryOptionStep.state = CheckoutStepState.COMPLETED
    }
  }

  // mark payment step finished if we have a confirmation tokens stored
  if (!!context.confirmationToken) {
    const paymentStep = steps.find(
      step => step.name === CheckoutStepName.PAYMENT,
    )
    if (!paymentStep) {
      logger.error(
        "Payment step not found in the steps array. This should not happen.",
      )
      return steps
    }
    paymentStep.state = CheckoutStepState.COMPLETED
  }

  // find first upcoming step and set it to active
  const firstUpcomingStep = steps.find(step => step.state === "UPCOMING")
  if (firstUpcomingStep) {
    firstUpcomingStep.state = CheckoutStepState.ACTIVE
  }

  // TODO: Support clicking edit to go back to previous steps?
  return steps
}
