import React, { FC } from "react"
import { Box } from "@artsy/palette"
import { SubmissionStepper } from "v2/Apps/Consign/Components/SubmissionStepper"

export const ArtworkDetails: FC = () => {
  return (
    <>
      <SubmissionStepper currentStep="Artwork Details" />
      <Box mt={50}>Artwork Details step</Box>
    </>
  )
}
