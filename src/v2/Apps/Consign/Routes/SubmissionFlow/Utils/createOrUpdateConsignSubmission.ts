import { Environment } from "relay-runtime"
import {
  createConsignSubmissionMutation,
  updateConsignSubmissionMutation,
} from "../Mutations"
import { CreateSubmissionMutationInput } from "v2/__generated__/CreateConsignSubmissionMutation.graphql"
import { UpdateSubmissionMutationInput } from "v2/__generated__/UpdateConsignSubmissionMutation.graphql"

// const logger = createLogger("createConsignSubmission.ts")

export type SubmissionInput =
  | CreateSubmissionMutationInput
  | UpdateSubmissionMutationInput

export const createOrUpdateConsignSubmission = async (
  relayEnvironment: Environment,
  submission: SubmissionInput
) => {
  let submissionId: string
  let input = submission as UpdateSubmissionMutationInput

  if (input.id) {
    submissionId = await updateConsignSubmissionMutation(
      relayEnvironment,
      input
    )
  } else {
    submissionId = await createConsignSubmissionMutation(
      relayEnvironment,
      submission as CreateSubmissionMutationInput
    )
  }

  return submissionId
}
