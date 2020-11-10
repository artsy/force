import Autosuggest from "react-autosuggest"
import React from "react"
import { Input, MagnifyingGlassIcon, Text } from "@artsy/palette"
import { usePriceEstimateContext } from "./ConsignPriceEstimateContext"
import { useTracking } from "react-tracking"
import {
  OwnerType,
  focusedOnSearchInput,
  searchedWithNoResults,
  selectedItemFromSearch,
} from "@artsy/cohesion"

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
        context_owner_id: "foo",
        context_owner_slug: "bar",
      })
    )
  }

  const trackSelectedItemFromSearch = () => {
    tracking.trackEvent(
      selectedItemFromSearch({
        context_owner_id: "",
        context_owner_slug: "",
        destination_owner_id: "",
        destination_owner_slug: "",
        destination_owner_type: "",
        owner_id: "",
        owner_slug: "",
        owner_type: "",
        query: "",
      })
    )
  }

  const trackSearchedWithNoResults = () => {
    tracking.trackEvent(
      searchedWithNoResults({
        context_owner_id: "",
        context_owner_slug: "",
        destination_owner_type: "",
        query: "",
      })
    )
  }

  return (
    <Autosuggest
      suggestions={suggestions ?? []}
      onSuggestionsFetchRequested={() => fetchSuggestions(searchQuery)}
      onSuggestionsClearRequested={x => x} // FIXME: implement
      onSuggestionSelected={(_, { suggestion }) => selectSuggestion(suggestion)}
      getSuggestionValue={suggestion => suggestion.node.displayLabel}
      renderInputComponent={AutosuggestInput}
      renderSuggestion={Suggestion}
      inputProps={{
        placeholder: "Tell me the value of my…",
        value: searchQuery,
        onFocus: () => {
          //
        },
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
