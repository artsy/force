const CACHEABLE_DIRECTIVE_REGEX = /@\bcacheable\b/
export const isRequestCacheable = req => {
  const queryText = req.operation?.text

  return queryText && CACHEABLE_DIRECTIVE_REGEX.test(queryText)
}
