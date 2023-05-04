import { stringify } from "qs"

export function redirectWithCanonicalParams({ req, res }) {
  if (hasCanonicalSort(req.query)) {
    // all good
    return
  }

  // else remove the offending sort, causing fallback to default sort
  delete req.query.sort

  const sanitizedQuerystring = stringify(req.query)
  const sanitizedPath = [req.path, sanitizedQuerystring].join("?")
  res.redirect(301, sanitizedPath)
}

function hasCanonicalSort(query: { sort: string }) {
  // See https://artsyproduct.atlassian.net/browse/FX-4778
  return query.sort !== "-default_trending_score"
}
