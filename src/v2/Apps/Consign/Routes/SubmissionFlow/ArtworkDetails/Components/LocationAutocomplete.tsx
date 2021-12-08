import {
  AutocompleteInput,
  AutocompleteInputOptionType,
  Flex,
  Input,
  Text,
} from "@artsy/palette"
import { ArtworkDetailsFormModel } from "./ArtworkDetailsForm"
import { useFormikContext } from "formik"
import { data as sd } from "sharify"
import { useLoadScript } from "v2/Utils/Hooks/useLoadScript"
import { useEffect, useMemo, useRef, useState } from "react"
import { debounce } from "lodash"
import { useRouter } from "v2/System/Router/useRouter"

const DEBOUNCE_DELAY = 300
const GOOGLE_PLACES_API_SRC = `https://maps.googleapis.com/maps/api/js?key=${sd.GOOGLE_MAPS_API_KEY}&libraries=places&v=weekly&language=en&sessiontoken=${sd.SESSION_ID}&callback=__googleMapsCallback`

export const LocationAutoComplete: React.FC<{ onError: () => void }> = ({
  onError,
}) => {
  const [suggestions, setSuggestions] = useState<
    Array<AutocompleteInputOptionType>
  >([])
  const [isError, setIsError] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [ready, setReady] = useState(false)
  const [initialized, setInitialized] = useState(false)
  const {
    values,
    setFieldValue,
    errors,
    touched,
    setFieldTouched,
  } = useFormikContext<ArtworkDetailsFormModel>()
  const {
    match: {
      params: { id },
    },
  } = useRouter()

  const autocompleteServiceRef = useRef<any | null>(null)

  useLoadScript({ id: "google-maps-js", src: GOOGLE_PLACES_API_SRC })

  useEffect(() => {
    if (!initialized) {
      if (!id || (values.location && values.locationId)) {
        setInitialized(true)
        setIsError(false)
      }
    }
  }, [values.location, values.locationId, initialized, id])

  useEffect(() => {
    if (!isError) return

    setInitialized(false)
    setFieldValue("locationId", "")
    setFieldValue("location", "")
  }, [isError])

  useEffect(() => {
    // @ts-ignore
    if (typeof google === "undefined") {
      // @ts-ignore
      window.__googleMapsCallback = () => {
        setReady(true)
      }
      return
    }

    setReady(true)
  }, [])

  useEffect(() => {
    // @ts-ignore
    if (typeof google === "undefined" || !ready) return
    // @ts-ignore
    autocompleteServiceRef.current = new google.maps.places.AutocompleteService()
  }, [ready])

  const fetchSuggestions = async (searchQuery: string) => {
    const res = await autocompleteServiceRef.current.getPlacePredictions({
      input: searchQuery,
      types: ["(cities)"],
    })

    return res?.predictions
  }

  const updateSuggestions = async (value: string) => {
    setSuggestions([])
    if (!value.trim()) return

    try {
      setIsLoading(true)
      const suggestions = await fetchSuggestions(value)
      setIsError(false)
      setIsLoading(false)
      if (suggestions) {
        setSuggestions(
          suggestions.map(option => ({
            text: option.description!,
            value: option.place_id!,
          }))
        )
      }
    } catch {
      setIsLoading(false)
      setIsError(true)
      onError()
    }
  }

  const handleSuggestionsFetchRequested = useMemo(
    () => debounce(updateSuggestions, DEBOUNCE_DELAY),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  )

  const handleChange = ({ target: { value } }) => {
    setFieldTouched("location", false)
    setFieldValue("locationId", "")
    setFieldValue("location", value)
    handleSuggestionsFetchRequested(value)
  }

  const handleClick = () => {
    setFieldTouched("location", false)
  }

  const handleClear = () => {
    setSuggestions([])
    setFieldValue("locationId", "")
    setFieldValue("location", "")
  }

  const handleSelect = ({ text, value }: AutocompleteInputOptionType) => {
    setFieldValue("locationId", value)
    setFieldValue("location", text)
  }

  const handleClose = () => {
    setFieldTouched("location")
  }

  const renderOption = (option: AutocompleteInputOptionType, a) => {
    console.log(option, a, suggestions)

    return a + 1 === suggestions.length ? (
      <Flex alignItems="center" p={1} width="100%">
        <Text ml={1} variant="md">
          Last
        </Text>
      </Flex>
    ) : (
      <Flex alignItems="center" p={1} width="100%">
        <Text ml={1} variant="md">
          {option.text}
        </Text>
      </Flex>
    )
  }

  return initialized ? (
    <AutocompleteInput
      title="Location"
      placeholder="Enter City Where Artwork Is Located"
      data-test-id="autocomplete-location"
      spellCheck={false}
      loading={isLoading}
      defaultValue={values.location}
      error={values.location?.trim() && touched.location && errors.locationId}
      onChange={handleChange}
      onClick={handleClick}
      onClear={handleClear}
      options={suggestions || []}
      onSelect={handleSelect}
      onClose={handleClose}
      renderOption={renderOption}
    ></AutocompleteInput>
  ) : (
    <Input title="Location" placeholder="Enter City Where Artwork Is Located" />
  )
}
