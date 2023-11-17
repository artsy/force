import { Checkbox, Column, GridColumns, Spacer, Text } from "@artsy/palette"
import { FC } from "react"
import { useAlertContext } from "Components/Alert/Hooks/useAlertContext"
import { ShowMore } from "Components/Alert/Components/Filters/ShowMore"
import { SearchCriteriaAttributeKeys } from "Components/SavedSearchAlert/types"

interface QuickMultipleSelectAlertFilterProps {
  criteriaKey: SearchCriteriaAttributeKeys
  description?: string
  expanded?: boolean
  label: string
  options: { value: string; name: string }[]
}

export const QuickMultipleSelectAlertFilter: FC<QuickMultipleSelectAlertFilterProps> = ({
  criteriaKey,
  description,
  label,
  options,
}) => {
  const { state, dispatch } = useAlertContext()

  const toggleSelection = (selected, name) => {
    let updatedValues = (state.criteria[criteriaKey] || []) as string[]

    if (selected) {
      updatedValues = [...updatedValues, name]
    } else {
      updatedValues = updatedValues.filter(item => item !== name)
    }

    dispatch({
      type: "SET_CRITERIA_ATTRIBUTE",
      payload: { key: criteriaKey, value: updatedValues },
    })
  }

  return (
    <>
      <Text variant="sm-display" pb={1}>
        {label}
      </Text>

      {!!description && (
        <Text variant="xs" pb={1} mt={2}>
          {description}
        </Text>
      )}

      <Spacer y={2} />

      <GridColumns>
        {options.map(({ name, value }, index) => {
          return (
            <Column span={6} key={index}>
              <Checkbox
                onSelect={selected => toggleSelection(selected, value)}
                selected={(state.criteria[criteriaKey] as
                  | string[]
                  | null)?.includes(value)}
              >
                {name}
              </Checkbox>
            </Column>
          )
        })}
      </GridColumns>
    </>
  )
}
