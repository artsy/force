import qs from "qs"

export const getSearchTerm = (location: Location): string => {
  const term = qs.parse(location.search?.slice(1))?.term ?? ""

  if (Array.isArray(term)) {
    // FIXME: TypeScript error after dependency update - term[0] could be ParsedQs type, not just string
    return term[0]
  }

  // FIXME: TypeScript error after dependency update - term could be ParsedQs type, not just string
  return term
}
