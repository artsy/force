import { Request } from "express"
import { OwnerType, PageOwnerType } from "@artsy/cohesion"
import { camelCase } from "lodash"
import { data as sd } from "sharify"

export function getContextPageFromReq({
  path,
}: Request): {
  canonicalUrl: string
  pageParts: string[]
  pageType: PageOwnerType
  pageSlug: string
  path: string
} {
  const pageParts = path.split("/")
  const pageSlug = pageParts[2]
  const pageType = formatOwnerTypes(path)
  const canonicalUrl = `${sd.APP_URL}${path}`

  return {
    canonicalUrl,
    pageParts,
    pageSlug,
    pageType,
    path,
  }
}

// @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
export function getContextPageFromClient(): {
  canonicalUrl: string
  pageParts: string[]
  pageSlug: string
  pageType: PageOwnerType
  path: string
} {
  if (window) {
    const PAGE_TYPE = window.sd && window.sd.PAGE_TYPE
    const { pathname } = window.location
    const pageParts = pathname.split("/")
    const pageSlug = pageParts[2]
    const pageType = PAGE_TYPE || formatOwnerTypes(pathname)
    const canonicalUrl = `${sd.APP_URL}${pathname}`

    return {
      canonicalUrl,
      pageParts,
      pageSlug,
      pageType,
      path: pathname,
    }
  }
}

export const formatOwnerTypes = (path: string) => {
  const type = path.split("/")[1]
  // Remove '2' to ensure that show2/fair2/etc are schema compliant
  let formattedType = camelCase(type).replace("2", "")

  if (path === "/") {
    formattedType = OwnerType.home
  }

  switch (type) {
    case "auction":
      formattedType = OwnerType.sale
      break
    case "news":
    case "series":
    case "video":
      formattedType = OwnerType.article
      break
  }

  if (!OwnerType[formattedType] && sd.SHOW_ANALYTICS_CALLS) {
    console.warn(
      `OwnerType ${formattedType} is not part of @artsy/cohesion's schema.`
    )
  }

  return OwnerType[formattedType] || formattedType
}
