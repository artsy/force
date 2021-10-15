import { CreateSubmissionMutationInput } from "v2/__generated__/CreateConsignSubmissionMutation.graphql"
import { SubmissionModel } from "./submissionUtils"

export const createConsignSubmissionInput = (
  submission: SubmissionModel
): CreateSubmissionMutationInput => {
  return {
    artistID: submission.artistId,
    state: "SUBMITTED",
    // userEmail: submission.contactInformationForm.email
    // userName: submission.contactInformationForm.name
    // userPhone: submission.contactInformationForm.phone
  }
}
