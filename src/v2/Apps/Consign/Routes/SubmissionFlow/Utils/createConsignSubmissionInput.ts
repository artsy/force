import {
  ConsignmentAttributionClass,
  CreateSubmissionMutationInput,
} from "v2/__generated__/CreateConsignSubmissionMutation.graphql"
import { SubmissionModel } from "./useSubmission"

export const createConsignSubmissionInput = (
  submission: SubmissionModel,
  sessionId?: string
): CreateSubmissionMutationInput => {
  return {
    artistID: submission.artworkDetailsForm.artistId,
    year: submission.artworkDetailsForm.year,
    title: submission.artworkDetailsForm.title,
    medium: submission.artworkDetailsForm.materials,
    attributionClass: submission.artworkDetailsForm.rarity
      .replace(" ", "_")
      .toUpperCase() as ConsignmentAttributionClass,
    editionNumber: submission.artworkDetailsForm.editionNumber,
    editionSizeFormatted: submission.artworkDetailsForm.editionSize,
    height: submission.artworkDetailsForm.height,
    width: submission.artworkDetailsForm.width,
    depth: submission.artworkDetailsForm.depth,
    dimensionsMetric: submission.artworkDetailsForm.units,
    provenance: submission.artworkDetailsForm.provenance,
    // locationCity: submission.artworkDetailsForm.location,
    state: "SUBMITTED",
    userEmail: submission.contactInformationForm?.email,
    userName: submission.contactInformationForm?.name,
    userPhone: submission.contactInformationForm?.phone,
    utmMedium: submission?.utmParams?.utmMedium,
    utmSource: submission?.utmParams?.utmSource,
    utmTerm: submission?.utmParams?.utmTerm,
    sessionID: sessionId,
  }
}
