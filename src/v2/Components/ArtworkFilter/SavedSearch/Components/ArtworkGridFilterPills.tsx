import React from "react"
import { Flex } from "@artsy/palette"
import { CreateAlertButton } from "./CreateAlertButton"
import {
  ArtworkFilters,
  initialArtworkFilterState,
  useArtworkFilterContext,
} from "../../ArtworkFilterContext"
import { isArray } from "lodash"
import { Pills } from "./Pills"
import { FilterPill, SavedSearchEntity } from "../types"
import { extractPills } from "v2/Components/SavedSearchAlert/Utils/extractPills"
import { getSearchCriteriaFromFilters } from "../Utils"

const PILL_HORIZONTAL_MARGIN_SIZE = 0.5

interface ArtworkGridFilterPillsProps {
  savedSearchEntity: SavedSearchEntity
}

export const ArtworkGridFilterPills: React.FC<ArtworkGridFilterPillsProps> = props => {
  const { savedSearchEntity } = props
  const {
    filters,
    aggregations,
    setFilter,
    currentlySelectedFilters,
  } = useArtworkFilterContext()
  const criteria = getSearchCriteriaFromFilters(
    savedSearchEntity.id,
    filters ?? {}
  )
  const pills = extractPills(criteria, aggregations, savedSearchEntity)

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
      <CreateAlertButton
        entity={savedSearchEntity}
        ml={PILL_HORIZONTAL_MARGIN_SIZE}
      />
    </Flex>
  )
}
