import * as React from "react"
import { Radio, Flex } from "@artsy/palette"

import {
  useAuctionResultsFilterContext,
  useCurrentlySelectedFiltersForAuctionResults,
} from "Apps/Artist/Routes/AuctionResults/AuctionResultsFilterContext"
import { FilterExpandable } from "Components/ArtworkFilter/ArtworkFilters/FilterExpandable"
import { ShowMore } from "Components/ArtworkFilter/ArtworkFilters/ShowMore"

export const CurrencyFilter: React.FC = () => {
  const { setFilter, aggregations } = useAuctionResultsFilterContext()
  const {
    currency: selectedCurrency,
  } = useCurrentlySelectedFiltersForAuctionResults()

  const currencies = aggregations?.find(
    aggregation => aggregation.slice === "CURRENCIES_COUNT"
  ) || { counts: [] }

  const counts = currencies?.counts.filter(c => c !== null)

  return (
    <FilterExpandable label="Original Currency of Sale" expanded>
      <Flex flexDirection="column" alignItems="left">
        <ShowMore initial={5}>
          {counts?.map((currency, index) => (
            <Radio
              key={index}
              selected={selectedCurrency === currency?.name}
              value={currency?.name}
              label={currency?.name}
              my={1}
              onSelect={() => setFilter?.("currency", currency?.name)}
            />
          ))}
        </ShowMore>
      </Flex>
    </FilterExpandable>
  )
}
