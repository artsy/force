import React, { FC, useState } from "react"
import { fetchQuery, graphql } from "react-relay"
import RelayModernEnvironment from "relay-runtime/lib/store/RelayModernEnvironment"
import { useSystemContext } from "v2/System"
import { useFormikContext } from "formik"
import { Text, DROP_SHADOW, Input, Image, Flex, Box } from "@artsy/palette"
import Autosuggest from "react-autosuggest"
import { ArtworkDetailsFormModel } from "./ArtworkDetailsForm"
import {
  ArtistAutosuggest_SearchConnection_Query,
  ArtistAutosuggest_SearchConnection_QueryResponse,
} from "v2/__generated__/ArtistAutosuggest_SearchConnection_Query.graphql"

type Suggestion =
  | NonNullable<
      NonNullable<
        NonNullable<
          ArtistAutosuggest_SearchConnection_QueryResponse["searchConnection"]
        >["edges"]
      >[number]
    >
  | null
  | undefined

type Suggestions = readonly Suggestion[] | undefined | null

export const ArtistAutosuggest: FC = () => {
  const {
    values,
    handleChange,
    setFieldValue,
    errors,
    touched,
    handleBlur,
  } = useFormikContext<ArtworkDetailsFormModel>()
  const [suggestions, setSuggestions] = useState<Suggestions>([])
  const { relayEnvironment } = useSystemContext()

  const updateSuggestions = async (value: string) => {
    setSuggestions([])
    if (value.length >= 3 && relayEnvironment) {
      const suggestions = await fetchSuggestions(value, relayEnvironment)
      setSuggestions(suggestions)
    }
  }

  const inputProps = {
    onChange: handleChange,
    onBlur: handleBlur,
    value: values.artist,
    error: touched.artist && errors.artist,
  }

  return (
    <Autosuggest
      suggestions={suggestions || []}
      onSuggestionsClearRequested={() => {
        setSuggestions([])
      }}
      onSuggestionsFetchRequested={({ value }) => {
        updateSuggestions(value)
      }}
      onSuggestionSelected={(e: Event, { suggestionValue }) => {
        e.preventDefault()
        setFieldValue("artist", suggestionValue)
      }}
      getSuggestionValue={suggestion => suggestion.node.displayLabel}
      renderInputComponent={AutosuggestInput}
      renderSuggestion={ArtistSuggestion}
      renderSuggestionsContainer={SuggestionsContainer}
      inputProps={inputProps}
      theme={{
        container: { width: "100%", position: "relative" },
        suggestionsContainer: { boxShadow: DROP_SHADOW, marginTop: "4px" },
      }}
    />
  )
}

const fetchSuggestions = async (
  searchQuery: string,
  relayEnvironment: RelayModernEnvironment
) => {
  const response = await fetchQuery<ArtistAutosuggest_SearchConnection_Query>(
    relayEnvironment,
    graphql`
      query ArtistAutosuggest_SearchConnection_Query($searchQuery: String!) {
        searchConnection(
          query: $searchQuery
          entities: ARTIST
          mode: AUTOSUGGEST
          first: 3
        ) {
          edges {
            node {
              displayLabel
              ... on Artist {
                internalID
                image {
                  cropped(width: 44, height: 44) {
                    height
                    src
                    srcSet
                    width
                  }
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

const SuggestionsContainer = ({ containerProps, children }) => {
  return (
    <Box
      {...containerProps}
      position="absolute"
      left={0}
      right={0}
      zIndex={100}
    >
      {children}
    </Box>
  )
}

const AutosuggestInput: FC = props => {
  return (
    <Input
      title="Artist"
      placeholder="Enter Full Name"
      name="artist"
      spellCheck={false}
      {...props}
    />
  )
}

const ArtistSuggestion: FC<{ node: NonNullable<Suggestion>["node"] }> = (
  { node },
  { isHighlighted }
) => {
  return (
    <Flex
      alignItems="center"
      p={1}
      width="100%"
      bg={isHighlighted ? "black5" : "white100"}
      style={{ cursor: "pointer" }}
    >
      {node?.image?.cropped ? (
        <Image
          src={node?.image?.cropped?.src}
          srcSet={node?.image?.cropped?.srcSet}
          width={node?.image?.cropped?.width}
          height={node?.image?.cropped?.height}
        />
      ) : (
        <Box width={44} height={44} backgroundColor="black10" />
      )}
      <Text ml={1} variant="md">
        {node?.displayLabel}
      </Text>
    </Flex>
  )
}
