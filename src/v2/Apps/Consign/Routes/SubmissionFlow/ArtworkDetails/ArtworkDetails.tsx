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
  year: Yup.number()
    .typeError("Year must be a number")
    .label("Year")
    .required()
    .positive()
    .integer(),
  title: Yup.string().label("Title").required(),
  medium: Yup.string().required(),
  rarity: Yup.string().required(),
  editionNumber: Yup.number()
    .typeError("Edition Number must be a number")
    .label("Edition number")
    .positive()
    .integer(),
  editionSize: Yup.number()
    .typeError("Edition Size must be a number")
    .label("Edition size")
    .positive()
    .integer(),
  height: Yup.number()
    .typeError("Height must be a number")
    .label("Height")
    .required()
    .positive(),
  width: Yup.number()
    .typeError("Width must be a number")
    .label("Width")
    .required()
    .positive(),
  depth: Yup.number()
    .typeError("Depth must be a number")
    .label("Depth")
    .positive(),
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
        {({ isSubmitting, errors }) => (
          <Form>
            <ArtworkDetailsForm />
            <Button
              mt={6}
              data-test-id="save-button"
              type="submit"
              size="medium"
              variant="primaryBlack"
              loading={isSubmitting}
              disabled={Object.keys(errors).length > 0}
            >
              Save and Continue
            </Button>
          </Form>
        )}
      </Formik>
    </>
  )
}
