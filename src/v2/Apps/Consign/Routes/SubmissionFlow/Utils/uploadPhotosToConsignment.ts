import { Environment } from "relay-runtime"
import {
  addAssetToConsignment,
  createGeminiAssetWithS3Credentials,
  getConvectionGeminiKey,
} from "../Mutations"
import createLogger from "v2/Utils/logger"
import { SubmissionModel } from "./useSubmission"

const logger = createLogger("createConsignSubmission.ts")

export const uploadPhotosToConsignment = async (
  relayEnvironment: Environment,
  submission: SubmissionModel,
  submissionId?: string,
  sessionId?: string
): Promise<boolean> => {
  if (!submission || !submission.uploadPhotosForm) {
    return false
  }

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
            submissionID: submissionId || "",
            sessionID: sessionId || "",
          })
        } catch (error) {
          logger.error(
            "Consign submission: add photos to consignment error",
            error
          )
          return false
        }
      })
  )

  return true
}
