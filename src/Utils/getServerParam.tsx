export function getServerParam(req, name): string | null {
  if (req.query && req.query.hasOwnProperty(name)) {
    return req.query[name]
  }
  return null
}
