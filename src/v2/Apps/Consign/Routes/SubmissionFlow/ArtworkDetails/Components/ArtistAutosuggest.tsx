import React, { FC, useEffect, useState } from "react"
import { fetchQuery, graphql } from "react-relay"
import Autosuggest from "react-autosuggest"
import { useFormikContext } from "formik"
import { Text, DROP_SHADOW, Input, Image, Flex, Box } from "@artsy/palette"
import { ArtworkDetailsFormModel } from "./ArtworkDetailsForm"

import {
  ArtistAutosuggest_SearchConnection_Query,
  ArtistAutosuggest_SearchConnection_QueryResponse,
} from "v2/__generated__/ArtistAutosuggest_SearchConnection_Query.graphql"
import { useSystemContext } from "v2/System"
import { useCallback } from "react"
import RelayModernEnvironment from "relay-runtime/lib/store/RelayModernEnvironment"
import { SyntheticEvent } from "react"

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
  const [suggestions, setSuggestions] = useState<Suggestions>([])
  const { values, handleChange, setFieldValue } = useFormikContext<
    ArtworkDetailsFormModel
  >()
  const { relayEnvironment } = useSystemContext()

  const updateSuggestions = useCallback(async () => {
    setSuggestions([])
    if (values.artist?.length >= 3 && relayEnvironment) {
      const suggestions = await fetchSuggestions(
        values.artist,
        relayEnvironment
      )
      setSuggestions(suggestions)
    }
  }, [relayEnvironment, values.artist])

  useEffect(() => {
    updateSuggestions()
  }, [updateSuggestions, values.artist])

  const inputProps = {
    onChange: handleChange,
    value: values.artist || "",
  }

  return (
    <Autosuggest
      suggestions={suggestions || []}
      onSuggestionsClearRequested={x => x}
      onSuggestionsFetchRequested={x => x}
      onSuggestionSelected={(_: SyntheticEvent, { suggestion }) => {
        setFieldValue("artist", suggestion.node.displayLabel)
      }}
      getSuggestionValue={suggestion => suggestion.node.displayLabel}
      renderInputComponent={AutosuggestInput}
      renderSuggestion={ArtistSuggestion}
      renderSuggestionsContainer={({ containerProps, children }) => {
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
      }}
      inputProps={inputProps}
      theme={{
        container: {
          width: "100%",
          position: "relative",
        },
        suggestionsContainer: {
          boxShadow: DROP_SHADOW,
          marginTop: "4px",
        },
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

const AutosuggestInput: FC = ({ ...rest }) => {
  return (
    <Input
      title="Artist"
      placeholder="Enter Full Name"
      name="artist"
      spellCheck={false}
      {...rest}
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
      <Image
        src={node?.image?.cropped?.src}
        srcSet={node?.image?.cropped?.srcSet}
        width={node?.image?.cropped?.width}
        height={node?.image?.cropped?.height}
        alt="Artist Image"
      />
      <Text ml={1} variant="md">
        {node?.displayLabel}
      </Text>
    </Flex>
  )
}
