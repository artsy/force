import { Media } from "v2/Utils/Responsive"
import { Step, Stepper } from "@artsy/palette"
import styled from "styled-components"
import React from "react"

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
export const counterofferFlowSteps = typedArray("Respond", "Review")

const StyledContainer = styled.div`
  padding-left: 20px;
`

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
        <StyledContainer>
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
        </StyledContainer>
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
