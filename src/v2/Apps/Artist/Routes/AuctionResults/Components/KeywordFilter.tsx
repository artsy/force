import { LabeledInput, MagnifyingGlassIcon } from "@artsy/palette"
import { debounce } from "lodash"
import React, { useEffect, useMemo } from "react"
import { useAuctionResultsFilterContext } from "../AuctionResultsFilterContext"

const DEBOUNCE_DELAY = 300

export const KeywordFilter: React.FC = () => {
  const filterContext = useAuctionResultsFilterContext()

  const updateKeywordFilter = (text: string) => {
    filterContext.setFilter?.("keyword", text)
  }

  const handleChangeText = useMemo(
    () => debounce(updateKeywordFilter, DEBOUNCE_DELAY),
    [filterContext]
  )

  // Stop the invocation of the debounced function after unmounting
  useEffect(() => {
    return () => handleChangeText.cancel()
  }, [])

  return (
    <LabeledInput
      placeholder="Search by artwork title, series, or description"
      onChange={event => handleChangeText(event.currentTarget.value)}
      type="text"
      label={<MagnifyingGlassIcon />}
    />
  )
}
