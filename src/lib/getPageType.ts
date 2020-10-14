import { Request } from "express"
import { OwnerType, PageOwnerType } from "@artsy/cohesion"
import { camelCase } from "lodash"

export function getPageTypeFromReq(
  req: Request
): {
  pageParts: string[]
  pageType: PageOwnerType
  pageSlug: string
} {
  const pageParts = req.path.split("/")
  const pageSlug = pageParts[2]
  const pageType = formatOwnerTypes(req.path)

  return {
    pageParts,
    pageSlug,
    pageType,
  }
}

export function getPageTypeFromClient(): {
  pageParts: string[]
  pageSlug: string
  pageType: PageOwnerType
} {
  if (window) {
    const PAGE_TYPE = window.sd && window.sd.PAGE_TYPE
    const { pathname } = window.location
    const pageParts = pathname.split("/")
    const pageSlug = pageParts[2]
    const pageType = PAGE_TYPE || formatOwnerTypes(pathname)

    return {
      pageParts,
      pageSlug,
      pageType,
    }
  }
}

export const formatOwnerTypes = (path: string) => {
  const type = path.split("/")[1]
  let formattedType = camelCase(type)

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

  if (!OwnerType[formattedType]) {
    console.warn(
      `OwnerType ${formattedType} is not part of @artsy/cohesion's schema.`
    )
  }

  return OwnerType[formattedType] || formattedType
}
