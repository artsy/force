import { Flex, Text } from "@artsy/palette"
import { ArtworkFormContextProvider } from "Apps/Consign/Routes/SubmissionFlow2/Components/ArtworkFormContext"
import { ArtworkFormNavigation } from "Apps/Consign/Routes/SubmissionFlow2/Components/ArtworkFormNavigation"
import { getArtworkFormInitialValues } from "Apps/Consign/Routes/SubmissionFlow2/Utils/artworkFormHelpers"
import { ArtworkModel } from "Apps/Consign/Routes/SubmissionFlow2/Utils/artworkModel"
import { ArtworkDetailsValidationSchema } from "Apps/Consign/Routes/SubmissionFlow2/Utils/artworkValidation"
import { MetaTags } from "Components/MetaTags"
import { DESKTOP_NAV_BAR_HEIGHT } from "Components/NavBar/constants"
import { useRouter } from "System/Router/useRouter"
import { Formik } from "formik"
import { useEffect, useState } from "react"

const DESKTOP_HEIGHT = `calc(100vh - ${DESKTOP_NAV_BAR_HEIGHT}px)`

export const ARTWORK_FORM_STEPS = [
  "StartFlow",
  "SelectArtworkMyCollectionArtwork",
  "SelectArtist",
  "AddTitle",
  "AddPhotos",
  "AddDetails",
  "AddDimensions",
  "PurchaseHistory",
  "CompleteYourSubmission",
  "ArtistRejected",
] as const

type Step = typeof ARTWORK_FORM_STEPS[number]

interface CreateArtworkProps {}

export const ArtworkForm: React.FC<CreateArtworkProps> = () => {
  const { router } = useRouter()

  const initialValues = getArtworkFormInitialValues()

  const initialStep = ARTWORK_FORM_STEPS[0]

  const [currentStep, setCurrentStep] = useState<Step>(initialStep)

  const getCurrentStep = () => {
    return (
      <Flex width="100%" height="100%" m={4}>
        <Flex width={600} justifyContent="center" alignContent="center">
          <Text>Current Step: {currentStep}</Text>
        </Flex>
      </Flex>
    )
  }

  useEffect(() => {
    window?.scrollTo?.({ top: 0 })
  }, [currentStep])

  const handleBack = () => {
    if (currentStep === ARTWORK_FORM_STEPS[0]) {
      router.push({
        pathname: "/sell",
      })
    }

    const nextStep =
      ARTWORK_FORM_STEPS[ARTWORK_FORM_STEPS.indexOf(currentStep) - 1]

    setCurrentStep(nextStep)
  }

  const handleNextStep = () => {
    const nextStep =
      ARTWORK_FORM_STEPS[ARTWORK_FORM_STEPS.indexOf(currentStep) + 1]

    setCurrentStep(nextStep)
  }

  const handleSubmit = async (values: ArtworkModel) => {}

  return (
    <>
      <MetaTags
        title="Sell Art from Your Collection | Consignments | Artsy"
        description="Get competitive offers from the world's top auction houses and galleries to sell art from your collection. Submit today at no cost."
      />

      <ArtworkFormContextProvider onBack={handleBack} onNext={handleNextStep}>
        <Formik<ArtworkModel>
          validateOnMount
          onSubmit={handleSubmit}
          initialValues={initialValues}
          validationSchema={ArtworkDetailsValidationSchema}
        >
          <Flex height={DESKTOP_HEIGHT} flexDirection="column">
            <Flex flex={1}>{getCurrentStep()}</Flex>

            <ArtworkFormNavigation />
          </Flex>
        </Formik>
      </ArtworkFormContextProvider>
    </>
  )
}
