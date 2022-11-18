import { Checkbox, Flex } from "@artsy/palette"
import { entries, isEmpty } from "lodash"
import { FC } from "react"
import {
  ArtworkFilters,
  SelectedFiltersCountsLabels,
  useArtworkFilterContext,
  useCurrentlySelectedFilters,
} from "../ArtworkFilterContext"
import { useFilterLabelCountByKey } from "../Utils/useFilterLabelCountByKey"
import { FilterExpandable } from "./FilterExpandable"

interface WayToBuy {
  selected: boolean
  disabled: boolean
  name: string
  key: keyof ArtworkFilters
}

export interface WaysToBuyFilterProps {
  expanded?: boolean
}

export const WAYS_TO_BUY_OPTIONS = {
  acquireable: {
    name: "Purchase",
    countName: "ecommerce_artworks",
  },
  offerable: {
    name: "Make Offer",
    countName: "has_make_offer_artworks",
  },
  atAuction: {
    name: "Bid",
    countName: "auction_artworks",
  },
  inquireableOnly: {
    name: "Contact Gallery",
    countName: "for_sale_artworks",
  },
}

export const WaysToBuyFilter: FC<WaysToBuyFilterProps> = ({ expanded }) => {
  const filterContext = useArtworkFilterContext()
  const currentSelectedFilters = useCurrentlySelectedFilters()

  const filtersCount = useFilterLabelCountByKey(
    SelectedFiltersCountsLabels.waysToBuy
  )
  const label = `Ways to Buy${filtersCount}`

  /**
   * If counts aren't passed, enable by default
   */
  const isDisabled = condition => {
    if (isEmpty(filterContext.counts) || condition === undefined) {
      return false
    }

    return !Boolean(condition)
  }

  const checkboxes: WayToBuy[] = entries(WAYS_TO_BUY_OPTIONS).reduce(
    (acc, [key, value]) => {
      acc.push({
        key: key as keyof ArtworkFilters,
        name: value.name,
        disabled: isDisabled(filterContext.counts?.[value.countName]),
        selected: !!currentSelectedFilters[key],
      })
      return acc
    },
    [] as WayToBuy[]
  )

  const hasSelection = checkboxes.some(checkbox => checkbox.selected)

  return (
    <FilterExpandable label={label} expanded={hasSelection || expanded}>
      <Flex flexDirection="column">
        {checkboxes.map((checkbox, index) => {
          return (
            <Checkbox
              key={index}
              disabled={checkbox.disabled}
              onSelect={value => filterContext.setFilter(checkbox.key, value)}
              selected={checkbox.selected}
              my={1}
            >
              {checkbox.name}
            </Checkbox>
          )
        })}
      </Flex>
    </FilterExpandable>
  )
}
