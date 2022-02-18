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
import {
  SavedSearchContextProvider,
  useSavedSearchContext,
} from "../Utils/SavedSearchContext"
import { FilterPill, SavedSearchAttributes } from "../types"
import { getAllowedFiltersForSavedSearchInput } from "../../Utils/allowedFilters"

const PILL_HORIZONTAL_MARGIN_SIZE = 0.5

interface ArtworkGridFilterPillsContainerProps {
  savedSearchAttributes: SavedSearchAttributes
}

export const ArtworkGridFilterPills = () => {
  const { setFilter, currentlySelectedFilters } = useArtworkFilterContext()
  const { pills, entity } = useSavedSearchContext()

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
      <CreateAlertButton entity={entity} ml={PILL_HORIZONTAL_MARGIN_SIZE} />
    </Flex>
  )
}

export const ArtworkGridFilterPillsContainer: React.FC<ArtworkGridFilterPillsContainerProps> = props => {
  const { savedSearchAttributes } = props
  const { filters, aggregations } = useArtworkFilterContext()
  const allowedFilters = getAllowedFiltersForSavedSearchInput(filters ?? {})

  return (
    <SavedSearchContextProvider
      entity={savedSearchAttributes}
      filters={allowedFilters}
      aggregations={aggregations ?? []}
    >
      <ArtworkGridFilterPills />
    </SavedSearchContextProvider>
  )
}
