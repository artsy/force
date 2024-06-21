import { Photo } from "Components/PhotoUpload/Utils/fileUtils"

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
