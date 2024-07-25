interface ExternalFile {
  name: string
  externalUrl: string
  size?: number
  type?: string
}

export interface DropzoneFile {
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
  sourceKey?: string
  bucket?: string
  errorMessage?: string
}

export enum CustomErrorCode {
  TotalSizeLimit = "total-size-limit",
}
