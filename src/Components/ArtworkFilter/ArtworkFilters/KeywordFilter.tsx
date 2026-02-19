import SearchIcon from "@artsy/icons/SearchIcon"
import { LabeledInput } from "@artsy/palette"
import {
  useArtworkFilterContext,
  useCurrentlySelectedFilters,
} from "Components/ArtworkFilter/ArtworkFilterContext"
import { debounce } from "es-toolkit"
import type React from "react"
import { useEffect, useMemo, useRef, useState } from "react"
import { FilterExpandable } from "./FilterExpandable"

const DEBOUNCE_DELAY = 300

export const KeywordFilter: React.FC<React.PropsWithChildren<unknown>> = () => {
  const { setFilter } = useArtworkFilterContext()

  const setFilterRef = useRef(setFilter)
  setFilterRef.current = setFilter

  const { keyword } = useCurrentlySelectedFilters()

  const [value, setValue] = useState(keyword)

  const updateKeywordFilter = (text: string) => {
    const textOrUndefined = text.length === 0 ? undefined : text
    setFilterRef.current("keyword", textOrUndefined)
  }

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  const handleDebounce = useMemo(
    () => debounce(updateKeywordFilter, DEBOUNCE_DELAY),
    [],
  )

  const handleChangeText = text => {
    setValue(text)
    handleDebounce(text)
  }

  // Stop the invocation of the debounced function after unmounting
  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    return () => handleDebounce.cancel?.()
  }, [])

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    setValue(keyword ?? "")
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
