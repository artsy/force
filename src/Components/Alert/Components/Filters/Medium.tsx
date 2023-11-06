import { Checkbox, Column, GridColumns, Text } from "@artsy/palette"
import { FC } from "react"
import { useAlertContext } from "Components/Alert/Hooks/useAlertContext"
import { MEDIUM_OPTIONS } from "Components/ArtworkFilter/ArtworkFilters/MediumFilter"
import { useArtworkFilterContext } from "Components/ArtworkFilter/ArtworkFilterContext"
import { sortResults } from "Components/ArtworkFilter/ArtworkFilters/Utils/sortResults"
import { intersection } from "lodash"
import {
  INITIAL_ITEMS_TO_SHOW,
  ShowMore,
} from "Components/Alert/Components/Filters/ShowMore"

export const Medium: FC = () => {
  const { state, dispatch } = useAlertContext()
  const filters = useArtworkFilterContext()

  const additionalGeneIDs = state.criteria.additionalGeneIDs || []

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

  const mediums = filters.aggregations?.find(agg => agg.slice === "MEDIUM") || {
    slice: "",
    counts: [],
  }

  const allowedMediums = mediums?.counts?.length
    ? mediums.counts
    : MEDIUM_OPTIONS

  const intersected = intersection(
    additionalGeneIDs,
    allowedMediums.slice(INITIAL_ITEMS_TO_SHOW).map(({ value }) => value)
  )
  const hasBelowTheFoldMediumFilter = intersected.length > 0
  const resultsSorted = sortResults(additionalGeneIDs, allowedMediums)

  return (
    <>
      <Text variant="sm-display" mb={3}>
        Medium
      </Text>

      <GridColumns>
        <ShowMore expanded={hasBelowTheFoldMediumFilter}>
          {resultsSorted.map(({ name, value }, index) => {
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
