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
  if (isNaN(page)) return 1

  return page
}
