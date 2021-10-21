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
import { uploadPhotosValidationSchema } from "../Utils/validation"
import { useSystemContext } from "v2/System"
import { openAuthModal } from "v2/Utils/openAuthModal"
import { ModalType } from "v2/Components/Authentication/Types"
import { ContextModule, Intent } from "@artsy/cohesion"
import { createConsignSubmission } from "../Utils/createConsignSubmission"

export const UploadPhotos: React.FC = () => {
  const {
    router,
    match: {
      params: { id },
    },
  } = useRouter()

  const { mediator, isLoggedIn, relayEnvironment, user } = useSystemContext()
  const {
    submission,
    saveSubmission,
    submissionId,
    removeSubmission,
  } = useSubmission(id)

  const handleSubmit = async (values: UploadPhotosFormModel) => {
    if (submission) {
      submission.uploadPhotosForm = {
        photos: values.photos.map(photo => ({
          ...photo,
          file: undefined,
          progress: undefined,
        })),
      }

      saveSubmission(submission)

      // router.push({
      //   pathname: `/consign/submission2/${submissionId}/contact-information`,
      // })

      if (!isLoggedIn && mediator) {
        openAuthModal(mediator, {
          mode: ModalType.signup,
          intent: Intent.consign,
          contextModule: ContextModule.consignSubmissionFlow,
          redirectTo: `/consign/submission2/${submissionId}/thank-you`,
          afterSignUpAction: {
            action: "save",
            kind: "submissions",
            objectId: submissionId,
          },
        })
      } else {
        if (relayEnvironment && submission) {
          await createConsignSubmission(relayEnvironment, submission, user)
          removeSubmission()
          router.push(`/consign/submission2/${submissionId}/thank-you`)
        }
      }
    }
  }

  return (
    <>
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
              <UploadPhotosForm mt={4} maxTotalSize={30} />

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
                disabled={!isValid}
                loading={values.photos.some(c => !c.s3Key)}
                type="submit"
              >
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
