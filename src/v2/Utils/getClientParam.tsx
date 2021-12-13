export function getClientParam(name: string): string | null {
  if (typeof window === "undefined") return null

  const urlParams = new URLSearchParams(window.location.search)

  if (urlParams.has(name)) {
    return urlParams.get(name)
  }

  return null
}
