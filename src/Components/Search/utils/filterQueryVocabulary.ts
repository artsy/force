import { FILTER_CATEGORIES } from "Apps/Artwork/Utils/createCollectUrl"
import { ATTRIBUTION_CLASS_OPTIONS } from "Components/ArtworkFilter/ArtworkFilters/AttributionClassFilter"
import { MEDIUM_OPTIONS } from "Components/ArtworkFilter/ArtworkFilters/MediumFilter"

export type VocabularyType = "medium" | "attributionClass"

export interface VocabularyEntry {
  type: VocabularyType
  /** The value written into ArtworkFilters, e.g. "prints" / "limited edition" */
  value: string
  /** The label shown in the suggestion row, e.g. "Prints" */
  label: string
}

/**
 * Phrases the option lists don't cover but people actually type. Keys are
 * normalized (lowercase, single-spaced); values are medium slugs.
 */
const MEDIUM_ALIASES: Record<string, string> = {
  print: "prints",
  paintings: "painting",
  photo: "photography",
  photos: "photography",
  photograph: "photography",
  photographs: "photography",
  photographic: "photography",
  sculptures: "sculpture",
  drawings: "drawing",
  collage: "work-on-paper",
  collages: "work-on-paper",
  "paper works": "work-on-paper",
  "works on paper": "work-on-paper",
  video: "film-slash-video",
  videos: "film-slash-video",
  film: "film-slash-video",
  films: "film-slash-video",
  animation: "film-slash-video",
  posters: "poster",
  textile: "textiles",
  nfts: "nft",
  installations: "installation",
  jewellery: "jewelry",
  "mixed media": "mixed-media",
  "digital art": "digital-art",
  "performance art": "performance-art",
  "books and portfolios": "books-and-portfolios",
}

const ATTRIBUTION_ALIASES: Record<string, string> = {
  "one of a kind": "unique",
  "one-of-a-kind": "unique",
  "limited-edition": "limited edition",
  "limited editions": "limited edition",
  "open-edition": "open edition",
  "open editions": "open edition",
}

/**
 * Words that carry no filter meaning and shouldn't survive into the keyword.
 * Multi-word phrases ("work on paper", "digital art") are consumed by the
 * vocabulary before stopword stripping runs, so "work" and "art" are safe here.
 */
export const STOPWORDS = new Set([
  "a",
  "an",
  "and",
  "art",
  "artwork",
  "artworks",
  "buck",
  "bucks",
  "by",
  "dollar",
  "dollars",
  "for",
  "from",
  "in",
  "of",
  "piece",
  "pieces",
  "the",
  "usd",
  "with",
  "work",
  "works",
])

/**
 * Words that invert intent. The parser can only express positive filters, so a
 * negated term is unrepresentable — we withhold the whole suggestion rather than
 * filter on the very thing the user excluded ("no prints" must not mean Prints).
 */
export const NEGATORS = new Set([
  "except",
  "excluding",
  "no",
  "non",
  "not",
  "without",
])

/**
 * Phrases where a vocabulary word belongs to a proper noun — a fair, a gallery,
 * an exhibition title — rather than describing a medium. Seeded from 30 days of
 * production search logs.
 *
 * This is a mitigation, not a fix: the set of names containing a medium word is
 * unbounded, so new collisions will appear. Add them here as they surface.
 */
export const COLLISION_PHRASES = [
  "art basel",
  "design miami",
  "film noir",
  "installation view",
  "poster boy",
  "print club",
  "the painting of modern life",
]

export const normalizePhrase = (phrase: string): string => {
  return phrase.toLowerCase().replace(/\s+/g, " ").trim()
}

const deslugify = (slug: string): string => {
  return slug.replace(/-/g, " ")
}

/**
 * Descriptive option names longer than this ("Drawing, Collage or other Work
 * on Paper") are never typed into a search box, and indexing them would widen
 * the matcher's lookahead window for nothing.
 */
const MAX_INDEXED_WORDS = 3

const buildVocabulary = (): Map<string, VocabularyEntry> => {
  const vocabulary = new Map<string, VocabularyEntry>()

  const add = (phrase: string, entry: VocabularyEntry) => {
    const key = normalizePhrase(phrase)

    // First writer wins, so curated labels aren't clobbered by later sources
    if (!key || vocabulary.has(key)) return
    if (key.split(" ").length > MAX_INDEXED_WORDS) return
    if (/[,/]/.test(key)) return

    vocabulary.set(key, entry)
  }

  // Canonical medium options — these own the display labels
  MEDIUM_OPTIONS.forEach(({ value, name, plural }) => {
    const entry: VocabularyEntry = { type: "medium", value, label: name }

    add(name, entry)
    add(plural, entry)
    add(deslugify(value), entry)
  })

  // Superset of slugs valid as a /collect/:medium path segment. Where a slug
  // already came from MEDIUM_OPTIONS, keep that label so "print" and "prints"
  // don't render as two different things.
  const mediumLabels = new Map(
    [...vocabulary.values()].map(entry => [entry.value, entry.label]),
  )

  Object.entries(FILTER_CATEGORIES).forEach(([name, value]) => {
    const entry: VocabularyEntry = {
      type: "medium",
      value,
      label: mediumLabels.get(value) ?? name,
    }

    add(name, entry)
    add(deslugify(value), entry)
  })

  ATTRIBUTION_CLASS_OPTIONS.forEach(({ name, value }) => {
    const entry: VocabularyEntry = {
      type: "attributionClass",
      value,
      label: name,
    }

    add(name, entry)
    add(value, entry)
  })

  // Aliases resolve to an entry already in the map so labels stay consistent
  const addAliases = (aliases: Record<string, string>) => {
    Object.entries(aliases).forEach(([alias, value]) => {
      const canonical = [...vocabulary.values()].find(
        entry => entry.value === value,
      )

      if (!canonical) return

      add(alias, canonical)
    })
  }

  addAliases(MEDIUM_ALIASES)
  addAliases(ATTRIBUTION_ALIASES)

  return vocabulary
}

export const FILTER_VOCABULARY: ReadonlyMap<string, VocabularyEntry> =
  buildVocabulary()

/** Longest phrase in the vocabulary, so the matcher window adapts to the data */
export const MAX_PHRASE_WORDS: number = [...FILTER_VOCABULARY.keys()].reduce(
  (max, key) => Math.max(max, key.split(" ").length),
  1,
)
