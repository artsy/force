import { LabeledInput } from "@artsy/palette"
import { FilterExpandable } from "./FilterExpandable"
import React, { useRef, useEffect, useMemo, useState } from "react"
import { debounce } from "lodash"
import {
  useCurrentlySelectedFilters,
  useArtworkFilterContext,
} from "Components/ArtworkFilter/ArtworkFilterContext"
import SearchIcon from "@artsy/icons/SearchIcon"

const DEBOUNCE_DELAY = 300

export const KeywordFilter: React.FC = () => {
  const { setFilter } = useArtworkFilterContext()

  const setFilterRef = useRef(setFilter)
  setFilterRef.current = setFilter

  const { keyword } = useCurrentlySelectedFilters()

  const [value, setValue] = useState(keyword)

  const updateKeywordFilter = (text: string) => {
    const textOrUndefined = text.length === 0 ? undefined : text
    setFilterRef.current("keyword", textOrUndefined)
  }

  const handleDebounce = useMemo(
    () => debounce(updateKeywordFilter, DEBOUNCE_DELAY),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  )

  const handleChangeText = text => {
    setValue(text)
    handleDebounce(text)
  }

  // Stop the invocation of the debounced function after unmounting
  useEffect(() => {
    return () => handleDebounce.cancel()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (keyword === undefined) {
      setValue("")
    }
  }, [keyword, setValue])

  return (
    <FilterExpandable label="Keyword Search" expanded>
      <LabeledInput
        value={value}
        placeholder="Enter a search term"
        onChange={event => handleChangeText(event.currentTarget.value)}
        type="text"
        label={<SearchIcon />}
        data-testid="keywordSearchInput"
      />
    </FilterExpandable>
  )
}
