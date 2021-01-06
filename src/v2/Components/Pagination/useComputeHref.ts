import { buildUrl } from "v2/Components/v2/ArtworkFilter/Utils/urlBuilder"
import { useArtworkFilterContext } from "v2/Components/v2/ArtworkFilter/ArtworkFilterContext"
import { useRouter } from "v2/Artsy/Router/useRouter"

export function useComputeHref() {
  const filterContext = useArtworkFilterContext()
  const routerContext = useRouter()

  const currentlySelectedFilters = filterContext.currentlySelectedFilters()
  const pathname = routerContext?.match?.location?.pathname

  const computeHref = page => {
    const filterState = {
      ...currentlySelectedFilters,
      page,
    }

    const href = buildUrl(filterState, pathname)
    return href
  }

  return computeHref
}
