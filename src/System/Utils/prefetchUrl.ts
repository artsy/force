export const prefetchUrl = (url: string): void => {
  if (typeof url === "string" && url.startsWith("http")) {
    const img = new Image()
    img.src = url
  }
}
