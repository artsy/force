import { allowedAuctionResultFilters } from "Apps/Artist/Utils/allowedAuctionResultFilters"
import {
  paramsToCamelCase,
  paramsToSnakeCase,
} from "Components/ArtworkFilter/Utils/paramsCasing"
import { stringify } from "qs"

/**
 * Rewrites legacy top-level auction results params into a namespaced object:
 *   ?sort=DATE_DESC&page=2  ->  ?auction[sort]=DATE_DESC&auction[page]=2
 *
 * Returns the rewritten query params, or the original query if no rewrite is needed.
 */
export function rewriteAuctionResultsParamsToNamespace(query: any) {
  // If already namespaced, return original query.
  if (query && query.auction) {
    return query
  }

  const camel = paramsToCamelCase(query ?? {})
  const allowed = allowedAuctionResultFilters(camel)

  // If there are no auction-results params present, return original query.
  if (!allowed || Object.keys(allowed).length === 0) {
    return query ?? {}
  }

  // Remove auction-results params from top-level and nest them under `auction`.
  const auctionParamsSnake = paramsToSnakeCase(allowed)
  const filteredQuery = { ...(query ?? {}) }
  Object.keys(auctionParamsSnake).forEach(key => {
    delete filteredQuery[key]
  })

  const nextQuery = {
    ...filteredQuery,
    auction: auctionParamsSnake,
  }

  return nextQuery
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
  const originalQuery = req.query
  const nextQuery = rewriteAuctionResultsParamsToNamespace(originalQuery)

  // Only redirect if the query actually changed
  if (nextQuery === originalQuery) {
    return
  }

  const queryString = stringify(nextQuery)
  const nextPath = [req.path, queryString].join("?")
  res.redirect(301, nextPath)
}
