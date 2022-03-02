import { Checkbox, Flex, useThemeConfig } from "@artsy/palette"
import { entries, isEmpty } from "lodash"
import { FC } from "react"
import {
  ArtworkFilters,
  SelectedFiltersCountsLabels,
  useArtworkFilterContext,
} from "../ArtworkFilterContext"
import { useCurrentlySelectedFilters } from "../useCurrentlySelectedFilters"
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
    name: "Buy Now",
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
    name: "Inquire",
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

  const tokens = useThemeConfig({
    v2: { my: 0.5 },
    v3: { my: 1 },
  })

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
              my={tokens.my}
            >
              {checkbox.name}
            </Checkbox>
          )
        })}
      </Flex>
    </FilterExpandable>
  )
}
