import type { ArtworkFilters } from "Components/ArtworkFilter/ArtworkFilterTypes"
import {
  FILTER_VOCABULARY,
  MAX_PHRASE_WORDS,
  STOPWORDS,
  type VocabularyEntry,
  normalizePhrase,
} from "./filterQueryVocabulary"

export type SuggestedFilters = Pick<
  ArtworkFilters,
  "medium" | "priceRange" | "attributionClass" | "keyword"
>

export interface ParsedFilterQuery {
  filters: SuggestedFilters
  /** Everything the parser didn't consume; goes into the keyword filter */
  keyword: string
  /** Human labels in display order: medium, rarity, price */
  labels: string[]
}

interface PricePattern {
  regex: RegExp
  toRange: (match: RegExpMatchArray) => string
}

const AMOUNT = String.raw`\$?\d[\d,.]*\s?[km]?`

/**
 * Ordered: the two-sided range must win before the one-sided operators, so
 * "between 1k and 5k" isn't read as "from 1k".
 *
 * Every pattern requires an operator word or two amounts joined by a
 * separator. A bare number is therefore never a price — "warhol 1954" stays
 * free text.
 */
const PRICE_PATTERNS: PricePattern[] = [
  {
    regex: new RegExp(
      String.raw`\b(?:between\s+|from\s+)?(${AMOUNT})\s*(?:-|–|—|to|and)\s*(${AMOUNT})\b`,
      "i",
    ),
    toRange: match => {
      return `${normalizeAmount(match[1])}-${normalizeAmount(match[2])}`
    },
  },
  {
    regex: new RegExp(
      String.raw`\b(?:under|below|less\s+than|cheaper\s+than|up\s+to|max|maximum)\s+(${AMOUNT})`,
      "i",
    ),
    toRange: match => {
      return `*-${normalizeAmount(match[1])}`
    },
  },
  {
    regex: new RegExp(
      String.raw`\b(?:over|above|more\s+than|at\s+least|starting\s+at|from|min|minimum)\s+(${AMOUNT})`,
      "i",
    ),
    toRange: match => {
      return `${normalizeAmount(match[1])}-*`
    },
  },
]

const normalizeAmount = (raw: string): number => {
  const cleaned = raw.replace(/[$,\s]/g, "").toLowerCase()
  const multiplier = getMultiplier(cleaned)
  const amount = Number.parseFloat(cleaned.replace(/[km]$/, ""))

  return Math.round(amount * multiplier)
}

const getMultiplier = (cleaned: string): number => {
  if (cleaned.endsWith("k")) {
    return 1_000
  }

  if (cleaned.endsWith("m")) {
    return 1_000_000
  }

  return 1
}

/** Drop punctuation the grammar doesn't use, but keep case for the keyword */
const clean = (query: string): string => {
  return query
    .replace(/[^\w\s$,.–—-]/g, " ")
    .replace(/\s+/g, " ")
    .trim()
}

interface PriceResult {
  priceRange?: string
  rest: string
}

const extractPrice = (query: string): PriceResult => {
  const hit = PRICE_PATTERNS.map(pattern => {
    return { pattern, match: query.match(pattern.regex) }
  }).find(({ match }) => {
    return !!match
  })

  const match = hit?.match

  if (!match || match.index === undefined) {
    return { rest: query }
  }

  const rest = `${query.slice(0, match.index)} ${query.slice(
    match.index + match[0].length,
  )}`

  return { priceRange: hit.pattern.toRange(match), rest }
}

interface PhraseAccumulator {
  matches: VocabularyEntry[]
  leftover: string[]
  skipUntil: number
}

const extractVocabulary = (tokens: string[]): PhraseAccumulator => {
  return tokens.reduce<PhraseAccumulator>(
    (acc, _token, index) => {
      if (index < acc.skipUntil) return acc

      // Longest match first, so "work on paper" beats "work"
      const maxSize = Math.min(MAX_PHRASE_WORDS, tokens.length - index)
      const sizes = Array.from({ length: maxSize }, (_, offset) => {
        return maxSize - offset
      })

      const hit = sizes
        .map(size => {
          const phrase = normalizePhrase(
            tokens.slice(index, index + size).join(" "),
          )
          return { size, entry: FILTER_VOCABULARY.get(phrase) }
        })
        .find(({ entry }) => {
          return !!entry
        })

      if (!hit?.entry) {
        return { ...acc, leftover: [...acc.leftover, tokens[index]] }
      }

      return {
        matches: [...acc.matches, hit.entry],
        leftover: acc.leftover,
        skipUntil: index + hit.size,
      }
    },
    { matches: [], leftover: [], skipUntil: 0 },
  )
}

const formatPriceLabel = (range: string): string => {
  const [min, max] = range.split("-")
  const format = (amount: string) => {
    return CURRENCY_FORMATTER.format(Number(amount))
  }

  if (min === "*") {
    return `Under ${format(max)}`
  }

  if (max === "*") {
    return `${format(min)} and up`
  }

  return `${format(min)}–${format(max)}`
}

const CURRENCY_FORMATTER = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
})

/**
 * Parses artwork-filter intent out of a raw search query, entirely on the
 * client. Returns null when there's nothing worth suggesting.
 */
export const parseFilterQuery = (query: string): ParsedFilterQuery | null => {
  if (!query.trim()) return null

  const { priceRange, rest } = extractPrice(clean(query))

  const tokens = rest.split(/\s+/).filter(Boolean)
  const { matches, leftover } = extractVocabulary(tokens)

  const medium = matches.find(entry => entry.type === "medium")

  const attributionEntries = matches.filter(entry => {
    return entry.type === "attributionClass"
  })
  const attributionClass = [
    ...new Set(attributionEntries.map(entry => entry.value)),
  ]

  const keyword = leftover
    // A price like "$1000-5000" leaves its "$" behind, since the amount itself
    // starts at a word boundary
    .filter(token => {
      return /\w/.test(token)
    })
    .filter(token => {
      return !STOPWORDS.has(token.toLowerCase())
    })
    .join(" ")
    .trim()

  const filterCount =
    (medium ? 1 : 0) + (priceRange ? 1 : 0) + attributionClass.length

  if (!shouldSuggestFilters({ filterCount, keyword })) return null

  const labels = [
    medium?.label,
    ...attributionEntries.map(entry => entry.label),
    priceRange ? formatPriceLabel(priceRange) : undefined,
  ].filter(Boolean) as string[]

  return {
    filters: {
      medium: medium?.value,
      priceRange,
      attributionClass: attributionClass.length ? attributionClass : undefined,
      keyword: keyword || undefined,
    },
    keyword,
    labels,
  }
}

/**
 * A single recognized filter with no keyword ("prints") is better served by the
 * gene/collection entity the backend already returns, so hold the row back
 * until there's either free text to carry over or a second filter.
 */
const shouldSuggestFilters = ({
  filterCount,
  keyword,
}: {
  filterCount: number
  keyword: string
}): boolean => {
  if (filterCount === 0) return false

  return keyword.length > 0 || filterCount >= 2
}
