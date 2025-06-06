import type { AnalyticsPricingContextDimensionEnum } from "__generated__/PricingContext_artwork.graphql"
import { stringify } from "qs"

export const createCollectUrl = ({
  dimension,
  category,
  artistId,
}: {
  dimension: AnalyticsPricingContextDimensionEnum
  category: FilterCategory
  artistId: string
}) => {
  let dimensionRange

  // This calculation is based on size_score. See definitions of small/medium/large
  // here: https://github.com/artsy/vortex/blob/f3f605578832773225e08af8b5c0d69424e1d653/dbt/models/sales/price_records.sql
  if (dimension === "SMALL") {
    dimensionRange = "*-15.7"
  } else if (dimension === "MEDIUM") {
    dimensionRange = "15.7-27.6"
  } else if (dimension === "LARGE") {
    dimensionRange = "27.6-*"
  } else {
    dimensionRange = "*-*"
  }

  const query = stringify({
    page: 1,
    sort: "-decayed_merch",
    acquireable: "true",
    offerable: "true",
    inquireable_only: "true",
    dimension_range: dimensionRange,
    artist_id: artistId,
  })

  const path = ["/collect", FILTER_CATEGORIES[category]]
    .filter(Boolean)
    .join("/")

  return `${path}?${query}`
}

export type FilterCategory = keyof typeof FILTER_CATEGORIES

// these come from MediumFilter.tsx
export const FILTER_CATEGORIES = {
  Architecture: "architecture",
  "Books and Portfolios": "books-and-portfolios",
  "Design/Decorative Art": "design",
  "Digital Art": "digital-art",
  "Drawing, Collage or other Work on Paper": "work-on-paper",
  Drawing: "drawing",
  "Ephemera or Merchandise": "ephemera-or-merchandise",
  "Fashion Design and Wearable Art": "fashion-design-and-wearable-art",
  Installation: "installation",
  Jewelry: "jewelry",
  "Mixed Media": "mixed-media",
  NFT: "nft",
  Painting: "painting",
  "Performance Art": "performance-art",
  Photography: "photography",
  Posters: "poster",
  Print: "prints",
  Reproduction: "reproduction",
  Sculpture: "sculpture",
  "Textile Arts": "textiles",
  "Video/Film/Animation": "film-slash-video",
  "Work on Paper": "work-on-paper",
} as const
