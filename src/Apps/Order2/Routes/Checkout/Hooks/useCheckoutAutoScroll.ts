import { usePrevious } from "@artsy/palette"
import type { CheckoutStep } from "Apps/Order2/Routes/Checkout/CheckoutContext/types"
import {
  CheckoutStepState,
  CheckoutStepName as StepName,
} from "Apps/Order2/Routes/Checkout/CheckoutContext/types"
import { useCheckoutContext } from "Apps/Order2/Routes/Checkout/Hooks/useCheckoutContext"
import { useScrollToStep } from "Apps/Order2/Routes/Checkout/Hooks/useScrollToStep"
import { useEffect, useRef } from "react"
export { STEP_JUMP_MAP } from "Apps/Order2/Routes/Checkout/Hooks/useScrollToStep"

const stepWithIndex = (
  step: CheckoutStep | null | undefined,
  steps: CheckoutStep[],
): number => {
  const stepOrder = steps.map(s => s.name)
  if (!step) {
    return -1
  }
  return stepOrder.indexOf(step.name)
}

export const useCheckoutAutoScroll = () => {
  const { isLoading, steps } = useCheckoutContext()
  const { scrollToStep } = useScrollToStep()

  const activeStep = steps.find(step => step.state === CheckoutStepState.ACTIVE)
  const activeStepIndex = stepWithIndex(activeStep, steps)

  const previousStep = usePrevious(activeStep)
  const previousStepIndex = stepWithIndex(previousStep, steps)

  const wasLoading = usePrevious(isLoading)
  const justLoaded = wasLoading && !isLoading

  const initialScrollComplete = useRef(false)

  // Scroll to active step when loading completes
  useEffect(() => {
    if (initialScrollComplete.current) {
      return
    }
    if (justLoaded) {
      if (activeStep && activeStepIndex > 0) {
        scrollToStep(activeStep.name)
      }
      initialScrollComplete.current = true
    }
  }, [justLoaded, activeStep, scrollToStep, activeStepIndex])

  // Auto-scroll as user advances through steps
  useEffect(() => {
    if (!activeStep || isLoading) {
      return
    }

    // Always scroll to confirmation/review step when it becomes active
    if (activeStep.name === StepName.CONFIRMATION) {
      scrollToStep(StepName.CONFIRMATION)
      return
    }

    if (!previousStep) {
      // Only scroll if we're past the first step AND initial load is complete
      if (activeStepIndex > 0 && initialScrollComplete.current) {
        scrollToStep(activeStep.name)
      }
      return
    }

    // Determine if user is going backwards (editing a previous step)
    const isGoingBackwards = activeStepIndex < previousStepIndex

    // If the step hasn't actually changed, don't scroll
    if (activeStepIndex === previousStepIndex) {
      return
    }

    if (isGoingBackwards) {
      // When going backwards, scroll to the step being edited
      scrollToStep(activeStep.name)
    } else {
      // When going forwards, scroll to the step that was just completed
      scrollToStep(previousStep.name)
    }
  }, [
    activeStep,
    previousStep,
    scrollToStep,
    activeStepIndex,
    isLoading,
    previousStepIndex,
  ])
}
