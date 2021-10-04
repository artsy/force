import React, { FC } from "react"
import { Box } from "@artsy/palette"
import {
  submissionFlowSteps,
  SubmissionStepper,
} from "v2/Apps/Consign/Components/SubmissionStepper"

export const UploadPhotos: FC = () => {
  return (
    <>
      <SubmissionStepper
        currentStep="Upload Photos"
        steps={submissionFlowSteps}
      />
      <Box mt={50}>Upload Photos step</Box>
    </>
  )
}
