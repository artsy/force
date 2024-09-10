// TODO: Better introspection around if this is a SearchBar query,
// or further refactoring to extract `addMiddlewareToEnvironment(environment)`,
// to be used in the SearchBar QueryRenderer (for example).
export function searchBarImmediateResolveMiddleware() {
  return next => req => {
    if (req.id === "SearchBarSuggestQuery" && req.variables.term === "")
      return Promise.resolve({ data: { viewer: {} } })
    return next(req)
  }
}
