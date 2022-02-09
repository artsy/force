import Autosuggest from "react-autosuggest"
import { Ref, useEffect, useState } from "react"
import * as React from "react"
import {
  MagnifyingGlassIcon,
  usePosition,
  Text,
  Clickable,
  LabeledInput,
  DROP_SHADOW,
  Box,
} from "@artsy/palette"
import { graphql } from "lib/graphql"
import { fetchQuery } from "relay-runtime"
import {
  PriceDatabaseArtistAutosuggest_SearchConnection_Query,
  PriceDatabaseArtistAutosuggest_SearchConnection_QueryResponse,
} from "v2/__generated__/PriceDatabaseArtistAutosuggest_SearchConnection_Query.graphql"
import { useSystemContext } from "v2/System"

const MAX_SUGGESTIONS = 10

type Suggestion =
  | NonNullable<
      NonNullable<
        NonNullable<
          PriceDatabaseArtistAutosuggest_SearchConnection_QueryResponse["searchConnection"]
        >["edges"]
      >[number]
    >
  | null
  | undefined

type Suggestions = readonly Suggestion[] | undefined | null

interface ArtistAutosuggestProps {
  onChange?: (artustSlug: string) => void
}

export const PriceDatabaseArtistAutosuggest: React.FC<ArtistAutosuggestProps> = ({
  onChange,
}) => {
  const { relayEnvironment } = useSystemContext()

  const [suggestions, setSuggestions] = useState<Suggestions>([])
  const [searchQuery, setSearchQuery] = useState("")

  const updateSuggestions = async () => {
    const suggestions = await fetchSuggestions(searchQuery, relayEnvironment)

    const filteredSuggestions = filterSuggestions(suggestions)?.slice(
      0,
      MAX_SUGGESTIONS
    )

    setSuggestions(filteredSuggestions)
  }

  useEffect(() => {
    updateSuggestions()
  }, [searchQuery])

  const [width, setWidth] = useState(0)

  useEffect(() => {
    if (!anchorRef.current) return

    const handleResize = () => {
      setWidth(anchorRef.current?.offsetWidth ?? 0)
    }

    handleResize()

    window.addEventListener("resize", handleResize)
    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  const { anchorRef, tooltipRef } = usePosition({
    position: "bottom",
    offset: 10,
  })

  const selectSuggestion = async selectedSuggestion => {
    onChange?.(selectedSuggestion?.node?.slug)
  }

  const AutosuggestInput: React.FC = props => {
    return (
      <LabeledInput
        width="100%"
        spellCheck={false}
        type="text"
        label={<MagnifyingGlassIcon />}
        {...props}
        ref={anchorRef as Ref<HTMLInputElement>}
      />
    )
  }

  const Suggestion: React.FC<{ node: NonNullable<Suggestion>["node"] }> = (
    { node },
    { isHighlighted }
  ) => {
    return (
      <Box
        height={50}
        background={"white"}
        display="flex"
        alignItems="center"
        ref={tooltipRef as any}
        color={isHighlighted ? "blue100" : "black100"}
        z-index={1}
        left={0}
        right={0}
      >
        <Text width="100%" paddingLeft={1}>
          <Clickable
            textDecoration={isHighlighted ? "underline" : "none"}
            color={isHighlighted ? "blue100" : "black100"}
          >
            {node?.displayLabel}
          </Clickable>
        </Text>
      </Box>
    )
  }

  return (
    <Autosuggest
      suggestions={suggestions ?? []}
      onSuggestionsClearRequested={x => {
        return x
      }}
      onSuggestionsFetchRequested={x => {
        return x
      }}
      onSuggestionSelected={(_, { suggestion }) => {
        selectSuggestion(suggestion)
      }}
      getSuggestionValue={suggestion => {
        return suggestion.node.displayLabel
      }}
      renderInputComponent={AutosuggestInput}
      renderSuggestion={Suggestion}
      inputProps={{
        onChange: (_, { newValue }) => {
          setSearchQuery(newValue)
        },
        placeholder: "Search by Artist Name",
        value: searchQuery,
      }}
      theme={{
        container: {
          width: "100%",
          position: "relative",
        },
        suggestionsContainer: {
          boxShadow: DROP_SHADOW,
          marginTop: "10px",
          position: "absolute",
          zIndex: 2,
          width,
        },
      }}
    />
  )
}

const filterSuggestions = (suggestions: Suggestions): Suggestions => {
  return suggestions?.filter(suggestion => {
    return suggestion?.node?.counts?.auctionResults
  })
}

const fetchSuggestions = async (searchQuery, relayEnvironment) => {
  const response = await fetchQuery<
    PriceDatabaseArtistAutosuggest_SearchConnection_Query
  >(
    relayEnvironment,
    graphql`
      query PriceDatabaseArtistAutosuggest_SearchConnection_Query(
        $searchQuery: String!
      ) {
        searchConnection(
          query: $searchQuery
          entities: ARTIST
          mode: AUTOSUGGEST
          first: 20
        ) {
          edges {
            node {
              displayLabel
              ... on Artist {
                slug
                internalID
                imageUrl
                counts {
                  auctionResults
                }
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
