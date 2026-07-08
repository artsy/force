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

interface UseCheckoutAutoScrollProps {
  isExpressCheckoutEligible: boolean
}

export const useCheckoutAutoScroll = ({
  isExpressCheckoutEligible,
}: UseCheckoutAutoScrollProps) => {
  const { isLoading, steps } = useCheckoutContext()
  const { scrollToStep } = useScrollToStep()

  // Combined steps (FULFILLMENT_DETAILS + DELIVERY_OPTION) are ACTIVE
  // together, use the last one so forward-advance previousStep is correct.
  const activeSteps = steps.filter(
    step => step.state === CheckoutStepState.ACTIVE,
  )
  const activeStep = activeSteps[0]
  const trailingActiveStep = activeSteps[activeSteps.length - 1]
  const activeStepIndex = stepWithIndex(activeStep, steps)

  const previousStep = usePrevious(trailingActiveStep)
  const previousStepIndex = stepWithIndex(previousStep, steps)

  const wasLoading = usePrevious(isLoading)
  const justLoaded = wasLoading && !isLoading

  const initialScrollComplete = useRef(false)

  const hasUserInteracted = useRef(false)

  useEffect(() => {
    const handleUserInteraction = () => {
      hasUserInteracted.current = true
    }
    window.addEventListener("pointerdown", handleUserInteraction)
    window.addEventListener("keydown", handleUserInteraction)
    return () => {
      window.removeEventListener("pointerdown", handleUserInteraction)
      window.removeEventListener("keydown", handleUserInteraction)
    }
  }, [])

  // Scroll to active step when loading completes
  useEffect(() => {
    if (isExpressCheckoutEligible) {
      return
    }
    if (initialScrollComplete.current) {
      return
    }
    if (justLoaded) {
      if (activeStep && activeStepIndex > 0) {
        scrollToStep(activeStep.name)
      }
      initialScrollComplete.current = true
    }
  }, [
    justLoaded,
    activeStep,
    scrollToStep,
    activeStepIndex,
    isExpressCheckoutEligible,
  ])

  // Auto-scroll as user advances through steps
  useEffect(() => {
    if (!activeStep || isLoading) {
      return
    }

    if (isExpressCheckoutEligible && !hasUserInteracted.current) {
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
    isExpressCheckoutEligible,
  ])
}
