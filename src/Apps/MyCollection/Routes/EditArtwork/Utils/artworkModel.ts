import { Photo } from "Components/PhotoUpload/Utils/fileUtils"

export interface ArtworkModel {
  artist?: Artist
  artistName: string
  artistId: string
  category: string
  date: string
  title: string
  medium: string
  attributionClass: string | undefined
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
  artworkLocation: string
  postalCode?: string
}

export interface MyCollectionPhoto {
  height?: number | null
  isDefault?: boolean | null
  imageURL?: string | null
  internalID?: string | null
  removed?: boolean
}

export interface Artist {
  formattedNationalityAndBirthday?: string | null
  initials?: string | null
  image?: {
    cropped: {
      src: string
      srcSet: string
    } | null
  } | null
  name?: string | null
}
