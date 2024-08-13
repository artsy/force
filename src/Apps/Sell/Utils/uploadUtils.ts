import { normalizePhoto } from "Components/PhotoUpload/Utils/fileUtils"
import createLogger from "Utils/logger"
import { PhotosRoute_submission$data } from "__generated__/PhotosRoute_submission.graphql"
import { Environment } from "react-relay"
import { uploadFileToS3 } from "Components/PhotoUpload/Utils/uploadFileToS3"
import { getConvectionGeminiKey } from "Components/PhotoUpload/Mutations/getConvectionGeminiKey"
import { getGeminiCredentialsForEnvironment } from "Components/PhotoUpload/Mutations/getGeminiCredentialsForEnvironment"
import { DropzoneFile } from "Components/FileUpload/types"

const logger = createLogger("Sell/uploadUtils.ts")

export interface Asset {
  id?: string
  size?: string
  filename?: string
  geminiToken?: string
  documentPath?: string
  s3Path?: string
  s3Bucket?: string
  imageUrls: string[]
}

export const photosFromMyCollectionArtwork = (
  myCollectionArtwork: PhotosRoute_submission$data["myCollectionArtwork"]
): DropzoneFile[] => {
  if (!myCollectionArtwork) return []

  return (
    myCollectionArtwork.images
      ?.map(image => ({
        name: "Automatically added",
        externalUrl: image?.url ?? "",
        type: "image/jpg",
      }))
      ?.map(file => normalizePhoto(file, undefined, file.externalUrl)) || []
  )
}

export const dropzoneFileFromAsset = (asset: Asset): DropzoneFile => {
  return {
    id: asset?.id ?? "",
    assetId: asset?.id ?? "",
    size: (asset?.size && parseInt(asset?.size, 10)) || 0,
    name: asset?.filename ?? "Automatically added",
    geminiToken: asset?.geminiToken ?? undefined,
    url:
      (asset?.imageUrls as any)?.thumbnail || (asset?.imageUrls as any)?.square,
    externalUrl: asset?.documentPath ?? "",
    sourceKey: asset?.s3Path ?? "",
    bucket: asset?.s3Bucket ?? "",
    removed: false,
    loading: false,
  }
}

export const uploadDocument = async (
  relayEnvironment: Environment,
  document: DropzoneFile,
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

    // upload photo to S3
    const sourceKey = await uploadFileToS3(
      document,
      acl,
      assetCredentials,
      updateProgress
    )

    return sourceKey
  } catch (error) {
    logger.error("Error during File upload", error)
  }
}
