import { Text } from "@artsy/palette"
import { DevDebug } from "Apps/Sell/Components/DevDebug"
import { ImagePreviewsGrid } from "Apps/Sell/Components/ImagePreviewsGrid"
import { SubmissionLayout } from "Apps/Sell/Components/SubmissionLayout"
import { SubmissionStepTitle } from "Apps/Sell/Components/SubmissionStepTitle"
import { UploadMoreMessage } from "Apps/Sell/Components/UploadMoreMessage"
import { UploadPhotosForm } from "Apps/Sell/Components/UploadPhotosForm"
import {
  Asset,
  photoFromAsset,
  photosFromMyCollectionArtwork,
} from "Apps/Sell/Utils/uploadUtils"
import { Photo } from "Components/PhotoUpload/Utils/fileUtils"
import { RouterLink } from "System/Components/RouterLink"
import { PhotosRoute_submission$key } from "__generated__/PhotosRoute_submission.graphql"
import { Formik } from "formik"
import * as React from "react"
import { graphql, useFragment } from "react-relay"
import * as Yup from "yup"

const FRAGMENT = graphql`
  fragment PhotosRoute_submission on ConsignmentSubmission {
    externalId

    myCollectionArtwork {
      images {
        url(version: "large")
      }
    }

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

  // when user creates submission from MyC artwork AND photos were not initially
  // uploaded to Convection yet - use photos from MyC artwork, then use assets
  const photos: Photo[] =
    submission.myCollectionArtwork && (submission.assets || []).length === 0
      ? photosFromMyCollectionArtwork(submission.myCollectionArtwork)
      : (submission.assets as Asset[]).map(asset => photoFromAsset(asset))

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

            <Text mb={2} variant={["xs", "sm"]} color="black60">
              Make your work stand out and get your submission evaluated faster
              by uploading high-quality photos of the work's front and back.{" "}
              <RouterLink
                to="https://help.artsy.net/s/article/How-to-Take-Photos-That-Sell"
                target="_blank"
                rel="noopener noreferrer"
                color="black100"
                textDecoration="underline"
              >
                Tips for taking photos.
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
