import uuid from "uuid"
import { Environment } from "relay-runtime"
import { uploadFileToS3 } from "./uploadFileToS3"
import {
  getConvectionGeminiKey,
  getGeminiCredentialsForEnvironment,
} from "../Mutations"

export function formatFileSize(size: number): string {
  const sizeInMB = (size / (1000 * 1000)).toFixed(2)

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
}

export function normalizePhoto(file: File): Photo {
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
  }
}

export const uploadPhoto = async (
  relayEnvironment: Environment,
  photo: Photo,
  updateProgress: (progress: number) => void,
  acl: string = "private"
) => {
  const convectionKey = await getConvectionGeminiKey(relayEnvironment)

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
}
