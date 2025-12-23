import { usePrevious } from "@artsy/palette"
import type {
  CheckoutStep,
  CheckoutStepName,
} from "Apps/Order2/Routes/Checkout/CheckoutContext/types"
import { CheckoutStepName as StepName } from "Apps/Order2/Routes/Checkout/CheckoutContext/types"
import { useScrollToStep } from "Apps/Order2/Routes/Checkout/Hooks/useScrollToStep"
import { useEffect } from "react"
export { STEP_JUMP_MAP } from "Apps/Order2/Routes/Checkout/Hooks/useScrollToStep"

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

export const useCheckoutAutoScroll = (
  options?: UseCheckoutAutoScrollOptions,
) => {
  const { scrollToStep } = useScrollToStep()
  const previousStep = usePrevious(options?.activeStep)

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
