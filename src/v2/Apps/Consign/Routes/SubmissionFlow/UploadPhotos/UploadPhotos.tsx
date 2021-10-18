import React, { FC } from "react"
import { Box, Button, Text } from "@artsy/palette"
import { Form, Formik } from "formik"
import { SubmissionStepper } from "v2/Apps/Consign/Components/SubmissionStepper"
import {
  UploadPhotosForm,
  UploadPhotosFormModel,
} from "./Components/UploadPhotosForm"
import { PhotoThumbnail } from "./Components/PhotoThumbnail"
import { Photo } from "../Utils/fileUtils"
import * as yup from "yup"
import { useRouter } from "v2/System/Router/useRouter"
import { getSubmission, saveSubmission } from "../Utils/submissionUtils"

export const uploadPhotosValidationSchema = yup.object().shape({
  photos: yup
    .array()
    .min(1)
    .of(
      yup.object().shape({
        s3Key: yup.string().required(),
      })
    ),
})

export const UploadPhotos: FC = () => {
  const {
    router,
    match: {
      params: { id },
    },
  } = useRouter()

  const handleSubmit = (values: UploadPhotosFormModel) => {
    const submission = getSubmission(id)

    if (submission) {
      submission.uploadPhotosForm = {
        photos: values.photos.map(photo => ({
          ...photo,
          file: undefined,
          progress: undefined,
        })),
      }

      saveSubmission(id, submission)

      router.push({
        pathname: `/consign/submission2/${id}/contact-information`,
      })
    }
  }

  return (
    <Box mb={4}>
      <SubmissionStepper currentStep="Upload Photos" />

      <Text mt={4} variant="lg">
        Upload photos of your artwork
      </Text>
      <Text variant="sm" color="black60" mt={1}>
        &#8226; For a faster valuation, please upload high-quality photos of the
        work&#39;s front and back.
      </Text>
      <Text variant="sm" color="black60">
        &#8226; If possible, include photos of any signatures or certificates of
        authenticity.
      </Text>

      <Formik<UploadPhotosFormModel>
        validateOnMount
        onSubmit={handleSubmit}
        initialValues={{
          photos: [],
        }}
        validationSchema={uploadPhotosValidationSchema}
      >
        {({ values, setFieldValue, isValid, errors }) => {
          const handlePhotoDelete = (photo: Photo) => {
            photo.removed = true
            photo.abortUploading?.()

            setFieldValue(
              "photos",
              values.photos.filter(p => p.id !== photo.id)
            )
          }

          return (
            <Form>
              <UploadPhotosForm mt={4} mb={6} />

              {values.photos.map(photo => (
                <PhotoThumbnail
                  mt={2}
                  key={photo.id}
                  photo={photo}
                  onDelete={handlePhotoDelete}
                />
              ))}

              <Button
                mt={2}
                disabled={!isValid}
                loading={values.photos.some(c => !c.s3Key)}
                type="submit"
              >
                Save and Continue
              </Button>
            </Form>
          )
        }}
      </Formik>
    </Box>
  )
}
