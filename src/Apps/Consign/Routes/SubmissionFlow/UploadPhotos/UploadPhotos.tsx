import {
  ActionType,
  AuthContextModule,
  ContextModule,
  Intent,
  OwnerType,
} from "@artsy/cohesion"
import { Box, Button, Spacer, Text } from "@artsy/palette"
import { SubmissionStepper } from "Apps/Consign/Components/SubmissionStepper"
import { useSubmissionFlowSteps } from "Apps/Consign/Hooks/useSubmissionFlowSteps"
import {
  useAddAssetToConsignmentSubmission,
  useRemoveAssetFromConsignmentSubmission,
} from "Apps/Consign/Routes/SubmissionFlow/Mutations"
import { createOrUpdateConsignSubmission } from "Apps/Consign/Routes/SubmissionFlow/Utils/createOrUpdateConsignSubmission"
import {
  uploadPhotosValidationSchema,
  validate,
} from "Apps/Consign/Routes/SubmissionFlow/Utils/validation"
import { PhotoThumbnail } from "Components/PhotoUpload/Components/PhotoThumbnail"
import {
  AUTOMATICALLY_ADDED_PHOTO_NAME,
  normalizePhoto,
  Photo,
} from "Components/PhotoUpload/Utils/fileUtils"
import { TopContextBar } from "Components/TopContextBar"
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
import { trackEvent } from "Server/analytics/helpers"
import { isServer } from "Server/isServer"
import { useSystemContext } from "System/Hooks/useSystemContext"
import { useRouter } from "System/Hooks/useRouter"
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
import {
  SubmissionAsset,
  getPhotoUrlFromAsset,
  shouldRefetchPhotoUrls,
} from "Apps/Consign/Routes/SubmissionFlow/Utils/formHelpers"
import { useAuthDialog } from "Components/AuthDialog"

const logger = createLogger("SubmissionFlow/UploadPhotos.tsx")

export interface UploadPhotosProps {
  submission?: UploadPhotos_submission$data
  myCollectionArtwork?: UploadPhotos_myCollectionArtwork$data
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
          id: asset?.id ?? "",
          assetId: asset?.id ?? "",
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
          name: AUTOMATICALLY_ADDED_PHOTO_NAME,
          externalUrl: image?.url ?? "",
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
  const { showAuthDialog } = useAuthDialog()
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
  const isFirstStep = stepIndex === 0

  const initialValue = getUploadPhotosFormInitialValues(
    submission,
    myCollectionArtwork
  )
  const initialErrors = validate(initialValue, uploadPhotosValidationSchema)
  const artworkId = myCollectionArtwork?.internalID

  const handleSubmit = async () => {
    if (submission) {
      if (isLastStep && relayEnvironment) {
        const submissionId = await createOrUpdateConsignSubmission(
          relayEnvironment,
          {
            externalId: submission.externalId,
            state: isLastStep ? "SUBMITTED" : "DRAFT",
            sessionID: !isLoggedIn ? getENV("SESSION_ID") : undefined,
            // myCollectionArtworkID is necessary in order to prevent duplication or mycollection artwork
            myCollectionArtworkID:
              artworkId && isFirstStep ? artworkId : undefined,
            // Source is necessary in order to link this to a mycollection artwork
            source: isFirstStep && artworkId ? "MY_COLLECTION" : undefined,
          }
        )
        trackEvent({
          action: ActionType.consignmentSubmitted,
          submission_id: submissionId,
          user_id: submission.userId,
          user_email: submission.userEmail,
        })
      }

      trackEvent({
        action: ActionType.uploadPhotosCompleted,
        context_owner_type: OwnerType.consignmentFlow,
        context_module: ContextModule.uploadPhotos,
        submission_id: submission.externalId,
        user_id: submission.userId,
        user_email: submission.userEmail,
      })

      router.replace(artworkId ? "/collector-profile/my-collection" : "/sell")

      const consignPath = artworkId
        ? "/collector-profile/my-collection/submission"
        : "/sell/submission"

      const nextStepIndex = isLastStep ? null : stepIndex + 1
      let nextRoute: LocationDescriptor = consignPath
      if (nextStepIndex !== null) {
        let nextStep = steps[nextStepIndex]
        if (nextStep === "Artwork" || nextStep === "Artwork Details") {
          nextRoute = `${consignPath}/${submission.externalId}`
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

  const deriveBackLinkTo = () => {
    const defaultBackLink = artworkId
      ? "/collector-profile/my-collection"
      : "/sell"

    let backTo = defaultBackLink
    if (isFirstStep && artworkId) {
      return backTo + `/artwork/${artworkId}`
    }
    let prevStep = ""
    if (stepIndex > 0) {
      switch (steps[stepIndex - 1]) {
        case "Artwork":
        case "Artwork Details":
          prevStep = "artwork-details"
          break
        default:
          break
      }
      if (submission) {
        backTo = backTo + `/submission/${submission.externalId}`
      }
    }
    backTo = prevStep ? backTo + `/${prevStep}` : backTo
    if (artworkId) {
      backTo = backTo + `/${artworkId}`
    }
    return backTo
  }

  const backTo = deriveBackLinkTo()

  return (
    <>
      <TopContextBar displayBackArrow hideSeparator href={backTo}>
        Back
      </TopContextBar>

      <Spacer y={6} />

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
        {({ values, setFieldValue, isValid, isSubmitting, submitForm }) => {
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
                      geminiToken: photo.geminiToken as string,
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
                onClick={event => {
                  if (!isLoggedIn) {
                    event.preventDefault()

                    showAuthDialog({
                      mode: "SignUp",
                      options: {
                        title: mode =>
                          mode === "Login"
                            ? "Log in to submit for sale"
                            : "Sign up to submit for sale",
                        afterAuthAction: {
                          action: "associateSubmission",
                          kind: "submission",
                          objectId: submission?.externalId as string,
                        },
                      },
                      analytics: {
                        contextModule: ContextModule.uploadPhotos as AuthContextModule,
                        intent: Intent.login,
                      },
                    })

                    return
                  }
                }}
              >
                {isLastStep ? "Submit Artwork" : "Save and Continue"}
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
        userId
        userEmail
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
