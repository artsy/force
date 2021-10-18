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
import { saveSubmission } from "../Utils/submissionUtils"

const ArtworkDetailsSchema = Yup.object().shape({
  artistId: Yup.string().label("Artist").required(),
  year: Yup.string().required(),
  title: Yup.string().required(),
  medium: Yup.string()
    .required()
    .test(
      "isDefault",
      "Medium field not selected",
      medium => medium !== "default"
    ),
  rarity: Yup.string()
    .required()
    .test(
      "isDefault",
      "Rarity field not selected",
      rarity => rarity !== "default"
    ),
  editionNumber: Yup.string().when("rarity", {
    is: "limited edition",
    then: Yup.string().required(),
  }),
  editionSize: Yup.number().when("rarity", {
    is: "limited edition",
    then: Yup.number().required(),
  }),
  height: Yup.number().positive().required(),
  width: Yup.number().positive().required(),
  depth: Yup.number().positive(),
  units: Yup.string().required(),
})

export const initialValues = {
  artistId: "",
  artistName: "",
  year: "",
  title: "",
  medium: "",
  rarity: "",
  editionNumber: "",
  editionSize: undefined,
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

  const handleSubmit = (values: ArtworkDetailsFormModel) => {
    const submissionId = id ? id : uuid()

    const isLimitedEditionRarity = values.rarity === "limited edition"

    saveSubmission(submissionId, {
      artworkDetailsForm: {
        ...values,
        editionNumber: isLimitedEditionRarity ? values.editionNumber : "",
        editionSize: isLimitedEditionRarity ? values.editionSize : undefined,
      },
    })

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
