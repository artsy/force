import qs from "qs"

export const getSearchTerm = (location: Location): string => {
  const term = qs.parse(location.search?.slice(1))?.term ?? ""

  if (Array.isArray(term)) {
    const firstTerm = term[0]
    return typeof firstTerm === "string" ? firstTerm : ""
  }

  return typeof term === "string" ? term : ""
}
