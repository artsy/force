import uuid from "uuid"
import { Environment } from "relay-runtime"
import { uploadFileToS3 } from "./uploadFileToS3"
import {
  getConvectionGeminiKey,
  getGeminiCredentialsForEnvironment,
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
  s3Key?: string
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
    s3Key: undefined,
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
  acl: string = "private"
) => {
  try {
    const convectionKey = await getConvectionGeminiKey(relayEnvironment)

    if (!convectionKey) return

    // Get S3 Credentials from Gemini
    let assetCredentials = await getGeminiCredentialsForEnvironment(
      relayEnvironment,
      {
        acl: acl,
        name: convectionKey,
      }
    )

    if (photo.removed) return

    return await uploadFileToS3(photo, acl, assetCredentials, updateProgress)
  } catch (error) {
    logger.error("Consign submission operation error", error)
    return
  }
}
