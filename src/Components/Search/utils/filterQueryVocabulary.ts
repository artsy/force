import { FILTER_CATEGORIES } from "Apps/Artwork/Utils/createCollectUrl"
import { ATTRIBUTION_CLASS_OPTIONS } from "Components/ArtworkFilter/ArtworkFilters/AttributionClassFilter"
import { MEDIUM_OPTIONS } from "Components/ArtworkFilter/ArtworkFilters/MediumFilter"

export type VocabularyType = "medium" | "attributionClass" | "artistNationality"

export interface VocabularyEntry {
  type: VocabularyType
  /** The value written into ArtworkFilters, e.g. "prints" / "limited edition" */
  value: string
  /** Nationalities only: every aggregation value the demonym stands for */
  values?: string[]
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
 * Verbatim `ARTIST_NATIONALITY` aggregation values — a value the aggregation
 * doesn't carry applies a filter that no pill can name and no checkbox can
 * untick. Demonyms that are also languages, periods or place names ("English",
 * "Georgian", "Catalan", "Hong Kong", "New Zealand") are left out, as is the
 * catch-all "Other" and the hyphenated composites ("Chinese-American").
 */
const NATIONALITIES = [
  "Algerian",
  "American",
  "Angolan",
  "Argentine",
  "Armenian",
  "Australian",
  "Austrian",
  "Bahamian",
  "Belgian",
  "Beninese",
  "Bolivian",
  "Bosnian",
  "Brazilian",
  "British",
  "Cameroonian",
  "Canadian",
  "Chilean",
  "Chinese",
  "Colombian",
  "Congolese",
  "Croatian",
  "Cuban",
  "Czech",
  "Danish",
  "Dominican",
  "Dutch",
  "Ecuadorian",
  "Egyptian",
  "Estonian",
  "Finnish",
  "French",
  "German",
  "Ghanaian",
  "Greek",
  "Guatemalan",
  "Hungarian",
  "Icelandic",
  "Indian",
  "Indonesian",
  "Iranian",
  "Iraqi",
  "Irish",
  "Israeli",
  "Italian",
  "Ivorian",
  "Japanese",
  "Kenyan",
  "Korean",
  "Latvian",
  "Lebanese",
  "Lithuanian",
  "Malaysian",
  "Malian",
  "Mexican",
  "Moroccan",
  "Mozambican",
  "Nigerian",
  "Norwegian",
  "Pakistani",
  "Palestinian",
  "Peruvian",
  "Philippine",
  "Polish",
  "Portuguese",
  "Puerto Rican",
  "Romanian",
  "Russian",
  "Scottish",
  "Senegalese",
  "Serbian",
  "Singaporean",
  "Slovak",
  "Slovene",
  "South African",
  "Spanish",
  "Swedish",
  "Swiss",
  "Syrian",
  "Taiwanese",
  "Thai",
  "Tunisian",
  "Turkish",
  "Ukrainian",
  "Uruguayan",
  "Venezuelan",
  "Vietnamese",
  "Welsh",
  "Zimbabwean",
]

/** Demonyms the aggregation keeps split across more than one value */
const NATIONALITY_GROUPS: Record<string, string[]> = {
  Korean: ["Korean", "South Korean"],
}

const NATIONALITY_ALIASES: Record<string, string> = {
  argentinian: "Argentine",
  filipino: "Philippine",
  slovenian: "Slovene",
  "south korean": "Korean",
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
 * Only positive filters are expressible, so a negated term is withheld rather
 * than inverted — "no prints" must not mean Prints.
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
 * Medium words belonging to a proper noun rather than a medium. A mitigation,
 * not a fix — the set is unbounded, so add new collisions as they surface.
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

/**
 * Phrases where a demonym names a movement, a material or a title rather than
 * an artist's nationality. Only the nationality is withheld — "african
 * american photography" still parses as Photography.
 */
export const NATIONALITY_COLLISION_PHRASES = [
  "african american",
  "american gothic",
  "indian ink",
  "latin american",
  "native american",
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

  // Reuse the MEDIUM_OPTIONS label so "print" and "prints" don't render as two
  // different things.
  const mediumLabels = new Map(
    [...vocabulary.values()].map(entry => [entry.value, entry.label]),
  )

  Object.entries(FILTER_CATEGORIES).forEach(([name, value]) => {
    const label = mediumLabels.get(value)

    // Skip slugs the Medium filter has no option for ("poster", "textiles"):
    // they filter results that no pill or checkbox can name or untick.
    if (!label) return

    const entry: VocabularyEntry = { type: "medium", value, label }

    add(name, entry)
    add(deslugify(value), entry)
  })

  NATIONALITIES.forEach(nationality => {
    add(nationality, {
      type: "artistNationality",
      value: nationality,
      values: NATIONALITY_GROUPS[nationality] ?? [nationality],
      label: nationality,
    })
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
  addAliases(NATIONALITY_ALIASES)

  return vocabulary
}

export const FILTER_VOCABULARY: ReadonlyMap<string, VocabularyEntry> =
  buildVocabulary()

/** Longest phrase in the vocabulary, so the matcher window adapts to the data */
export const MAX_PHRASE_WORDS: number = [...FILTER_VOCABULARY.keys()].reduce(
  (max, key) => Math.max(max, key.split(" ").length),
  1,
)
