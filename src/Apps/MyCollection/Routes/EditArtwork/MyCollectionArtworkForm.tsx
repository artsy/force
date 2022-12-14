import {
  ArtsyLogoBlackIcon,
  Box,
  Button,
  Clickable,
  DROP_SHADOW,
  Flex,
  FullBleed,
  Separator,
  Spacer,
  Text,
  useToasts,
} from "@artsy/palette"
import { AppContainer } from "Apps/Components/AppContainer"
import { HorizontalPadding } from "Apps/Components/HorizontalPadding"
import { useMyCollectionTracking } from "Apps/MyCollection/Routes/Hooks/useMyCollectionTracking"
import { IMAGES_LOCAL_STORE_LAST_UPDATED_AT } from "Apps/Settings/Routes/MyCollection/constants"
import { BackLink } from "Components/Links/BackLink"
import { MetaTags } from "Components/MetaTags"
import { Sticky } from "Components/Sticky"
import { Form, Formik } from "formik"
import { useRef, useState } from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { RouterLink } from "System/Router/RouterLink"
import { useRouter } from "System/Router/useRouter"
import { useFeatureFlag } from "System/useFeatureFlag"
import { setLocalImagesStoreLastUpdatedAt } from "Utils/localImagesHelpers"
import createLogger from "Utils/logger"
import { Media } from "Utils/Responsive"
import { wait } from "Utils/wait"
import { MyCollectionArtworkForm_artwork$data } from "__generated__/MyCollectionArtworkForm_artwork.graphql"
import { ArtworkAttributionClassType } from "__generated__/useCreateArtworkMutation.graphql"
import { MyCollectionArtworkFormDetails } from "./Components/MyCollectionArtworkFormDetails"
import {
  MyCollectionArtworkFormImages,
  MyCollectionArtworkFormImagesProps,
} from "./Components/MyCollectionArtworkFormImages"
import { ConfirmationModalBack } from "./ConfirmationModalBack"
import { ConfirmationModalDelete } from "./ConfirmationModalDelete"
import { useDeleteArtwork } from "./Mutations/useDeleteArtwork"
import { useDeleteArtworkImage } from "./Mutations/useDeleteArtworkImage"
import { getMyCollectionArtworkFormInitialValues } from "./Utils/artworkFormHelpers"
import { ArtworkModel } from "./Utils/artworkModel"
import {
  MyCollectionArtworkDetailsValidationSchema,
  validateArtwork,
} from "./Utils/artworkValidation"
import { useCreateOrUpdateArtwork } from "./Utils/useCreateOrUpdateArtwork"

const logger = createLogger("MyCollectionArtworkForm.tsx")

export interface MyCollectionArtworkFormProps {
  artwork?: MyCollectionArtworkForm_artwork$data
}

export const MyCollectionArtworkForm: React.FC<MyCollectionArtworkFormProps> = ({
  artwork,
}) => {
  const isCollectorProfileEnabled = useFeatureFlag("cx-collector-profile")
  const {
    deleteCollectedArtwork: trackDeleteCollectedArtwork,
    saveCollectedArtwork: trackSaveCollectedArtwork,
  } = useMyCollectionTracking()
  const { router, match } = useRouter()
  const artworkFormImagesRef = useRef<MyCollectionArtworkFormImagesProps | null>(
    null
  )
  const { sendToast } = useToasts()
  const initialValues = getMyCollectionArtworkFormInitialValues(artwork)
  const initialErrors = validateArtwork(
    initialValues,
    MyCollectionArtworkDetailsValidationSchema
  )

  // TODO: Avoid using boolean state flags for UI modes
  const [
    showLeaveWithoutSavingModal,
    setShowLeaveWithoutSavingModal,
  ] = useState<boolean>(false)
  const [shouldShowDeletionModal, setShouldShowDeletionModal] = useState<
    boolean
  >(false)
  const { createOrUpdateArtwork } = useCreateOrUpdateArtwork()
  const { submitMutation: deleteArtworkImage } = useDeleteArtworkImage()
  const { submitMutation: deleteArtwork } = useDeleteArtwork()

  const isEditing = !!artwork?.internalID
  const onlyPhotos = match?.location?.query?.step === "photos"

  const handleSubmit = async (values: ArtworkModel) => {
    // Set edition values for attribution class

    if (values.attributionClass !== "LIMITED_EDITION") {
      values.editionNumber = ""
      values.editionSize = ""
    }

    const externalImageUrls = values.newPhotos.flatMap(
      photo => photo.url || null
    )

    console.log({ externalImageUrls })

    // Create or update artwork

    try {
      const artworkId = await createOrUpdateArtwork({
        artworkId: artwork?.internalID,
        artistIds: [values.artistId],
        category: values.category,
        date: values.date,
        title: values.title,
        medium: values.medium,
        attributionClass: values.attributionClass
          ?.replace(" ", "_")
          ?.toUpperCase() as ArtworkAttributionClassType,
        editionNumber: String(values.editionNumber),
        editionSize: String(values.editionSize),
        height: String(values.height),
        width: String(values.width),
        depth: String(values.depth),
        metric: values.metric,
        externalImageUrls,
        pricePaidCents:
          !values.pricePaidDollars || isNaN(Number(values.pricePaidDollars))
            ? undefined
            : Number(values.pricePaidDollars) * 100,
        pricePaidCurrency: values.pricePaidCurrency,
        provenance: values.provenance,
        artworkLocation: values.artworkLocation,
      })

      // Track saving only when the user adds a new artwork.
      if (!isEditing) {
        trackSaveCollectedArtwork()
      }

      // Store images locally
      if (artworkId && artworkFormImagesRef.current) {
        await artworkFormImagesRef.current?.saveImagesToLocalStorage(artworkId)
        await setLocalImagesStoreLastUpdatedAt(
          IMAGES_LOCAL_STORE_LAST_UPDATED_AT
        )
      }

      // If the user is editing, we need to wait a bit until gemini starts
      // returning the new processing images array
      if (isEditing && values.newPhotos.length) {
        await wait(2000)
      }

      // Remove photos marked for deletion
      const removedPhotos = values.photos.filter(photo => photo.removed)

      await Promise.all(
        removedPhotos.map(async photo => {
          try {
            await deleteArtworkImage({
              variables: {
                input: {
                  artworkID: artwork?.internalID!,
                  imageID: photo.internalID!,
                },
              },
            })
          } catch (error) {
            logger.error("An error occured while removing images.", error)

            sendToast({
              variant: "error",
              message: "An error occurred",
              description: "Couldn't remove all images.",
            })
          }
        })
      )

      if (isEditing) {
        router.replace({
          pathname: `/settings/my-collection`, // TODO:
        })
        router.push({ pathname: `/my-collection/artwork/${artworkId}` })
      } else {
        router.replace({
          pathname: `/my-collection/artworks/${artworkId}/edit`,
        })
        router.push({ pathname: "/settings/my-collection" })
      }
    } catch (error) {
      logger.error(
        `Artwork not ${artwork?.internalID ? "updated" : "created"}`,
        error
      )

      sendToast({
        variant: "error",
        message: "An error occurred",
        description: "Please contact support@artsymail.com",
      })

      return
    }
  }

  const handleDelete = async () => {
    trackDeleteCollectedArtwork(artwork?.internalID!, artwork?.slug!)
    try {
      await deleteArtwork({
        variables: {
          input: { artworkId: artwork?.internalID! },
        },
        rejectIf: res => {
          return res.myCollectionDeleteArtwork?.artworkOrError?.mutationError
        },
      })
      router.push({ pathname: "/settings/my-collection" })
    } catch (error) {
      logger.error(`Artwork not deleted`, error)

      sendToast({
        variant: "error",
        message: "An error occurred",
        description: "Please contact support@artsymail.com",
      })

      return
    }
  }

  const goBack = () => {
    router.push({
      pathname: isEditing
        ? isCollectorProfileEnabled
          ? `/collector-profile/my-collection/artwork/${artwork.internalID}`
          : `/my-collection/artwork/${artwork.internalID}`
        : isCollectorProfileEnabled
        ? "/collector-profile/my-collection"
        : "/settings/my-collection",
    })
  }

  return (
    <>
      <MetaTags
        title={
          artwork
            ? `Edit ${artwork.title} - ${artwork.artistNames} | Artsy`
            : "Upload Artwork | Artsy"
        }
      />

      <Spacer y={4} />

      <AppContainer>
        <Formik<ArtworkModel>
          validateOnMount
          initialValues={initialValues}
          onSubmit={handleSubmit}
          validationSchema={MyCollectionArtworkDetailsValidationSchema}
          initialErrors={initialErrors}
        >
          {({ isSubmitting, isValid, values, dirty }) => (
            <Form>
              <RouterLink to="/my-collection" display="block">
                <ArtsyLogoBlackIcon display="block" />
              </RouterLink>

              {showLeaveWithoutSavingModal && (
                <ConfirmationModalBack
                  onClose={() => setShowLeaveWithoutSavingModal(false)}
                  isEditing={isEditing}
                  onLeave={goBack}
                />
              )}

              {shouldShowDeletionModal && (
                <ConfirmationModalDelete
                  onClose={() => setShouldShowDeletionModal(false)}
                  handleDelete={handleDelete}
                />
              )}

              <Sticky withoutHeaderOffset>
                {({ stuck }) => {
                  return (
                    <FullBleed
                      backgroundColor="white100"
                      style={stuck ? { boxShadow: DROP_SHADOW } : undefined}
                    >
                      <AppContainer>
                        <HorizontalPadding>
                          <Flex
                            flexDirection="row"
                            justifyContent="space-between"
                            py={2}
                          >
                            <BackLink
                              // @ts-ignore
                              as={RouterLink}
                              onClick={() => {
                                dirty
                                  ? setShowLeaveWithoutSavingModal(true)
                                  : goBack()
                              }}
                              width="min-content"
                            >
                              Back
                            </BackLink>

                            <Media greaterThan="xs">
                              <Button
                                width={300}
                                data-testid="save-button"
                                type="submit"
                                size="large"
                                variant="primaryBlack"
                                loading={
                                  isSubmitting ||
                                  values.newPhotos.filter(
                                    photo => photo.loading
                                  ).length > 0
                                }
                                disabled={!isValid || !dirty}
                              >
                                {isEditing ? "Save Changes" : "Upload Artwork"}
                              </Button>
                            </Media>
                          </Flex>
                        </HorizontalPadding>
                      </AppContainer>
                      <Separator />
                    </FullBleed>
                  )
                }}
              </Sticky>

              {!onlyPhotos && (
                <Text mb={1} mt={4} variant="lg-display">
                  {isEditing ? "Edit Artwork Details" : "Add Artwork Details"}
                </Text>
              )}

              <Spacer y={4} />

              {!onlyPhotos && <MyCollectionArtworkFormDetails />}

              <Spacer y={4} />

              <MyCollectionArtworkFormImages ref={artworkFormImagesRef} />

              <Spacer y={6} />

              {isEditing && !onlyPhotos && (
                <>
                  <Flex width="100%" justifyContent={["center", "flex-start"]}>
                    <Clickable
                      onClick={() => setShouldShowDeletionModal(true)}
                      textDecoration="underline"
                      color="red100"
                      alignItems="center"
                      data-testid="delete-button"
                    >
                      Delete Artwork
                    </Clickable>
                  </Flex>

                  <Spacer y={6} />
                </>
              )}

              <Media at="xs">
                <Flex>
                  <Box
                    position="fixed"
                    bottom={0}
                    width="100%"
                    left={0}
                    px={2}
                    py={1}
                    backgroundColor="white100"
                    style={{ boxShadow: DROP_SHADOW }}
                  >
                    <Button
                      width="100%"
                      data-testid="save-button"
                      type="submit"
                      size="large"
                      variant="primaryBlack"
                      loading={
                        isSubmitting ||
                        values.newPhotos.filter(photo => photo.loading).length >
                          0
                      }
                      disabled={!isValid || !dirty}
                    >
                      {isEditing ? "Save Changes" : "Upload Artwork"}
                    </Button>
                  </Box>
                </Flex>
              </Media>
            </Form>
          )}
        </Formik>
      </AppContainer>

      <Spacer y={4} />
    </>
  )
}

export const MyCollectionArtworkFormFragmentContainer = createFragmentContainer(
  MyCollectionArtworkForm,
  {
    artwork: graphql`
      fragment MyCollectionArtworkForm_artwork on Artwork {
        artist {
          internalID
          name
          formattedNationalityAndBirthday
          targetSupply {
            isP1
          }
        }
        consignmentSubmission {
          inProgress
        }
        artistNames
        category
        pricePaid {
          display
          minor
          currencyCode
        }
        date
        depth
        dimensions {
          in
          cm
        }
        editionSize
        editionNumber
        height
        attributionClass {
          name
        }
        id
        images {
          internalID
          isDefault
          imageURL
          width
          height
          internalID
        }
        internalID
        isEdition
        medium
        metric
        artworkLocation
        provenance
        slug
        title
        width
      }
    `,
  }
)
