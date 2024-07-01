import { Photo, normalizePhoto } from "Components/PhotoUpload/Utils/fileUtils"
import { PhotosRoute_submission$data } from "__generated__/PhotosRoute_submission.graphql"

export interface Asset {
  id?: string
  size?: string
  filename?: string
  geminiToken?: string
  imageUrls: string[]
}

export const photoFromAsset = (asset: Asset): Photo => {
  return {
    id: asset?.id ?? "",
    assetId: asset?.id ?? "",
    size: (asset?.size && parseInt(asset?.size, 10)) || 0,
    name: asset?.filename ?? "",
    geminiToken: asset?.geminiToken ?? undefined,
    url:
      (asset?.imageUrls as any)?.thumbnail || (asset?.imageUrls as any)?.square,
    removed: false,
    loading: false,
  }
}

export const photosFromMyCollectionArtwork = (
  myCollectionArtwork: PhotosRoute_submission$data["myCollectionArtwork"]
): Photo[] => {
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
