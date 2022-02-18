import React, { FC } from "react"
import { Flex } from "@artsy/palette"
import { CreateAlertButton } from "./CreateAlertButton"
import { SavedSearchAttributes } from "../types"
import {
  ArtworkFilters,
  initialArtworkFilterState,
  useArtworkFilterContext,
} from "../../ArtworkFilterContext"
import { isArray } from "lodash"
import { FilterPill } from "../Utils/FilterPillsContext"
import { Pills } from "./Pills"
import { extractPills } from "v2/Components/SavedSearchAlert/Utils/extractPills"
import { getAllowedFiltersForSavedSearchInput } from "../../Utils/allowedFilters"

const PILL_HORIZONTAL_MARGIN_SIZE = 0.5

export interface ArtworkGridFilterPillsProps {
  savedSearchAttributes?: SavedSearchAttributes
}

export const ArtworkGridFilterPills: FC<ArtworkGridFilterPillsProps> = ({
  savedSearchAttributes,
}) => {
  const {
    filters,
    aggregations,
    setFilter,
    currentlySelectedFilters,
  } = useArtworkFilterContext()
  const allowedFilters = getAllowedFiltersForSavedSearchInput(filters ?? {})
  const pills = extractPills(
    allowedFilters,
    aggregations,
    savedSearchAttributes
  )

  const removePill = (pill: FilterPill) => {
    if (pill.isDefault) {
      return
    }

    const filters = currentlySelectedFilters!()
    let filterValue = filters[pill.filterName]

    if (isArray(filterValue)) {
      filterValue = filterValue.filter(value => value !== pill.name)
    } else {
      filterValue = initialArtworkFilterState[pill.filterName]
    }

    setFilter(pill.filterName as keyof ArtworkFilters, filterValue)
  }

  return (
    <Flex flexWrap="wrap" mx={-PILL_HORIZONTAL_MARGIN_SIZE}>
      <Pills items={pills} onDeletePress={removePill} />
      {savedSearchAttributes && (
        <CreateAlertButton
          savedSearchAttributes={savedSearchAttributes}
          ml={PILL_HORIZONTAL_MARGIN_SIZE}
        />
      )}
    </Flex>
  )
}
