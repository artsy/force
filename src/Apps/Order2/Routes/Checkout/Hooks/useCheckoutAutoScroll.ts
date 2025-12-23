import { usePrevious } from "@artsy/palette"
import type {
  CheckoutStep,
  CheckoutStepName,
} from "Apps/Order2/Routes/Checkout/CheckoutContext/types"
import { CheckoutStepName as StepName } from "Apps/Order2/Routes/Checkout/CheckoutContext/types"
import { useJump } from "Utils/Hooks/useJump"
import { useCallback, useEffect } from "react"

export const STEP_JUMP_MAP: Record<CheckoutStepName, string> = {
  OFFER_AMOUNT: "offer-step",
  FULFILLMENT_DETAILS: "fulfillment-details-step",
  DELIVERY_OPTION: "delivery-options-step",
  PAYMENT: "payment-step",
  CONFIRMATION: "review-step",
}

export const STEP_ORDER: CheckoutStepName[] = [
  StepName.OFFER_AMOUNT,
  StepName.FULFILLMENT_DETAILS,
  StepName.DELIVERY_OPTION,
  StepName.PAYMENT,
  StepName.CONFIRMATION,
]

interface UseCheckoutAutoScrollOptions {
  activeStep?: CheckoutStep
}

const OFFSET = 30

export const useCheckoutAutoScroll = (
  options?: UseCheckoutAutoScrollOptions,
) => {
  const { jumpTo } = useJump({ behavior: "smooth" })
  const previousStep = usePrevious(options?.activeStep)

  // Arbitrary offset to account for any fixed headers, etc and position the
  // step nicely in view

  const scrollToStep = useCallback(
    (stepName: CheckoutStepName) => {
      // Never scroll when completing payment step per requirements
      if (stepName === "PAYMENT") {
        return
      }

      const jumpId = STEP_JUMP_MAP[stepName]
      if (!jumpId) return

      // Small delay to allow DOM to update after state change
      setTimeout(() => {
        jumpTo(jumpId, { behavior: "smooth", offset: OFFSET })
      }, 100)
    },
    [jumpTo],
  )

  // Auto-scroll as user advances through steps
  useEffect(() => {
    const activeStep = options?.activeStep

    if (!activeStep) {
      return
    }

    // Always scroll to confirmation/review step when it becomes active
    if (activeStep.name === StepName.CONFIRMATION) {
      scrollToStep(StepName.CONFIRMATION)
      return
    }

    if (!previousStep) {
      return
    }

    // Determine if user is going backwards (editing a previous step)
    const activeIndex = STEP_ORDER.indexOf(activeStep.name)
    const previousIndex = STEP_ORDER.indexOf(previousStep.name)
    const isGoingBackwards = activeIndex < previousIndex

    if (isGoingBackwards) {
      // When going backwards, scroll to the step being edited
      scrollToStep(activeStep.name)
    } else {
      // When going forwards, scroll to the step that was just completed
      scrollToStep(previousStep.name)
    }
  }, [options?.activeStep, previousStep, scrollToStep])

  return { scrollToStep }
}
