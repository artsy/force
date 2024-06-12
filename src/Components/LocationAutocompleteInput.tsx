import {
  AutocompleteInput,
  AutocompleteInputOptionType,
  AutocompleteInputProps,
  Flex,
  Text,
} from "@artsy/palette"
import { useLoadScript } from "Utils/Hooks/useLoadScript"
import { getENV } from "Utils/getENV"
import {
  useState,
  useEffect,
  useRef,
  MouseEvent,
  ChangeEvent,
  FC,
  useMemo,
  useCallback,
} from "react"
import { compact, debounce } from "lodash"

const DEBOUNCE_DELAY = 300

const GOOGLE_PLACES_API_SRC = `https://maps.googleapis.com/maps/api/js?key=${getENV(
  "PUBLIC_GOOGLE_MAPS_API_KEY"
)}&libraries=places&v=weekly&language=en&sessiontoken=${getENV(
  "SESSION_ID"
)}&callback=__googleMapsCallback`

interface LocationAutocompleteInputProps
  extends Omit<
    AutocompleteInputProps<AutocompleteInputOptionType>,
    "options" | "renderOption" | "onSelect" | "onChange" | "onClear"
  > {
  onChange?: (place?: Place) => void
  onSelect?: (place?: Place) => void
}

export const LocationAutocompleteInput: FC<LocationAutocompleteInputProps> = ({
  onChange,
  onClick,
  onClose,
  onSelect,
  ...rest
}) => {
  const [suggestions, setSuggestions] = useState<
    Array<AutocompleteInputOptionType>
  >([])
  const [ready, setReady] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const autocompleteServiceRef = useRef<google.maps.places.AutocompleteService | null>(
    null
  )
  const geocoderRef = useRef<google.maps.Geocoder | null>(null)

  useEffect(() => {
    if (typeof google === "undefined") {
      window.__googleMapsCallback = () => {
        setReady(true)
      }
      return
    }

    setReady(true)
  }, [])

  useEffect(() => {
    if (typeof google === "undefined" || !ready) return
    autocompleteServiceRef.current = new google.maps.places.AutocompleteService()
    geocoderRef.current = new google.maps.Geocoder()
  }, [ready])

  useLoadScript({ id: "google-maps-js", src: GOOGLE_PLACES_API_SRC })

  const fetchSuggestions = async (searchQuery: string) => {
    const res = await autocompleteServiceRef.current?.getPlacePredictions({
      input: searchQuery,
      types: ["(cities)"],
    })

    return res?.predictions
  }

  const updateSuggestions = useCallback(async (value: string) => {
    setSuggestions([])
    if (!value.trim()) return

    try {
      setIsLoading(true)
      const suggestions = await fetchSuggestions(value)
      setIsLoading(false)
      if (suggestions) {
        setSuggestions(
          suggestions.map(option => ({
            text: option.description,
            value: option.place_id,
          }))
        )
      }
    } catch {
      setIsLoading(false)
    }
  }, [])

  const handleSuggestionsFetchRequested = useMemo(
    () => debounce(updateSuggestions, DEBOUNCE_DELAY),
    [updateSuggestions]
  )

  const handleSelect = async (option: AutocompleteInputOptionType) => {
    const place = await geocoderRef.current?.geocode({ placeId: option.value })
    if (place?.results[0]) {
      onChange?.(place?.results[0])
      onSelect?.(place?.results[0])
    }
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
    onChange?.()
    onSelect?.()
  }

  const handleClose = () => {
    onClose?.()
  }

  const renderOption = (option: AutocompleteInputOptionType) => (
    <Flex alignItems="center" p={1} width="100%">
      <Text ml={1} variant="sm-display">
        {option.text}
      </Text>
    </Flex>
  )

  return (
    <AutocompleteInput
      {...rest}
      loading={isLoading}
      data-testid="autocomplete-location"
      footer={
        <Flex px={2} py={0.5} bg="white100" justifyContent="flex-end">
          <PoweredByGoogleIcon />
        </Flex>
      }
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

export type Place = { city: string } | google.maps.GeocoderResult

export type Location = {
  city?: string | null
  state?: string | null
  stateCode?: string
  postalCode?: string
  country?: string | null
  countryCode?: string | null
  coordinates?: number[]
}

export const normalizePlace = (
  place?: Place,
  withCountryCode: boolean = false
): Location => {
  if (!place) return { city: "" }

  if (!("address_components" in place)) {
    return { city: place.city }
  }

  const components = place.address_components.reduce<{
    [key: string]: google.maps.GeocoderAddressComponent
  }>(
    (
      acc: {
        city: google.maps.GeocoderAddressComponent
        state?: google.maps.GeocoderAddressComponent
        postalCode?: google.maps.GeocoderAddressComponent
        country?: google.maps.GeocoderAddressComponent
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
    countryCode: withCountryCode ? components.country?.short_name : undefined,
    coordinates: [place.geometry.location.lat(), place.geometry.location.lng()],
  }
}

const PoweredByGoogleIcon: FC = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="144"
      height="18"
      x="0"
      y="0"
      version="1.1"
      viewBox="0 0 144 18"
      xmlSpace="preserve"
    >
      <image
        width="144"
        height="18"
        x="0"
        y="0"
        href="data:image/png;base64,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"
      />
    </svg>
  )
}

export const buildLocationDisplay = (
  location: Location | null | undefined
): string =>
  compact([location?.city, location?.state, location?.country]).join(", ")
