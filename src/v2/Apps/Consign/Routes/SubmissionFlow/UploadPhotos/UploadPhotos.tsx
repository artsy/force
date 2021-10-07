import React, { FC } from "react"
import { Box, Text } from "@artsy/palette"
import { Formik } from "formik"
import { SubmissionStepper } from "v2/Apps/Consign/Components/SubmissionStepper"
import {
  UploadPhotosForm,
  UploadPhotosFormModel,
} from "./Components/UploadPhotosForm"
import { PhotoThumbnail } from "./Components/PhotoThumbnail"

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
          const handlePhotoDelete = photo => {
            setFieldValue(
              "photos",
              values.photos.filter(c => c !== photo)
            )
          }

          return (
            <>
              <UploadPhotosForm mt={4} mb={6} />
              {values.photos.map(photo => (
                <PhotoThumbnail
                  mt={2}
                  key={photo.name}
                  photo={photo}
                  onDelete={handlePhotoDelete}
                />
              ))}
            </>
          )
        }}
      </Formik>
    </Box>
  )
}
