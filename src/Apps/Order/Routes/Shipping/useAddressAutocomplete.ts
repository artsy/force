import { useDebounce } from "Utils/Hooks/useDebounce"
import { useEffect, useRef, useState } from "react"
// import SmartySDK from "smartystreets-javascript-sdk"

// const Lookup = SmartySDK.usAutocomplete.Lookup
// const SmartyCore = SmartySDK.core
// const key = process.env.SMARTY_EMBEDDED_KEY
// console.log({ key })

// type SmartyClient = SmartySDK.core.Client<
//   SmartySDK.usAutocompletePro.Lookup,
//   SmartySDK.usAutocompletePro.Lookup
// >

export const useAddressAutocomplete = () => {
  const [autocompleteSuggestions, setAutocompleteSuggestions] = useState<any[]>(
    []
  )
  if (false) setAutocompleteSuggestions([])
  return { autocompleteSuggestions, fetchForAutocomplete: console.log }

  // const enabled = !!key
  // // if (!key) return {}

  // console.log(
  //   "Smarty credentials present: " + !!key && key?.slice(0, 5) + "..."
  // )

  // // make sure we don't rebuild client needlessly
  // const clientRef = useRef<SmartyClient>()
  // useEffect(() => {
  //   if (clientRef.current || !enabled) return
  //   console.warn("building client")
  //   const credentials = new SmartyCore.SharedCredentials(key)
  //   const clientBuilder = new SmartyCore.ClientBuilder(
  //     credentials
  //   ).withLicenses(["us-autocomplete-pro-cloud"])
  //   clientRef.current = clientBuilder.buildUsAutocompleteProClient()
  // }, [enabled])

  // // debounce requests
  // const fetchForAutocomplete = useDebounce({
  //   delay: 500,
  //   callback: async (query: string) => {
  //     console.log(clientRef.current)
  //     if (!clientRef.current) return

  //     if (query.length < 3) {
  //       console.log("type more...")
  //       setAutocompleteSuggestions([])
  //       return
  //     }

  //     console.warn("fetching for autocomplete: " + query)
  //     const lookup = new Lookup(query)

  //     console.log({ lookup })
  //     lookup.maxSuggestions = 10
  //     const results = await clientRef.current.send(lookup)
  //     console.log({ results })
  //     setAutocompleteSuggestions(results)
  //   },
  // })
  // return {
  //   autocompleteSuggestions: [],
  //   fetchForAutocomplete: console.log,
  //   enabled,
  // }

  // return { autocompleteSuggestions, fetchForAutocomplete }
}
