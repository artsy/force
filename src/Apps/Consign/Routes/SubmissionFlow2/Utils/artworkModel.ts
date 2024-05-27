import {
  ConsignmentAttributionClass,
  ConsignmentSubmissionCategoryAggregation,
  ConsignmentSubmissionSource,
  ConsignmentSubmissionStateAggregation,
} from "__generated__/CreateConsignSubmissionMutation.graphql"
import { Location } from "Components/LocationAutocompleteInput"

export interface ArtworkModel {
  submissionId: string | null
  artist: string | null
  artistId: string
  attributionClass: ConsignmentAttributionClass | null
  category: Exclude<
    ConsignmentSubmissionCategoryAggregation,
    "%future added value"
  > | null
  depth: string
  dimensionsMetric: string
  editionNumber: string
  editionSizeFormatted: string
  height: string
  location: Location
  medium: string
  myCollectionArtworkID: string | null
  provenance: string
  signature?: boolean | null | undefined
  source: ConsignmentSubmissionSource | null
  state?: ConsignmentSubmissionStateAggregation
  utmMedium?: string
  utmSource?: string
  utmTerm?: string
  width: string
  title: string
  year: string

  // Photos
  photos: Photo[]
  initialPhotos?: Photo[]

  // Contact information
  userName: string
  userEmail: string
  userPhone: string
}

export interface Photo {
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
