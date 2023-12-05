import { SearchCriteriaAttributes } from "Components/SavedSearchAlert/types"
import { isEqual } from "lodash"

export const isValueSelected = ({
  selectedCriteria,
  value,
}: {
  selectedCriteria: SearchCriteriaAttributes
  value: any
}) => {
  if (!selectedCriteria) {
    return false
  }
  if (typeof selectedCriteria === "string") {
    return selectedCriteria === value
  }
  if (Array.isArray(selectedCriteria)) {
    return (selectedCriteria as any[]).find(attributeValue =>
      isEqual(attributeValue, value)
    )
  }
  return isEqual(selectedCriteria, value)
}
