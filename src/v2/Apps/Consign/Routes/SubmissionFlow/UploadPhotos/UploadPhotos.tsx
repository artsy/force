import { Box, Button, Text } from "@artsy/palette"
import { Form, Formik } from "formik"
import { SubmissionStepper } from "v2/Apps/Consign/Components/SubmissionStepper"
import {
  UploadPhotosForm,
  UploadPhotosFormModel,
} from "./Components/UploadPhotosForm"
import { PhotoThumbnail } from "./Components/PhotoThumbnail"
import { Photo } from "../Utils/fileUtils"
import { useRouter } from "v2/System/Router/useRouter"
import { useSubmission } from "../Utils/useSubmission"
import { BackLink } from "v2/Components/Links/BackLink"

export const UploadPhotos: React.FC = () => {
  const {
    router,
    match: {
      params: { id },
    },
  } = useRouter()
  const { submission, saveSubmission, submissionId } = useSubmission(id)

  const handleSubmit = async () => {
    if (submission) {
      router.push({
        pathname: `/consign/submission/${submissionId}/contact-information`,
      })
    }
  }

  const saveUpladPhotosForm = (photos: Photo[]) => {
    submission!.uploadPhotosForm = {
      photos: photos.map(photo => ({
        ...photo,
        file: undefined,
        progress: undefined,
      })),
    }

    saveSubmission(submission!)
  }

  return (
    <>
      <BackLink
        py={2}
        mb={6}
        to={`/consign/submission/${submissionId}/artwork-details`}
      >
        Back
      </BackLink>

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
      >
        {({ values, setFieldValue, isSubmitting }) => {
          const handlePhotoDelete = (photo: Photo) => {
            photo.removed = true
            photo.abortUploading?.()

            const photosToSave = values.photos.filter(p => p.id !== photo.id)

            setFieldValue("photos", photosToSave)
            saveUpladPhotosForm(photosToSave.filter(p => p.s3Key))
          }

          const handlePhotoUploaded = () => {
            saveUpladPhotosForm(values.photos.filter(p => p.s3Key))
          }

          return (
            <Form>
              <UploadPhotosForm
                mt={4}
                maxTotalSize={30}
                onPhotoUploaded={handlePhotoUploaded}
              />

              <Box mb={6}>
                {values.photos.map(photo => (
                  <PhotoThumbnail
                    mt={2}
                    key={photo.id}
                    photo={photo}
                    onDelete={handlePhotoDelete}
                  />
                ))}
              </Box>

              <Button
                width={["100%", "auto"]}
                disabled={isSubmitting || !values.photos.some(c => c.s3Key)}
                loading={isSubmitting || values.photos.some(c => c.loading)}
                type="submit"
              >
                Save and Continue
              </Button>
            </Form>
          )
        }}
      </Formik>
    </>
  )
}
