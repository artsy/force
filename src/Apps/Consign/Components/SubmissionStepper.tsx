import { Box, Step, Stepper } from "@artsy/palette"
import { useSubmissionFlowSteps } from "Apps/Consign/Hooks/useSubmissionFlowSteps"
import { FC } from "react"
import { __internal__useMatchMedia } from "Utils/Hooks/useMatchMedia"

interface SubmissionStepperProps {
  currentStep: ReturnType<typeof useSubmissionFlowSteps>["0"]
}

enum ALIAS {
  "Artwork Details" = "Artwork",
  Artwork = "Artwork Details",
  "Contact Information" = "Contact",
  Contact = "Contact Information",
  "Upload Photos" = "Photos",
  Photos = "Upload Photos",
}

export const SubmissionStepper: FC<SubmissionStepperProps> = ({
  currentStep,
}) => {
  const useSteps = useSubmissionFlowSteps()
  const steps = [...useSteps]
  let stepIndex = steps.indexOf(currentStep)
  if (stepIndex === -1) {
    stepIndex = steps.indexOf(ALIAS[currentStep])
  }
  if (stepIndex === -1) {
    // this should never happen
    return null
  }
  return (
    <>
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
    </>
  )
}
