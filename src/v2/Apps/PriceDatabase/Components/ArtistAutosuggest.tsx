import Autosuggest from "react-autosuggest"
import React, { useEffect, useState } from "react"
import {
  Input,
  MagnifyingGlassIcon,
  usePosition,
  Text,
  Clickable,
} from "@artsy/palette"
import { graphql } from "lib/graphql"
import { fetchQuery } from "relay-runtime"
import { ArtistAutosuggest_SearchConnection_Query } from "v2/__generated__/ArtistAutosuggest_SearchConnection_Query.graphql"
import { useSystemContext } from "v2/System"
import { Container } from "v2/Components/Sticky"

interface ArtistAutosuggestProps {
  onChange?: (artustSlug: string) => void
}

export const ArtistAutosuggest: React.FC<ArtistAutosuggestProps> = ({
  onChange,
}) => {
  const { relayEnvironment } = useSystemContext()

  const [suggestions, setSuggestions] = useState<any>([])
  const [searchQuery, setSearchQuery] = useState("")

  const updateSuggestions = async () => {
    const suggestions = await fetchSuggestions(searchQuery, relayEnvironment)

    setSuggestions(suggestions)
  }

  useEffect(() => {
    updateSuggestions()
  }, [searchQuery])

  const [width, setWidth] = useState(0)

  useEffect(() => {
    if (!anchorRef.current) return

    const handleResize = () => {
      setWidth(anchorRef.current.offsetWidth)
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

  const selectSuggestion = async (selectedSuggestion: any) => {
    onChange?.(selectedSuggestion?.node?.slug)
  }

  const AutosuggestInput: React.FC = props => {
    return (
      <>
        <Input
          width="100%"
          spellCheck={false}
          style={{ boxShadow: "0px 2px 10px rgba(0,0,0,0.1)" }}
          {...props}
          ref={anchorRef as any}
        />
        <MagnifyingGlassIcon position="absolute" right="2%" top={"16px"} />
      </>
    )
  }

  const Suggestion: React.FC<{ node: any }> = ({ node }, { isHighlighted }) => {
    return (
      <Container
        height={50}
        background={"white"}
        display="flex"
        alignItems="center"
        ref={tooltipRef as any}
        color={isHighlighted ? "blue100" : "black100"}
      >
        <Text width="100%" paddingLeft={1}>
          <Clickable
            textDecoration={isHighlighted ? "underline" : "none"}
            color={isHighlighted ? "blue100" : "black100"}
          >
            {node.displayLabel}
          </Clickable>
        </Text>
      </Container>
    )
  }

  return (
    <Autosuggest
      suggestions={suggestions ?? []}
      onSuggestionsClearRequested={x => x}
      onSuggestionsFetchRequested={x => x}
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
          marginTop: "10px",
          position: "absolute",
          zIndex: 2,
          width,
        },
      }}
    />
  )
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
