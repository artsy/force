import { PageOwnerType } from "@artsy/cohesion"
import { pathToOwnerType } from "System/Contexts/AnalyticsContext"
// eslint-disable-next-line no-restricted-imports
import { data as sd } from "sharify"

interface ClientContextPage {
  canonicalUrl: string
  pageParts: string[]
  pageSlug: string
  pageType: PageOwnerType
  path: string
}

/**
 * @deprecated: See `AnalyticsContext`
 */
export function getContextPageFromClient(): ClientContextPage | undefined {
  if (!window) {
    return
  }

  const PAGE_TYPE = window.sd && window.sd.PAGE_TYPE
  const { pathname } = window.location
  const pageParts = pathname.split("/")
  const pageSlug = pageParts[2]
  const pageType = PAGE_TYPE || pathToOwnerType(pathname)
  const canonicalUrl = `${sd.APP_URL}${pathname}`

  return {
    canonicalUrl,
    pageParts,
    pageSlug,
    pageType,
    path: pathname,
  }
}
