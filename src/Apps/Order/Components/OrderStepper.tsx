import { Media } from "Utils/Responsive"
import { Box, Step, Stepper } from "@artsy/palette"

function typedArray<T extends string>(...elems: T[]): T[] {
  return elems
}

export const offerFlowSteps = typedArray(
  "Offer",
  "Shipping",
  "Payment",
  "Review"
)
export const buyNowFlowSteps = typedArray("Shipping", "Payment", "Review")
export const privateFlowSteps = typedArray("Payment", "Review")
export const counterofferFlowSteps = typedArray("Respond", "Review")

export function OrderStepper<Steps extends string[]>({
  currentStep,
  steps,
}: {
  steps: Steps
  currentStep: Steps extends Array<infer K> ? K : never
}) {
  const stepIndex = steps.indexOf(currentStep)
  return (
    <>
      <Media between={["xs", "md"]}>
        <Box>
          <Stepper
            initialTabIndex={stepIndex}
            currentStepIndex={stepIndex}
            disableNavigation
            autoScroll
          >
            {steps.map(step => (
              <Step name={step} key={step} />
            ))}
          </Stepper>
        </Box>
      </Media>
      <Media greaterThan="sm">
        <Stepper
          initialTabIndex={stepIndex}
          currentStepIndex={stepIndex}
          disableNavigation
          autoScroll
        >
          {steps.map(step => (
            <Step name={step} key={step} />
          ))}
        </Stepper>
      </Media>
    </>
  )
}
