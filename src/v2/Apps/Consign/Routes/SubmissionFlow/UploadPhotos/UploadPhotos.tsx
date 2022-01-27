import { Box, Button, Text } from "@artsy/palette"
import { useSystemContext } from "v2/System"
import { Form, Formik } from "formik"
import { SubmissionStepper } from "v2/Apps/Consign/Components/SubmissionStepper"
import {
  UploadPhotosForm,
  UploadPhotosFormModel,
} from "./Components/UploadPhotosForm"
import { PhotoThumbnail } from "./Components/PhotoThumbnail"
import { Photo } from "../Utils/fileUtils"
import { useRouter } from "v2/System/Router/useRouter"
import { BackLink } from "v2/Components/Links/BackLink"
import { getENV } from "v2/Utils/getENV"
import { uploadPhotosValidationSchema, validate } from "../Utils/validation"
import { isServer } from "lib/isServer"
import {
  createFragmentContainer,
  graphql,
  fetchQuery,
  Environment,
} from "react-relay"
import { UploadPhotos_submission } from "v2/__generated__/UploadPhotos_submission.graphql"
import { UploadPhotos_ImageRefetch_Query } from "v2/__generated__/UploadPhotos_ImageRefetch_Query.graphql"

import {
  useRemoveAssetFromConsignmentSubmission,
  useAddAssetToConsignmentSubmission,
} from "../Mutations"
import createLogger from "v2/Utils/logger"
import { useRef, useState } from "react"

const logger = createLogger("SubmissionFlow/UploadPhotos.tsx")

export interface UploadPhotosProps {
  submission?: UploadPhotos_submission
}

type SubmissionAsset = NonNullable<UploadPhotos_submission["assets"]>[0]

const shouldRefetchPhotoUrls = (photos: Photo[]) => {
  return photos.some(photo => !!photo.assetId && !photo.url && !photo.file)
}

const getPhotoUrlFromAsset = (asset: SubmissionAsset) => {
  return (
    (asset?.imageUrls as any)?.thumbnail || (asset?.imageUrls as any)?.square
  )
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
          assetId: asset!.id,
          size: (asset?.size && parseInt(asset?.size, 10)) || 0,
          name: asset?.filename ?? "",
          geminiToken: asset?.geminiToken ?? undefined,
          url: getPhotoUrlFromAsset(asset),
          removed: false,
          loading: false,
        })) || [],
  }
}

export const UploadPhotos: React.FC<UploadPhotosProps> = ({ submission }) => {
  const { router } = useRouter()
  const { isLoggedIn, relayEnvironment } = useSystemContext()
  const [isPhotosRefetchStarted, setIsPhotosRefetchStarted] = useState(false)
  const photosRefetchingCount = useRef(0)
  const {
    submitMutation: removeAsset,
  } = useRemoveAssetFromConsignmentSubmission()
  const { submitMutation: addAsset } = useAddAssetToConsignmentSubmission()

  const initialValue = getUploadPhotosFormInitialValues(submission)
  const initialErrors = validate(initialValue, uploadPhotosValidationSchema)

  const handleSubmit = async () => {
    if (submission) {
      router.push({
        pathname: `/sell/submission/${submission.externalId}/contact-information`,
      })
    }
  }

  return (
    <>
      <BackLink
        py={2}
        mb={6}
        width="min-content"
        to={`/sell/submission/${submission?.externalId}/artwork-details`}
      >
        Back
      </BackLink>

      <SubmissionStepper currentStep="Upload Photos" />

      <Text mt={4} variant="lg">
        Upload photos of your artwork
      </Text>
      <Text variant="sm" color="black60" mt={1}>
        &#8226; To evaluate your submission faster, please upload high-quality
        photos of the work&#39;s front and back.
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
          const handlePhotoDelete = (photo: Photo) => {
            photo.removed = true
            photo.abortUploading?.()

            if (photo.assetId) {
              removeAsset({
                variables: {
                  input: {
                    assetID: photo.assetId,
                    sessionID: !isLoggedIn ? getENV("SESSION_ID") : undefined,
                  },
                },
              }).catch(error => {
                logger.error("Remove asset error", error)
              })
            }

            const photosToSave = values.photos.filter(p => p.id !== photo.id)
            setFieldValue("photos", photosToSave)
          }

          const handlePhotoUploaded = async (photo: Photo) => {
            if (photo.geminiToken && submission?.externalId) {
              photo.loading = true

              try {
                const response = await addAsset({
                  variables: {
                    input: {
                      assetType: "image",
                      geminiToken: photo.geminiToken!,
                      externalSubmissionId: submission.externalId,
                      sessionID: !isLoggedIn ? getENV("SESSION_ID") : undefined,
                      filename: photo.name,
                      size: photo.size.toString(),
                    },
                  },
                })

                photo.assetId =
                  response.addAssetToConsignmentSubmission?.asset?.id
              } catch (error) {
                logger.error("Add asset error", error)
              } finally {
                photo.loading = false
                setFieldValue("photos", values.photos, true)
              }
            }
          }

          const updatePhotoUrls = (assets: ReadonlyArray<SubmissionAsset>) => {
            let isUpdated = false

            assets?.forEach(asset => {
              const url = getPhotoUrlFromAsset(asset)

              if (url && asset?.id) {
                const photo = values.photos.find(p => p.assetId === asset.id)
                if (photo) {
                  photo.url = url
                  isUpdated = true
                }
              }
            })

            isUpdated && setFieldValue("photos", values.photos, true)
          }

          const refetchPhotos = () => {
            if (
              submission &&
              relayEnvironment &&
              photosRefetchingCount.current < 20
            ) {
              photosRefetchingCount.current += 1

              refetchSubmissionAssets(submission.externalId, relayEnvironment)
                .then(assets => {
                  updatePhotoUrls(assets)

                  if (shouldRefetchPhotoUrls(values.photos)) {
                    setTimeout(() => {
                      refetchPhotos()
                    }, 2000)
                  }
                })
                .catch(error => {
                  console.error(error)
                })
            }
          }

          if (
            !isPhotosRefetchStarted &&
            !isServer &&
            shouldRefetchPhotoUrls(values.photos)
          ) {
            setIsPhotosRefetchStarted(true)
            refetchPhotos()
          }

          return (
            <Form>
              <UploadPhotosForm
                mt={4}
                maxTotalSize={30}
                onPhotoUploaded={handlePhotoUploaded}
                submissionId={submission?.externalId || ""}
              />

              <Box mb={6}>
                {values.photos.map(photo => (
                  <PhotoThumbnail
                    mt={2}
                    key={photo.id}
                    photo={photo}
                    data-testid="photo-thumbnail"
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

const refetchSubmissionAssets = async (
  submissionId: string,
  relayEnvironment: Environment
) => {
  const response = await fetchQuery<UploadPhotos_ImageRefetch_Query>(
    relayEnvironment,
    graphql`
      query UploadPhotos_ImageRefetch_Query($id: ID!, $sessionID: String) {
        submission(externalId: $id, sessionID: $sessionID) {
          ...UploadPhotos_submission @relay(mask: false)
        }
      }
    `,
    { id: submissionId, sessionID: getENV("SESSION_ID") },
    {
      force: true,
    }
  )

  return response.submission?.assets || []
}

export const UploadPhotosFragmentContainer = createFragmentContainer(
  UploadPhotos,
  {
    submission: graphql`
      fragment UploadPhotos_submission on ConsignmentSubmission {
        externalId
        assets {
          id
          imageUrls
          geminiToken
          size
          filename
        }
      }
    `,
  }
)
