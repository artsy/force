import React, { FC } from "react"
import { Button, Text } from "@artsy/palette"
import { SubmissionStepper } from "v2/Apps/Consign/Components/SubmissionStepper"
import { Formik } from "formik"
import {
  ArtworkDetailsForm,
  ArtworkDetailsFormModel,
} from "./Components/ArtworkDetailsForm"

export const ArtworkDetails: FC = () => {
  const initialValues = {
    artist: "",
    year: "",
    title: "",
    medium: "",
    rarity: "default",
    editionNumber: "",
    editionSize: "",
    heigth: "",
    width: "",
    depth: "",
    units: "in",
  }

  const handleSubmit = () => {}

  return (
    <>
      <SubmissionStepper currentStep="Artwork Details" />
      <Text mt={4} mb={1} variant="lg">
        Tell us about your artwork
      </Text>
      <Text mb={[2, 6]} variant="sm" color="black60">
        All fields are required to submit a work.
      </Text>
      <Formik<ArtworkDetailsFormModel>
        initialValues={initialValues}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <>
            <ArtworkDetailsForm />
            <Button
              mt={6}
              data-test-id="save-button"
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
