import {
  AutocompleteInput,
  AutocompleteInputOptionType,
  Box,
  Flex,
  Image,
  Text,
} from "@artsy/palette"
import { useFormikContext } from "formik"
import { debounce } from "lodash"
import { useEffect, useMemo, useState } from "react"
import { Environment, fetchQuery, graphql } from "react-relay"
import { useSystemContext } from "System"
import { extractNodes } from "Utils/extractNodes"
import {
  ArtistAutocomplete_SearchConnection_Query,
  ArtistAutocomplete_SearchConnection_Query$data,
} from "__generated__/ArtistAutocomplete_SearchConnection_Query.graphql"
import { ArtworkDetailsFormModel } from "./ArtworkDetailsForm"

const DEBOUNCE_DELAY = 300

type AutocompleteArtist =
  | NonNullable<
      NonNullable<
        NonNullable<
          NonNullable<
            ArtistAutocomplete_SearchConnection_Query$data["searchConnection"]
          >["edges"]
        >[number]
      >["node"]
    >
  | null
  | undefined

interface ArtistAutocompleteOption extends AutocompleteInputOptionType {
  option: AutocompleteArtist
}

export const ArtistAutoComplete: React.FC<{
  onArtistNotFound?: (notFound: boolean) => void
  onError: () => void
  onChange?: (value: string) => void
  onSelect: (artist: AutocompleteArtist | null) => void
  placeholder?: string
  required?: boolean
  title?: string
}> = ({
  onArtistNotFound,
  onError,
  onChange,
  onSelect,
  placeholder = "Enter full name",
  required,
  title,
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

  const [artistNotFoundMessage, setArtistNotFoundMessage] = useState<string>("")

  useEffect(() => {
    onArtistNotFound?.(artistNotFoundMessage !== "")
  }, [artistNotFoundMessage, onArtistNotFound])

  useEffect(() => {
    if (!isError) return

    setFieldValue("artistId", "")
    setFieldValue("artistName", "")
  }, [isError, setFieldValue])

  const updateSuggestions = async (value: string) => {
    setSuggestions([])

    if (!value?.trim()) return

    if (relayEnvironment) {
      try {
        setIsLoading(true)
        const suggestions = await fetchSuggestions(value, relayEnvironment)
        setIsError(false)
        setIsLoading(false)
        if (suggestions?.edges?.length) {
          const options = extractNodes(suggestions)
          setSuggestions(
            // RELAY_UPGRADE
            options.map((option: any) => ({
              text: option.displayLabel!,
              value: option.internalID!,
              option,
            }))
          )
        } else {
          setArtistNotFoundMessage(errors.artistId as string)
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
    onChange?.(value)

    setFieldTouched("artistName", false)
    setFieldValue("artistId", "")
    setFieldValue("artistName", value)
    handleSuggestionsFetchRequested(value)
    setArtistNotFoundMessage("")
  }

  const handleClick = () => {
    setFieldTouched("artistName", false)
  }

  const handleClear = () => {
    onArtistNotFound?.(false)
    setSuggestions([])
    setFieldValue("artistId", "")
    setFieldValue("artistName", "")
    onSelect(null)
    setArtistNotFoundMessage("")
  }

  const handleSelect = ({ text, value, option }: ArtistAutocompleteOption) => {
    setFieldValue("artistId", value)
    setFieldValue("artistName", text)

    onSelect(option)
  }

  const handleClose = () => {
    setFieldTouched("artistName")
  }

  const renderOption = (option: ArtistAutocompleteOption) => {
    const image = option.option?.image

    return (
      <Flex alignItems="center" p={1} width="100%">
        {option.option?.image ? (
          <Image
            src={image?.cropped?.src}
            srcSet={image?.cropped?.srcSet}
            width={image?.cropped?.width}
            height={image?.cropped?.height}
          />
        ) : (
          <Box width={44} height={44} backgroundColor="black10" />
        )}
        <Text ml={1} variant="sm-display">
          {option.text}
        </Text>
      </Flex>
    )
  }

  return (
    <AutocompleteInput
      maxLength={256}
      title={title}
      placeholder={placeholder}
      data-test-id="autocomplete-input"
      spellCheck={false}
      loading={isLoading}
      defaultValue={values.artistName}
      error={
        (values.artistName?.trim() && touched.artistName && errors.artistId) ||
        artistNotFoundMessage
      }
      onChange={handleChange}
      onClick={handleClick}
      onClear={handleClear}
      options={suggestions || []}
      onSelect={handleSelect}
      onClose={handleClose}
      renderOption={renderOption}
      required={required}
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
          first: 6
        ) {
          edges {
            node {
              displayLabel
              ... on Artist {
                counts {
                  artworks
                }
                formattedNationalityAndBirthday
                name
                initials
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
  ).toPromise()

  return response?.searchConnection
}
