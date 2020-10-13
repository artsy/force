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
  const type = formatOwnerTypes(pageParts[1])
  const pageType = OwnerType[type] || type

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
    let type = formatOwnerTypes(PAGE_TYPE || pageParts[1])
    const pageType = OwnerType[type] || type

    return {
      pageParts,
      pageSlug,
      pageType,
    }
  }
}

export const formatOwnerTypes = (type: string) => {
  let formattedType = camelCase(type)

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

  return formattedType
}
