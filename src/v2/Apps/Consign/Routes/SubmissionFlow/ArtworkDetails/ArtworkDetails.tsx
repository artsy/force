import React, { FC } from "react"
import { Box } from "@artsy/palette"
import {
  submissionFlowSteps,
  SubmissionStepper,
} from "v2/Apps/Consign/Components/SubmissionStepper"

export const ArtworkDetails: FC = () => {
  return (
    <>
      <SubmissionStepper
        currentStep="Artwork Details"
        steps={submissionFlowSteps}
      />
      <Box mt={50}>Artwork Details step</Box>
    </>
  )
}
