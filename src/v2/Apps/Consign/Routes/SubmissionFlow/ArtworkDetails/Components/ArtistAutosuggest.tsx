import { useState } from "react"
import { Environment, fetchQuery, graphql } from "react-relay"
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

interface ArtistAutosuggestProps {
  onAutosuggestError: () => void
}

export const ArtistAutosuggest: React.FC<ArtistAutosuggestProps> = ({
  onAutosuggestError,
}) => {
  const {
    values,
    setFieldValue,
    errors,
    touched,
    setFieldTouched,
    handleBlur,
  } = useFormikContext<ArtworkDetailsFormModel>()
  const [suggestions, setSuggestions] = useState<Suggestions>([])
  const { relayEnvironment } = useSystemContext()

  const updateSuggestions = async (value: string) => {
    setSuggestions([])
    if (relayEnvironment) {
      try {
        const suggestions = await fetchSuggestions(value, relayEnvironment)
        setSuggestions(suggestions)
      } catch (error) {
        onAutosuggestError()
      }
    }
  }

  const inputProps = {
    onChange: (e: Event, { newValue }) => {
      setFieldValue("artistId", "")
      setFieldValue("artistName", newValue)
    },
    onBlur: handleBlur("artistName"),
    onFocus: () => {
      setFieldTouched("artistName", false)
    },
    value: values.artistName,
    error: values.artistName.trim() && touched.artistName && errors.artistId,
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
      onSuggestionSelected={(e: Event, { suggestion, suggestionValue }) => {
        e.preventDefault()
        setFieldValue("artistId", suggestion.node.internalID)
        setFieldValue("artistName", suggestionValue)
      }}
      shouldRenderSuggestions={(value: string) => {
        return value.trim().length > 2
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
  relayEnvironment: Environment
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
      data-test-id="suggestions-container"
      position="absolute"
      left={0}
      right={0}
      zIndex={100}
    >
      {children}
    </Box>
  )
}

const AutosuggestInput: React.FC = props => {
  return (
    <Input
      title="Artist"
      data-test-id="autosuggest-input"
      placeholder="Enter Full Name"
      spellCheck={false}
      {...props}
    />
  )
}

const ArtistSuggestion: React.FC<{ node: NonNullable<Suggestion>["node"] }> = (
  { node },
  { isHighlighted }
) => {
  return (
    <Flex
      data-test-id="artist-suggestion"
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
