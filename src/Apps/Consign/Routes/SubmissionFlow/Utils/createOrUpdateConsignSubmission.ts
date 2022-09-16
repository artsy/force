import { Environment } from "relay-runtime"
import {
  createConsignSubmissionMutation,
  updateConsignSubmissionMutation,
} from "../Mutations"
import { CreateSubmissionMutationInput } from "__generated__/CreateConsignSubmissionMutation.graphql"
import { UpdateSubmissionMutationInput } from "__generated__/UpdateConsignSubmissionMutation.graphql"

export type SubmissionInput =
  | CreateSubmissionMutationInput
  | UpdateSubmissionMutationInput

export const createOrUpdateConsignSubmission = async (
  relayEnvironment: Environment,
  submission: SubmissionInput
) => {
  let submissionId: string
  let input = submission as UpdateSubmissionMutationInput

  if (input.externalId) {
    submissionId = await updateConsignSubmissionMutation(
      relayEnvironment,
      input
    )
  } else {
    submissionId = await createConsignSubmissionMutation(relayEnvironment, {
      ...submission,
      userAgent: `${navigator.userAgent} Artsy-Web Force`,
      source:
        (submission as CreateSubmissionMutationInput).source || "WEB_INBOUND",
    } as CreateSubmissionMutationInput)
  }

  return submissionId
}
