export function getServerParam(req, name): string | null {
  if (req.query && req.query.hasOwnProperty(name)) {
    return req.query[name]
  }
  return null
}

export function getClientParam(name: string): string | null {
  const urlParams = new URLSearchParams(window.location.search)
  if (urlParams.has(name)) {
    return urlParams.get(name)
  }
  return null
}
