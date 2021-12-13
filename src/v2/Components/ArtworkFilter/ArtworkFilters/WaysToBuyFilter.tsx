import { Checkbox, Flex, useThemeConfig } from "@artsy/palette"
import { entries, isEmpty } from "lodash"
import { FC } from "react"
import {
  ArtworkFilters,
  useArtworkFilterContext,
} from "../ArtworkFilterContext"
import { FilterExpandable } from "./FilterExpandable"

interface WayToBuy {
  disabled: any
  name: string
  state: keyof ArtworkFilters
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
    (acc, [state, value]) => {
      acc.push({
        state: state as keyof ArtworkFilters,
        name: value.name,
        disabled: isDisabled(filterContext.counts?.[value.countName]),
      })
      return acc
    },
    [] as WayToBuy[]
  )

  const tokens = useThemeConfig({
    v2: { my: 0.5 },
    v3: { my: 1 },
  })

  // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
  const selection = filterContext.currentlySelectedFilters()
  const hasSelection =
    !!selection.acquireable ||
    !!selection.offerable ||
    !!selection.atAuction ||
    !!selection.inquireableOnly

  return (
    <FilterExpandable label="Ways to Buy" expanded={hasSelection || expanded}>
      <Flex flexDirection="column">
        {checkboxes.map((checkbox, index) => {
          return (
            <Checkbox
              key={index}
              disabled={checkbox.disabled}
              onSelect={value => filterContext.setFilter(checkbox.state, value)}
              selected={Boolean(
                // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
                filterContext.currentlySelectedFilters()[checkbox.state]
              )}
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
