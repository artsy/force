import React, { FC } from "react"
import { CloseIcon, Flex, Pill, Spacer } from "@artsy/palette"
import { CreateAlertButton } from "./CreateAlertButton"
import { SavedSearchAttributes } from "../types"
import {
  ArtworkFilters,
  initialArtworkFilterState,
  useArtworkFilterContext,
} from "../../ArtworkFilterContext"
import { isArray } from "lodash"

const PILL_HORIZONTAL_MARGIN_SIZE = 0.5
const CLOSE_ICON_SIZE = 15

export interface DefaultFilterPill {
  isDefault: true
  name: string
  displayName: string
}

export interface NonDefaultFilterPill {
  isDefault?: false
  name: string
  displayName: string
  filterName: string
}

export type FilterPill = DefaultFilterPill | NonDefaultFilterPill

interface FiltersPillsProps {
  pills: FilterPill[]
  savedSearchAttributes: SavedSearchAttributes
}

export const FiltersPills: FC<FiltersPillsProps> = ({
  pills,
  savedSearchAttributes,
}) => {
  const filterContext = useArtworkFilterContext()

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
    <>
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
        <CreateAlertButton
          savedSearchAttributes={savedSearchAttributes}
          ml={PILL_HORIZONTAL_MARGIN_SIZE}
        />
      </Flex>
      <Spacer mt={4} />
    </>
  )
}
