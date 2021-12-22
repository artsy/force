import { Box, Button, Text } from "@artsy/palette"
import { useSystemContext } from "v2/System"
import { Form, Formik } from "formik"
import { SubmissionStepper } from "v2/Apps/Consign/Components/SubmissionStepper"
import {
  UploadPhotosForm,
  UploadPhotosFormModel,
} from "./Components/UploadPhotosForm"
import { PhotoThumbnail } from "./Components/PhotoThumbnail"
import {
  Photo,
  addPhotoToSubmission,
  removePhotoFromSubmission,
} from "../Utils/fileUtils"
import { useRouter } from "v2/System/Router/useRouter"
import { BackLink } from "v2/Components/Links/BackLink"
import { getENV } from "v2/Utils/getENV"
import { uploadPhotosValidationSchema, validate } from "../Utils/validation"
import { createFragmentContainer, graphql } from "react-relay"
import { UploadPhotos_submission } from "v2/__generated__/UploadPhotos_submission.graphql"

export interface UploadPhotosProps {
  submission?: UploadPhotos_submission
}

export const getUploadPhotosFormInitialValues = (
  submission?: UploadPhotos_submission
): UploadPhotosFormModel => {
  return {
    photos:
      submission?.assets
        ?.filter(asset => !!asset)
        .map(asset => ({
          id: asset!.id,
          // TODO: Add size and name
          size: 0,
          name: "",
          removed: false,
          loading: false,
          geminiToken: asset?.geminiToken ?? undefined,
          url: (asset?.imageUrls as any)?.thumbnail,
        })) || [],
  }
}

export const UploadPhotos: React.FC<UploadPhotosProps> = ({ submission }) => {
  const { router } = useRouter()
  const { relayEnvironment, isLoggedIn } = useSystemContext()
  const initialValue = getUploadPhotosFormInitialValues(submission)
  const initialErrors = validate(initialValue, uploadPhotosValidationSchema)

  const handleSubmit = async () => {
    if (submission) {
      router.push({
        pathname: `/consign/submission/${submission.id}/contact-information`,
      })
    }
  }

  return (
    <>
      <BackLink
        py={2}
        mb={6}
        width="min-content"
        to={`/consign/submission/${submission?.id}/artwork-details`}
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
        validationSchema={uploadPhotosValidationSchema}
        initialValues={initialValue}
        initialErrors={initialErrors}
      >
        {({ values, setFieldValue, isValid, isSubmitting }) => {
          const handlePhotoDelete = async (photo: Photo) => {
            photo.removed = true
            photo.abortUploading?.()

            if (relayEnvironment) {
              await removePhotoFromSubmission(
                relayEnvironment,
                photo,
                submission?.id || "",
                !isLoggedIn ? getENV("SESSION_ID") : undefined
              )

              const photosToSave = values.photos.filter(p => p.id !== photo.id)
              setFieldValue("photos", photosToSave)
            }
          }

          const handlePhotoUploaded = async (photo: Photo) => {
            if (relayEnvironment) {
              await addPhotoToSubmission(
                relayEnvironment,
                photo,
                submission?.id || "",
                !isLoggedIn ? getENV("SESSION_ID") : undefined
              )
            }
          }

          return (
            <Form>
              <UploadPhotosForm
                mt={4}
                maxTotalSize={30}
                onPhotoUploaded={handlePhotoUploaded}
                submissionId={submission?.id || ""}
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
                disabled={isSubmitting || !isValid}
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

export const UploadPhotosFragmentContainer = createFragmentContainer(
  UploadPhotos,
  {
    submission: graphql`
      fragment UploadPhotos_submission on ConsignmentSubmission {
        id
        assets {
          id
          imageUrls
          geminiToken
        }
      }
    `,
  }
)
