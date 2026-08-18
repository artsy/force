import type { SuggestionItemOptionProps } from "Components/Search/SuggestionItem/SuggestionItem"
import { searchResultsHref } from "Components/Search/utils/searchResultsHref"
import { useMemo, useState } from "react"

// Matches the recent-searches limits in the Eigen app: a deep saved history
// so that removing a chip resurfaces an older search, but only a handful shown.
export const MAX_SAVED_RECENT_SEARCHES = 100
export const MAX_RECENT_SEARCHES = 7

const RECENT_SEARCHES_KEY = "artsy.recentSearches"

export interface RecentSearch {
  /** The visible chip text: an entity’s display label or the raw query */
  label: string
  /** Where the user actually went: an entity page or the search results page */
  href: string
  /** Cohesion metadata captured at record time; absent for raw query submits */
  item_type?: string
  item_id?: string
}

export interface UseRecentSearches {
  /** The visible list, capped at MAX_RECENT_SEARCHES, most recent first */
  recentSearches: RecentSearch[]
  addRecentSearch: (search: RecentSearch) => void
  /** Records the autosuggest option the user chose */
  addRecentSearchFromOption: (option: SuggestionItemOptionProps) => void
  removeRecentSearch: (label: string) => void
}

// Chips navigate wherever this href points, so only relative Artsy paths are
// accepted — never external, protocol-relative (//host), or backslash
// (/\host, which browsers normalize to //host) URLs from a tampered store.
const isInternalHref = (href: unknown): href is string => {
  return (
    typeof href === "string" &&
    href.startsWith("/") &&
    !href.startsWith("//") &&
    !href.startsWith("/\\")
  )
}

const asRecentSearch = (entry: unknown): RecentSearch | null => {
  // Entries written by the earlier plain-string format
  if (typeof entry === "string") {
    return { label: entry, href: searchResultsHref(entry) }
  }

  if (
    typeof entry === "object" &&
    entry !== null &&
    typeof (entry as RecentSearch).label === "string" &&
    isInternalHref((entry as RecentSearch).href)
  ) {
    const { label, href, item_type, item_id } = entry as RecentSearch
    return {
      label,
      href,
      ...(typeof item_type === "string" ? { item_type } : {}),
      ...(typeof item_id === "string" ? { item_id } : {}),
    }
  }

  return null
}

// Module-level store shared by every hook instance: mutations always read and
// write through here, so one instance can never undo another's changes with
// stale component state (e.g. the never-remounting nav bar resurrecting a
// chip that was removed via the trending panel).
let memorySearches: RecentSearch[] | null = null
let hasFailedWrite = false

/** Test-only: clears the module-level store between tests */
export const resetRecentSearchesStoreForTests = () => {
  memorySearches = null
  hasFailedWrite = false
}

const readSearches = (): RecentSearch[] => {
  if (typeof window === "undefined") return []

  // After a failed write (e.g. Safari private mode) memory is ahead of
  // storage; keep serving the session's list from memory.
  if (hasFailedWrite && memorySearches) return memorySearches

  try {
    const raw = window.localStorage.getItem(RECENT_SEARCHES_KEY)
    if (!raw) return []

    const parsed: unknown = JSON.parse(raw)
    if (!Array.isArray(parsed)) return []

    const seen = new Set<string>()

    return parsed
      .flatMap(entry => {
        const search = asRecentSearch(entry)
        return search ? [search] : []
      })
      .filter(search => {
        // Storage written by older code or another tab may contain duplicate
        // labels; render-side keys require uniqueness
        const key = search.label.toLowerCase()
        if (seen.has(key)) return false
        seen.add(key)
        return true
      })
      .slice(0, MAX_SAVED_RECENT_SEARCHES)
  } catch {
    // Storage unavailable or unparseable; fall back to the session's memory
    return memorySearches ?? []
  }
}

const writeSearches = (searches: RecentSearch[]) => {
  memorySearches = searches

  if (typeof window === "undefined") return

  try {
    window.localStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(searches))
    hasFailedWrite = false
  } catch {
    // Storage unavailable; the session keeps working from memorySearches
    hasFailedWrite = true
  }
}

/** Maps an autosuggest option to the entry recorded when it is chosen */
const recentSearchFromOption = (
  option: SuggestionItemOptionProps,
): RecentSearch => {
  return {
    label: option.text,
    href: option.href,
    item_type: option.item_type,
    item_id: option.item_id,
  }
}

/**
 * Recent searches persisted to localStorage, most recent first. Each entry
 * keeps the destination the user actually visited: an entity page when they
 * picked an autosuggest result, or the search results page when they
 * submitted a query. When storage is unavailable the list only lives for
 * the current session.
 */
export const useRecentSearches = (): UseRecentSearches => {
  const [searches, setSearches] = useState<RecentSearch[]>(readSearches)

  const commit = (next: RecentSearch[]) => {
    writeSearches(next)
    setSearches(next)
  }

  const addRecentSearch = ({
    label,
    href,
    item_type,
    item_id,
  }: RecentSearch) => {
    // Labels originate from nullable GraphQL fields despite the types
    const trimmed = typeof label === "string" ? label.trim() : ""
    if (!trimmed || !isInternalHref(href)) return

    // One chip per label (case-insensitive), latest destination wins — an
    // entity click and a query submit for the same term never show twice.
    commit(
      [
        { label: trimmed, href, item_type, item_id },
        ...readSearches().filter(existing => {
          return existing.label.toLowerCase() !== trimmed.toLowerCase()
        }),
      ].slice(0, MAX_SAVED_RECENT_SEARCHES),
    )
  }

  const addRecentSearchFromOption = (option: SuggestionItemOptionProps) => {
    addRecentSearch(recentSearchFromOption(option))
  }

  const removeRecentSearch = (label: string) => {
    commit(
      readSearches().filter(existing => {
        return existing.label !== label
      }),
    )
  }

  const recentSearches = useMemo(() => {
    return searches.slice(0, MAX_RECENT_SEARCHES)
  }, [searches])

  return {
    recentSearches,
    addRecentSearch,
    addRecentSearchFromOption,
    removeRecentSearch,
  }
}
