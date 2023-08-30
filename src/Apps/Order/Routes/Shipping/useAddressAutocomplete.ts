import { AutocompleteInputOptionType } from "@artsy/palette"
import { Address } from "Components/AddressForm"
import { useDebounce } from "Utils/Hooks/useDebounce"
import { getENV } from "Utils/getENV"
import { useCallback, useState } from "react"
// importing this package causes an error that breaks the app...
// import SmartySDK from "smartystreets-javascript-sdk"

// NOTE: Due to the format of this key (a long string of numbers that cannot be parsed as json)
// This key must be set in the env as a json string like SMARTY_EMBEDDED_KEY_JSON_JSON='{ "key": "xxxxxxxxxxxxxxxxxx" }'
const smartyCreds = getENV("SMARTY_EMBEDDED_KEY_JSON")
console.log({ smartyCreds })
const key = smartyCreds.key

// type SmartyClient = SmartySDK.core.Client<
//   SmartySDK.usAutocompletePro.Lookup,
//   SmartySDK.usAutocompletePro.Lookup
// >

export type SuggestionJSON = {
  city: string
  entries: number
  secondary: string
  state: string
  street_line: string
  zipcode: string
}

export interface AddressSuggestion extends AutocompleteInputOptionType {
  address: Omit<Address, "name">
}

export const useAddressAutocomplete = () => {
  const [result, setResult] = useState<SuggestionJSON[]>([])

  // Add feature flag checks, etc here later
  // console.log({ key, kind: typeof key })
  const enabled = !!key

  const fetchSuggestions = useCallback(async (query: string) => {
    console.log({ key })
    if (!key) return null
    const url = `https://us-autocomplete-pro.api.smarty.com/lookup?key=${encodeURIComponent(
      key
    )}&prefer_ratio=3&search=${encodeURIComponent(query)}`
    console.log({ url })
    const response = await fetch(url, {
      headers: {
        Host: "us-autocomplete-pro.api.smartystreets.com",
      },
    })
    console.log({ response })
    const json = await response.json()
    return json
  }, [])

  // // make sure we don't rebuild client needlessly
  // const clientRef = useRef()

  // // load client
  // useEffect(() => {
  //   if (clientRef.current || !enabled) return
  //   console.warn("building client")
  //   const credentials = new SmartyCore.SharedCredentials(key)
  //   const clientBuilder = new SmartyCore.ClientBuilder(
  //     credentials
  //   ).withLicenses(["us-autocomplete-pro-cloud"])
  //   clientRef.current = clientBuilder.buildUsAutocompleteProClient()
  // }, [enabled])

  const fetchForAutocomplete = useCallback(
    async (query: string) => {
      if (query.length < 5) {
        console.log("type more...")
        setResult([])
        return
      }

      // if (!(clientRef.current && enabled)) return
      // console.warn("fetching for autocomplete: " + query)
      // const lookup = new Lookup(query)

      // lookup.maxSuggestions = 10
      // const lookupResponse = await clientRef.current.send(
      //   (lookup as unknown) as SmartySDK.usAutocompletePro.Lookup
      // )
      try {
        const result = await fetchSuggestions(query)

        console.log({ result })
        setResult(result.suggestions)
      } catch (e) {
        console.error(e)
      }
    },
    [fetchSuggestions]
  )

  // debounce requests
  const debouncedFetchForAutocomplete = useDebounce({
    // high debounce for testing to not eat up our credits
    delay: 700,
    callback: fetchForAutocomplete,
  })

  const buildAddress = (suggestion): string => {
    let whiteSpace = ""
    if (suggestion.secondary) {
      if (suggestion.entries > 1) {
        suggestion.secondary += " (" + suggestion.entries + " entries)"
      }
      whiteSpace = " "
    }
    return (
      suggestion.street_line +
      whiteSpace +
      suggestion.secondary +
      " " +
      suggestion.city +
      ", " +
      suggestion.state +
      " " +
      suggestion.zipcode
    )
  }

  const autocompleteOptions: Array<AddressSuggestion> = result.map(
    suggestion => {
      const text = buildAddress(suggestion)
      return {
        text,
        value: text,
        address: {
          addressLine1: suggestion.street_line,
          addressLine2: suggestion.secondary,
          city: suggestion.city,
          region: suggestion.state,
          postalCode: suggestion.zipcode,
          country: "US",
        },
      }
    }
  )

  return {
    autocompleteOptions,
    suggestions: result,
    fetchForAutocomplete: debouncedFetchForAutocomplete,
    enabled,
  }
}
