import { Box, Button, Text } from "@artsy/palette"
import {
  SubmissionStepper,
  useSubmissionFlowSteps,
} from "Apps/Consign/Components/SubmissionStepper"
import {
  useAddAssetToConsignmentSubmission,
  useRemoveAssetFromConsignmentSubmission,
} from "Apps/Consign/Routes/SubmissionFlow/Mutations"
import { createOrUpdateConsignSubmission } from "Apps/Consign/Routes/SubmissionFlow/Utils/createOrUpdateConsignSubmission"
import {
  uploadPhotosValidationSchema,
  validate,
} from "Apps/Consign/Routes/SubmissionFlow/Utils/validation"
import { BackLink } from "Components/Links/BackLink"
import { PhotoThumbnail } from "Components/PhotoUpload/Components/PhotoThumbnail"
import { normalizePhoto, Photo } from "Components/PhotoUpload/Utils/fileUtils"
import { Form, Formik } from "formik"
import { LocationDescriptor } from "found"
import { findLast } from "lodash"
import { useRef, useState } from "react"
import {
  createFragmentContainer,
  Environment,
  fetchQuery,
  graphql,
} from "react-relay"
import { isServer } from "Server/isServer"
import { useSystemContext } from "System"
import { useRouter } from "System/Router/useRouter"
import { getENV } from "Utils/getENV"
import createLogger from "Utils/logger"
import { redirects_submission$data } from "__generated__/redirects_submission.graphql"
import { UploadPhotos_ImageRefetch_Query } from "__generated__/UploadPhotos_ImageRefetch_Query.graphql"
import { UploadPhotos_myCollectionArtwork$data } from "__generated__/UploadPhotos_myCollectionArtwork.graphql"
import { UploadPhotos_submission$data } from "__generated__/UploadPhotos_submission.graphql"
import {
  UploadPhotosForm,
  UploadPhotosFormModel,
} from "./Components/UploadPhotosForm"

const logger = createLogger("SubmissionFlow/UploadPhotos.tsx")

export interface UploadPhotosProps {
  submission?: UploadPhotos_submission$data
  myCollectionArtwork?: UploadPhotos_myCollectionArtwork$data
}

type SubmissionAsset = NonNullable<UploadPhotos_submission$data["assets"]>[0]

const shouldRefetchPhotoUrls = (photos: Photo[]) => {
  return photos.some(photo => !!photo.assetId && !photo.url && !photo.file)
}

const getPhotoUrlFromAsset = (asset: SubmissionAsset) => {
  return (
    (asset?.imageUrls as any)?.thumbnail || (asset?.imageUrls as any)?.square
  )
}

export const getUploadPhotosFormInitialValues = (
  submission?: UploadPhotos_submission$data | redirects_submission$data,
  myCollectionArtwork?: UploadPhotos_myCollectionArtwork$data
): UploadPhotosFormModel => {
  let photos: Photo[] = []

  if (submission?.assets?.length) {
    photos =
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
        })) || []
  } else if (myCollectionArtwork) {
    photos =
      myCollectionArtwork?.images
        ?.map(image => ({
          name: "Automatically added",
          externalUrl: image?.url!,
          type: "image/jpg",
        }))
        ?.map(file => normalizePhoto(file, undefined, file.externalUrl)) || []
  }

  return { photos }
}

export const UploadPhotos: React.FC<UploadPhotosProps> = ({
  submission,
  myCollectionArtwork,
}) => {
  const { router } = useRouter()
  const { isLoggedIn, relayEnvironment } = useSystemContext()
  const [isPhotosRefetchStarted, setIsPhotosRefetchStarted] = useState(false)
  const photosRefetchingCount = useRef(0)
  const {
    submitMutation: removeAsset,
  } = useRemoveAssetFromConsignmentSubmission()
  const { submitMutation: addAsset } = useAddAssetToConsignmentSubmission()

  const steps = useSubmissionFlowSteps()
  const stepIndex = Math.max(
    [...steps].indexOf("Upload Photos"),
    [...steps].indexOf("Photos")
  )
  const isLastStep = stepIndex === steps.length - 1

  const initialValue = getUploadPhotosFormInitialValues(
    submission,
    myCollectionArtwork
  )
  const initialErrors = validate(initialValue, uploadPhotosValidationSchema)
  const artworkId = myCollectionArtwork?.internalID

  const handleSubmit = async () => {
    if (submission) {
      if (isLastStep && relayEnvironment) {
        await createOrUpdateConsignSubmission(relayEnvironment, {
          externalId: submission.externalId,
          state: "SUBMITTED",
        })
      }

      // Track last step

      router.replace(artworkId ? "/settings/my-collection" : "/sell")

      const consignPath = artworkId
        ? "/my-collection/submission"
        : "/sell/submission"

      const nextStepIndex = isLastStep ? null : stepIndex + 1
      let nextRoute: LocationDescriptor = consignPath
      if (nextStepIndex !== null) {
        let nextStep = steps[nextStepIndex]
        if (nextStep === "Contact" || nextStep === "Contact Information") {
          nextRoute = `${consignPath}/${submission.externalId}/contact-information`
        } else if (nextStep === "Artwork" || nextStep === "Artwork Details") {
          nextRoute = `${consignPath}/${submission.externalId}/artwork-details`
        }
      }

      if (nextRoute === consignPath) {
        // there is no next step to go to. Prepare to go to thank you screen
        nextRoute = `${nextRoute}/${submission.externalId}/thank-you`
      }

      if (artworkId) {
        // artworkId should ever only be present for `/my-collection/submission` consign path
        nextRoute = nextRoute + "/" + artworkId
      }

      router.push(nextRoute)
    }
  }

  return (
    <>
      <BackLink
        py={2}
        mb={6}
        width="min-content"
        to={
          artworkId
            ? `/my-collection/submission/${submission?.externalId}/artwork-details/${artworkId}`
            : `/sell/submission/${submission?.externalId}/artwork-details`
        }
      >
        Back
      </BackLink>

      <SubmissionStepper currentStep="Upload Photos" />

      <Text mt={4} variant="lg-display">
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
                      size: photo.size?.toString(),
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

          const errorMessageForAutomaticallyUploadedPhotos = findLast(
            values.photos,
            photo => photo.errorMessage && photo.externalUrl
            // @ts-ignore
          )?.errorMessage

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
                {!!errorMessageForAutomaticallyUploadedPhotos && (
                  <Text
                    data-testid="photo-thumbnail-error"
                    mt={[0.5, 2]}
                    variant="xs"
                    color="red100"
                  >
                    {errorMessageForAutomaticallyUploadedPhotos}
                  </Text>
                )}
              </Box>

              <Button
                width={["100%", "auto"]}
                disabled={isSubmitting || !isValid}
                loading={isSubmitting || values.photos.some(c => c.loading)}
                type="submit"
              >
                {isLastStep ? "Submit Artwork" : "Save & Continue"}
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
      fetchPolicy: "network-only",
    }
  ).toPromise()

  return response?.submission?.assets || []
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
    myCollectionArtwork: graphql`
      fragment UploadPhotos_myCollectionArtwork on Artwork {
        internalID
        images {
          url(version: "large")
        }
      }
    `,
  }
)
