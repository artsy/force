import Autosuggest from "react-autosuggest"
import React from "react"
import { Input, Text } from "@artsy/palette"
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
      suggestions={suggestions}
      onSuggestionsFetchRequested={() => fetchSuggestions(searchQuery)}
      onSuggestionsClearRequested={x => x} // FIXME: implement
      onSuggestionSelected={(_, { suggestion }) => selectSuggestion(suggestion)}
      getSuggestionValue={suggestion => suggestion.node.displayLabel}
      renderInputComponent={AutosugggestInput}
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
      }}
    />
  )
}

const AutosugggestInput: React.FC = props => {
  return (
    <Input
      width="100%"
      height={40}
      style={{ boxShadow: "0px 2px 10px rgba(0,0,0,0.1)" }}
      {...props}
    />
  )
}

const Suggestion: React.FC<{ node: any /* FIXME */ }> = ({ node }) => {
  return (
    <Text width="100%" background="white">
      {node.displayLabel}
    </Text>
  )
}
