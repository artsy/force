import Autosuggest from "react-autosuggest"
import React, { useEffect } from "react"
import { Input, MagnifyingGlassIcon, Text } from "@artsy/palette"
import { usePriceEstimateContext } from "./ConsignPriceEstimateContext"
import { useTracking } from "react-tracking"
import {
  ContextModule,
  OwnerType,
  focusedOnSearchInput,
  searchedWithNoResults,
  selectedItemFromSearch,
} from "@artsy/cohesion"
import { Suggestion as ConsignSearchSuggestion } from "v2/Apps/Consign/Components/GetPriceEstimate/ConsignPriceEstimateContext.tsx"

export const ConsignArtistAutosuggest: React.FC = () => {
  const tracking = useTracking()

  const {
    fetchSuggestions,
    searchQuery,
    selectSuggestion,
    setSearchQuery,
    suggestions,
  } = usePriceEstimateContext()

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
        query: searchQuery,
      })
    )
  }

  const trackSearchedWithNoResults = () => {
    tracking.trackEvent(
      searchedWithNoResults({
        context_module: ContextModule.priceEstimate,
        context_owner_type: OwnerType.consign,
        query: searchQuery,
      })
    )
  }

  useEffect(() => {
    if (suggestions.length === 0) {
      trackSearchedWithNoResults()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [suggestions])

  return (
    <Autosuggest
      suggestions={suggestions ?? []}
      onSuggestionsFetchRequested={() => fetchSuggestions(searchQuery)}
      onSuggestionsClearRequested={x => x} // FIXME: implement
      onSuggestionSelected={(_, { suggestion }) => {
        trackSelectedItemFromSearch(suggestion)
        selectSuggestion(suggestion)
      }}
      getSuggestionValue={suggestion => suggestion.node.displayLabel}
      renderInputComponent={AutosuggestInput}
      renderSuggestion={Suggestion}
      inputProps={{
        placeholder: "Tell me the value of my…",
        value: searchQuery,
        onFocus: trackFocusedOnSearchInput,
        onChange: (_, { newValue }) => {
          setSearchQuery(newValue)
        },
      }}
      theme={{
        container: {
          width: "100%",
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
        style={{ boxShadow: "0px 2px 10px rgba(0,0,0,0.1)" }}
        {...props}
      />
      <MagnifyingGlassIcon position="absolute" right="2%" top={1} />
    </>
  )
}

const Suggestion: React.FC<{ node: any /* FIXME */ }> = ({ node }) => {
  return (
    <Text width="100%" background="white">
      {node.displayLabel}
    </Text>
  )
}
