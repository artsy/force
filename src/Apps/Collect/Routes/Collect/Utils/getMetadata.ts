import type { FILTER_CATEGORIES } from "Apps/Artwork/Utils/createCollectUrl"
import type { COLOR_OPTIONS } from "Components/ArtworkFilter/ArtworkFilters/ColorFilter"
import { FACTS_AND_FIGURES } from "Utils/factsAndFigures"

export type Medium = (typeof FILTER_CATEGORIES)[keyof typeof FILTER_CATEGORIES]
export type Color = (typeof COLOR_OPTIONS)[number]["value"]

const COLOR_TITLES: Record<Color, string> = {
  "black-and-white": "Black and White Art",
  blue: "Blue Art",
  brown: "Brown Art",
  gray: "Gray Art",
  green: "Green Art",
  orange: "Orange Art",
  pink: "Pink Art",
  purple: "Purple Art",
  red: "Red Art",
  yellow: "Yellow Art",
}

const MEDIUM_METADATA: Record<Medium, { title: string; description: string }> =
  {
    architecture: {
      title: "Architecture",
      description: `${FACTS_AND_FIGURES.categoriesCounts.architecture}+ architectural works`,
    },
    "books-and-portfolios": {
      title: "Books and Portfolios",
      description: `${FACTS_AND_FIGURES.categoriesCounts["books-and-portfolios"]}+ books and portfolios`,
    },
    design: {
      title: "Design Works",
      description: `${FACTS_AND_FIGURES.categoriesCounts.design}+ design works`,
    },
    "digital-art": {
      title: "Digital Art",
      description: `${FACTS_AND_FIGURES.categoriesCounts["digital-art"]}+ digital art works`,
    },
    drawing: {
      title: "Drawings",
      description: `${FACTS_AND_FIGURES.categoriesCounts.drawing}+ drawings`,
    },
    "ephemera-or-merchandise": {
      title: "Ephemera or Merchandise",
      description: `${FACTS_AND_FIGURES.categoriesCounts["ephemera-or-merchandise"]}+ ephemera or merchandise`,
    },
    "fashion-design-and-wearable-art": {
      title: "Fashion Design and Wearable Art",
      description: `${FACTS_AND_FIGURES.categoriesCounts["fashion-design-and-wearable-art"]}+ pieces of fashion design and wearable art`,
    },
    "film-slash-video": {
      title: "Films & Videos",
      description: `${FACTS_AND_FIGURES.categoriesCounts["film-slash-video"]}+ Films & Videos works`,
    },
    installation: {
      title: "Installations",
      description: `${FACTS_AND_FIGURES.categoriesCounts.installation}+ installations`,
    },
    jewelry: {
      title: "Jewelry",
      description: `${FACTS_AND_FIGURES.categoriesCounts.jewelry}+ pieces of jewelry`,
    },
    "mixed-media": {
      title: "Mixed Media",
      description: `${FACTS_AND_FIGURES.categoriesCounts["mixed-media"]}+ mixed media works`,
    },
    nft: {
      title: "NFTs",
      description: `${FACTS_AND_FIGURES.categoriesCounts.nft}+ NFTs`,
    },
    painting: {
      title: "Paintings",
      description: `${FACTS_AND_FIGURES.categoriesCounts.painting}+ paintings`,
    },
    "performance-art": {
      title: "Performance Art Works",
      description: `${FACTS_AND_FIGURES.categoriesCounts["performance-art"]}+ performance art works`,
    },
    photography: {
      title: "Photography",
      description: `${FACTS_AND_FIGURES.categoriesCounts.photography}+ photographs`,
    },
    poster: {
      title: "Posters",
      description: `${FACTS_AND_FIGURES.categoriesCounts.poster}+ posters`,
    },
    prints: {
      title: "Prints",
      description: `${FACTS_AND_FIGURES.categoriesCounts.prints}+ prints`,
    },
    reproduction: {
      title: "Reproduction",
      description: `${FACTS_AND_FIGURES.categoriesCounts.reproduction}+ reproductions`,
    },
    sculpture: {
      title: "Sculptures",
      description: `${FACTS_AND_FIGURES.categoriesCounts.sculpture}+ sculptures`,
    },
    textiles: {
      title: "Textiles",
      description: `${FACTS_AND_FIGURES.categoriesCounts.textiles}+ textiles`,
    },
    "work-on-paper": {
      title: "Works on Paper",
      description: `${FACTS_AND_FIGURES.categoriesCounts["work-on-paper"]}+ works on paper`,
    },
  }

export const getMetadata = ({
  medium,
  color,
}: {
  medium?: Medium
  color?: Color
}) => {
  if (medium && medium in MEDIUM_METADATA) {
    const { title, description } = MEDIUM_METADATA[medium]

    return {
      title: `${title} - For Sale on Artsy`,
      breadcrumbTitle: title,
      description: `Buy, bid, and inquire on over ${description} on Artsy, the world’s largest online marketplace for art and design.`,
    }
  }

  if (color && color in COLOR_TITLES) {
    const title = COLOR_TITLES[color]

    if (title) {
      return {
        title: `${title} - For Sale on Artsy`,
        breadcrumbTitle: title,
        description: `Discover and buy ${title.toLowerCase()} by the world’s leading artists on Artsy.`,
      }
    }
  }

  // Fallback if not medium or color, or values are invalid
  return {
    title: "Collect | Artsy",
    breadcrumbTitle: "Collect",
    description:
      "Find artworks by subject matter, style/technique, movement, price, and gallery/institution.",
  }
}
