import { Checkbox, Column, GridColumns, Spacer, Text } from "@artsy/palette"
import { FC } from "react"
import { useAlertContext } from "Components/Alert/Hooks/useAlertContext"
import { SearchCriteriaAttributeKeys } from "Components/SavedSearchAlert/types"
import { handleFieldsWithMultipleValues } from "Components/Alert/Helpers/handleFieldsWithMultipleValues"

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

  const toggleSelection = (selected, value) => {
    handleFieldsWithMultipleValues({
      selectedValue: state.criteria[criteriaKey] as string[] | null,
      criteriaKey,
      selected,
      value,
      dispatch,
    })
  }

  return (
    <>
      <Text variant="sm-display">{label}</Text>

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
