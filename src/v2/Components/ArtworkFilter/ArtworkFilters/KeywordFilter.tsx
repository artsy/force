import { LabeledInput, MagnifyingGlassIcon } from "@artsy/palette"
import { FilterExpandable } from "./FilterExpandable"
import React, { useEffect, useMemo, useState } from "react"
import { debounce } from "lodash"
import { useArtworkFilterContext } from "../ArtworkFilterContext"

const DEBOUNCE_DELAY = 300

export const KeywordFilter: React.FC = () => {
  const filterContext = useArtworkFilterContext()

  const [keyword, setKeyword] = useState(filterContext.filters!.keyword)

  const updateKeywordFilter = (text: string) => {
    let textOrUndefined = text.length === 0 ? undefined : text
    filterContext.setFilter("keyword", textOrUndefined)
  }

  const handleDebounce = useMemo(
    () => debounce(updateKeywordFilter, DEBOUNCE_DELAY),
    []
  )

  const handleChangeText = text => {
    setKeyword(text)
    handleDebounce(text)
  }

  // Stop the invocation of the debounced function after unmounting
  useEffect(() => {
    return () => handleDebounce.cancel()
  }, [])

  useEffect(() => {
    if (filterContext.filters!.keyword === undefined) {
      setKeyword("")
    }
  }, [filterContext.filters!.keyword])

  return (
    <FilterExpandable label="Keyword Search" expanded={true}>
      <LabeledInput
        value={keyword}
        placeholder="Enter a search term"
        onChange={event => handleChangeText(event.currentTarget.value)}
        type="text"
        label={<MagnifyingGlassIcon />}
        data-testid="keywordSearchInput"
      />
    </FilterExpandable>
  )
}
