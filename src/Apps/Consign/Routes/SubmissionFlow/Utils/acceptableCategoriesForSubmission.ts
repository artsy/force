import { ConsignmentSubmissionCategoryAggregation } from "__generated__/CreateConsignSubmissionMutation.graphql"
import { compact } from "lodash"
import { categoryOptions } from "Apps/MyCollection/Routes/EditArtwork/Utils/categoryOptions"

type AcceptableValuesMapKey = Exclude<
  ConsignmentSubmissionCategoryAggregation,
  "%future added value"
>

export type AcceptableCategoryValue = AcceptableValuesMapKey

// By having this ACCEPTABLE_VALUES_MAP structure, we are forced to update this list
// whenever ConsignmentSubmissionCategoryAggregation changes, because yarn tsc will fail
export const ACCEPTABLE_CATEGORY_VALUES_MAP: Record<
  AcceptableValuesMapKey,
  AcceptableCategoryValue
> = {
  ARCHITECTURE: "ARCHITECTURE",
  DESIGN_DECORATIVE_ART: "DESIGN_DECORATIVE_ART",
  DRAWING_COLLAGE_OR_OTHER_WORK_ON_PAPER:
    "DRAWING_COLLAGE_OR_OTHER_WORK_ON_PAPER",
  FASHION_DESIGN_AND_WEARABLE_ART: "FASHION_DESIGN_AND_WEARABLE_ART",
  INSTALLATION: "INSTALLATION",
  JEWELRY: "JEWELRY",
  MIXED_MEDIA: "MIXED_MEDIA",
  OTHER: "OTHER",
  PAINTING: "PAINTING",
  PERFORMANCE_ART: "PERFORMANCE_ART",
  PHOTOGRAPHY: "PHOTOGRAPHY",
  PRINT: "PRINT",
  SCULPTURE: "SCULPTURE",
  TEXTILE_ARTS: "TEXTILE_ARTS",
  VIDEO_FILM_ANIMATION: "VIDEO_FILM_ANIMATION",
}

export const formatCategoryValueForSubmission = (categoryValue: string) => {
  return categoryValue
    .split(/[^A-Za-z]/)
    .reduce((accumulator, current) => {
      if (current && current.trim()) {
        accumulator.push(current.toUpperCase())
      }
      return accumulator
    }, [] as string[])
    .join("_") as AcceptableCategoryValue
}

export const acceptableCategoriesForSubmission = () => {
  const categories: ({
    text: string
    value: AcceptableValuesMapKey | null
  } | null)[] = categoryOptions.map(medium => {
    const newVal = formatCategoryValueForSubmission(medium.value)
    if (ACCEPTABLE_CATEGORY_VALUES_MAP[newVal]) {
      return { text: medium.text, value: newVal }
    }
    return null
  })
  categories.unshift({ text: "Select", value: null })
  return compact(categories)
}
