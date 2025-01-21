// import { useFeatureFlag } from "System/Hooks/useFeatureFlag"
import type { EstimateBody } from "@artaio/arta-browser"
import type {
  ObjectSubType,
  SupportedCurrency,
} from "@artaio/arta-browser/dist/MetadataTypes"
import type ArtaEstimate from "@artaio/arta-browser/dist/estimate"
import { Link, Spinner } from "@artsy/palette"
import { useFeatureFlag } from "System/Hooks/useFeatureFlag"
import { getENV } from "Utils/getENV"
import type {
  ArtsyShippingEstimate_artwork$data,
  ArtsyShippingEstimate_artwork$key,
} from "__generated__/ArtsyShippingEstimate_artwork.graphql"
import { createContext, useContext, useEffect, useState } from "react"
import { graphql, useFragment } from "react-relay"

/* TODOs:
 * - May need to add properties to artwork in metaphysics
 *   eg: how granular of a location is needed - can we get away with just country?
 *   The widget validated correctly with just country but then failed and rendered `null`
 *   as the city in my first test
 *   also artwork weight, price listed are undefined on the artwork i am looking at
 * - Using the collapse things appear in a jittery way even after using a provider to load Arta proactively
 *   Maybe the whole estimate creation needs to happen outside of that collapsing sidebar component
 * - When it does appear the link causes a content jump
 */

const ARTA_API_KEY = getENV("ARTA_API_KEY")

const TEMP_fallbackRequestParams = {
  objects: [
    {
      height: 24,
      subtype: "painting_unframed",
      unit_of_measurement: "in",
      value_currency: "USD",
      value: 100.0,
      weight: 2,
      weight_unit: "lb",
      width: 36,
    },
  ],

  origin: {
    address_line_1: "87 Richardson St",
    city: "Brooklyn",
    region: "NY",
    country: "US",
    postal_code: "11249",
  },
}

type Arta = typeof import("@artaio/arta-browser").default

type ArtsyShippingEstimateContextType =
  | {
      Arta: Arta
      enabled: true
      loaded: true
    }
  | { Arta: null; enabled: false; loaded: true }
  | { Arta: undefined; enabled: undefined; loaded: false }

const ArtsyShippingEstimateContext =
  createContext<ArtsyShippingEstimateContextType>({
    loaded: false,
    enabled: undefined,
    Arta: undefined,
  })

interface ArtsyShippingEstimateProviderProps {
  children: React.ReactNode
}

export const ArtsyShippingEstimateProvider: React.FC = (
  props: ArtsyShippingEstimateProviderProps,
) => {
  const featureEnabled = useFeatureFlag("emerald_shipping-estimate-widget")
  const [context, setContext] = useState<ArtsyShippingEstimateContextType>(
    featureEnabled
      ? {
          loaded: false,
          enabled: undefined,
          Arta: undefined,
        }
      : { enabled: false, loaded: true, Arta: null },
  )

  const widgetWillLoad = featureEnabled && !!ARTA_API_KEY

  // Load Arta module and intialize
  useEffect(() => {
    const initArta = async () => {
      if (!context.loaded && !widgetWillLoad) {
        return
      }
      try {
        const Arta = (await import("@artaio/arta-browser")).default
        Arta.init(ARTA_API_KEY)
        setContext({ Arta, enabled: true, loaded: true })
      } catch (error) {
        console.error("Failed to load Arta module", error)
        setContext({ enabled: false, loaded: true, Arta: null })
      }
    }
    initArta()
  }, [context.loaded, widgetWillLoad])

  return (
    <ArtsyShippingEstimateContext.Provider value={context}>
      {props.children}
    </ArtsyShippingEstimateContext.Provider>
  )
}

type ArtsyShippingEstimate =
  | {
      loaded: false
      artaEstimateWidget: ArtaEstimate | null
    }
  | {
      loaded: true
      artaEstimateWidget: ArtaEstimate | null
    }

const useArtsyShippingEstimate = (
  artworkData: ArtsyShippingEstimate_artwork$key,
): ArtsyShippingEstimate => {
  const artwork = useFragment(ARTWORK_FRAGMENT, artworkData)
  const ArtaContext = useContext(ArtsyShippingEstimateContext)
  const [artaEstimateWidget, setArtaEstimateWidget] =
    useState<ArtaEstimate | null>(null)

  const { loaded, enabled, Arta } = ArtaContext

  useEffect(() => {
    if (!loaded || !enabled) {
      return
    }
    const loadEstimate = async () => {
      const params = estimateRequestBodyForArtwork(artwork)
      console.log("***", "ArtsyShippingEstimate params", params)
      const artsyEstimateWidget = params && Arta.estimate(params)
      if (!artsyEstimateWidget) {
        return
      }
      try {
        await artsyEstimateWidget.validate()
        console.log(
          "***",
          "ArtsyShippingEstimate validated",
          artsyEstimateWidget,
        )
        setArtaEstimateWidget(artsyEstimateWidget)
      } catch (e) {
        console.error("*** Error validating artsy shipping estimate:", e)
      }
    }
    loadEstimate()
  }, [loaded, enabled, Arta, artwork])

  if (!loaded) {
    console.log("***", "ArtsyShippingEstimate not loaded")
    return { loaded: false, artaEstimateWidget: null }
  }
  if (!enabled) {
    console.log("***", "ArtsyShippingEstimate not enabled")
    return { loaded: true, artaEstimateWidget: null }
  }
  console.log("***", "ArtsyShippingEstimate loaded", { artaEstimateWidget })
  return { loaded: true, artaEstimateWidget }
}

const estimateRequestBodyForArtwork = (
  artwork: ArtsyShippingEstimate_artwork$data,
): EstimateBody | null => {
  console.log("*** processing params", artwork)
  if (
    !artwork?.location?.country ||
    !artwork?.priceCurrency ||
    !artwork?.priceListed ||
    !artwork?.heightCm ||
    !artwork?.widthCm
  ) {
    // return null
    return TEMP_fallbackRequestParams as any
  }
  return {
    origin: {
      country: artwork.location.country,
      postal_code: artwork.location.postalCode,
    },
    objects: [
      {
        subtype: "painting_unframed" as ObjectSubType,
        value_currency: artwork.priceCurrency as SupportedCurrency,
        height: artwork.heightCm,
        unit_of_measurement: "cm",
        value: artwork.priceListed.major,
        weight: 2,
        weight_unit: "kg",
        width: artwork.widthCm,
      },
    ],
  }
}

interface Props {
  artwork: ArtsyShippingEstimate_artwork$key
}
export const ArtsyShippingEstimate = ({ artwork }: Props) => {
  const { artaEstimateWidget, loaded } = useArtsyShippingEstimate(artwork)
  if (!loaded || (artaEstimateWidget && !artaEstimateWidget.isReady)) {
    return <Spinner />
  }

  return artaEstimateWidget?.isReady ? (
    <Link onClick={() => artaEstimateWidget.open()}>Estimate Shipping</Link>
  ) : null
}

// TODO: Is this location specific to the artwork vs partner
const ARTWORK_FRAGMENT = graphql`
  fragment ArtsyShippingEstimate_artwork on Artwork {
    location {
      country
      postalCode
    }
    priceCurrency
    priceListed {
      major
    }
    heightCm
    widthCm
    # shippingWeight # may need to be added
  }
`
