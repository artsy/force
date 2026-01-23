type PrefetchOptions = {
  url: string
  sizes?: string
}

export const prefetchUrlWithSizes = (opts: PrefetchOptions): void => {
  if (typeof opts.url !== "string" || !opts.url.startsWith("http")) {
    return
  }

  const existingLink = document.querySelector(
    `link[rel="preload"][as="image"][href="${opts.url}"]`,
  )

  if (!existingLink) {
    const link = document.createElement("link")
    link.rel = "preload"
    link.as = "image"
    link.href = opts.url
    if (opts.sizes) {
      link.setAttribute("imagesizes", opts.sizes)
    }
    document.head.appendChild(link)
  }
}
