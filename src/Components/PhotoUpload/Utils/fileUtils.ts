import { createGeminiAssetWithS3Credentials } from "Components/PhotoUpload/Mutations/createGeminiAssetWithS3Credentials"
import { getConvectionGeminiKey } from "Components/PhotoUpload/Mutations/getConvectionGeminiKey"
import { getGeminiCredentialsForEnvironment } from "Components/PhotoUpload/Mutations/getGeminiCredentialsForEnvironment"
import createLogger from "Utils/logger"
import { ErrorCode, FileRejection } from "react-dropzone"
import { Environment } from "react-relay"
import uuid from "uuid"
import { uploadFileToS3 } from "./uploadFileToS3"

const logger = createLogger("PhotoUpload/fileUtils.ts")

export const AUTOMATICALLY_ADDED_PHOTO_NAME = "Automatically added"

export const KBSize = 1000
export const MBSize = Math.pow(KBSize, 2)
const NO_SIZE = ""

export function formatFileSize(photo: {
  size?: number
  name?: string
}): string {
  const { size, name } = photo

  if (!size || name === AUTOMATICALLY_ADDED_PHOTO_NAME) {
    return NO_SIZE
  }

  const sizeInMB = (size / MBSize).toFixed(2)

  if (sizeInMB === "0.00") {
    return "< 0.01 MB"
  }

  return `${sizeInMB} MB`
}

export interface Photo {
  id: string
  assetId?: string
  file?: File | ExternalFile
  name: string
  size?: number
  url?: string
  externalUrl?: string
  geminiToken?: string
  abortUploading?: () => void
  progress?: number
  removed: boolean
  loading?: boolean
  bucket?: string
  errorMessage?: string
}

interface ExternalFile {
  name: string
  externalUrl: string
  size?: number
  type?: string
}

export function normalizePhoto(
  file: File | ExternalFile,
  errorMessage?: string,
  externalUrl?: string
): Photo {
  return {
    id: uuid(),
    assetId: undefined,
    externalUrl,
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
    errorMessage =
      "File format not supported. Please upload JPG, PNG or HEIC files."
  } else if (errorCodes.includes(CustomErrorCode.TotalSizeLimit)) {
    errorMessage =
      "Whoa, you've reached the size limit! Please delete or upload smaller files."
  }

  return errorMessage
}

export const uploadSubmissionPhoto = async (
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
      sourceBucket: photo.bucket as string,
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

export const uploadPhotoToS3 = async (
  relayEnvironment: Environment,
  photo: Photo,
  updateProgress: (progress: number) => void,
  acl: string = "private"
) => {
  const convectionKey = await getConvectionGeminiKey(relayEnvironment)

  const assetCredentials = await getGeminiCredentialsForEnvironment(
    relayEnvironment,
    {
      acl,
      name: convectionKey || "",
    }
  )

  if (!assetCredentials) {
    return null
  }

  const bucket = assetCredentials.policyDocument.conditions.bucket

  const s3 = await uploadFileToS3(photo, acl, assetCredentials, updateProgress)

  if (!s3) {
    return null
  }

  return `https://${bucket}.s3.amazonaws.com/${s3}`
}
