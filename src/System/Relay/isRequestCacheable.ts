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
