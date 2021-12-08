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
  // const convectionKey = await getConvectionGeminiKey(relayEnvironment)

  // await Promise.all(
  //   submission.uploadPhotosForm.photos
  //     .filter(photo => photo.s3Key && photo.bucket)
  //     .map(async photo => {
  //       try {
  //         // Let Gemini know that this file exists and should be processed
  //         const geminiToken = await createGeminiAssetWithS3Credentials(
  //           relayEnvironment,
  //           {
  //             sourceKey: photo.s3Key!,
  //             sourceBucket: photo.bucket!,
  //             templateKey: convectionKey,
  //             metadata: {
  //               id: submissionId,
  //               _type: "Consignment",
  //             },
  //           }
  //         )

  //         await addAssetToConsignment(relayEnvironment, {
  //           assetType: "image",
  //           geminiToken,
  //           submissionID: submissionId,
  //           sessionID: sessionId,
  //         })
  //       } catch (error) {
  //         logger.error("Consign submission: add asset error", error)
  //       }
  //     })
  // )
}
