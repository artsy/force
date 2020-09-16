import { Checkbox, Flex, Toggle } from "@artsy/palette"
import { isEmpty } from "lodash"
import React, { FC } from "react"

import {
  ArtworkFilters,
  useArtworkFilterContext,
} from "../ArtworkFilterContext"
import { OptionText } from "./OptionText"

interface WayToBuy {
  disabled: any
  name: string
  state: keyof ArtworkFilters
}

export const WaysToBuyFilter: FC = () => {
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
      disabled: isDisabled(filterContext.counts.ecommerce_artworks),
      name: "Buy now",
      state: "acquireable",
    },
    {
      disabled: isDisabled(filterContext.counts.has_make_offer_artworks),
      name: "Make offer",
      state: "offerable",
    },
    {
      disabled: isDisabled(
        filterContext.counts.auction_artworks ||
          !filterContext.isDefaultValue("priceRange")
      ),
      name: "Bid",
      state: "atAuction",
    },
    {
      disabled: isDisabled(filterContext.counts.for_sale_artworks),
      name: "Inquire",
      state: "inquireableOnly",
    },
  ]

  return (
    <Toggle label="Ways to buy" expanded>
      <Flex flexDirection="column">
        {checkboxes.map((checkbox, index) => {
          const props = {
            disabled: checkbox.disabled,
            key: index,
            onSelect: value => filterContext.setFilter(checkbox.state, value),
            selected: Boolean(
              filterContext.currentlySelectedFilters()[checkbox.state]
            ),
          }
          return (
            <Checkbox {...props}>
              <OptionText>{checkbox.name}</OptionText>
            </Checkbox>
          )
        })}
      </Flex>
    </Toggle>
  )
}
