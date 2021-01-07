import { buildUrl } from "v2/Components/v2/ArtworkFilter/Utils/urlBuilder"
import { useArtworkFilterContext } from "v2/Components/v2/ArtworkFilter/ArtworkFilterContext"
import { useRouter } from "v2/Artsy/Router/useRouter"

const NOOP = () => ""

export function useComputeHref() {
  // FIXME: This currently *only* only computes hrefs for artwork filter
  // components. We'll need to update to work with other more generic
  // usecases in the future
  const filterContext = useArtworkFilterContext()
  const routerContext = useRouter()

  if (!filterContext.mountedContext) {
    return NOOP
  }

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
