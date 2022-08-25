import {
  ArtsyLogoBlackIcon,
  Button,
  DROP_SHADOW,
  Flex,
  FullBleed,
  ModalDialog,
  Spacer,
  Step,
  Stepper,
  Text,
  useToasts,
} from "@artsy/palette"
import { AppContainer } from "Apps/Components/AppContainer"
import { HorizontalPadding } from "Apps/Components/HorizontalPadding"
import { BackLink } from "Components/Links/BackLink"
import { MetaTags } from "Components/MetaTags"
import { Sticky, StickyProvider } from "Components/Sticky"
import { Form, Formik } from "formik"
import { useState } from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { RouterLink } from "System/Router/RouterLink"
import { useRouter } from "System/Router/useRouter"
import createLogger from "Utils/logger"
import { MyCollectionArtworkForm_artwork } from "__generated__/MyCollectionArtworkForm_artwork.graphql"
import { ArtworkAttributionClassType } from "__generated__/useCreateArtworkMutation.graphql"
import { MyCollectionArtworkFormDetails } from "./Components/MyCollectionArtworkFormDetails"
import { getMyCollectionArtworkFormInitialValues } from "./Utils/artworkFormHelpers"
import { ArtworkModel } from "./Utils/artworkModel"
import {
  MyCollectionArtworkDetailsValidationSchema,
  validateArtwork,
} from "./Utils/artworkValidation"
import { useCreateOrUpdateArtwork } from "./Utils/useCreateOrUpdateArtwork"

const logger = createLogger("MyCollectionArtworkForm.tsx")

export interface MyCollectionArtworkFormProps {
  artwork?: MyCollectionArtworkForm_artwork
}

export const MyCollectionArtworkForm: React.FC<MyCollectionArtworkFormProps> = ({
  artwork,
}) => {
  const { router } = useRouter()
  const { sendToast } = useToasts()
  const initialValues = getMyCollectionArtworkFormInitialValues(artwork)
  const [shouldShowModal, setShouldShowModal] = useState<boolean>(false)

  const initialErrors = validateArtwork(
    initialValues,
    MyCollectionArtworkDetailsValidationSchema
  )
  const { createOrUpdateArtwork } = useCreateOrUpdateArtwork()

  const handleSubmit = async (values: ArtworkModel) => {
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
        editionNumber: values.editionNumber,
        editionSize: values.editionSize,
        height: values.height,
        width: values.width,
        depth: values.depth,
        metric: values.metric,
        pricePaidCents:
          !values.pricePaidDollars || isNaN(Number(values.pricePaidDollars))
            ? undefined
            : Number(values.pricePaidDollars) * 100,
        pricePaidCurrency: values.pricePaidCurrency,
        provenance: values.provenance,
        artworkLocation: values.artworkLocation,
      })

      if (isEditing) {
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

  const isEditing = !!artwork?.internalID

  return (
    <>
      {/* TODO: Update meta tags */}
      <MetaTags
        pathname="my-collection"
        title="Artwork | My Collection | Artsy"
        description="..."
      />

      <Spacer mt={4} />

      <AppContainer>
        <Formik<ArtworkModel>
          validateOnMount
          initialValues={initialValues}
          onSubmit={handleSubmit}
          validationSchema={MyCollectionArtworkDetailsValidationSchema}
          initialErrors={initialErrors}
        >
          {({ isSubmitting, isValid }) => (
            <Form>
              <RouterLink to="/my-collection" display="block">
                <ArtsyLogoBlackIcon display="block" />
              </RouterLink>

              <StickyProvider>
                {shouldShowModal && (
                  <ModalDialog
                    title="Leave without saving?"
                    onClose={() => setShouldShowModal(false)}
                    width={["100%", 600]}
                    footer={
                      <>
                        <Button
                          onClick={e => {
                            e.preventDefault()
                            router.replace({ pathname: "/my-collection" })
                            router.push({
                              pathname: isEditing
                                ? `/my-collection/artwork/${artwork.internalID}`
                                : "/settings/my-collection",
                            })
                          }}
                          mt={4}
                          width="100%"
                          data-testid="leave-button"
                        >
                          Leave Without Saving
                        </Button>
                        <Button
                          onClick={() => setShouldShowModal(false)}
                          variant="secondaryNeutral"
                          mt={2}
                          width="100%"
                        >
                          {isEditing
                            ? "Continue Editing"
                            : "Continue Uploading Artwork"}
                        </Button>
                      </>
                    }
                  >
                    <Text mt={4}>
                      {isEditing
                        ? "Changes you have made so far will not be saved."
                        : "Your artwork will not be added to My Collection."}
                    </Text>
                  </ModalDialog>
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
                                onClick={() => setShouldShowModal(true)}
                                width="min-content"
                              >
                                Back
                              </BackLink>

                              <Button
                                width={[120, 300]}
                                data-testid="save-button"
                                type="submit"
                                size={["small", "large"]}
                                variant="primaryBlack"
                                loading={isSubmitting}
                                disabled={!isValid}
                              >
                                {isEditing ? "Save Artwork" : "Upload Artwork"}
                              </Button>
                            </Flex>
                          </HorizontalPadding>
                        </AppContainer>
                      </FullBleed>
                    )
                  }}
                </Sticky>
              </StickyProvider>

              <Stepper
                initialTabIndex={0}
                currentStepIndex={0}
                disableNavigation
              >
                <Step name="Add Artwork Details" />
              </Stepper>

              <Spacer mb={4} />

              <MyCollectionArtworkFormDetails />
            </Form>
          )}
        </Formik>
      </AppContainer>

      <Spacer mt={4} />
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
