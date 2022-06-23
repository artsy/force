import { LabeledInput, MagnifyingGlassIcon } from "@artsy/palette"
import { FilterExpandable } from "./FilterExpandable"
import React, { useEffect, useMemo } from "react"
import { debounce } from "lodash"
import {
  useCurrentlySelectedFilters,
  useArtworkFilterContext,
} from "../ArtworkFilterContext"

const DEBOUNCE_DELAY = 100

export const KeywordFilter: React.FC = () => {
  const { keyword = [] } = useCurrentlySelectedFilters()
  const filterContext = useArtworkFilterContext()

  const updateKeywordFilter = (text: string) => {
    let textOrUndefined = !text ? undefined : text
    filterContext.setFilter("keyword", textOrUndefined)
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
    <FilterExpandable label="Keyword Search" expanded={true}>
      <LabeledInput
        value={keyword}
        placeholder="Enter a search term"
        onChange={event => handleChangeText(event.currentTarget.value)}
        type="text"
        label={<MagnifyingGlassIcon />}
      />
    </FilterExpandable>
  )
}
