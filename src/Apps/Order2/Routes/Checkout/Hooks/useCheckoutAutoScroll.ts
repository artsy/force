import { usePrevious } from "@artsy/palette"
import type { CheckoutStep } from "Apps/Order2/Routes/Checkout/CheckoutContext/types"
import {
  CheckoutStepState,
  CheckoutStepName as StepName,
} from "Apps/Order2/Routes/Checkout/CheckoutContext/types"
import { useCheckoutContext } from "Apps/Order2/Routes/Checkout/Hooks/useCheckoutContext"
import { useScrollToStep } from "Apps/Order2/Routes/Checkout/Hooks/useScrollToStep"
import { useEffect } from "react"
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

  // Auto-scroll as the user advances or edits steps
  useEffect(() => {
    if (!activeStep || isLoading || !previousStep) {
      return
    }

    if (activeStepIndex === previousStepIndex) {
      return
    }

    // Always scroll to confirmation/review step when it becomes active
    if (activeStep.name === StepName.CONFIRMATION) {
      scrollToStep(StepName.CONFIRMATION)
      return
    }

    if (activeStepIndex < previousStepIndex) {
      // Going backwards (editing): scroll to the step being edited
      scrollToStep(activeStep.name)
    } else {
      // Going forwards: scroll to the step that was just completed
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
