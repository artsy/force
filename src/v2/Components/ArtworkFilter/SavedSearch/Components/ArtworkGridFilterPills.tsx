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
import { FilterPill, useFilterPillsContext } from "../Utils/FilterPillsContext"
import { Pills } from "./Pills"

const PILL_HORIZONTAL_MARGIN_SIZE = 0.5

export interface ArtworkGridFilterPillsProps {
  savedSearchAttributes: SavedSearchAttributes | null
}

export const ArtworkGridFilterPills: FC<ArtworkGridFilterPillsProps> = ({
  savedSearchAttributes,
}) => {
  const filterContext = useArtworkFilterContext()
  const { pills = [] } = useFilterPillsContext()

  const removePill = (pill: FilterPill) => {
    if (pill.isDefault) {
      return
    }

    let filter = filterContext?.currentlySelectedFilters?.()[pill.filterName]

    if (isArray(filter)) {
      filter = filter.filter(value => value !== pill.name)
      filterContext.setFilter(pill.filterName as keyof ArtworkFilters, filter)
    } else {
      filterContext.setFilter(
        pill.filterName as keyof ArtworkFilters,
        initialArtworkFilterState[pill.filterName]
      )
    }
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
