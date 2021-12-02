import React, { FC } from "react"
import { CloseIcon, Flex, Pill } from "@artsy/palette"
import { CreateAlertButton } from "./CreateAlertButton"
import { SavedSearchAttributes } from "../types"
import {
  ArtworkFilters,
  initialArtworkFilterState,
  useArtworkFilterContext,
} from "../../ArtworkFilterContext"
import { isArray } from "lodash"
import { FilterPill, useFilterPillsContext } from "../Utils/FilterPillsContext"

const PILL_HORIZONTAL_MARGIN_SIZE = 0.5
const CLOSE_ICON_SIZE = 15

export interface FiltersPillsProps {
  savedSearchAttributes?: SavedSearchAttributes
}

export const FiltersPills: FC<FiltersPillsProps> = ({
  savedSearchAttributes,
}) => {
  const filterContext = useArtworkFilterContext()
  const { pills = [] } = useFilterPillsContext()

  const removePill = (pill: FilterPill) => {
    if (pill.isDefault) return

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
      {pills.map(pill => (
        <Pill
          key={`filter-label-${pill.name}`}
          variant="textSquare"
          mx={PILL_HORIZONTAL_MARGIN_SIZE}
          mb={1}
          onClick={() => removePill(pill)}
        >
          {pill.displayName}
          {!pill.isDefault && (
            <CloseIcon
              fill="currentColor"
              width={CLOSE_ICON_SIZE}
              height={CLOSE_ICON_SIZE}
              ml={0.5}
            />
          )}
        </Pill>
      ))}
      {savedSearchAttributes && (
        <CreateAlertButton
          savedSearchAttributes={savedSearchAttributes}
          ml={PILL_HORIZONTAL_MARGIN_SIZE}
        />
      )}
    </Flex>
  )
}
