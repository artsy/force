type PrefetchOptions = {
  url: string
  srcSet?: string
}

export const prefetchUrlWithSizes = (opts: PrefetchOptions): void => {
  if (typeof opts.url !== "string" || !opts.url.startsWith("http")) {
    return
  }

  const selector = opts.srcSet
    ? `link[rel="preload"][as="image"][imagesrcset="${opts.srcSet}"]`
    : `link[rel="preload"][as="image"][href="${opts.url}"]`

  const existingLink = document.querySelector(selector)

  if (existingLink) {
    return
  }

  const link = document.createElement("link")
  link.rel = "preload"
  link.as = "image"
  link.href = opts.url

  if (opts.srcSet) {
    link.setAttribute("imagesrcset", opts.srcSet)
  }

  document.head.appendChild(link)
}
