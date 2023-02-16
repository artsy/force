import { useState } from "react"
import { Media } from "Utils/Responsive"
import { Box, Clickable, Step, Stepper } from "@artsy/palette"
import { useRouter } from "System/Router/useRouter"

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
  const { router } = useRouter()
  const [stepIndex, setStepIndex] = useState(steps.indexOf(currentStep))

  const handleStepClick = (step: string) => {
    const clickedStepIndex = steps.indexOf(step)
    setStepIndex(clickedStepIndex)

    const activeStep = currentStep.toLocaleLowerCase()
    const nextStep = step.toLocaleLowerCase()
    router.push(window.location.pathname.replace(activeStep, nextStep))
  }

  return (
    <>
      <Media between={["xs", "md"]}>
        <Box>
          <Stepper
            initialTabIndex={stepIndex}
            currentStepIndex={stepIndex}
            disableNavigation={false}
          >
            {steps.map(step => (
              <Step
                name={
                  <Clickable onClick={() => handleStepClick(step)}>
                    {step}
                  </Clickable>
                }
                key={step}
              />
            ))}
          </Stepper>
        </Box>
      </Media>
      <Media greaterThan="sm">
        <Stepper
          initialTabIndex={stepIndex}
          currentStepIndex={stepIndex}
          disableNavigation={false}
        >
          {steps.map((step, idx) => (
            <Step
              name={
                stepIndex >= idx ? (
                  <Clickable onClick={() => handleStepClick(step)}>
                    {step}
                  </Clickable>
                ) : (
                  step
                )
              }
              key={step}
            />
          ))}
        </Stepper>
      </Media>
    </>
  )
}
