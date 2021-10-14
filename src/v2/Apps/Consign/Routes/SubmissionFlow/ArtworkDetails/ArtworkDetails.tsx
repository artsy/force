import React, { FC } from "react"
import { Button, Text } from "@artsy/palette"
import { SubmissionStepper } from "v2/Apps/Consign/Components/SubmissionStepper"
import { Form, Formik } from "formik"
import {
  ArtworkDetailsForm,
  ArtworkDetailsFormModel,
} from "./Components/ArtworkDetailsForm"
import { useRouter } from "v2/System/Router/useRouter"
import uuid from "uuid"
import * as Yup from "yup"

const ArtworkDetailsSchema = Yup.object().shape({
  artist: Yup.string().label("Artist").required(),
  year: Yup.string().required(),
  title: Yup.string().required(),
  medium: Yup.string().required(),
  rarity: Yup.string().required(),
  editionNumber: Yup.string(),
  editionSize: Yup.string(),
  height: Yup.number().positive().required(),
  width: Yup.number().positive().required(),
  depth: Yup.number().positive(),
  units: Yup.string().required(),
})

export const initialValues = {
  artist: "",
  year: "",
  title: "",
  medium: "",
  rarity: "",
  editionNumber: "",
  editionSize: "",
  height: "",
  width: "",
  depth: "",
  units: "in",
}

export const ArtworkDetails: FC = () => {
  const {
    router,
    match: {
      params: { id },
    },
  } = useRouter()

  const handleSubmit = () => {
    const submissionId = id ? id : uuid()

    sessionStorage.setItem(
      `submission-${submissionId}`,
      JSON.stringify({ artistId: "4d8b92b34eb68a1b2c0003f4" })
    )

    router.replace({
      pathname: `/consign/submission2/${submissionId}/artwork-details`,
    })
    router.push({
      pathname: `/consign/submission2/${submissionId}/upload-photos`,
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
        validationSchema={ArtworkDetailsSchema}
        validateOnMount
      >
        {({ isSubmitting, isValid }) => (
          <Form>
            <ArtworkDetailsForm />
            <Button
              mt={6}
              data-test-id="save-button"
              type="submit"
              size="medium"
              variant="primaryBlack"
              loading={isSubmitting}
              disabled={!isValid}
            >
              Save and Continue
            </Button>
          </Form>
        )}
      </Formik>
    </>
  )
}
