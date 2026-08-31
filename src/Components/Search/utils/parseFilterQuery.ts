import type { ArtworkFilters } from "Components/ArtworkFilter/ArtworkFilterTypes"
import {
  COLLISION_PHRASES,
  FILTER_VOCABULARY,
  MAX_PHRASE_WORDS,
  NEGATORS,
  STOPWORDS,
  type VocabularyEntry,
  normalizePhrase,
} from "./filterQueryVocabulary"

/**
 * `medium`, not `additionalGeneIDs`: urlBuilder turns it into the
 * `/collect/:medium` path segment. Hence one medium per query.
 */
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
  /**
   * Guards against numbers that aren't money. Defaults to true when a pattern
   * can't be misread.
   */
  isPlausible?: (match: RegExpMatchArray) => boolean
}

/** A "$" or a k/m suffix survives `clean` and marks an amount as money */
const MONEY_MARKER = /[$]|[km]\s*$/i

const hasMoneyMarker = (raw: string): boolean => {
  return MONEY_MARKER.test(raw.trim())
}

/** Artist life dates and work dates: "jack dowling (american, 1931-2021)" */
const YEAR_RANGE = { min: 1000, max: 2100 }

const isYearLike = (amount: number): boolean => {
  return amount >= YEAR_RANGE.min && amount <= YEAR_RANGE.max
}

/**
 * Below this a bare range is edition or lot numbering: "edition 5-10", "1-54"
 * (a fair). Bare ranges only — "under 50" still parses.
 */
const MIN_PLAUSIBLE_BARE_PRICE = 100

/** Currencies the priceRange filter can't express — it is USD-only */
const NON_USD =
  /[£€¥₹₩]|\b(eur|gbp|chf|hkd|jpy|cad|aud|krw|rmb|cny|inr|lakh|crore)\b/i

/** "from 1990" is a date far more often than a price floor */
const DATE_AMBIGUOUS_OPERATOR = /^(from|starting\s+at)/i

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
      String.raw`\b(between\s+|from\s+)?(${AMOUNT})\s*(?:-|–|—|to|and)\s*(${AMOUNT})\b`,
      "i",
    ),
    toRange: match => {
      return `${normalizeAmount(match[2])}-${normalizeAmount(match[3])}`
    },
    isPlausible: match => {
      // An explicit operator word is intent enough: "between 1k and 5k"
      if (match[1]) return true
      // So is a money marker on either side: "$1000-5000", "1k-5k"
      if (hasMoneyMarker(match[2]) || hasMoneyMarker(match[3])) return true

      const min = normalizeAmount(match[2])
      const max = normalizeAmount(match[3])

      if (isYearLike(min) && isYearLike(max)) return false
      if (max <= MIN_PLAUSIBLE_BARE_PRICE) return false

      return true
    },
  },
  {
    regex: new RegExp(
      String.raw`\b(under|below|less\s+than|cheaper\s+than|up\s+to|max|maximum)\s+(${AMOUNT})`,
      "i",
    ),
    toRange: match => {
      return `*-${normalizeAmount(match[2])}`
    },
  },
  {
    regex: new RegExp(
      String.raw`\b(over|above|more\s+than|at\s+least|starting\s+at|from|min|minimum)\s+(${AMOUNT})`,
      "i",
    ),
    toRange: match => {
      return `${normalizeAmount(match[2])}-*`
    },
    isPlausible: match => {
      // "over 2000" reads as money; "from 1990" reads as a date. Only the
      // ambiguous operators need a year check.
      if (!DATE_AMBIGUOUS_OPERATOR.test(match[1])) return true
      if (hasMoneyMarker(match[2])) return true

      return !isYearLike(normalizeAmount(match[2]))
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
  }).find(({ pattern, match }) => {
    if (!match) return false

    return pattern.isPlausible ? pattern.isPlausible(match) : true
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
  /** A recognized term was preceded by "no" / "not" / "without" / … */
  hasNegatedMatch: boolean
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

      const previousToken = index > 0 ? tokens[index - 1] : undefined
      const isNegated =
        !!previousToken && NEGATORS.has(normalizePhrase(previousToken))

      return {
        matches: [...acc.matches, hit.entry],
        leftover: acc.leftover,
        skipUntil: index + hit.size,
        hasNegatedMatch: acc.hasNegatedMatch || isNegated,
      }
    },
    { matches: [], leftover: [], skipUntil: 0, hasNegatedMatch: false },
  )
}

/**
 * Drops stopwords from the edges only. Stripping them throughout would mangle
 * interior phrases — "black and white photography" became "black white".
 */
const trimStopwords = (words: string[]): string[] => {
  const isStopword = (word: string): boolean => {
    return STOPWORDS.has(word.toLowerCase())
  }

  const first = words.findIndex(word => {
    return !isStopword(word)
  })

  if (first === -1) return []

  const fromEnd = words
    .slice()
    .reverse()
    .findIndex(word => {
      return !isStopword(word)
    })

  return words.slice(first, words.length - fromEnd)
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

  const normalizedQuery = normalizePhrase(query)

  // A medium word inside a fair, gallery or exhibition name is not a medium
  // request: "design miami", "film noir photography"
  if (
    COLLISION_PHRASES.some(phrase => {
      return normalizedQuery.includes(phrase)
    })
  ) {
    return null
  }

  // priceRange is USD-only, and `clean` strips the currency symbol — parsing on
  // would reinterpret "under £5000" as $5,000. Dropping only the price is no
  // better: it leaves a keyword of "under 5000" and quietly discards the
  // constraint that was asked for.
  if (NON_USD.test(query)) return null

  const { priceRange, rest } = extractPrice(clean(query))

  const tokens = rest.split(/\s+/).filter(Boolean)
  const { matches, leftover, hasNegatedMatch } = extractVocabulary(tokens)

  // Only positive filters are expressible, so an exclusion can't be honoured —
  // and filtering *to* the excluded value is worse than staying quiet
  if (hasNegatedMatch) return null

  const mediumEntries = matches.filter(entry => {
    return entry.type === "medium"
  })
  const mediumValues = [
    ...new Set(
      mediumEntries.map(entry => {
        return entry.value
      }),
    ),
  ]

  // The collect URL carries a single medium as its path segment, so a second
  // one would be dropped without the user seeing it go
  if (mediumValues.length > 1) return null

  const medium = mediumEntries[0]

  const attributionEntries = matches.filter(entry => {
    return entry.type === "attributionClass"
  })
  const attributionClass = [
    ...new Set(attributionEntries.map(entry => entry.value)),
  ]

  const keyword = trimStopwords(
    // A price like "$1000-5000" leaves its "$" behind, since the amount itself
    // starts at a word boundary
    leftover.filter(token => {
      return /\w/.test(token)
    }),
  )
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
