import { CreateSubmissionMutationInput } from "v2/__generated__/CreateConsignSubmissionMutation.graphql"

export const createConsignSubmissionInput = (
  submission: any
): CreateSubmissionMutationInput => {
  return {
    artistID: submission.artistId,
    state: "SUBMITTED",
  }
}
