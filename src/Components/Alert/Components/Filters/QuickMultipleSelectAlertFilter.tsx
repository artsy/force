import { handleFieldsWithMultipleValues } from "Components/Alert/Helpers/handleFieldsWithMultipleValues"
import { useAlertContext } from "Components/Alert/Hooks/useAlertContext"
import type { SearchCriteriaAttributeKeys } from "Components/SavedSearchAlert/types"
import {
  Checkbox,
  Clickable,
  Column,
  GridColumns,
  Spacer,
  Text,
} from "@artsy/palette"
import { type FC, useState } from "react"

interface QuickMultipleSelectAlertFilterProps {
  criteriaKey: SearchCriteriaAttributeKeys
  description?: string
  label: string
  options: { value: string; name: string }[]

  /** Optionally truncate the list of options to this size, and display a Show/Hide toggle to disclose the full list. */
  truncate?: number
}

export const QuickMultipleSelectAlertFilter: FC<
  React.PropsWithChildren<QuickMultipleSelectAlertFilterProps>
> = ({
  criteriaKey,
  description,
  label,
  options,
  truncate = Number.POSITIVE_INFINITY,
}) => {
  const { state, dispatch } = useAlertContext()

  const [isExpanded, setExpanded] = useState(false)
  const hasMore = options.length > truncate
  const displayedOptions = isExpanded ? options : options.slice(0, truncate)

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
        {displayedOptions.map(({ name, value }, index) => {
          return (
            <Column span={6} key={index}>
              <Checkbox
                onSelect={selected => toggleSelection(selected, value)}
                selected={(
                  state.criteria[criteriaKey] as string[] | null
                )?.includes(value)}
              >
                {name}
              </Checkbox>
            </Column>
          )
        })}
      </GridColumns>

      {hasMore && (
        <Clickable
          mt={2}
          onClick={() => setExpanded(visibility => !visibility)}
          textDecoration={"underline"}
        >
          {isExpanded ? "Hide" : "Show more"}
        </Clickable>
      )}
    </>
  )
}
