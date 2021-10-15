import { Environment } from "relay-runtime"
import { getSubmissionFromSessionStorage } from "./getSubmissionFromSessionStorage"
import { createConsignSubmissionInput } from "./createConsignSubmissionInput"
import {
  addAssetToConsignment,
  createConsignSubmissionMutation,
  createGeminiAssetWithS3Credentials,
  getConvectionGeminiKey,
} from "../Mutations"

export const createConsignSubmission = async (
  relayEnvironment: Environment,
  id: string
) => {
  let submission = getSubmissionFromSessionStorage(id)

  if (!submission) {
    return
  }

  const input = createConsignSubmissionInput(submission)

  const submissionId = await createConsignSubmissionMutation(
    relayEnvironment,
    input
  )

  const convectionKey = await getConvectionGeminiKey(relayEnvironment)

  await Promise.all(
    submission.photos.map(async photo => {
      // Let Gemini know that this file exists and should be processed
      const geminiToken = await createGeminiAssetWithS3Credentials(
        relayEnvironment,
        {
          sourceKey: photo.s3Key,
          templateKey: convectionKey,
          sourceBucket: photo.bucket,
          metadata: {
            id: submissionId,
            _type: "Consignment",
          },
        }
      )

      return addAssetToConsignment(relayEnvironment, {
        assetType: "image",
        geminiToken,
        submissionID: submissionId,
      })
    })
  )

  return submissionId
}
