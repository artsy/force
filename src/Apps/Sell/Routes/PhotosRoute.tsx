import * as React from "react"
import { PhotosRoute_submission$key } from "__generated__/PhotosRoute_submission.graphql"
import { Text } from "@artsy/palette"
import { graphql, useFragment } from "react-relay"
import * as Yup from "yup"
import { Formik } from "formik"
import { DevDebug } from "Apps/Sell/Components/DevDebug"
import { SubmissionLayout } from "Apps/Sell/Components/SubmissionLayout"
import { RouterLink } from "System/Components/RouterLink"
import { Photo } from "Components/PhotoUpload/Utils/fileUtils"
import { UploadMoreMessage } from "Apps/Sell/Components/UploadMoreMessage"
import { ImagePreviewsGrid } from "Apps/Sell/Components/ImagePreviewsGrid"
import { UploadPhotosForm } from "Apps/Sell/Components/UploadPhotosForm"
import { Asset, photoFromAsset } from "Apps/Sell/Utils/photoFromAsset"
import { SubmissionStepTitle } from "Apps/Sell/Components/SubmissionStepTitle"

const FRAGMENT = graphql`
  fragment PhotosRoute_submission on ConsignmentSubmission {
    externalId
    assets {
      id
      size
      filename
      geminiToken
      imageUrls
    }
  }
`

const Schema = Yup.object().shape({
  photos: Yup.array()
    .min(1)
    .of(
      Yup.object().shape({
        geminiToken: Yup.string().required(),
      })
    ),
})

export interface PhotosFormValues {
  submissionId: string
  photos: Photo[]
}

interface PhotosRouteProps {
  submission: PhotosRoute_submission$key
}

export const PhotosRoute: React.FC<PhotosRouteProps> = props => {
  const submission = useFragment(FRAGMENT, props.submission)

  const photos: Photo[] = (submission.assets as Asset[]).map(asset =>
    photoFromAsset(asset)
  )

  const initialValues: PhotosFormValues = {
    submissionId: submission.externalId,
    photos,
  }

  return (
    <Formik<PhotosFormValues>
      initialValues={initialValues}
      onSubmit={() => {}}
      validateOnMount
      validationSchema={Schema}
    >
      {({ values }) => {
        const isAnyPhotoLoading = values.photos.some(
          (photo: Photo) => photo.loading
        )

        return (
          <SubmissionLayout loading={isAnyPhotoLoading}>
            <SubmissionStepTitle>
              Upload photos of your artwork
            </SubmissionStepTitle>

            <Text mb={2} variant={["xs", "sm"]}>
              Make your work stand out and get your submission evaluated faster
              by uploading high-quality photos of the work's front and back.{" "}
              <RouterLink
                to="https://help.artsy.net/s/article/How-to-Take-Photos-That-Sell"
                target="_blank"
                inline
              >
                <Text color="black100" display="inline">
                  Tips for taking photos
                </Text>
              </RouterLink>
            </Text>

            <UploadPhotosForm />
            <UploadMoreMessage />
            <ImagePreviewsGrid />

            <DevDebug />
          </SubmissionLayout>
        )
      }}
    </Formik>
  )
}
