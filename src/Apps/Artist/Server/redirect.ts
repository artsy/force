import { allowedAuctionResultFilters } from "Apps/Artist/Utils/allowedAuctionResultFilters"
import {
  paramsToCamelCase,
  paramsToSnakeCase,
} from "Components/ArtworkFilter/Utils/paramsCasing"
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

/**
 * Redirects legacy top-level auction results params on the dedicated
 * /artist/:id/auction-results subroute into a namespaced object:
 *   ?sort=DATE_DESC&page=2  ->  ?auction[sort]=DATE_DESC&auction[page]=2
 *
 * This isolates auction-results params from artworks filter params when both
 * features share the same page.
 */
export function redirectAuctionResultsParamsToNamespace({ req, res }) {
  // If already namespaced, nothing to do.
  if (req.query && req.query.auction) {
    return
  }

  const camel = paramsToCamelCase(req.query ?? {})
  const allowed = allowedAuctionResultFilters(camel)

  // If there are no auction-results params present, nothing to do.
  if (!allowed || Object.keys(allowed).length === 0) {
    return
  }

  // Remove auction-results params from top-level and nest them under `auction`.
  const auctionParamsSnake = paramsToSnakeCase(allowed)
  const filteredQuery = { ...(req.query ?? {}) }
  Object.keys(auctionParamsSnake).forEach(key => {
    delete filteredQuery[key]
  })

  const nextQuery = {
    ...filteredQuery,
    auction: auctionParamsSnake,
  }

  const queryString = stringify(nextQuery)
  const nextPath = [req.path, queryString].join("?")
  res.redirect(301, nextPath)
}
