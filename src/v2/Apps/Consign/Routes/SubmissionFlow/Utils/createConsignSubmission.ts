import { Environment } from "relay-runtime"
import { createConsignSubmissionInput } from "./createConsignSubmissionInput"
import {
  // addAssetToConsignment,
  createConsignSubmissionMutation,
  // createGeminiAssetWithS3Credentials,
  // getConvectionGeminiKey,
} from "../Mutations"
// import createLogger from "v2/Utils/logger"
import { SubmissionModel } from "./useSubmission"
// import { ActionType } from "@artsy/cohesion"
// import { trackEvent } from "lib/analytics/helpers"
// import { useState } from "react"

// const logger = createLogger("createConsignSubmission.ts")

export const createOrUpdateConsignSubmission = async (
  relayEnvironment: Environment,
  submission: SubmissionModel,
  user?: User,
  sessionId?: string
) => {
  let submissionId: string

  if (submission.id) {
    // TODO: updateConsignSubmissionMutation

    submissionId = submission.id
  } else {
    const input = createConsignSubmissionInput(submission, sessionId)
    submissionId = await createConsignSubmissionMutation(
      relayEnvironment,
      input
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
