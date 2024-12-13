import SearchIcon from "@artsy/icons/SearchIcon"
import { LabeledInput } from "@artsy/palette"
import { useAuctionResultsFilterContext } from "Apps/Artist/Routes/AuctionResults/AuctionResultsFilterContext"
import { FilterExpandable } from "Components/ArtworkFilter/ArtworkFilters/FilterExpandable"
import { debounce } from "lodash"
import { useEffect, useMemo } from "react"
import type * as React from "react"

const DEBOUNCE_DELAY = 300

export const KeywordFilter: React.FC<React.PropsWithChildren<unknown>> = () => {
  const filterContext = useAuctionResultsFilterContext()

  const updateKeywordFilter = (text: string) => {
    filterContext.setFilter?.("keyword", text)
  }

  const handleChangeText = useMemo(
    () => debounce(updateKeywordFilter, DEBOUNCE_DELAY),
    // FIXME:
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [filterContext]
  )

  // Stop the invocation of the debounced function after unmounting
  useEffect(() => {
    return () => handleChangeText?.cancel?.()
    // FIXME:
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <FilterExpandable expanded label="Keyword Search">
      <LabeledInput
        placeholder="Search by artwork title, series, or description"
        onChange={event => handleChangeText(event.currentTarget.value)}
        type="text"
        label={<SearchIcon />}
      />
    </FilterExpandable>
  )
}
