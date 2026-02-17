import type { Variables } from "react-relay"

const CACHEABLE_DIRECTIVE_REGEX = /@\bcacheable\b/
export const isRequestCacheable = req => {
  const queryText = req.operation?.text

  return queryText && CACHEABLE_DIRECTIVE_REGEX.test(queryText)
}

export const hasNoCacheParamPresent = url => {
  const queryString = url?.split("?")[1]
  const urlParams = new URLSearchParams(queryString)
  const noCache = urlParams.get("nocache")
  if (noCache) {
    return true
  }

  return false
}

/**
 * Important - Add any new personalized argument checks to this list. That way,
 * logged-in queries _without_ this argument can still be `@cacheable`, and when
 * queries include this argument, those queries will not be cached.
 */
export const hasPersonalizedArguments = (variables: Variables) => {
  if (variables?.requestedVersionState === "DRAFT") {
    return true
  }

  return variables?.input?.includeArtworksByFollowedArtists
}
