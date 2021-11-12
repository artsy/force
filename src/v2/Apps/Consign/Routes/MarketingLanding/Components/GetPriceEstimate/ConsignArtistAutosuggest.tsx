import Autosuggest from "react-autosuggest"
import { useEffect } from "react"
import * as React from "react"
import {
  MagnifyingGlassIcon,
  Text,
  DROP_SHADOW,
  LabeledInput,
} from "@artsy/palette"
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
        // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
        query: searchQuery,
      })
    )
  }

  const trackSearchedWithNoResults = () => {
    tracking.trackEvent(
      searchedWithNoResults({
        context_module: ContextModule.priceEstimate,
        context_owner_type: OwnerType.consign,
        // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
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
      // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
      onSuggestionsFetchRequested={() => fetchSuggestions(searchQuery)}
      onSuggestionSelected={(_, { suggestion }) => {
        trackSelectedItemFromSearch(suggestion)
        // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
        selectSuggestion(suggestion)
      }}
      getSuggestionValue={suggestion => suggestion.node.displayLabel}
      renderInputComponent={AutosuggestInput}
      renderSuggestion={Suggestion}
      inputProps={{
        onChange: (_, { newValue }) => {
          // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
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
          boxShadow: DROP_SHADOW,
          marginTop: "4px",
        },
      }}
    />
  )
}

const AutosuggestInput: React.FC = props => {
  return (
    <LabeledInput
      spellCheck={false}
      label={<MagnifyingGlassIcon />}
      {...props}
    />
  )
}

const Suggestion: React.FC<{ node: any /* FIXME */ }> = (
  { node },
  { isHighlighted }
) => {
  return (
    <Text
      width="100%"
      bg={isHighlighted ? "black5" : "white100"}
      p={0.5}
      variant="md"
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
