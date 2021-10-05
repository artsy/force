import React, { FC } from "react"
import { Button, Text } from "@artsy/palette"
import { SubmissionStepper } from "v2/Apps/Consign/Components/SubmissionStepper"
import { Formik } from "formik"
import { ArtworkDetailsForm } from "./Components/ArtworkDetailsForm"

export const ArtworkDetails: FC = () => {
  return (
    <>
      <SubmissionStepper currentStep="Artwork Details" />
      <Text mt={4} mb={1} variant="lg">
        Tell us about your artwork
      </Text>
      <Text mb={6} variant="sm" color="black60">
        All fields are required to submit a work.
      </Text>
      <Formik initialValues={{}} onSubmit={() => {}}>
        {({ isSubmitting }) => (
          <>
            <ArtworkDetailsForm />
            <Button
              mt={6}
              type="submit"
              size="medium"
              variant="primaryBlack"
              loading={isSubmitting}
            >
              Save and Continue
            </Button>
          </>
        )}
      </Formik>
    </>
  )
}
