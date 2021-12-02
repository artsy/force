export const getNamePlaceholder = (
  artistName: string,
  filtersCount: number
) => {
  const filtersCountLabel = filtersCount > 1 ? "filters" : "filter"
  return `${artistName} • ${filtersCount} ${filtersCountLabel}`
}
