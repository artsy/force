import { useToasts } from "@artsy/palette"
import {
  MyCollectionArtworkFormContextProvider,
  useLocalImageState,
} from "Apps/MyCollection/Routes/EditArtwork/Components/MyCollectionArtworkFormContext"
import { MyCollectionArtworkFormMainFragmentContainer } from "Apps/MyCollection/Routes/EditArtwork/Components/MyCollectionArtworkFormMain"
import { useDeleteArtworkImage } from "Apps/MyCollection/Routes/EditArtwork/Mutations/useDeleteArtworkImage"
import { useCreateOrUpdateArtwork } from "Apps/MyCollection/Routes/EditArtwork/Utils/useCreateOrUpdateArtwork"
import { MetaTags } from "Components/MetaTags"
import { Formik } from "formik"
import { reverse } from "lodash"
import { createFragmentContainer, graphql } from "react-relay"
import { useRouter } from "System/Hooks/useRouter"
import { storeLocalImage } from "Utils/localImageHelpers"
import createLogger from "Utils/logger"
import { wait } from "Utils/wait"
import { MyCollectionEditArtwork_artwork$data } from "__generated__/MyCollectionEditArtwork_artwork.graphql"
import { getMyCollectionArtworkFormInitialValues } from "./Utils/artworkFormHelpers"
import { ArtworkModel } from "./Utils/artworkModel"
import { MyCollectionArtworkDetailsValidationSchema } from "./Utils/artworkValidation"

const logger = createLogger("MyCollectionEditArtwork.tsx")

export interface MyCollectionEditArtworkProps {
  artwork?: MyCollectionEditArtwork_artwork$data
}

export const MyCollectionEditArtwork: React.FC<MyCollectionEditArtworkProps> = ({
  artwork,
}) => {
  const { localImages, addLocalImage, removeLocalImage } = useLocalImageState()

  const { router } = useRouter()
  const { sendToast } = useToasts()
  const { createOrUpdateArtwork } = useCreateOrUpdateArtwork()
  const { submitMutation: deleteArtworkImage } = useDeleteArtworkImage()

  const handleSubmit = async (values: ArtworkModel) => {
    try {
      const updatedArtwork = await createOrUpdateArtwork(values, artwork)

      // Wait until image processing has started
      if (values.newPhotos.length) {
        await wait(2000)
      }

      // Remove photos marked for deletion
      const removedPhotos = values.photos.filter(photo => photo.removed)

      await Promise.all(
        removedPhotos.map(async photo => {
          if (!artwork?.internalID || !photo.internalID) return

          try {
            await deleteArtworkImage({
              variables: {
                input: {
                  artworkID: artwork?.internalID,
                  imageID: photo.internalID,
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

      // Store images locally and start from the end because
      // it's only possible to add new images at the end
      const reversedImages = reverse([...(updatedArtwork?.images ?? [])])

      reverse(localImages).forEach((image, index) => {
        const imageID = reversedImages[index]?.internalID

        if (!imageID) return

        storeLocalImage(imageID, image)
      })

      router.replace({
        pathname: "/collector-profile/my-collection",
      })
      router.push({
        pathname: `/collector-profile/my-collection/artwork/${updatedArtwork?.internalID}`,
      })
    } catch (error) {
      logger.error(`Artwork not updated`, error)

      sendToast({
        variant: "error",
        message: "An error occurred",
        description: "Please contact support@artsymail.com",
      })
    }
  }

  const handleBack = () => {
    router.push({
      pathname: `/collector-profile/my-collection/artwork/${artwork?.internalID}`,
    })
  }

  return (
    <>
      <MetaTags
        title={`Edit ${artwork?.title} - ${artwork?.artistNames} | Artsy`}
      />

      <MyCollectionArtworkFormContextProvider
        onBack={handleBack}
        addLocalImage={addLocalImage}
        removeLocalImage={removeLocalImage}
      >
        <Formik<ArtworkModel>
          validateOnMount
          onSubmit={handleSubmit}
          initialValues={getMyCollectionArtworkFormInitialValues(artwork)}
          validationSchema={MyCollectionArtworkDetailsValidationSchema}
        >
          <MyCollectionArtworkFormMainFragmentContainer artwork={artwork} />
        </Formik>
      </MyCollectionArtworkFormContextProvider>
    </>
  )
}

export const MyCollectionEditArtworkFragmentContainer = createFragmentContainer(
  MyCollectionEditArtwork,
  {
    artwork: graphql`
      fragment MyCollectionEditArtwork_artwork on Artwork {
        artist {
          internalID
          initials
          name
          formattedNationalityAndBirthday
          targetSupply {
            isP1
          }
          isPersonalArtist
          image {
            cropped(width: 44, height: 44) {
              height
              src
              srcSet
              width
            }
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
        provenance
        slug
        title
        width
        confidentialNotes
        collectorLocation {
          city
          state
          country
          countryCode
        }
        ...MyCollectionArtworkFormMain_artwork
      }
    `,
  }
)
