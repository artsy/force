import Autosuggest from "react-autosuggest"
import React from "react"
import { Input, MagnifyingGlassIcon, Text, color } from "@artsy/palette"
import { usePriceEstimateContext } from "./ConsignPriceEstimateContext"

export const ConsignArtistAutosuggest: React.FC = () => {
  const {
    fetchSuggestions,
    searchQuery,
    selectSuggestion,
    setSearchQuery,
    suggestions,
  } = usePriceEstimateContext()

  return (
    <Autosuggest
      suggestions={suggestions ?? []}
      onSuggestionsFetchRequested={() => fetchSuggestions(searchQuery)}
      onSuggestionSelected={(_, { suggestion }) => selectSuggestion(suggestion)}
      getSuggestionValue={suggestion => suggestion.node.displayLabel}
      renderInputComponent={AutosuggestInput}
      renderSuggestion={Suggestion}
      inputProps={{
        placeholder: "Tell me the value of my…",
        value: searchQuery,
        onChange: (_, { newValue }) => {
          setSearchQuery(newValue)
        },
      }}
      theme={{
        container: {
          width: "100%",
        },
        suggestionsContainer: {
          marginTop: "4px",
          boxShadow:
            "0px 0px 1px rgba(0, 0, 0, 0.08), 0px 2px 8px rgba(0, 0, 0, 0.12)",
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
    >
      {node.displayLabel}
    </Text>
  )
}
