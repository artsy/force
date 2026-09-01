interface ImageSearchPreview {
  s3Bucket: string
  s3Key: string
  url: string
}

let imageSearchPreview: ImageSearchPreview | null = null

export const createImageSearchPreviewURL = (file: File): string => {
  if (typeof URL.createObjectURL !== "function") {
    return ""
  }

  return URL.createObjectURL(file)
}

export const setImageSearchPreview = (preview: ImageSearchPreview): void => {
  if (imageSearchPreview?.url && imageSearchPreview.url !== preview.url) {
    revokeImageSearchPreviewURL(imageSearchPreview.url)
  }

  imageSearchPreview = preview
}

export const getImageSearchPreview = ({
  s3Bucket,
  s3Key,
}: Pick<ImageSearchPreview, "s3Bucket" | "s3Key">): string | null => {
  if (
    imageSearchPreview?.s3Bucket !== s3Bucket ||
    imageSearchPreview.s3Key !== s3Key
  ) {
    return null
  }

  return imageSearchPreview.url
}

export const revokeImageSearchPreviewURL = (url: string): void => {
  if (url && typeof URL.revokeObjectURL === "function") {
    URL.revokeObjectURL(url)
  }
}
