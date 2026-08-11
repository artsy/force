import { buildUrlForCollectApp } from "Apps/Collect/Utils/urlBuilder"
import type { AISearchArtworkFilters } from "Components/AISearch/Utils/aiSearchTypes"
import type { ArtworkFilters } from "Components/ArtworkFilter/ArtworkFilterTypes"
import { buildUrl } from "Components/ArtworkFilter/Utils/urlBuilder"

// A 24-character hex string is a Gravity internalID; anything else the agent
// puts in `artistIDs` is a slug, which is what an /artist/:slug path needs.
const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/
const INTERNAL_ID_PATTERN = /^[0-9a-f]{24}$/i

const isArtistSlug = (id: string) => {
  return !INTERNAL_ID_PATTERN.test(id) && SLUG_PATTERN.test(id)
}

/**
 * `isDefaultFilter` treats an explicit `null` as a meaningful value, and every
 * absent field comes back from GraphQL as null — so drop the empties first.
 */
const compact = (filters: AISearchArtworkFilters): ArtworkFilters => {
  return Object.entries(filters).reduce<ArtworkFilters>((acc, [key, value]) => {
    if (value === null || value === undefined || value === "") {
      return acc
    }

    if (Array.isArray(value) && value.length === 0) {
      return acc
    }

    return { ...acc, [key]: value }
  }, {})
}

export interface AISearchViewAll {
  href: string
  label: string
}

/**
 * Turns the filters the agent applied into a browse destination. A single-artist
 * result set reads better on that artist's page than in /collect; everything
 * else goes to /collect with the same filters pre-applied.
 */
export const getAISearchViewAll = (
  filters: AISearchArtworkFilters | null,
): AISearchViewAll | null => {
  if (!filters) {
    return null
  }

  const compacted = compact(filters)

  if (Object.keys(compacted).length === 0) {
    return null
  }

  const { artistIDs, ...rest } = compacted
  const soleArtistID = artistIDs?.length === 1 ? artistIDs[0] : null

  if (soleArtistID && isArtistSlug(soleArtistID)) {
    return {
      href: buildUrl(rest, { pathname: `/artist/${soleArtistID}` }),
      label: "View all works by this artist",
    }
  }

  return {
    href: buildUrlForCollectApp(compacted),
    label: "View all matching works",
  }
}
