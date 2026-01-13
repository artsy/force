export const prefetchUrl = (url: string): void => {
  if (typeof url === "string" && url.startsWith("http")) {
    const link = document.createElement("link")
    link.rel = "preload"
    link.as = "image"
    link.href = url
    document.head.appendChild(link)
  }
}

export const prefetchUrls = (urls: string[]): void => {
  urls.forEach(url => prefetchUrl(url))
}
