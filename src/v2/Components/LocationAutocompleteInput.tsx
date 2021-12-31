import {
  AutocompleteInput,
  AutocompleteInputOptionType,
  AutocompleteInputProps,
  Flex,
  Text,
} from "@artsy/palette"
import { useLoadScript } from "v2/Utils/Hooks/useLoadScript"
import { getENV } from "v2/Utils/getENV"
import {
  useState,
  useEffect,
  useRef,
  MouseEvent,
  ChangeEvent,
  FC,
  useMemo,
} from "react"
import { debounce } from "lodash"

const DEBOUNCE_DELAY = 300

const GOOGLE_PLACES_API_SRC = `https://maps.googleapis.com/maps/api/js?key=${getENV(
  "GOOGLE_MAPS_API_KEY"
)}&libraries=places&v=weekly&language=en&sessiontoken=${getENV(
  "SESSION_ID"
)}&callback=__googleMapsCallback`

interface LocationAutocompleteInputProps
  extends Omit<
    AutocompleteInputProps<AutocompleteInputOptionType>,
    "options" | "renderOption" | "onSelect" | "onChange" | "onClear"
  > {
  onChange: (place: Place) => void
}

export const LocationAutocompleteInput: FC<LocationAutocompleteInputProps> = ({
  onChange,
  onClick,
  onClose,
  ...rest
}) => {
  const [suggestions, setSuggestions] = useState<
    Array<AutocompleteInputOptionType>
  >([])
  const [ready, setReady] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const autocompleteServiceRef = useRef<any | null>(null)
  const geocoderRef = useRef<any | null>(null)

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
    // @ts-ignore
    geocoderRef.current = new google.maps.Geocoder()
  }, [ready])

  useLoadScript({ id: "google-maps-js", src: GOOGLE_PLACES_API_SRC })

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
    }
  }

  const handleSuggestionsFetchRequested = useMemo(
    () => debounce(updateSuggestions, DEBOUNCE_DELAY),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  )

  const handleSelect = async (option: AutocompleteInputOptionType) => {
    const place = await geocoderRef.current.geocode({ placeId: option.value })
    onChange?.(place?.results[0])
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    handleSuggestionsFetchRequested(e.target.value)
    onChange?.({ city: e.target.value })
  }

  const handleClick = (e: MouseEvent<HTMLInputElement>) => {
    onClick?.(e)
  }

  const handleClear = () => {
    setSuggestions([])
    onChange?.({ city: "" })
  }

  const handleClose = () => {
    onClose?.()
  }

  const renderOption = (option: AutocompleteInputOptionType) => (
    <Flex alignItems="center" p={1} width="100%">
      <Text ml={1} variant="md">
        {option.text}
      </Text>
    </Flex>
  )

  return (
    <AutocompleteInput
      {...rest}
      loading={isLoading}
      data-test-id="autocomplete-location"
      // footer={
      //   <Flex px={2} py={0.5} bg="white100" justifyContent="flex-end">
      //     <PoweredByGoogleIcon />
      //   </Flex>
      // }
      onSelect={handleSelect}
      onChange={handleChange}
      onClick={handleClick}
      onClear={handleClear}
      onClose={handleClose}
      options={suggestions || []}
      renderOption={renderOption}
    />
  )
}

type AddressComponent = {
  long_name: string
  short_name: string
  types: string[]
}

export type Place =
  | { city: string }
  | {
      address_components: AddressComponent[]
      formatted_address: string
      geometry: {}
      place_id: string
      types: string[]
    }

export type Location = {
  city: string
  state?: string
  stateCode?: string
  postalCode?: string
  country?: string
  coordinates?: number[]
}

export const normalizePlace = (place: Place): Location => {
  if (!("address_components" in place)) {
    return { city: place.city }
  }

  const components = place.address_components.reduce<{
    [key: string]: AddressComponent
  }>(
    (
      acc: {
        city: AddressComponent
        state?: AddressComponent
        postalCode?: AddressComponent
        country?: AddressComponent
      },
      component
    ) => {
      if (component.types.includes("locality")) {
        return { ...acc, city: component }
      }

      if (component.types.includes("administrative_area_level_1")) {
        return { ...acc, state: component }
      }

      if (component.types.includes("postal_code")) {
        return { ...acc, postalCode: component }
      }

      if (component.types.includes("country")) {
        return { ...acc, country: component }
      }

      return { ...acc }
    },
    {}
  )

  return {
    city: components.city?.long_name,
    state: components.state?.long_name,
    stateCode: components.state?.short_name,
    postalCode: components.postalCode?.long_name,
    country: components.country?.long_name,
  }
}
