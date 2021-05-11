import Autosuggest from "react-autosuggest"
import React, { useEffect } from "react"
import { Input, MagnifyingGlassIcon, Text, color } from "@artsy/palette"
import { usePriceEstimateContext } from "./ConsignPriceEstimateContext"
import { useTracking } from "react-tracking"
import { Suggestion as ConsignSearchSuggestion } from "v2/Apps/Consign/Routes/MarketingLanding/Components/GetPriceEstimate/ConsignPriceEstimateContext"

import {
  ContextModule,
  OwnerType,
  focusedOnSearchInput,
  searchedWithNoResults,
  selectedItemFromSearch,
} from "@artsy/cohesion"
import { debounce } from "lodash"

export const ConsignArtistAutosuggest: React.FC = () => {
  const {
    fetchSuggestions,
    searchQuery,
    selectSuggestion,
    setSearchQuery,
    suggestions,
  } = usePriceEstimateContext()

  const tracking = useTracking()

  const trackFocusedOnSearchInput = () => {
    tracking.trackEvent(
      focusedOnSearchInput({
        context_module: ContextModule.priceEstimate,
        context_owner_type: OwnerType.consign,
      })
    )
  }

  const trackSelectedItemFromSearch = (
    suggestion: ConsignSearchSuggestion["node"]
  ) => {
    tracking.trackEvent(
      selectedItemFromSearch({
        context_module: ContextModule.priceEstimate,
        context_owner_type: OwnerType.consign,
        owner_id: suggestion.internalID,
        owner_slug: suggestion.slug,
        owner_type: OwnerType.artist,
        // @ts-expect-error STRICT_NULL_CHECK
        query: searchQuery,
      })
    )
  }

  const trackSearchedWithNoResults = () => {
    tracking.trackEvent(
      searchedWithNoResults({
        context_module: ContextModule.priceEstimate,
        context_owner_type: OwnerType.consign,
        // @ts-expect-error STRICT_NULL_CHECK
        query: searchQuery,
      })
    )
  }

  const debouncedTrackSearchWithNoResults = debounce(
    trackSearchedWithNoResults,
    100,
    { leading: true }
  )

  useEffect(() => {
    if (suggestions?.length === 0) {
      debouncedTrackSearchWithNoResults()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [suggestions])

  return (
    <Autosuggest
      suggestions={suggestions ?? []}
      onSuggestionsClearRequested={x => x}
      // @ts-expect-error STRICT_NULL_CHECK
      onSuggestionsFetchRequested={() => fetchSuggestions(searchQuery)}
      onSuggestionSelected={(_, { suggestion }) => {
        trackSelectedItemFromSearch(suggestion)
        // @ts-expect-error STRICT_NULL_CHECK
        selectSuggestion(suggestion)
      }}
      getSuggestionValue={suggestion => suggestion.node.displayLabel}
      renderInputComponent={AutosuggestInput}
      renderSuggestion={Suggestion}
      inputProps={{
        onChange: (_, { newValue }) => {
          // @ts-expect-error STRICT_NULL_CHECK
          setSearchQuery(newValue)
        },
        onFocus: trackFocusedOnSearchInput,
        placeholder: "Search by artist name",
        value: searchQuery,
      }}
      theme={{
        container: {
          width: "100%",
        },
        suggestionsContainer: {
          boxShadow:
            "0px 0px 1px rgba(0, 0, 0, 0.08), 0px 2px 8px rgba(0, 0, 0, 0.12)",
          marginTop: "4px",
        },
      }}
    />
  )
}

const AutosuggestInput: React.FC = props => {
  return (
    <>
      <Input
        width="100%"
        height={40}
        spellCheck={false}
        style={{ boxShadow: "0px 2px 10px rgba(0,0,0,0.1)" }}
        {...props}
      />
      <MagnifyingGlassIcon position="absolute" right="2%" top={1} />
    </>
  )
}

const Suggestion: React.FC<{ node: any /* FIXME */ }> = (
  { node },
  { isHighlighted }
) => {
  return (
    <Text
      width="100%"
      background={isHighlighted ? color("black10") : "white"}
      py={0.5}
      paddingLeft={1}
      style={{
        cursor: "pointer",
      }}
    >
      {node.displayLabel}
    </Text>
  )
}

export const tests = {
  AutosuggestInput,
  Suggestion,
}
