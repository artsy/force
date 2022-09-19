import { Button, Text, useToasts } from "@artsy/palette"
import { SubmissionStepper } from "Apps/Consign/Components/SubmissionStepper"
import { Form, Formik } from "formik"
import {
  ArtworkDetailsForm,
  ArtworkDetailsFormModel,
  getArtworkDetailsFormInitialValues,
} from "./Components/ArtworkDetailsForm"
import { useRouter } from "System/Router/useRouter"
import { artworkDetailsValidationSchema, validate } from "../Utils/validation"
import { BackLink } from "Components/Links/BackLink"
import { useSystemContext } from "System"
import {
  createOrUpdateConsignSubmission,
  SubmissionInput,
} from "../Utils/createOrUpdateConsignSubmission"
import { createFragmentContainer, graphql } from "react-relay"
import {
  ArtworkDetails_submission,
  ConsignmentAttributionClass,
} from "__generated__/ArtworkDetails_submission.graphql"
import { ArtworkDetails_myCollectionArtworkSubmissionDetails } from "__generated__/ArtworkDetails_myCollectionArtworkSubmissionDetails.graphql"
import { UtmParams } from "../Utils/types"
import { getENV } from "Utils/getENV"
import createLogger from "Utils/logger"
import { ConsignmentSubmissionSource } from "__generated__/CreateConsignSubmissionMutation.graphql"

const logger = createLogger("SubmissionFlow/ArtworkDetails.tsx")

export interface ArtworkDetailsProps {
  submission?: ArtworkDetails_submission
  myCollectionArtworkSubmissionDetails?: ArtworkDetails_myCollectionArtworkSubmissionDetails
}

export const ArtworkDetails: React.FC<ArtworkDetailsProps> = ({
  submission,
  myCollectionArtworkSubmissionDetails,
}) => {
  const { router, match } = useRouter()
  const { relayEnvironment, isLoggedIn } = useSystemContext()
  const { sendToast } = useToasts()
  const initialValue = getArtworkDetailsFormInitialValues(
    submission,
    myCollectionArtworkSubmissionDetails
  )
  const initialErrors = validate(initialValue, artworkDetailsValidationSchema)

  const artworkId = myCollectionArtworkSubmissionDetails?.internalID

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
        state: "DRAFT",
        utmMedium: utmParams?.utmMedium,
        utmSource: utmParams?.utmSource,
        utmTerm: utmParams?.utmTerm,
        sessionID: !isLoggedIn ? getENV("SESSION_ID") : undefined,
      }
      if (artworkId && !match?.params?.id) {
        // @ts-ignore
        ;(submissionData.source as ConsignmentSubmissionSource) = "MY_COLLECTION"
        // @ts-ignore
        ;(submissionData.myCollectionArtworkID as string) = artworkId
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
          description: "Please contact sell@artsymail.com",
        })

        return
      }

      router.replace({
        pathname: `/sell/submission/${submissionId}/artwork-details`,
      })
      router.push({
        pathname: artworkId
          ? `/sell/submission/${submissionId}/upload-photos/${artworkId}`
          : `/sell/submission/${submissionId}/upload-photos`,
      })
    }
  }

  return (
    <>
      <BackLink py={2} mb={6} to="/sell" width="min-content">
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
              Save and Continue
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
      }
    `,
    myCollectionArtworkSubmissionDetails: graphql`
      fragment ArtworkDetails_myCollectionArtworkSubmissionDetails on Artwork {
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
