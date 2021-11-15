import { Checkbox, Flex, useThemeConfig } from "@artsy/palette"
import { isEmpty } from "lodash"
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

  const checkboxes: WayToBuy[] = [
    {
      // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
      disabled: isDisabled(filterContext.counts.ecommerce_artworks),
      name: "Buy Now",
      state: "acquireable",
    },
    {
      // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
      disabled: isDisabled(filterContext.counts.has_make_offer_artworks),
      name: "Make Offer",
      state: "offerable",
    },
    {
      // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
      disabled: isDisabled(filterContext.counts.auction_artworks),
      name: "Bid",
      state: "atAuction",
    },
    {
      // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
      disabled: isDisabled(filterContext.counts.for_sale_artworks),
      name: "Inquire",
      state: "inquireableOnly",
    },
  ]

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
