import {
  ConsignmentAttributionClass,
  ConsignmentSubmissionCategoryAggregation,
  CreateSubmissionMutationInput,
} from "v2/__generated__/CreateConsignSubmissionMutation.graphql"
import { SubmissionModel } from "./useSubmission"

export const createConsignSubmissionInput = (
  submission: SubmissionModel,
  user: User
): CreateSubmissionMutationInput => {
  return {
    artistID: submission.artworkDetailsForm.artistId,
    year: submission.artworkDetailsForm.year,
    title: submission.artworkDetailsForm.title,
    category: submission.artworkDetailsForm
      .medium as ConsignmentSubmissionCategoryAggregation,
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
    state: "SUBMITTED",
    userEmail: user?.email,
    userName: user?.name,
    userPhone: user?.phone,
  }
}
