import { useEffect, useMemo, useState } from "react"
import { fetchQuery, graphql, Environment } from "react-relay"
import { useSystemContext } from "v2/System"
import {
  AutocompleteInput,
  AutocompleteInputOptionType,
  Flex,
  Text,
  Box,
  Image,
} from "@artsy/palette"
import {
  ArtistAutocomplete_SearchConnection_Query,
  ArtistAutocomplete_SearchConnection_QueryResponse,
} from "v2/__generated__/ArtistAutocomplete_SearchConnection_Query.graphql"
import { extractNodes } from "v2/Utils/extractNodes"
import { ArtworkDetailsFormModel } from "./ArtworkDetailsForm"
import { useFormikContext } from "formik"
import { debounce } from "lodash"

const DEBOUNCE_DELAY = 300

type SubmissionImage =
  | NonNullable<
      NonNullable<
        NonNullable<
          NonNullable<
            ArtistAutocomplete_SearchConnection_QueryResponse["searchConnection"]
          >["edges"]
        >[number]
      >["node"]
    >["image"]
  | null
  | undefined

interface ArtistAutocompleteOption extends AutocompleteInputOptionType {
  image: SubmissionImage
}

export const ArtistAutoComplete: React.FC<{ onError: () => void }> = ({
  onError,
}) => {
  const [suggestions, setSuggestions] = useState<
    Array<ArtistAutocompleteOption>
  >([])
  const [isError, setIsError] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const { relayEnvironment } = useSystemContext()
  const {
    values,
    setFieldValue,
    errors,
    touched,
    setFieldTouched,
  } = useFormikContext<ArtworkDetailsFormModel>()

  useEffect(() => {
    if (!isError) return

    setFieldValue("artistId", "")
    setFieldValue("artistName", "")
  }, [isError])

  const updateSuggestions = async (value: string) => {
    setSuggestions([])
    if (!value.trim()) return

    if (relayEnvironment) {
      try {
        setIsLoading(true)
        const suggestions = await fetchSuggestions(value, relayEnvironment)
        setIsError(false)
        setIsLoading(false)
        if (suggestions?.edges?.length) {
          const options = extractNodes(suggestions)
          setSuggestions(
            options.map(option => ({
              text: option.displayLabel!,
              value: option.internalID!,
              image: option?.image,
            }))
          )
        }
      } catch {
        setIsLoading(false)
        setIsError(true)
        onError()
      }
    }
  }

  const handleSuggestionsFetchRequested = useMemo(
    () => debounce(updateSuggestions, DEBOUNCE_DELAY),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  )

  const handleChange = ({ target: { value } }) => {
    setFieldTouched("artistName", false)
    setFieldValue("artistId", "")
    setFieldValue("artistName", value)
    handleSuggestionsFetchRequested(value)
  }

  const handleClick = () => {
    setFieldTouched("artistName", false)
  }

  const handleClear = () => {
    setSuggestions([])
    setFieldValue("artistId", "")
    setFieldValue("artistName", "")
  }

  const handleSelect = ({ text, value }: ArtistAutocompleteOption) => {
    setFieldValue("artistId", value)
    setFieldValue("artistName", text)
  }

  const handleClose = () => {
    setFieldTouched("artistName")
  }

  const renderOption = (option: ArtistAutocompleteOption) => (
    <Flex alignItems="center" p={1} width="100%">
      {option.image ? (
        <Image
          src={option?.image?.cropped?.src}
          srcSet={option?.image?.cropped?.srcSet}
          width={option?.image?.cropped?.width}
          height={option?.image?.cropped?.height}
        />
      ) : (
        <Box width={44} height={44} backgroundColor="black10" />
      )}
      <Text ml={1} variant="sm-display">
        {option.text}
      </Text>
    </Flex>
  )

  return (
    <AutocompleteInput
      maxLength={256}
      title="Artist"
      placeholder="Enter full name"
      data-test-id="autocomplete-input"
      spellCheck={false}
      loading={isLoading}
      defaultValue={values.artistName}
      error={values.artistName.trim() && touched.artistName && errors.artistId}
      onChange={handleChange}
      onClick={handleClick}
      onClear={handleClear}
      options={suggestions || []}
      onSelect={handleSelect}
      onClose={handleClose}
      renderOption={renderOption}
    />
  )
}

const fetchSuggestions = async (
  searchQuery: string,
  relayEnvironment: Environment
) => {
  const response = await fetchQuery<ArtistAutocomplete_SearchConnection_Query>(
    relayEnvironment,
    graphql`
      query ArtistAutocomplete_SearchConnection_Query($searchQuery: String!) {
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

  return response.searchConnection
}
