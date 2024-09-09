// TODO: Better introspection around if this is a SearchBar query,
// or further refactoring to extract `addMiddlewareToEnvironment(environment)`,
// to be used in the SearchBar QueryRenderer (for example).
// Also - why does the SearchBar query always perform an empty query?
export function searchBarImmediateResolveMiddleware() {
  return next => req => {
    if (req.id === "SearchBarInputSuggestQuery" && req.variables.term === "")
      return Promise.resolve({ data: { viewer: {} } })
    return next(req)
  }
}
