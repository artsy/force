import Autosuggest from "react-autosuggest"
import React, { useState } from "react"
import { Input, MagnifyingGlassIcon, Text, color } from "@artsy/palette"
import { graphql } from "lib/graphql"
import { fetchQuery } from "relay-runtime"
import { ArtistAutosuggest_SearchConnection_Query } from "v2/__generated__/ArtistAutosuggest_SearchConnection_Query.graphql"
import { useSystemContext } from "v2/System"

export const ArtistAutosuggest: React.FC = () => {
  const { relayEnvironment } = useSystemContext()

  const [suggestions, setSuggestions] = useState<any>([])
  const [searchQuery, setSearchQuery] = useState("")

  // const tracking = useTracking()

  const trackFocusedOnSearchInput = () => {
    // TODO: Screen tracking
    // tracking.trackEvent(
    //   focusedOnSearchInput({
    //     context_module: ContextModule.priceDatbase,
    //     context_owner_type: OwnerType.priceDatabase,
    //   })
    // )
  }

  const selectSuggestion = async (selectedSuggestion: any) => {
    console.log(selectedSuggestion)
  }

  return (
    <Autosuggest
      suggestions={suggestions ?? []}
      onSuggestionsClearRequested={x => x}
      onSuggestionsFetchRequested={async () => {
        const suggestions = await fetchSuggestions(
          searchQuery,
          relayEnvironment
        )

        setSuggestions(suggestions)
      }}
      onSuggestionSelected={(_, { suggestion }) => {
        selectSuggestion(suggestion)
      }}
      getSuggestionValue={suggestion => suggestion.node.displayLabel}
      renderInputComponent={AutosuggestInput}
      renderSuggestion={Suggestion}
      inputProps={{
        onChange: (_, { newValue }) => {
          setSearchQuery(newValue)
        },
        onFocus: trackFocusedOnSearchInput,
        placeholder: "Search by Artist Name",
        value: searchQuery,
      }}
      theme={{
        container: {
          width: "100%",
          position: "relative",
        },
        suggestionsContainer: {
          boxShadow:
            "0px 0px 1px rgba(0, 0, 0, 0.08), 0px 2px 8px rgba(0, 0, 0, 0.12)",
          marginTop: "14px",
          position: "absolute",
          zIndex: 2,
          paddingRight: "4px",
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
      <MagnifyingGlassIcon position="absolute" right="2%" top={"16px"} />
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

const fetchSuggestions = async (searchQuery, relayEnvironment) => {
  const response = await fetchQuery<ArtistAutosuggest_SearchConnection_Query>(
    relayEnvironment,
    graphql`
      query ArtistAutosuggest_SearchConnection_Query($searchQuery: String!) {
        searchConnection(
          query: $searchQuery
          entities: ARTIST
          mode: AUTOSUGGEST
          first: 7
        ) {
          edges {
            node {
              displayLabel
              ... on Artist {
                slug
                internalID
                imageUrl
              }
            }
          }
        }
      }
    `,
    { searchQuery }
  )

  return response.searchConnection?.edges
}
