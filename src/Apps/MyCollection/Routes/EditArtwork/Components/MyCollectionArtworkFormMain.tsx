import {
  Box,
  Button,
  Clickable,
  Flex,
  Spacer,
  Text,
  useTheme,
  useToasts,
} from "@artsy/palette"
import { AppContainer } from "Apps/Components/AppContainer"
import { ConfirmationModalBack } from "Apps/MyCollection/Routes/EditArtwork/Components/ConfirmationModalBack"
import { ConfirmationModalDelete } from "Apps/MyCollection/Routes/EditArtwork/Components/ConfirmationModalDelete"
import { useMyCollectionArtworkFormContext } from "Apps/MyCollection/Routes/EditArtwork/Components/MyCollectionArtworkFormContext"
import { MyCollectionArtworkFormDetails } from "Apps/MyCollection/Routes/EditArtwork/Components/MyCollectionArtworkFormDetails"
import { MyCollectionArtworkFormHeader } from "Apps/MyCollection/Routes/EditArtwork/Components/MyCollectionArtworkFormHeader"
import { MyCollectionArtworkFormImages } from "Apps/MyCollection/Routes/EditArtwork/Components/MyCollectionArtworkFormImages"
import { useDeleteArtwork } from "Apps/MyCollection/Routes/EditArtwork/Mutations/useDeleteArtwork"
import { getMyCollectionArtworkFormInitialValues } from "Apps/MyCollection/Routes/EditArtwork/Utils/artworkFormHelpers"
import { ArtworkModel } from "Apps/MyCollection/Routes/EditArtwork/Utils/artworkModel"
import { useMyCollectionTracking } from "Apps/MyCollection/Routes/Hooks/useMyCollectionTracking"
import { Form, useFormikContext } from "formik"
import { useState } from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { useRouter } from "System/Hooks/useRouter"
import createLogger from "Utils/logger"
import { Media } from "Utils/Responsive"
import { MyCollectionArtworkFormMain_artwork$data } from "__generated__/MyCollectionArtworkFormMain_artwork.graphql"

const logger = createLogger("MyCollectionArtworkForm.tsx")

export interface MyCollectionArtworkFormMainProps {
  artwork?: MyCollectionArtworkFormMain_artwork$data
}

export const MyCollectionArtworkFormMain: React.FC<MyCollectionArtworkFormMainProps> = ({
  artwork,
}) => {
  const { onBack } = useMyCollectionArtworkFormContext()
  const {
    deleteCollectedArtwork: trackDeleteCollectedArtwork,
  } = useMyCollectionTracking()
  const { router, match } = useRouter()
  const { sendToast } = useToasts()

  const { theme } = useTheme()

  const [
    showLeaveWithoutSavingModal,
    setShowLeaveWithoutSavingModal,
  ] = useState(false)
  const [showDeletionModal, setShowDeletionModal] = useState(false)
  const { submitMutation: deleteArtwork } = useDeleteArtwork()

  const isEditing = !!artwork?.internalID
  const onlyPhotos = match?.location?.query?.step === "photos"

  const handleDelete = async () => {
    if (!artwork) return

    trackDeleteCollectedArtwork(artwork.internalID, artwork.slug)

    try {
      await deleteArtwork({
        variables: {
          input: { artworkId: artwork.internalID },
        },
        rejectIf: res => {
          return res.myCollectionDeleteArtwork?.artworkOrError?.mutationError
        },
      })
      router.push({
        pathname: "/collector-profile/my-collection",
      })
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

  const {
    handleSubmit,
    isSubmitting,
    isValid,
    values,
    dirty,
    setValues,
  } = useFormikContext<ArtworkModel>()

  const handleBack = () => {
    // Reset form values to initial values
    setValues(getMyCollectionArtworkFormInitialValues(), false)

    onBack()
  }

  return (
    <>
      <MyCollectionArtworkFormHeader
        onBackClick={() => {
          dirty ? setShowLeaveWithoutSavingModal(true) : handleBack()
        }}
        NextButton={
          <Media greaterThan="xs">
            <Button
              width={[100, 300]}
              data-testid="save-button"
              type="submit"
              onClick={() => handleSubmit()}
              size={["small", "large"]}
              variant="primaryBlack"
              loading={
                isSubmitting ||
                values.newPhotos.filter(photo => photo.loading).length > 0
              }
              disabled={!isValid || !dirty}
            >
              {isEditing ? "Save Changes" : "Upload Artwork"}
            </Button>
          </Media>
        }
      />

      <AppContainer>
        <Form>
          {showLeaveWithoutSavingModal && (
            <ConfirmationModalBack
              onClose={() => setShowLeaveWithoutSavingModal(false)}
              isEditing={isEditing}
              onLeave={handleBack}
            />
          )}
          {showDeletionModal && (
            <ConfirmationModalDelete
              onClose={() => setShowDeletionModal(false)}
              handleDelete={handleDelete}
            />
          )}

          <>
            {!onlyPhotos && (
              <Text mb={1} mt={4} variant={["md", "lg-display"]}>
                {isEditing ? "Edit Artwork Details" : "Add Artwork Details"}
              </Text>
            )}
            <Spacer y={4} />

            {!onlyPhotos && <MyCollectionArtworkFormDetails />}
            <Spacer y={4} />
            <MyCollectionArtworkFormImages isEditing={isEditing} />
            <Spacer y={6} />
            {isEditing && !onlyPhotos && (
              <>
                <Flex width="100%" justifyContent={["center", "flex-start"]}>
                  <Clickable
                    onClick={() => setShowDeletionModal(true)}
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
          </>

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
                style={{ boxShadow: theme.effects.dropShadow }}
              >
                <Button
                  width="100%"
                  data-testid="save-button"
                  type="submit"
                  size="large"
                  variant="primaryBlack"
                  loading={
                    isSubmitting ||
                    values.newPhotos.filter(photo => photo.loading).length > 0
                  }
                  disabled={!isValid || !dirty}
                >
                  {isEditing ? "Save Changes" : "Upload Artwork"}
                </Button>
              </Box>
            </Flex>
          </Media>
        </Form>
      </AppContainer>

      <Spacer y={4} />
    </>
  )
}

export const MyCollectionArtworkFormMainFragmentContainer = createFragmentContainer(
  MyCollectionArtworkFormMain,
  {
    artwork: graphql`
      fragment MyCollectionArtworkFormMain_artwork on Artwork {
        internalID
        slug
      }
    `,
  }
)
