import { Photo } from "Components/PhotoUpload/Utils/fileUtils"

export interface Location {
  city?: string | null
  state?: string | null
  country?: string | null
  countryCode?: string | null
}

export interface ArtworkModel {
  artist?: Artist | null | undefined
  artistName: string
  artistId: string
  category: string
  date: string
  title: string
  medium: string
  attributionClass: string | undefined
  collectorLocation?: Location | null
  editionNumber?: string
  editionSize?: string
  height: string
  width: string
  depth: string
  photos: MyCollectionPhoto[]
  newPhotos: Photo[]
  metric: string
  pricePaidDollars: string
  pricePaidCurrency: string
  provenance: string
  postalCode?: string
  confidentialNotes: string
}

export interface MyCollectionPhoto {
  height?: number | null
  isDefault?: boolean | null
  imageURL?: string | null
  internalID?: string | null
  removed?: boolean
}

export type Artist =
  | {
      formattedNationalityAndBirthday?: string | null
      initials?: string | null
      targetSupply: {
        isP1: boolean | null
      } | null
      image?: {
        cropped: {
          src: string
          srcSet: string
        } | null
      } | null
      name?: string | null
    }
  | null
  | undefined
