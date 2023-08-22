export const sanitizeURL = (path: string) => {
  if (!path || typeof path !== "string") return ""

  const _path = path.toLowerCase()

  if (
    _path.includes("script:") ||
    _path.includes("data:") ||
    _path.includes("script%3a") ||
    _path.includes("data%3a")
  ) {
    return "/"
  }

  return path
}
