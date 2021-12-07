import { Environment } from "relay-runtime"
import { createConsignSubmissionInput } from "./createConsignSubmissionInput"
import { createConsignSubmissionMutation } from "../Mutations"
import { SubmissionModel } from "./useSubmission"
import { ActionType } from "@artsy/cohesion"
import { trackEvent } from "lib/analytics/helpers"

export const createConsignSubmission = async (
  relayEnvironment: Environment,
  submission: SubmissionModel,
  userId?: string,
  sessionId?: string
) => {
  if (
    !submission ||
    !submission.uploadPhotosForm ||
    !submission.contactInformationForm
  ) {
    return
  }

  const input = createConsignSubmissionInput(submission, sessionId)

  const submissionId = await createConsignSubmissionMutation(
    relayEnvironment,
    input
  )

  trackEvent({
    action: ActionType.consignmentSubmitted,
    submission_id: submissionId,
    user_id: userId,
    user_email: submission.contactInformationForm.email,
  })

  return submissionId
}
