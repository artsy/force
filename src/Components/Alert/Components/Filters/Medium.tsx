import { Checkbox, Column, GridColumns, Spacer, Text } from "@artsy/palette"
import { FC } from "react"
import { useAlertContext } from "Components/Alert/Hooks/useAlertContext"
import { MEDIUM_OPTIONS } from "Components/ArtworkFilter/ArtworkFilters/MediumFilter"
import { ShowMore } from "Components/Alert/Components/Filters/ShowMore"

export const Medium: FC = () => {
  const { state, dispatch } = useAlertContext()

  const toggleSelection = (selected, name) => {
    let updatedValues = state.criteria.additionalGeneIDs || []

    if (selected) {
      updatedValues = [...updatedValues, name]
    } else {
      updatedValues = updatedValues.filter(item => item !== name)
    }

    dispatch({
      type: "SET_CRITERIA_ATTRIBUTE",
      payload: { key: "additionalGeneIDs", value: updatedValues },
    })
  }

  return (
    <>
      <Text variant="sm-display" pb={1}>
        Medium
      </Text>

      <Spacer y={2} />

      <GridColumns>
        <ShowMore expanded={false}>
          {MEDIUM_OPTIONS.map(({ name, value }, index) => {
            return (
              <Column span={6} key={index}>
                <Checkbox
                  onSelect={selected => toggleSelection(selected, value)}
                  selected={state.criteria.additionalGeneIDs?.includes(value)}
                >
                  {name}
                </Checkbox>
              </Column>
            )
          })}
        </ShowMore>
      </GridColumns>
    </>
  )
}
