import { useAlertContext } from "Components/Alert/Hooks/useAlertContext"
import { SearchCriteriaAttributeKeys } from "Components/SavedSearchAlert/types"

export const handleFieldsWithMultipleValues = ({
  selectedValue,
  criteriaKey,
  selected,
  value,
  dispatch,
}: {
  selectedValue: string[] | null
  criteriaKey: SearchCriteriaAttributeKeys
  selected: boolean
  value: string
  dispatch: ReturnType<typeof useAlertContext>["dispatch"]
}) => {
  let updatedValues = (selectedValue || []) as string[]

  if (selected) {
    updatedValues = [...updatedValues, value]
  } else {
    updatedValues = updatedValues.filter(item => item !== value)
  }

  dispatch({
    type: "SET_CRITERIA_ATTRIBUTE",
    payload: { key: criteriaKey, value: updatedValues },
  })
}
