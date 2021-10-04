import React, { FC } from "react"
import { Box } from "@artsy/palette"
import { SubmissionStepper } from "v2/Apps/Consign/Components/SubmissionStepper"

export const ContactInformation: FC = () => {
  return (
    <>
      <SubmissionStepper currentStep="Contact Information" />
      <Box mt={50}>Contact Information step</Box>
    </>
  )
}
