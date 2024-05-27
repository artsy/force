import { Photo } from "Components/PhotoUpload/Utils/fileUtils"
import { UploadPhotos_submission$data } from "__generated__/UploadPhotos_submission.graphql"

export type SubmissionAsset = NonNullable<
  UploadPhotos_submission$data["assets"]
>[0]

export const shouldRefetchPhotoUrls = (photos: Photo[]) => {
  return photos.some(photo => !!photo.assetId && !photo.url && !photo.file)
}

export const getPhotoUrlFromAsset = (asset: SubmissionAsset) => {
  return (
    (asset?.imageUrls as any)?.thumbnail || (asset?.imageUrls as any)?.square
  )
}
