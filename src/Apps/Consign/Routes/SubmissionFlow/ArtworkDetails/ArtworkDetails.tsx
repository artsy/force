import { Button, Text, useToasts } from "@artsy/palette"
import { SubmissionStepper } from "Apps/Consign/Components/SubmissionStepper"
import { Form, Formik } from "formik"
import {
  ArtworkDetailsForm,
  ArtworkDetailsFormModel,
  getArtworkDetailsFormInitialValues,
  getArtworkDetailsFormInitialValuesProps,
  SubmissionType,
} from "./Components/ArtworkDetailsForm"
import { useRouter } from "System/Router/useRouter"
import {
  artworkDetailsValidationSchema,
  validate,
} from "Apps/Consign/Routes/SubmissionFlow/Utils/validation"
import { BackLink } from "Components/Links/BackLink"
import { useSystemContext } from "System"
import {
  createOrUpdateConsignSubmission,
  SubmissionInput,
} from "Apps/Consign/Routes/SubmissionFlow/Utils/createOrUpdateConsignSubmission"
import { createFragmentContainer, graphql } from "react-relay"
import { CreateSubmissionMutationInput } from "__generated__/CreateConsignSubmissionMutation.graphql"
import {
  ArtworkDetails_submission$data,
  ConsignmentAttributionClass,
} from "__generated__/ArtworkDetails_submission.graphql"
import { UtmParams } from "Apps/Consign/Routes/SubmissionFlow/Utils/types"
import { getENV } from "Utils/getENV"
import createLogger from "Utils/logger"
import { ArtworkDetails_myCollectionArtwork$data } from "__generated__/ArtworkDetails_myCollectionArtwork.graphql"
import { LocationDescriptor } from "found"
import { trackEvent } from "Server/analytics/helpers"
import { ActionType, ContextModule, OwnerType } from "@artsy/cohesion"
import { useSubmissionFlowSteps } from "Apps/Consign/Hooks/useSubmissionFlowSteps"
import { useFeatureFlag } from "System/useFeatureFlag"

const logger = createLogger("SubmissionFlow/ArtworkDetails.tsx")

export interface ArtworkDetailsProps {
  submission?: ArtworkDetails_submission$data
  myCollectionArtwork?: ArtworkDetails_myCollectionArtwork$data
}

export const ArtworkDetails: React.FC<ArtworkDetailsProps> = ({
  submission,
  myCollectionArtwork,
}) => {
  const isCollectorProfileEnabled = useFeatureFlag("cx-collector-profile")
  const { router, match } = useRouter()
  const { relayEnvironment, isLoggedIn } = useSystemContext()
  const { sendToast } = useToasts()

  const steps = useSubmissionFlowSteps()
  const stepIndex = Math.max(
    [...steps].indexOf("Artwork Details"),
    [...steps].indexOf("Artwork")
  )
  const isLastStep = stepIndex === steps.length - 1
  const isFirstStep = stepIndex === 0

  let data: getArtworkDetailsFormInitialValuesProps = {
    type: SubmissionType.default,
  }
  if (myCollectionArtwork) {
    data = {
      values: myCollectionArtwork!,
      type: SubmissionType.myCollectionArtwork,
    }
  } else if (submission) {
    data = { values: submission!, type: SubmissionType.submission }
  }

  const initialValue = getArtworkDetailsFormInitialValues(data)
  const initialErrors = validate(initialValue, artworkDetailsValidationSchema)

  const artworkId = myCollectionArtwork?.internalID

  const handleSubmit = async (values: ArtworkDetailsFormModel) => {
    const isLimitedEditionRarity = values.rarity === "limited edition"
    const utmParamsData = sessionStorage.getItem("utmParams")

    const artworkDetailsForm = {
      ...values,
      editionNumber: isLimitedEditionRarity ? values.editionNumber : "",
      editionSize: isLimitedEditionRarity ? values.editionSize : "",
    }

    for (let key in artworkDetailsForm) {
      if (typeof artworkDetailsForm[key] !== "string") {
        artworkDetailsForm[key] = artworkDetailsForm[key] || undefined
      } else {
        artworkDetailsForm[key] =
          artworkDetailsForm[key] && artworkDetailsForm[key].trim()
      }
    }

    let submissionId: string

    const utmParams: UtmParams | undefined = utmParamsData
      ? JSON.parse(utmParamsData)
      : undefined

    if (relayEnvironment) {
      let submissionData: SubmissionInput
      submissionData = {
        externalId: submission?.externalId,
        artistID: artworkDetailsForm.artistId,
        category: artworkDetailsForm.category ?? null,
        year: artworkDetailsForm.year,
        title: artworkDetailsForm.title,
        medium: artworkDetailsForm.materials,
        attributionClass: artworkDetailsForm.rarity
          .replace(" ", "_")
          .toUpperCase() as ConsignmentAttributionClass,
        editionNumber: artworkDetailsForm.editionNumber,
        editionSizeFormatted: artworkDetailsForm.editionSize,
        height: artworkDetailsForm.height,
        width: artworkDetailsForm.width,
        depth: artworkDetailsForm.depth,
        dimensionsMetric: artworkDetailsForm.units,
        provenance: artworkDetailsForm.provenance,
        locationCity: artworkDetailsForm.location.city.trim(),
        locationCountry: artworkDetailsForm.location.country?.trim(),
        locationState: artworkDetailsForm.location.state?.trim(),
        locationCountryCode: artworkDetailsForm.location.countryCode?.trim(),
        locationPostalCode: artworkDetailsForm.postalCode?.trim() || null,
        state: isLastStep ? "SUBMITTED" : "DRAFT",
        utmMedium: utmParams?.utmMedium,
        utmSource: utmParams?.utmSource,
        utmTerm: utmParams?.utmTerm,
        sessionID: !isLoggedIn ? getENV("SESSION_ID") : undefined,
        // myCollectionArtworkID is necessary in order to prevent duplication or mycollection artwork
        myCollectionArtworkID: artworkId && isFirstStep ? artworkId : undefined,
      }
      if (artworkId && !match?.params?.id) {
        ;(submissionData as CreateSubmissionMutationInput).source =
          "MY_COLLECTION"
      }
      try {
        submissionId = await createOrUpdateConsignSubmission(
          relayEnvironment,
          submissionData
        )
      } catch (error) {
        logger.error(
          `Submission not ${submission?.externalId ? "updated" : "created"}`,
          error
        )
        sendToast({
          variant: "error",
          message: "An error occurred",
          description: "Please contact sell@artsy.net",
        })
        return
      }

      if (isLastStep) {
        trackEvent({
          action: ActionType.consignmentSubmitted,
          submission_id: submissionId,
          user_id: submission?.userId,
          user_email: submission?.userEmail,
        })
      }

      trackEvent({
        action: ActionType.artworkDetailsCompleted,
        context_owner_type: OwnerType.consignmentFlow,
        context_module: ContextModule.artworkDetails,
        submission_id: submissionId,
        user_id: submission?.userId,
        user_email: submission?.userEmail,
      })

      router.replace(
        artworkId
          ? isCollectorProfileEnabled
            ? "/collector-profile/my-collection"
            : "/settings/my-collection"
          : "/sell"
      )

      const consignPath = artworkId
        ? isCollectorProfileEnabled
          ? "/collector-profile/my-collection/submission"
          : "/my-collection/submission"
        : "/sell/submission"

      const nextStepIndex = isLastStep ? null : stepIndex + 1
      let nextRoute: LocationDescriptor = consignPath
      if (nextStepIndex !== null) {
        let nextStep = steps[nextStepIndex]
        if (nextStep === "Contact" || nextStep === "Contact Information") {
          nextRoute = `${consignPath}/${submissionId}/contact-information`
        } else if (nextStep === "Artwork" || nextStep === "Artwork Details") {
          nextRoute = `${consignPath}/${submissionId}/artwork-details/`
        } else if (nextStep === "Photos" || nextStep === "Upload Photos") {
          nextRoute = `${consignPath}/${submissionId}/upload-photos`
        }
      }

      if (nextRoute === consignPath) {
        // there is no next step to go to. Prepare to go to thank you screen
        nextRoute = `${nextRoute}/${submissionId}/thank-you`
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
      ? isCollectorProfileEnabled
        ? "/collector-profile/my-collection"
        : "/my-collection"
      : "/sell"
    let backTo = defaultBackLink
    if (stepIndex === 0 && artworkId) {
      return backTo + `/artwork/${artworkId}`
    }
    let prevStep = ""
    if (stepIndex > 0) {
      switch (steps[stepIndex - 1]) {
        case "Contact":
        case "Contact Information":
          prevStep = "contact-information"
          break
        case "Upload Photos":
        case "Photos":
          prevStep = "upload-photos"
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
      <BackLink py={2} mb={6} to={backTo} width="min-content">
        Back
      </BackLink>

      <SubmissionStepper currentStep="Artwork Details" />

      <Text mt={4} variant="lg-display" as="h1">
        Tell us about your artwork
      </Text>

      <Text mt={1} variant="sm" color="black60">
        &#8226; Currently, artists can not sell their own work on Artsy.{" "}
        <a
          href="https://support.artsy.net/hc/en-us/articles/360046646374-I-m-an-artist-Can-I-submit-my-own-work-to-sell-"
          target="_blank"
          data-testid="learn-more-anchor"
        >
          Learn More.
        </a>
      </Text>
      <Text mb={[4, 6]} variant="sm" color="black60">
        &#8226; All fields are required to submit a work.
      </Text>

      <Formik<ArtworkDetailsFormModel>
        validateOnMount
        initialValues={initialValue}
        onSubmit={handleSubmit}
        validationSchema={artworkDetailsValidationSchema}
        initialErrors={initialErrors}
      >
        {({ isSubmitting, isValid }) => (
          <Form>
            <ArtworkDetailsForm />
            <Button
              mt={6}
              width={["100%", "auto"]}
              data-testid="save-button"
              type="submit"
              size="large"
              variant="primaryBlack"
              loading={isSubmitting}
              disabled={!isValid}
            >
              {isLastStep ? "Submit Artwork" : "Save and Continue"}
            </Button>
          </Form>
        )}
      </Formik>
    </>
  )
}

export const ArtworkDetailsFragmentContainer = createFragmentContainer(
  ArtworkDetails,
  {
    submission: graphql`
      fragment ArtworkDetails_submission on ConsignmentSubmission {
        externalId
        artist {
          internalID
          name
        }
        category
        locationCity
        locationCountry
        locationState
        locationPostalCode
        locationCountryCode
        year
        title
        medium
        attributionClass
        editionNumber
        editionSize
        height
        width
        depth
        dimensionsMetric
        provenance
        userId
        userEmail
      }
    `,
    myCollectionArtwork: graphql`
      fragment ArtworkDetails_myCollectionArtwork on Artwork {
        internalID
        artist {
          internalID
          name
        }
        location {
          city
          country
          state
          postalCode
        }
        date
        title
        medium
        mediumType {
          name
        }
        attributionClass {
          name
        }
        editionNumber
        editionSize
        height
        width
        depth
        metric
        provenance
      }
    `,
  }
)
