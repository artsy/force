import { Box, Step, Stepper, themeProps } from "@artsy/palette"
import { FC } from "react"
import { useFeatureFlag } from "System/useFeatureFlag"
import { __internal__useMatchMedia } from "Utils/Hooks/useMatchMedia"

interface SubmissionStepperProps {
  currentStep: ReturnType<typeof useSubmissionFlowSteps>["0"]
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

enum ALIAS {
  "Artwork Details" = "Artwork",
  Artwork = "Artwork Details",
  "Contact Information" = "Contact",
  Contact = "Contact Information",
  "Upload Photos" = "Photos",
  Photos = "Upload Photos",
}

export const useSubmissionFlowSteps = () => {
  const enableFlowReorder = useFeatureFlag(
    "reorder-swa-artwork-submission-flow"
  )
  const isMobile = __internal__useMatchMedia(themeProps.mediaQueries.xs)
  if (enableFlowReorder && isMobile) {
    return typedArray("Contact", "Artwork", "Photos")
  } else if (enableFlowReorder) {
    return typedArray("Contact Information", "Artwork Details", "Upload Photos")
  }
  if (isMobile) {
    return submissionFlowStepsMobile
  }
  return submissionFlowSteps
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
