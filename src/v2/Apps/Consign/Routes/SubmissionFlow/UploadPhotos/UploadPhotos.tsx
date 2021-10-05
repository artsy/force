import React, { FC } from "react"
import { Box, Text } from "@artsy/palette"
import { Formik } from "formik"
import { SubmissionStepper } from "v2/Apps/Consign/Components/SubmissionStepper"
import {
  UploadPhotosForm,
  UploadPhotosFormModel,
} from "./Components/UploadPhotosForm"

export const UploadPhotos: FC = () => {
  const handleSubmit = () => {}

  return (
    <Box>
      <SubmissionStepper currentStep="Upload Photos" />

      <Text variant="lg">Upload photos of your artwork</Text>
      <Text variant="sm" color="black60" mt={1}>
        • For a faster valuation, please upload high-quality photos of the
        work’s front and back.
      </Text>
      <Text variant="sm" color="black60">
        • If possible, include photos of any signatures or certificates of
        authenticity.
      </Text>

      <Formik<UploadPhotosFormModel>
        onSubmit={handleSubmit}
        initialValues={{ photos: [] }}
      >
        {({ values }) => (
          <>
            <UploadPhotosForm mt={4} />
            {values.photos.map(photo => (
              <p key={photo.name}>{photo.name}</p>
            ))}
          </>
        )}
      </Formik>
    </Box>
  )
}
