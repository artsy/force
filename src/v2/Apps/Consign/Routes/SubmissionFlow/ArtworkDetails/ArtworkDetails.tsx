import React, { FC } from "react"
import { Button, Text } from "@artsy/palette"
import { SubmissionStepper } from "v2/Apps/Consign/Components/SubmissionStepper"
import { Form, Formik } from "formik"
import {
  ArtworkDetailsForm,
  ArtworkDetailsFormModel,
} from "./Components/ArtworkDetailsForm"
import { useRouter } from "v2/System/Router/useRouter"

export const initialValues = {
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

export const ArtworkDetails: FC = () => {
  const { router } = useRouter()

  const handleSubmit = () => {
    sessionStorage.setItem(
      "submission",
      JSON.stringify({ artistId: "4d8b92b34eb68a1b2c0003f4" })
    )

    router.push({
      pathname: "/consign/submission2/upload-photos",
    })
  }

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
          <Form>
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
          </Form>
        )}
      </Formik>
    </>
  )
}
