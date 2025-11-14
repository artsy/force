export function getServerParam(req, name): string | null {
  if (req.query && Object.hasOwn(req.query, name)) {
    return req.query[name]
  }
  return null
}
