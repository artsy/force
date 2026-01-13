export const prefetchUrl = (url: string): void => {
  if (typeof url === "string" && url.startsWith("http")) {
    // Check if this URL is already being preloaded to avoid duplicate link elements
    const existingLink = document.querySelector(
      `link[rel="preload"][as="image"][href="${url}"]`,
    )

    if (!existingLink) {
      const link = document.createElement("link")
      link.rel = "preload"
      link.as = "image"
      link.href = url
      document.head.appendChild(link)
    }
  }
}

export const prefetchUrls = (urls: string[]): void => {
  urls.forEach(url => prefetchUrl(url))
}
