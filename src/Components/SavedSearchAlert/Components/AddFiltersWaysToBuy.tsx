import { Box, Checkbox, Flex, Spacer, Text } from "@artsy/palette"
import { entries } from "lodash"
import { FC } from "react"

import { useSavedSearchAlertContext } from "Components/SavedSearchAlert/SavedSearchAlertContext"
import { SearchCriteriaAttributes } from "__generated__/createSavedSearchAlertMutation.graphql"

interface WayToBuy {
  selected: boolean
  name: string
  key: keyof SearchCriteriaAttributes
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

export const AddFiltersWaysToBuy: FC = () => {
  const filterContext = useSavedSearchAlertContext()

  const checkboxes: WayToBuy[] = entries(WAYS_TO_BUY_OPTIONS).reduce(
    (acc, [key, value]) => {
      acc.push({
        key: key as keyof SearchCriteriaAttributes,
        name: value.name,
        selected: filterContext.criteria[key],
      })
      return acc
    },
    [] as WayToBuy[]
  )

  return (
    <>
      <Text variant="sm-display">Ways to buy</Text>
      <Spacer y={2} />
      <Box style={{ columns: "2" }}>
        <Flex flexDirection="column">
          {checkboxes.map((checkbox, index) => {
            return (
              <Checkbox
                key={index}
                onSelect={value =>
                  filterContext.setCriteriaValue(
                    checkbox.key as keyof typeof WAYS_TO_BUY_OPTIONS,
                    value
                  )
                }
                selected={checkbox.selected}
                my={1}
              >
                {checkbox.name}
              </Checkbox>
            )
          })}
        </Flex>
      </Box>
    </>
  )
}
