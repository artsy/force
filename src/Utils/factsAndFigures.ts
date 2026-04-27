import { get } from "lodash"

// See https://docs.google.com/document/d/187m0Nt3LWCd0q3lz5RaTYM2B_epvpVaUQzl1jkMX2LE

export const FACTS_AND_FIGURES = {
  iosApp: {
    ratingValue: 4.8,
    reviewCount: 5500,
  },
  androidApp: {
    ratingValue: 4.5,
    reviewCount: 1230,
  },
  auctionRecordsCount: 300000,
  institutionsCount: 800,
  galleriesCount: 3000,
  forSaleArtworksCount: 700000,
  artworksCount: 1000000,
  artistsCount: 100000,
  fairsCount: 80,
  auctionHouseCount: 25,
  categoriesCounts: {
    architecture: 55000,
    "books-and-portfolios": 7500,
    design: 60000,
    "digital-art": 2000,
    drawing: 70000,
    "ephemera-or-merchandise": 5000, // FIXME: Unable to access count
    "fashion-design-and-wearable-art": 2500,
    "film-slash-video": 8000,
    installation: 30000,
    jewelry: 3500,
    "mixed-media": 250000,
    nft: 100,
    painting: 850000,
    "performance-art": 7500,
    photography: 300000,
    poster: 10000,
    prints: 350000,
    reproduction: 3000, // FIXME: Unable to access count
    sculpture: 225000,
    textiles: 20000,
    "work-on-paper": 210000,
  },
} as const

export type FactsAndFiguresFormat = "comma" | "compact"

type FactsAndFigures = typeof FACTS_AND_FIGURES

type JoinPath<
  Parent extends string,
  Child extends string,
> = `${Parent}.${Child}`

type NumericPath<T> = {
  [Key in Extract<keyof T, string>]: T[Key] extends number
    ? Key
    : T[Key] extends object
      ? JoinPath<Key, NumericPath<T[Key]>>
      : never
}[Extract<keyof T, string>]

export type FactsAndFiguresPath = NumericPath<FactsAndFigures>

const FORMATTERS: Record<FactsAndFiguresFormat, Intl.NumberFormat> = {
  comma: new Intl.NumberFormat("en"),
  compact: new Intl.NumberFormat("en", {
    notation: "compact",
    maximumFractionDigits: 1,
  }),
}

interface GetFactsAndFiguresOptions {
  format?: FactsAndFiguresFormat
}

export const getFactsAndFigures = (
  path: FactsAndFiguresPath,
  { format = "comma" }: GetFactsAndFiguresOptions = {},
) => {
  return FORMATTERS[format].format(get(FACTS_AND_FIGURES, path))
}
