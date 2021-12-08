import { Button, Text } from "@artsy/palette"
import { SubmissionStepper } from "v2/Apps/Consign/Components/SubmissionStepper"
import { Form, Formik } from "formik"
import {
  ArtworkDetailsForm,
  ArtworkDetailsFormModel,
  getArtworkDetailsFormInitialValues,
} from "./Components/ArtworkDetailsForm"
import { useRouter } from "v2/System/Router/useRouter"
import { UtmParams } from "../Utils/useSubmission"
import { artworkDetailsValidationSchema } from "../Utils/validation"
import { BackLink } from "v2/Components/Links/BackLink"
import { useErrorModal } from "../Utils/useErrorModal"
import { useSystemContext } from "v2/System"
import { createOrUpdateConsignSubmission } from "../Utils/createConsignSubmission"
import { createFragmentContainer, graphql } from "react-relay"
import {
  ArtworkDetails_submission,
  ConsignmentAttributionClass,
} from "v2/__generated__/ArtworkDetails_submission.graphql"

export interface ArtworkDetailsProps {
  submission?: ArtworkDetails_submission
}

export const ArtworkDetails: React.FC<ArtworkDetailsProps> = ({
  submission,
}) => {
  const { router } = useRouter()
  const { openErrorModal } = useErrorModal()
  const { relayEnvironment, isLoggedIn } = useSystemContext()

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
      try {
        submissionId = await createOrUpdateConsignSubmission(relayEnvironment, {
          id: submission?.id,
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
          // locationCity: artworkDetailsForm.location,
          state: "DRAFT",
          utmMedium: utmParams?.utmMedium,
          utmSource: utmParams?.utmSource,
          utmTerm: utmParams?.utmTerm,
          sessionID: !isLoggedIn ? sd.SESSION_ID : undefined,
        })
      } catch (error) {
        openErrorModal()
        return
      }

      router.replace({
        pathname: `/consign/submission/${submissionId}/artwork-details`,
      })
      router.push({
        pathname: `/consign/submission/${submissionId}/upload-photos`,
      })
    }
  }

  return (
    <>
      <BackLink py={2} mb={6} to="/consign">
        Back
      </BackLink>

      <SubmissionStepper currentStep="Artwork Details" />

      <Text mt={4} variant="lg" as="h1">
        Tell us about your artwork
      </Text>

      <Text mt={1} variant="sm" color="black60">
        &#8226; All fields are required to submit a work.
      </Text>
      <Text mb={[2, 6]} variant="sm" color="black60">
        &#8226; Unfortunately we are not accepting consignments directly from
        artists at this time.
      </Text>

      <Formik<ArtworkDetailsFormModel>
        initialValues={getArtworkDetailsFormInitialValues(submission)}
        onSubmit={handleSubmit}
        validationSchema={artworkDetailsValidationSchema}
        validateOnMount
      >
        {({ isSubmitting, isValid }) => (
          <Form>
            <ArtworkDetailsForm />
            <Button
              mt={6}
              width={["100%", "auto"]}
              data-test-id="save-button"
              type="submit"
              size="medium"
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
        id
        artist {
          internalID
          name
        }
        locationCity
        locationCountry
        locationState
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
  }
)
