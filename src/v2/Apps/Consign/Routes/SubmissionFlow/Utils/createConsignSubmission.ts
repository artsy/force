import { Environment } from "relay-runtime"
import { createConsignSubmissionMutation } from "../Mutations"
import { CreateSubmissionMutationInput } from "v2/__generated__/CreateConsignSubmissionMutation.graphql"

// const logger = createLogger("createConsignSubmission.ts")

//,UpdateSubmissionMutationInput
export interface SubmissionInput extends CreateSubmissionMutationInput {
  id?: string
}

export const createOrUpdateConsignSubmission = async (
  relayEnvironment: Environment,
  submission: SubmissionInput
) => {
  let submissionId: string

  if (submission.id) {
    // TODO: updateConsignSubmissionMutation

    submissionId = submission.id
  } else {
    submissionId = await createConsignSubmissionMutation(
      relayEnvironment,
      submission
    )
  }

  return submissionId
}
