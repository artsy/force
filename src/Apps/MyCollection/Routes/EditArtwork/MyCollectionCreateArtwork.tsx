import { useToasts } from "@artsy/palette"
import { MyCollectionArtworkFormArtistStep } from "Apps/MyCollection/Routes/EditArtwork/Components/MyCollectionArtworkFormArtistStep"
import { MyCollectionArtworkFormArtworkStep } from "Apps/MyCollection/Routes/EditArtwork/Components/MyCollectionArtworkFormArtworkStep"
import {
  MyCollectionArtworkFormContextProvider,
  useLocalImageState,
} from "Apps/MyCollection/Routes/EditArtwork/Components/MyCollectionArtworkFormContext"
import { MyCollectionArtworkFormMain } from "Apps/MyCollection/Routes/EditArtwork/Components/MyCollectionArtworkFormMain"
import { useCreateOrUpdateArtwork } from "Apps/MyCollection/Routes/EditArtwork/Utils/useCreateOrUpdateArtwork"
import { useMyCollectionTracking } from "Apps/MyCollection/Routes/Hooks/useMyCollectionTracking"
import { MetaTags } from "Components/MetaTags"
import { Formik } from "formik"
import { useEffect, useState } from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { useRouter } from "System/Router/useRouter"
import { useFeatureFlag } from "System/useFeatureFlag"
import { storeArtworkLocalImages } from "Utils/localImagesHelpers"
import createLogger from "Utils/logger"
import { MyCollectionCreateArtwork_me$data } from "__generated__/MyCollectionCreateArtwork_me.graphql"
import { getMyCollectionArtworkFormInitialValues } from "./Utils/artworkFormHelpers"
import { ArtworkModel } from "./Utils/artworkModel"
import {
  MyCollectionArtworkDetailsValidationSchema,
  MyCollectionArtworkDetailsValidationSchemaWithoutPersonalArtist,
} from "./Utils/artworkValidation"

const logger = createLogger("MyCollectionCreateArtwork.tsx")

type Step = "artist-select" | "artwork-select" | "details"

interface MyCollectionCreateArtworkProps {
  me: MyCollectionCreateArtwork_me$data
}

export const MyCollectionCreateArtwork: React.FC<MyCollectionCreateArtworkProps> = ({
  me,
}) => {
  const { localImages, addLocalImage, removeLocalImage } = useLocalImageState()

  const isCollectorProfileEnabled = useFeatureFlag("cx-collector-profile")
  const enableNewMyCUploadFlow = useFeatureFlag(
    "cx-my-collection-uploading-flow-steps"
  )
  const enablePersonalArtists = useFeatureFlag(
    "cx-my-collection-personal-artists-for-web"
  )

  const { router } = useRouter()
  const { sendToast } = useToasts()
  const { createOrUpdateArtwork } = useCreateOrUpdateArtwork()
  const {
    saveCollectedArtwork: trackSaveCollectedArtwork,
  } = useMyCollectionTracking()

  const initialStep = enableNewMyCUploadFlow ? "artist-select" : "details"

  const [currentStep, setCurrentStep] = useState<Step>(initialStep)

  const getCurrentStep = () => {
    if (!enableNewMyCUploadFlow) {
      return <MyCollectionArtworkFormMain />
    }

    switch (currentStep) {
      case "artist-select":
        return <MyCollectionArtworkFormArtistStep me={me} />
      case "artwork-select":
        return <MyCollectionArtworkFormArtworkStep />
      default:
        return <MyCollectionArtworkFormMain />
    }
  }

  const handleBack = () => {
    if (currentStep === "artist-select" || !enableNewMyCUploadFlow) {
      router.push({
        pathname: isCollectorProfileEnabled
          ? "/collector-profile/my-collection"
          : "/settings/my-collection",
      })
    } else if (currentStep === "artwork-select") {
      setCurrentStep("artist-select")
    } else if (currentStep === "details") {
      setCurrentStep("artist-select")
    }
  }

  const handleNextStep = options => {
    if (options?.skipNext) {
      setCurrentStep("details")
    } else if (currentStep === "artist-select") {
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

  useEffect(() => {
    window?.scrollTo?.({ top: 0 })
  }, [currentStep])

  const handleSubmit = async (values: ArtworkModel) => {
    // Create the new artwork

    try {
      const artworkId = await createOrUpdateArtwork(values)

      trackSaveCollectedArtwork()

      // Store images locally
      if (artworkId) {
        try {
          await storeArtworkLocalImages(
            artworkId,
            localImages.map(({ photoID, ...rest }) => rest)
          )
        } catch (error) {
          console.error("Failed to store images locally.", error)
        }
      }

      router.replace({
        pathname: isCollectorProfileEnabled
          ? `/collector-profile/my-collection/artworks/${artworkId}/edit`
          : `/my-collection/artworks/${artworkId}/edit`,
      })
      router.push({
        pathname: isCollectorProfileEnabled
          ? "/collector-profile/my-collection/"
          : "/settings/my-collection",
      })
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
        onBack={handleBack}
        onNext={handleNextStep}
        onSkip={handleSkip}
        addLocalImage={addLocalImage}
        removeLocalImage={removeLocalImage}
      >
        <Formik<ArtworkModel>
          validateOnMount
          onSubmit={handleSubmit}
          initialValues={getMyCollectionArtworkFormInitialValues()}
          validationSchema={
            enablePersonalArtists && enableNewMyCUploadFlow
              ? MyCollectionArtworkDetailsValidationSchema
              : MyCollectionArtworkDetailsValidationSchemaWithoutPersonalArtist
          }
        >
          {getCurrentStep()}
        </Formik>
      </MyCollectionArtworkFormContextProvider>
    </>
  )
}

export const MyCollectionCreateArtworkFragmentContainer = createFragmentContainer(
  MyCollectionCreateArtwork,
  {
    me: graphql`
      fragment MyCollectionCreateArtwork_me on Me {
        ...MyCollectionArtworkFormArtistStep_me
      }
    `,
  }
)
