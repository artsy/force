import { useState } from "react"
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
import { useSystemContext } from "v2/System"
import { openAuthModal } from "v2/Utils/openAuthModal"
import { ModalType } from "v2/Components/Authentication/Types"
import { ErrorModal } from "v2/Components/Modal/ErrorModal"
import { ContextModule, Intent } from "@artsy/cohesion"
import { createConsignSubmission } from "../Utils/createConsignSubmission"
import { BackLink } from "v2/Components/Links/BackLink"

export const UploadPhotos: React.FC = () => {
  const {
    router,
    match: {
      params: { id },
    },
  } = useRouter()

  const [isSubmissionApiError, setIsSubmissionApiError] = useState(false)
  const { mediator, isLoggedIn, relayEnvironment, user } = useSystemContext()
  const {
    submission,
    saveSubmission,
    submissionId,
    removeSubmission,
  } = useSubmission(id)

  const handleSubmit = async () => {
    if (submission) {
      // TODO: SWA-78
      // router.push({
      //   pathname: `/consign/submission/${submissionId}/contact-information`,
      // })

      if (!isLoggedIn && mediator) {
        openAuthModal(mediator, {
          mode: ModalType.signup,
          intent: Intent.consign,
          contextModule: ContextModule.consignSubmissionFlow,
          redirectTo: `/consign/submission/${submissionId}/thank-you`,
          afterSignUpAction: {
            action: "save",
            kind: "submissions",
            objectId: submissionId,
          },
        })
      } else {
        if (relayEnvironment && submission) {
          try {
            await createConsignSubmission(relayEnvironment, submission, user)
            removeSubmission()
            router.push(`/consign/submission/${submissionId}/thank-you`)
          } catch (error) {
            setIsSubmissionApiError(true)
          }
        }
      }
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

      <ErrorModal
        show={isSubmissionApiError}
        headerText="An error occurred"
        contactEmail="consign@artsymail.com"
        closeText="Close"
        onClose={() => setIsSubmissionApiError(false)}
      />

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
                {/* TODO: SWA-78 */}
                {/* Save and Continue */}
                Submit Artwork
              </Button>
            </Form>
          )
        }}
      </Formik>
    </>
  )
}
