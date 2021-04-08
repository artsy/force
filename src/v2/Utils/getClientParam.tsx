export function getClientParam(name: string): string | null {
  const urlParams = new URLSearchParams(window.location.search)
  if (urlParams.has(name)) {
    return urlParams.get(name)
  }
  return null
}
