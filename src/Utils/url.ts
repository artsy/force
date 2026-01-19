export const getURLHost = url => {
  try {
    const urlObject = new URL(url)
    return urlObject.hostname
  } catch (error) {
    return ""
  }
}

export const getInternalHref = (url: string) => {
  const href = url?.replace(/^https?:\/\/[^/]+\.net/, "")

  if (!href) {
    return url
  }

  return href
}

export const getPageNumber = (location: any): number => {
  if (!location?.query?.page) return 1

  const page = Number(location.query.page)
  if (Number.isNaN(page)) return 1

  return page
}

export const buildPageQuery = (query: any, page: number) => {
  const updatedQuery = { ...query }
  if (page === 1) {
    delete updatedQuery.page
  } else {
    updatedQuery.page = String(page)
  }
  return updatedQuery
}

export const getArtistSubRoute = (pathname: string): string | undefined => {
  // Strip query params and fragments
  const path = pathname.split("?")[0].split("#")[0]
  const segments = path.split("/").filter(Boolean)

  // Artist URLs are /artist/[slug]/[subRoute?]
  // If there's a 3rd segment (index 2), that's the sub-route
  if (segments.length >= 3 && segments[0] === "artist") {
    return segments[2]
  }

  return undefined
}
