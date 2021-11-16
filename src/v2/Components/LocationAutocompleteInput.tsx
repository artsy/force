import * as React from "react"
import {
  DEFAULT_MODAL_Z_INDEX,
  DROP_SHADOW,
  Input,
  InputProps,
} from "@artsy/palette"
import { useLoadScript } from "v2/Utils/Hooks/useLoadScript"
import { data as sd } from "sharify"
import { useRef } from "react"
import { useEffect } from "react"
import { useState } from "react"
import { useAppendStylesheet } from "v2/Utils/Hooks/useAppendStylesheet"

const GOOGLE_PLACES_API_SRC = `https://maps.googleapis.com/maps/api/js?key=${sd.GOOGLE_MAPS_API_KEY}&libraries=places&language=en&sessiontoken=${sd.SESSION_ID}&callback=__googleMapsCallback`

interface LocationAutocompleteInputProps extends Omit<InputProps, "onChange"> {
  onChange(place: Place): void
}

export const LocationAutocompleteInput: React.FC<LocationAutocompleteInputProps> = ({
  onChange,
  ...rest
}) => {
  const [ready, setReady] = useState(false)

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

  useLoadScript({
    id: "google-maps-js",
    src: GOOGLE_PLACES_API_SRC,
  })

  useAppendStylesheet({
    id: "google-maps-css",
    body: `
      .pac-container { margin-top: 10px; z-index: ${DEFAULT_MODAL_Z_INDEX}; box-shadow: ${DROP_SHADOW}; border-top: 0; }
      .pac-item { padding: 10px; border-top: 0; }
      .pac-item, .pac-item-query { font-size: 1rem; }
    `,
  })

  const inputRef = useRef<HTMLInputElement | null>(null)
  const autocompleteServiceRef = useRef<any | null>(null)

  useEffect(() => {
    // @ts-ignore
    if (typeof google === "undefined") return
    if (!ready || !inputRef.current) return

    // @ts-ignore
    autocompleteServiceRef.current = new google.maps.places.Autocomplete(
      inputRef.current,
      { types: ["(cities)"] }
    )

    autocompleteServiceRef.current.addListener("place_changed", () => {
      const place: Place | undefined = autocompleteServiceRef.current.getPlace()
      if (!place) return
      onChange(place)
    })

    // @ts-ignore
    google.maps.event.addDomListener(
      inputRef.current,
      "keydown",
      (event: KeyboardEvent) => {
        if (event.key === "Enter") {
          event.preventDefault()
        }
      }
    )
  }, [onChange, ready])

  return <Input ref={inputRef as any} {...rest} />
}

type AddressComponent = {
  long_name: string
  short_name: string
  types: string[]
}

export type Place =
  /** When Google can't match a city, it simply returns the name entered */
  | { name: string }
  /** Typically Google returns this rich place object */
  | {
      address_components: AddressComponent[]
      adr_address: string
      formatted_address: string
      geometry: {
        location: {
          lat(): number
          lng(): number
        }
        viewport: {
          south: number
          west: number
          north: number
          east: number
        }
      }
      icon: string
      icon_background_color: string
      icon_mask_base_uri: string
      name: string
      photos: {
        height: number
        html_attributions: string[]
        width: number
      }[]
      place_id: string
      reference: string
      types: string[]
      url: string
      utc_offset: number
      vicinity: string
      html_attributions: any[]
      utc_offset_minutes: number
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
    return { city: place.name }
  }

  const components = place.address_components.reduce(
    (
      acc: {
        state?: AddressComponent
        postalCode?: AddressComponent
        country?: AddressComponent
      },
      component
    ) => {
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
    city: place.name,
    state: components.state?.long_name,
    stateCode: components.state?.short_name,
    postalCode: components.postalCode?.long_name,
    country: components.country?.long_name,
  }
}
