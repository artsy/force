import qs from "qs"

export const getSearchTerm = (location: Location): string => {
  const term = qs.parse(location.search?.slice(1))?.term ?? ""

  if (Array.isArray(term)) {
    return term[0]
  }

  return term
}
