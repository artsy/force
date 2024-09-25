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
