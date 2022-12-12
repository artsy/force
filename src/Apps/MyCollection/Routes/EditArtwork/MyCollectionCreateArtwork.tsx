import { useToasts } from "@artsy/palette"
import { MyCollectionArtworkFormImagesProps } from "Apps/MyCollection/Routes/EditArtwork/Components/MyCollectionArtworkFormImages"
import { MyCollectionArtworkFormMain } from "Apps/MyCollection/Routes/EditArtwork/Components/MyCollectionArtworkFormMain"
import { useCreateOrUpdateArtwork } from "Apps/MyCollection/Routes/EditArtwork/Utils/useCreateOrUpdateArtwork"
import { useMyCollectionTracking } from "Apps/MyCollection/Routes/Hooks/useMyCollectionTracking"
import { IMAGES_LOCAL_STORE_LAST_UPDATED_AT } from "Apps/Settings/Routes/MyCollection/constants"
import { MetaTags } from "Components/MetaTags"
import { Formik } from "formik"
import { useRef } from "react"
import { useRouter } from "System/Router/useRouter"
import { setLocalImagesStoreLastUpdatedAt } from "Utils/localImagesHelpers"
import createLogger from "Utils/logger"
import { getMyCollectionArtworkFormInitialValues } from "./Utils/artworkFormHelpers"
import { ArtworkModel } from "./Utils/artworkModel"
import { MyCollectionArtworkDetailsValidationSchema } from "./Utils/artworkValidation"

const logger = createLogger("MyCollectionCreateArtwork.tsx")

export const MyCollectionCreateArtwork: React.FC = () => {
  const { router } = useRouter()
  const { sendToast } = useToasts()
  const { createOrUpdateArtwork } = useCreateOrUpdateArtwork()
  const {
    saveCollectedArtwork: trackSaveCollectedArtwork,
  } = useMyCollectionTracking()

  const artworkFormImagesRef = useRef<MyCollectionArtworkFormImagesProps | null>(
    null
  )

  const handleSubmit = async (values: ArtworkModel) => {
    // Create the new artwork

    try {
      const artworkId = await createOrUpdateArtwork(values)

      trackSaveCollectedArtwork()

      // Store images locally

      if (artworkId && artworkFormImagesRef.current) {
        await artworkFormImagesRef.current?.saveImagesToLocalStorage(artworkId)
        await setLocalImagesStoreLastUpdatedAt(
          IMAGES_LOCAL_STORE_LAST_UPDATED_AT
        )
      }

      router.replace({ pathname: `/my-collection/artworks/${artworkId}/edit` })
      router.push({ pathname: "/settings/my-collection" })
    } catch (error) {
      logger.error(`Artwork not created`, error)

      sendToast({
        variant: "error",
        message: "An error occurred",
        description: "Please contact support@artsymail.com",
      })
    }
  }

  return (
    <>
      <MetaTags title="Upload Artwork | Artsy" />

      <Formik<ArtworkModel>
        validateOnMount
        onSubmit={handleSubmit}
        initialValues={getMyCollectionArtworkFormInitialValues()}
        validationSchema={MyCollectionArtworkDetailsValidationSchema}
      >
        <MyCollectionArtworkFormMain
          artworkFormImagesRef={artworkFormImagesRef}
        />
      </Formik>
    </>
  )
}
