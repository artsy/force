import { Request } from "express"

type PageTypes =
  | "artist"
  | "artwork"
  | "auction"
  | "auction-registration"
  | "auction-registration2"
  | "orders"
  | "search"

export function getPageType(
  req: Request
): {
  pageParts: string[]
  pageType: PageTypes
} {
  const pageParts = req.path.split("/")
  const pageType = pageParts[1] as PageTypes

  return {
    pageParts,
    pageType,
  }
}
