import { Environment } from "relay-runtime"
import { createConsignSubmissionInput } from "./createConsignSubmissionInput"
import {
  addAssetToConsignment,
  createConsignSubmissionMutation,
  createGeminiAssetWithS3Credentials,
  getConvectionGeminiKey,
} from "../Mutations"
import createLogger from "v2/Utils/logger"
import { SubmissionModel } from "./useSubmission"
import { ActionType } from "@artsy/cohesion"
import { trackEvent } from "lib/analytics/helpers"

const logger = createLogger("createConsignSubmission.ts")

export const createConsignSubmission = async (
  relayEnvironment: Environment,
  submission: SubmissionModel,
  userId?: string
) => {
  if (
    !submission ||
    !submission.uploadPhotosForm ||
    !submission.contactInformationForm
  ) {
    return
  }

  const input = createConsignSubmissionInput(submission)

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

  const convectionKey = await getConvectionGeminiKey(relayEnvironment)

  await Promise.all(
    submission.uploadPhotosForm.photos
      .filter(photo => photo.s3Key && photo.bucket)
      .map(async photo => {
        try {
          // Let Gemini know that this file exists and should be processed
          const geminiToken = await createGeminiAssetWithS3Credentials(
            relayEnvironment,
            {
              sourceKey: photo.s3Key!,
              sourceBucket: photo.bucket!,
              templateKey: convectionKey,
              metadata: {
                id: submissionId,
                _type: "Consignment",
              },
            }
          )

          await addAssetToConsignment(relayEnvironment, {
            assetType: "image",
            geminiToken,
            submissionID: submissionId,
          })
        } catch (error) {
          logger.error("Consign submission: add asset error", error)
        }
      })
  )

  return submissionId
}
