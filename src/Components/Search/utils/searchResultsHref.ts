/** The search results page for a raw query term */
export const searchResultsHref = (term: string): string => {
  return `/search?term=${encodeURIComponent(term)}`
}
