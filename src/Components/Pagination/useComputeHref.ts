import {
  useArtworkFilterContext,
  useCurrentlySelectedFilters,
} from "Components/ArtworkFilter/ArtworkFilterContext"
import { buildUrl } from "Components/ArtworkFilter/Utils/urlBuilder"
import { useRouter } from "System/Hooks/useRouter"
import { buildPageQuery } from "Utils/url"
import { stringify } from "qs"

const buildGenericPageUrl = (
  pathname: any,
  query: any,
  page: number
): string => {
  if (!pathname) return ""

  const updatedQuery = buildPageQuery(query, page)
  const queryString = stringify(updatedQuery)
  return queryString ? `${pathname}?${queryString}` : pathname
}

export function useComputeHref() {
  const {
    match: { location },
  } = useRouter()
  const artworkFilterContext = useArtworkFilterContext()
  const currentlySelectedFilters = useCurrentlySelectedFilters()

  // Generic
  if (!artworkFilterContext.mountedContext) {
    return (page: number) =>
      buildGenericPageUrl(location?.pathname, location?.query, page)
  }

  // Artwork filter-specific
  // (location doesn't update in the case of artwork filter)
  const computeHref = (page: number) => {
    const filterState = {
      ...currentlySelectedFilters,
      page,
    }

    const href = buildUrl(filterState, { pathname: location?.pathname })
    return href
  }

  return computeHref
}
