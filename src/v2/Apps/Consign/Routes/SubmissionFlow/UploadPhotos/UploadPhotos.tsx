import React, { FC } from "react"
import { Box, Text } from "@artsy/palette"
import { Form, Formik } from "formik"
import { SubmissionStepper } from "v2/Apps/Consign/Components/SubmissionStepper"
import {
  UploadPhotosForm,
  UploadPhotosFormModel,
} from "./Components/UploadPhotosForm"
import { PhotoThumbnail } from "./Components/PhotoThumbnail"
import { Photo } from "../Utils/FileUtils"

export const UploadPhotos: FC = () => {
  const handleSubmit = () => {}

  return (
    <Box mb={4}>
      <SubmissionStepper currentStep="Upload Photos" />

      <Text variant="lg">Upload photos of your artwork</Text>
      <Text variant="sm" color="black60" mt={1}>
        &#8226; For a faster valuation, please upload high-quality photos of the
        work&#39;s front and back.
      </Text>
      <Text variant="sm" color="black60">
        &#8226; If possible, include photos of any signatures or certificates of
        authenticity.
      </Text>

      <Formik<UploadPhotosFormModel>
        onSubmit={handleSubmit}
        initialValues={{ photos: [] }}
      >
        {({ values, setFieldValue }) => {
          const handlePhotoDelete = (photo: Photo) => {
            photo.removed = true
            photo.abortUploading && photo.abortUploading()

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
            </Form>
          )
        }}
      </Formik>
    </Box>
  )
}
