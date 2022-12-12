import {
  Box,
  Button,
  Clickable,
  DROP_SHADOW,
  Flex,
  Spacer,
  Text,
  useToasts,
} from "@artsy/palette"
import { AppContainer } from "Apps/Components/AppContainer"
import { ConfirmationModalBack } from "Apps/MyCollection/Routes/EditArtwork/Components/ConfirmationModalBack"
import { ConfirmationModalDelete } from "Apps/MyCollection/Routes/EditArtwork/Components/ConfirmationModalDelete"
import { MyCollectionArtworkFormDetails } from "Apps/MyCollection/Routes/EditArtwork/Components/MyCollectionArtworkFormDetails"
import { MyCollectionArtworkFormHeader } from "Apps/MyCollection/Routes/EditArtwork/Components/MyCollectionArtworkFormHeader"
import {
  MyCollectionArtworkFormImages,
  MyCollectionArtworkFormImagesProps,
} from "Apps/MyCollection/Routes/EditArtwork/Components/MyCollectionArtworkFormImages"
import { useDeleteArtwork } from "Apps/MyCollection/Routes/EditArtwork/Mutations/useDeleteArtwork"
import { ArtworkModel } from "Apps/MyCollection/Routes/EditArtwork/Utils/artworkModel"
import { useMyCollectionTracking } from "Apps/MyCollection/Routes/Hooks/useMyCollectionTracking"
import { Form, useFormikContext } from "formik"
import { Ref, useState } from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { useRouter } from "System/Router/useRouter"
import createLogger from "Utils/logger"
import { Media } from "Utils/Responsive"
import { MyCollectionArtworkFormMain_artwork$data } from "__generated__/MyCollectionArtworkFormMain_artwork.graphql"

const logger = createLogger("MyCollectionArtworkForm.tsx")

export interface MyCollectionArtworkFormMainProps {
  artwork?: MyCollectionArtworkFormMain_artwork$data
  artworkFormImagesRef: Ref<MyCollectionArtworkFormImagesProps> | undefined
  onBack?: () => void
}

export const MyCollectionArtworkFormMain: React.FC<MyCollectionArtworkFormMainProps> = ({
  artwork,
  artworkFormImagesRef,
  onBack,
}) => {
  const {
    deleteCollectedArtwork: trackDeleteCollectedArtwork,
  } = useMyCollectionTracking()
  const { router, match } = useRouter()
  const { sendToast } = useToasts()

  const [
    showLeaveWithoutSavingModal,
    setShowLeaveWithoutSavingModal,
  ] = useState(false)
  const [showDeletionModal, setShowDeletionModal] = useState(false)
  const { submitMutation: deleteArtwork } = useDeleteArtwork()

  const isEditing = !!artwork?.internalID
  const onlyPhotos = match?.location?.query?.step === "photos"

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
    onBack ? onBack() : router.go(-1)
  }

  const {
    handleSubmit,
    isSubmitting,
    isValid,
    values,
    dirty,
  } = useFormikContext<ArtworkModel>()

  return (
    <>
      <MyCollectionArtworkFormHeader
        onBackClick={() => {
          dirty ? setShowLeaveWithoutSavingModal(true) : goBack()
        }}
        NextButton={() => (
          <Button
            width={300}
            data-testid="save-button"
            type="submit"
            onClick={() => handleSubmit()}
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
        )}
      />

      <AppContainer>
        <Form>
          {showLeaveWithoutSavingModal && (
            <ConfirmationModalBack
              onClose={() => setShowLeaveWithoutSavingModal(false)}
              isEditing={isEditing}
              onLeave={goBack}
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
