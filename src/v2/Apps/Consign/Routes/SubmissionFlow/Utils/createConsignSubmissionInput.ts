import {
  ConsignmentAttributionClass,
  ConsignmentSubmissionCategoryAggregation,
  CreateSubmissionMutationInput,
} from "v2/__generated__/CreateConsignSubmissionMutation.graphql"
import { SubmissionModel } from "./submissionUtils"

export const createConsignSubmissionInput = (
  submission: SubmissionModel
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
    editionSize: submission.artworkDetailsForm.editionSize,
    height: submission.artworkDetailsForm.height,
    width: submission.artworkDetailsForm.width,
    depth: submission.artworkDetailsForm.depth,
    dimensionsMetric: submission.artworkDetailsForm.units,
    state: "SUBMITTED",
    // FIXME
    // @ts-ignore
    userEmail: submission.contactInformationForm?.email,
    userName: submission.contactInformationForm?.name,
    userPhone: submission.contactInformationForm?.phone,
  }
}
