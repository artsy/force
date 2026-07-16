import type { ArtworkFilterSuggestion } from "./fetchArtworkFilterSuggestions"

export interface UnderstoodChip {
  label: string
  // Loosened chips render struck-through: the parser asked for them, but we
  // relaxed them because the strict result set was too small.
  loosened?: boolean
}

export interface UnderstoodAs {
  chips: UnderstoodChip[]
  // The leftover "vibe" keyword, rendered as the gradient pill.
  vibe: string | null
}

const SIZE_LABELS: Record<string, string> = {
  SMALL: "Small",
  MEDIUM: "Medium",
  LARGE: "Large",
}

const ATTRIBUTION_LABELS: Record<string, string> = {
  unique: "Unique",
  "limited edition": "Limited edition",
  "open edition": "Open edition",
  "unknown edition": "Unknown edition",
}

const BOOLEAN_LABELS: Array<[string, string]> = [
  ["framed", "Framed"],
  ["signed", "Signed"],
  ["forSale", "For sale"],
  ["acquireable", "Buy now"],
  ["offerable", "Make offer"],
  ["atAuction", "At auction"],
  ["inquireable", "Contact gallery"],
]

const titleize = (value: string): string =>
  value.replace(/-/g, " ").replace(/^\w/, c => c.toUpperCase())

const formatPrice = (range: string): string => {
  const [min, max] = range.split("-")
  const money = (v: string) => `$${Number(v).toLocaleString("en-US")}`
  if (min === "*") return `< ${money(max)}`
  if (max === "*") return `${money(min)}+`
  return `${money(min)}–${money(max)}`
}

// Turns a Metaphysics suggestion into the pills shown in the "Understood as"
// panel. Medium is intentionally omitted: MP returns gene IDs, not names, so we
// can't label it without a lookup (tracked as an MP follow-up).
export const buildUnderstoodAs = (
  suggestion: ArtworkFilterSuggestion,
  { loosenedFields = [] as string[] } = {},
): UnderstoodAs => {
  const chips: UnderstoodChip[] = []
  const push = (label: string, field: string) => {
    chips.push({ label, loosened: loosenedFields.includes(field) })
  }

  const filters = suggestion.filters

  if (filters) {
    for (const size of filters.sizes ?? []) {
      if (size) push(SIZE_LABELS[size] ?? size, "sizes")
    }
    if (filters.priceRange) push(formatPrice(filters.priceRange), "priceRange")
    for (const attribution of filters.attributionClass ?? []) {
      if (attribution)
        push(ATTRIBUTION_LABELS[attribution] ?? attribution, "attributionClass")
    }
    for (const color of filters.colors ?? []) {
      if (color) push(titleize(color), "colors")
    }
    for (const nationality of filters.artistNationalities ?? []) {
      if (nationality) push(nationality, "artistNationalities")
    }
    for (const period of filters.majorPeriods ?? []) {
      if (period) push(String(period), "majorPeriods")
    }
    for (const [key, label] of BOOLEAN_LABELS) {
      if (filters[key]) push(label, key)
    }
  }

  return { chips, vibe: suggestion.keyword?.trim() || null }
}
