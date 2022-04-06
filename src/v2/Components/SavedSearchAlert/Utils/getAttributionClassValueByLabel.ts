import { checkboxValues } from "v2/Components/ArtworkFilter/ArtworkFilters/AttributionClassFilter"

export const getAttributionClassValueByLabel = (label: string) => {
  const option = checkboxValues.find(
    value => value.name.toLowerCase() === label.toLowerCase()
  )

  if (option?.value) {
    return [option.value]
  }

  return []
}
