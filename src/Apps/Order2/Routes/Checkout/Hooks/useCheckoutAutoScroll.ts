import { usePrevious } from "@artsy/palette"
import type { CheckoutStepName } from "Apps/Order2/Routes/Checkout/CheckoutContext/types"
import {
  CheckoutStepState,
  CheckoutStepName as StepName,
} from "Apps/Order2/Routes/Checkout/CheckoutContext/types"
import { useCheckoutContext } from "Apps/Order2/Routes/Checkout/Hooks/useCheckoutContext"
import { useScrollToStep } from "Apps/Order2/Routes/Checkout/Hooks/useScrollToStep"
import { useEffect, useRef } from "react"
export { STEP_JUMP_MAP } from "Apps/Order2/Routes/Checkout/Hooks/useScrollToStep"

export const STEP_ORDER: CheckoutStepName[] = [
  StepName.OFFER_AMOUNT,
  StepName.FULFILLMENT_DETAILS,
  StepName.DELIVERY_OPTION,
  StepName.PAYMENT,
  StepName.CONFIRMATION,
]

export const useCheckoutAutoScroll = () => {
  const { isLoading, steps } = useCheckoutContext()
  const { scrollToStep } = useScrollToStep()
  const activeStep = steps.find(step => step.state === CheckoutStepState.ACTIVE)
  const previousStep = usePrevious(activeStep)

  const wasLoading = usePrevious(isLoading)
  const justLoaded = wasLoading && !isLoading

  const intialScrollComplete = useRef(false)

  // Scroll to active step when loading completes
  useEffect(() => {
    if (intialScrollComplete.current) {
      return
    }
    if (justLoaded) {
      if (activeStep) {
        scrollToStep(activeStep.name)
      }
      intialScrollComplete.current = true
    }
  }, [justLoaded, activeStep, scrollToStep])

  // Auto-scroll as user advances through steps
  useEffect(() => {
    if (!activeStep) {
      return
    }

    // Always scroll to confirmation/review step when it becomes active
    if (activeStep.name === StepName.CONFIRMATION) {
      scrollToStep(StepName.CONFIRMATION)
      return
    }

    if (!previousStep) {
      scrollToStep(activeStep.name)
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
  }, [activeStep, previousStep, scrollToStep])
}
