export const sanitizeURL = (
  path: string,
  options = { enforceInternal: false }
) => {
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

  if (
    options.enforceInternal &&
    (_path.startsWith("http://") || _path.startsWith("https://"))
  ) {
    return "/"
  }

  return path
}
