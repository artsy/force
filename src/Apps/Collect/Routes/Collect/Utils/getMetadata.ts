import type { FILTER_CATEGORIES } from "Apps/Artwork/Utils/createCollectUrl"
import type { COLOR_OPTIONS } from "Components/ArtworkFilter/ArtworkFilters/ColorFilter"
import { getFactsAndFigures } from "Utils/factsAndFigures"

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
      description: `${getFactsAndFigures("categoriesCounts.architecture")}+ architectural works`,
    },
    "books-and-portfolios": {
      title: "Books and Portfolios",
      description: `${getFactsAndFigures("categoriesCounts.books-and-portfolios")}+ books and portfolios`,
    },
    design: {
      title: "Design Works",
      description: `${getFactsAndFigures("categoriesCounts.design")}+ design works`,
    },
    "digital-art": {
      title: "Digital Art",
      description: `${getFactsAndFigures("categoriesCounts.digital-art")}+ digital art works`,
    },
    drawing: {
      title: "Drawings",
      description: `${getFactsAndFigures("categoriesCounts.drawing")}+ drawings`,
    },
    "ephemera-or-merchandise": {
      title: "Ephemera or Merchandise",
      description: `${getFactsAndFigures("categoriesCounts.ephemera-or-merchandise")}+ ephemera or merchandise`,
    },
    "fashion-design-and-wearable-art": {
      title: "Fashion Design and Wearable Art",
      description: `${getFactsAndFigures("categoriesCounts.fashion-design-and-wearable-art")}+ pieces of fashion design and wearable art`,
    },
    "film-slash-video": {
      title: "Films & Videos",
      description: `${getFactsAndFigures("categoriesCounts.film-slash-video")}+ Films & Videos works`,
    },
    installation: {
      title: "Installations",
      description: `${getFactsAndFigures("categoriesCounts.installation")}+ installations`,
    },
    jewelry: {
      title: "Jewelry",
      description: `${getFactsAndFigures("categoriesCounts.jewelry")}+ pieces of jewelry`,
    },
    "mixed-media": {
      title: "Mixed Media",
      description: `${getFactsAndFigures("categoriesCounts.mixed-media")}+ mixed media works`,
    },
    nft: {
      title: "NFTs",
      description: `${getFactsAndFigures("categoriesCounts.nft")}+ NFTs`,
    },
    painting: {
      title: "Paintings",
      description: `${getFactsAndFigures("categoriesCounts.painting")}+ paintings`,
    },
    "performance-art": {
      title: "Performance Art Works",
      description: `${getFactsAndFigures("categoriesCounts.performance-art")}+ performance art works`,
    },
    photography: {
      title: "Photography",
      description: `${getFactsAndFigures("categoriesCounts.photography")}+ photographs`,
    },
    poster: {
      title: "Posters",
      description: `${getFactsAndFigures("categoriesCounts.poster")}+ posters`,
    },
    prints: {
      title: "Prints",
      description: `${getFactsAndFigures("categoriesCounts.prints")}+ prints`,
    },
    reproduction: {
      title: "Reproduction",
      description: `${getFactsAndFigures("categoriesCounts.reproduction")}+ reproductions`,
    },
    sculpture: {
      title: "Sculptures",
      description: `${getFactsAndFigures("categoriesCounts.sculpture")}+ sculptures`,
    },
    textiles: {
      title: "Textiles",
      description: `${getFactsAndFigures("categoriesCounts.textiles")}+ textiles`,
    },
    "work-on-paper": {
      title: "Works on Paper",
      description: `${getFactsAndFigures("categoriesCounts.work-on-paper")}+ works on paper`,
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
