import { buildUrl } from "v2/Components/v2/ArtworkFilter/Utils/urlBuilder"
import { useArtworkFilterContext } from "v2/Components/v2/ArtworkFilter/ArtworkFilterContext"
import { useRouter } from "v2/Artsy/Router/useRouter"
import { stringify } from "qs"

export function useComputeHref() {
  const {
    match: { location },
  } = useRouter()
  const artworkFilterContext = useArtworkFilterContext()

  // Generic
  if (!artworkFilterContext.mountedContext) {
    return (page: number) =>
      `${location?.pathname}?${stringify({ ...location.query, page })}`
  }

  // Artwork filter-specific
  // (location doesn't update in the case of artwork filter)
  const currentlySelectedFilters = artworkFilterContext.currentlySelectedFilters()

  const computeHref = page => {
    const filterState = {
      ...currentlySelectedFilters,
      page,
    }

    const href = buildUrl(filterState, location?.pathname)
    return href
  }

  return computeHref
}
