import uuid from "uuid"
import { Environment } from "relay-runtime"
import { uploadFileToS3 } from "./uploadFileToS3"
import {
  getConvectionGeminiKey,
  getGeminiCredentialsForEnvironment,
  createGeminiAssetWithS3Credentials,
  addAssetToConsignment,
} from "../Mutations"
import { ErrorCode, FileRejection } from "react-dropzone"
import createLogger from "v2/Utils/logger"

const logger = createLogger("uploadFileToS3.ts")

export const KBSize = 1000
export const MBSize = Math.pow(KBSize, 2)

export function formatFileSize(size: number): string {
  const sizeInMB = (size / MBSize).toFixed(2)

  return `${sizeInMB} MB`
}

export interface Photo {
  id: string
  file?: File
  name: string
  size: number
  url?: string
  geminiToken?: string
  abortUploading?: () => void
  progress?: number
  removed: boolean
  loading?: boolean
  bucket?: string
  errorMessage?: string
}

export function normalizePhoto(file: File, errorMessage?: string): Photo {
  return {
    id: uuid(),
    file,
    name: file.name,
    size: file.size,
    geminiToken: undefined,
    abortUploading: undefined,
    progress: undefined,
    removed: false,
    loading: false,
    errorMessage,
  }
}

export enum CustomErrorCode {
  TotalSizeLimit = "total-size-limit",
}

export const getErrorMessage = (fileRejection: FileRejection) => {
  const errorCodes = fileRejection.errors.map(e => e.code)
  let errorMessage

  if (errorCodes.includes(ErrorCode.FileInvalidType)) {
    errorMessage = "File format not supported. Please upload JPG or PNG files."
  } else if (errorCodes.includes(CustomErrorCode.TotalSizeLimit)) {
    errorMessage =
      "Whoa, you've reached the size limit! Please delete or upload smaller files."
  }

  return errorMessage
}

export const uploadPhoto = async (
  relayEnvironment: Environment,
  photo: Photo,
  updateProgress: (progress: number) => void,
  acl: string = "private",
  submissionId: string = ""
) => {
  try {
    // expect submissionId to be provided
    if (!submissionId) return

    // get convection key & abort when key not acquired
    const convectionKey = await getConvectionGeminiKey(relayEnvironment)

    if (!convectionKey) return

    // get S3 Credentials from Gemini with convection key
    let assetCredentials = await getGeminiCredentialsForEnvironment(
      relayEnvironment,
      {
        acl: acl,
        name: convectionKey,
      }
    )

    // expect to have asset credentials from gemini, otherwise abort
    if (!assetCredentials || photo.removed) return

    // upload photo to S3
    await uploadFileToS3(photo, acl, assetCredentials, updateProgress)

    // create photo asset in gemini
    await createGeminiAssetWithS3Credentials(relayEnvironment, {
      sourceKey: photo.geminiToken!,
      sourceBucket: photo.bucket!,
      templateKey: convectionKey,
      metadata: {
        id: submissionId,
        _type: "Consignment",
      },
    })

    // add gemini asset to the submission
    await addAssetToConsignment(relayEnvironment, {
      assetType: "image",
      geminiToken: photo.geminiToken!,
      submissionID: submissionId,
      sessionID: submissionId,
    })

    return photo.geminiToken
  } catch (error) {
    logger.error("Consign submission operation error", error)
    return
  }
}
