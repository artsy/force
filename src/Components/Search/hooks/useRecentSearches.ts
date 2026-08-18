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

/** Maps an autosuggest option to the entry recorded when it is chosen */
export const recentSearchFromOption = (
  option: SuggestionItemOptionProps,
): RecentSearch => {
  return {
    label: option.text,
    href: option.href,
    item_type: option.item_type,
    item_id: option.item_id,
  }
}

// Chips navigate wherever this href points, so only relative Artsy paths are
// accepted — never external or protocol-relative URLs from a tampered store.
const isInternalHref = (href: unknown): href is string => {
  return (
    typeof href === "string" && href.startsWith("/") && !href.startsWith("//")
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

const getStoredSearches = (): RecentSearch[] => {
  if (typeof window === "undefined") return []

  try {
    const raw = window.localStorage.getItem(RECENT_SEARCHES_KEY)
    if (!raw) return []

    const parsed: unknown = JSON.parse(raw)
    if (!Array.isArray(parsed)) return []

    return parsed
      .flatMap(entry => {
        const search = asRecentSearch(entry)
        return search ? [search] : []
      })
      .slice(0, MAX_SAVED_RECENT_SEARCHES)
  } catch {
    // Storage unavailable (e.g. Safari private mode) or unparseable contents;
    // treat as no recent searches.
    return []
  }
}

const setStoredSearches = (searches: RecentSearch[]) => {
  if (typeof window === "undefined") return

  try {
    window.localStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(searches))
  } catch {
    // Storage unavailable; the in-memory state still updates for this session.
  }
}

// Storage entries first (they may include newer writes from other hook
// instances), then any state-only entries — which exist when persistence
// fails (e.g. Safari private mode) and keep the session's searches alive.
const mergeSearches = ({
  stored,
  state,
}: {
  stored: RecentSearch[]
  state: RecentSearch[]
}): RecentSearch[] => {
  const storedLabels = new Set(stored.map(search => search.label.toLowerCase()))

  return [
    ...stored,
    ...state.filter(search => !storedLabels.has(search.label.toLowerCase())),
  ]
}

/**
 * Recent searches persisted to localStorage, most recent first. Each entry
 * keeps the destination the user actually visited: an entity page when they
 * picked an autosuggest result, or the search results page when they
 * submitted a query. When storage is unavailable the list only lives for
 * the current session.
 */
export const useRecentSearches = () => {
  const [storedSearches, setStateSearches] =
    useState<RecentSearch[]>(getStoredSearches)

  const addRecentSearch = ({
    label,
    href,
    item_type,
    item_id,
  }: RecentSearch) => {
    // Labels originate from nullable GraphQL fields despite the types
    const trimmed = typeof label === "string" ? label.trim() : ""
    if (!trimmed || !isInternalHref(href)) return

    const base = mergeSearches({
      stored: getStoredSearches(),
      state: storedSearches,
    })

    // One chip per label (case-insensitive), latest destination wins — an
    // entity click and a query submit for the same term never show twice.
    const next = [
      { label: trimmed, href, item_type, item_id },
      ...base.filter(existing => {
        return existing.label.toLowerCase() !== trimmed.toLowerCase()
      }),
    ].slice(0, MAX_SAVED_RECENT_SEARCHES)

    setStoredSearches(next)
    setStateSearches(next)
  }

  const removeRecentSearch = (label: string) => {
    const base = mergeSearches({
      stored: getStoredSearches(),
      state: storedSearches,
    })

    const next = base.filter(existing => {
      return existing.label !== label
    })

    setStoredSearches(next)
    setStateSearches(next)
  }

  const recentSearches = useMemo(() => {
    return storedSearches.slice(0, MAX_RECENT_SEARCHES)
  }, [storedSearches])

  return { recentSearches, addRecentSearch, removeRecentSearch }
}
