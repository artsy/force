export const getNamePlaceholder = (artistName: string, pills: string[]) => {
  const filtersCountLabel = pills.length > 1 ? "filters" : "filter"
  return `${artistName} • ${pills.length} ${filtersCountLabel}`
}
