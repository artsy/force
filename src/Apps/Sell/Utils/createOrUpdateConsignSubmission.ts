import {
  createConsignSubmissionMutation,
  updateConsignSubmissionMutation,
} from "Apps/Consign/Routes/SubmissionFlow/Mutations"
import type { CreateSubmissionMutationInput } from "__generated__/CreateConsignSubmissionMutation.graphql"
import type { UpdateSubmissionMutationInput } from "__generated__/UpdateConsignSubmissionMutation.graphql"
import type { Environment } from "react-relay"

export type SubmissionInput =
  | CreateSubmissionMutationInput
  | UpdateSubmissionMutationInput

export const createOrUpdateConsignSubmission = async (
  relayEnvironment: Environment,
  submission: SubmissionInput,
) => {
  let submissionId: string
  const input = submission as UpdateSubmissionMutationInput

  if (input.externalId) {
    const { myCollectionArtworkID, source, ...updateInput } =
      input as CreateSubmissionMutationInput
    submissionId = await updateConsignSubmissionMutation(
      relayEnvironment,
      updateInput,
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
