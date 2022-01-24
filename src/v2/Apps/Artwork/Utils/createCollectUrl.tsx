import { stringify } from "qs"

export const createCollectUrl = ({
  dimension,
  category,
  artistId,
}: {
  dimension: "SMALL" | "MEDIUM" | "LARGE" | null
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

  const path = ["/collect", filterCategories[category]]
    .filter(Boolean)
    .join("/")

  return `${path}?${query}`
}

export type FilterCategory = keyof typeof filterCategories

// these come from MediumFilter.tsx
const filterCategories = {
  Architecture: "architecture",
  "Books and Portfolios": "books-and-portfolios",
  "Design/Decorative Art": "design",
  "Drawing, Collage or other Work on Paper": "work-on-paper",
  "Fashion Design and Wearable Art": "fashion-design-and-wearable-art",
  Installation: "installation",
  Jewelry: "jewelry",
  "Mixed Media": "mixed-media",
  NFT: "nft",
  Other: "",
  Painting: "painting",
  "Performance Art": "performance-art",
  Photography: "photography",
  Posters: "poster",
  Print: "prints",
  Sculpture: "sculpture",
  Sound: "",
  "Textile Arts": "textiles",
  "Video/Film/Animation": "film-slash-video",
  "Work on Paper": "work-on-paper",
}
