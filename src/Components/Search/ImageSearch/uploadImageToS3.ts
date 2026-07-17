import { getConvectionGeminiKey } from "Components/PhotoUpload/Mutations/getConvectionGeminiKey"
import { getGeminiCredentialsForEnvironment } from "Components/PhotoUpload/Mutations/getGeminiCredentialsForEnvironment"
import { normalizePhoto } from "Components/PhotoUpload/Utils/fileUtils"
import { uploadFileToS3 } from "Components/PhotoUpload/Utils/uploadFileToS3"
import type { Environment } from "react-relay"

export interface S3ImageAsset {
  s3Key: string
  s3Bucket: string
}

/**
 * Uploads an image directly to S3 via Artsy's Gemini presigned flow and returns
 * the resulting `s3Key`/`s3Bucket`, which identify the asset for image search.
 * Returns null if credentials or the upload fail.
 */
export const uploadImageToS3 = async (
  relayEnvironment: Environment,
  file: File,
): Promise<S3ImageAsset | null> => {
  const photo = normalizePhoto(file)

  const acl = "private"
  const convectionKey = await getConvectionGeminiKey(relayEnvironment)

  const credentials = await getGeminiCredentialsForEnvironment(
    relayEnvironment,
    { acl, name: convectionKey || "" },
  )

  if (!credentials) {
    return null
  }

  const s3Bucket = credentials.policyDocument.conditions.bucket

  const s3Key = await uploadFileToS3(photo, acl, credentials, () => {})

  if (!s3Key) {
    return null
  }

  return { s3Key, s3Bucket }
}
