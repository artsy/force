import { Media } from "Utils/Responsive"
import { Box, Step, Stepper } from "@artsy/palette"
import { FC } from "react"

interface SubmissionStepperProps {
  currentStep: "Artwork Details" | "Upload Photos" | "Contact Information"
}

function typedArray<T extends string>(...elems: T[]): T[] {
  return elems
}

export const submissionFlowSteps = typedArray(
  "Artwork Details",
  "Upload Photos",
  "Contact Information"
)

export const submissionFlowStepsMobile = typedArray(
  "Artwork",
  "Photos",
  "Contact"
)

export const SubmissionStepper: FC<SubmissionStepperProps> = ({
  currentStep,
}) => {
  const stepIndex = submissionFlowSteps.indexOf(currentStep)
  return (
    <>
      <Media at="xs">
        <Box>
          <Stepper
            initialTabIndex={stepIndex}
            currentStepIndex={stepIndex}
            disableNavigation
            autoScroll
          >
            {submissionFlowStepsMobile.map(step => (
              <Step name={step} key={step} />
            ))}
          </Stepper>
        </Box>
      </Media>
      <Media greaterThan="xs">
        <Stepper
          initialTabIndex={stepIndex}
          currentStepIndex={stepIndex}
          disableNavigation
          autoScroll
        >
          {submissionFlowSteps.map(step => (
            <Step name={step} key={step} />
          ))}
        </Stepper>
      </Media>
    </>
  )
}
