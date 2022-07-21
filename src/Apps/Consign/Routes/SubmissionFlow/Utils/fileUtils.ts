import uuid from "uuid"
import { Environment } from "relay-runtime"
import { uploadFileToS3 } from "./uploadFileToS3"
import {
  getConvectionGeminiKey,
  getGeminiCredentialsForEnvironment,
  createGeminiAssetWithS3Credentials,
} from "../Mutations"
import { ErrorCode, FileRejection } from "react-dropzone"
import createLogger from "Utils/logger"

const logger = createLogger("SubmissionFlow/uploadFileToS3.ts")

export const KBSize = 1000
export const MBSize = Math.pow(KBSize, 2)

export function formatFileSize(size: number): string {
  const sizeInMB = (size / MBSize).toFixed(2)

  return `${sizeInMB} MB`
}

export interface Photo {
  id: string
  assetId?: string
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
    assetId: undefined,
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
  submissionId,
  relayEnvironment: Environment,
  photo: Photo,
  updateProgress: (progress: number) => void,
  acl: string = "private"
) => {
  try {
    const convectionKey = await getConvectionGeminiKey(relayEnvironment)

    if (!convectionKey) return

    // Get S3 Credentials from Gemini
    const assetCredentials = await getGeminiCredentialsForEnvironment(
      relayEnvironment,
      {
        acl: acl,
        name: convectionKey,
      }
    )

    if (photo.removed) return

    // upload photo to S3
    const sourceKey = await uploadFileToS3(
      photo,
      acl,
      assetCredentials,
      updateProgress
    )

    if (!sourceKey) return

    // create asset in Gemini
    return await createGeminiAssetWithS3Credentials(relayEnvironment, {
      sourceKey,
      sourceBucket: photo.bucket!,
      templateKey: convectionKey,
      metadata: {
        id: submissionId,
        _type: "Consignment",
      },
    })
  } catch (error) {
    logger.error("Error during Photo Upload", error)
    return
  }
}
