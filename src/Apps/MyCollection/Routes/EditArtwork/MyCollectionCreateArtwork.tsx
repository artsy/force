import { useToasts } from "@artsy/palette"
import { MyCollectionArtworkFormArtistStep } from "Apps/MyCollection/Routes/EditArtwork/Components/MyCollectionArtworkFormArtistStep"
import { MyCollectionArtworkFormArtworkStep } from "Apps/MyCollection/Routes/EditArtwork/Components/MyCollectionArtworkFormArtworkStep"
import { MyCollectionArtworkFormContextProvider } from "Apps/MyCollection/Routes/EditArtwork/Components/MyCollectionArtworkFormContext"
import { MyCollectionArtworkFormImagesProps } from "Apps/MyCollection/Routes/EditArtwork/Components/MyCollectionArtworkFormImages"
import { MyCollectionArtworkFormMain } from "Apps/MyCollection/Routes/EditArtwork/Components/MyCollectionArtworkFormMain"
import { useCreateOrUpdateArtwork } from "Apps/MyCollection/Routes/EditArtwork/Utils/useCreateOrUpdateArtwork"
import { useMyCollectionTracking } from "Apps/MyCollection/Routes/Hooks/useMyCollectionTracking"
import { IMAGES_LOCAL_STORE_LAST_UPDATED_AT } from "Apps/Settings/Routes/MyCollection/constants"
import { MetaTags } from "Components/MetaTags"
import { Formik } from "formik"
import { useRef, useState } from "react"
import { useRouter } from "System/Router/useRouter"
import { useFeatureFlag } from "System/useFeatureFlag"
import { setLocalImagesStoreLastUpdatedAt } from "Utils/localImagesHelpers"
import createLogger from "Utils/logger"
import { getMyCollectionArtworkFormInitialValues } from "./Utils/artworkFormHelpers"
import { ArtworkModel } from "./Utils/artworkModel"
import { MyCollectionArtworkDetailsValidationSchema } from "./Utils/artworkValidation"

const logger = createLogger("MyCollectionCreateArtwork.tsx")

type Step = "artist-select" | "artwork-select" | "details"

export const MyCollectionCreateArtwork: React.FC = () => {
  const enableNewMyCUploadFlow = useFeatureFlag(
    "cx-my-collection-uploading-flow-steps"
  )

  const { router } = useRouter()
  const { sendToast } = useToasts()
  const { createOrUpdateArtwork } = useCreateOrUpdateArtwork()
  const {
    saveCollectedArtwork: trackSaveCollectedArtwork,
  } = useMyCollectionTracking()

  const artworkFormImagesRef = useRef<MyCollectionArtworkFormImagesProps | null>(
    null
  )

  const initialStep = enableNewMyCUploadFlow ? "artist-select" : "details"

  const [currentStep, setCurrentStep] = useState<Step>(initialStep)

  const getCurrentStep = () => {
    if (!enableNewMyCUploadFlow) {
      return <MyCollectionArtworkFormMain />
    }

    switch (currentStep) {
      case "artist-select":
        return <MyCollectionArtworkFormArtistStep />
      case "artwork-select":
        return <MyCollectionArtworkFormArtworkStep />
      default:
        return <MyCollectionArtworkFormMain />
    }
  }

  const handleBack = () => {
    if (currentStep === "artist-select" || !enableNewMyCUploadFlow) {
      router.push({ pathname: "/settings/my-collection" })
    } else if (currentStep === "artwork-select") {
      setCurrentStep("artist-select")
    } else if (currentStep === "details") {
      setCurrentStep("artist-select")
    }
  }

  const handleNextStep = () => {
    if (currentStep === "artist-select") {
      setCurrentStep("artwork-select")
    } else if (currentStep === "artwork-select") {
      setCurrentStep("details")
    }
  }

  const handleSkip = () => {
    if (currentStep === "artist-select") {
      setCurrentStep("details")
    } else if (currentStep === "artwork-select") {
      setCurrentStep("details")
    }
  }

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

      router.replace({
        pathname: `/my-collection/artworks/${artworkId}/edit`,
      })
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

      <MyCollectionArtworkFormContextProvider
        artworkFormImagesRef={artworkFormImagesRef}
        onBack={handleBack}
        onNext={handleNextStep}
        onSkip={handleSkip}
      >
        <Formik<ArtworkModel>
          validateOnMount
          onSubmit={handleSubmit}
          initialValues={getMyCollectionArtworkFormInitialValues()}
          validationSchema={MyCollectionArtworkDetailsValidationSchema}
        >
          {getCurrentStep()}
        </Formik>
      </MyCollectionArtworkFormContextProvider>
    </>
  )
}
