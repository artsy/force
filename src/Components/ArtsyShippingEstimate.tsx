import type { EstimateBody } from "@artaio/arta-browser"
import type {
  ArtaLocation,
  ArtaObject,
  SupportedCurrency,
} from "@artaio/arta-browser/dist/MetadataTypes"
import type ArtaEstimate from "@artaio/arta-browser/dist/estimate"
import { Link, SkeletonText, Text } from "@artsy/palette"
import { useFeatureFlag } from "System/Hooks/useFeatureFlag"
import { useLoadScript } from "Utils/Hooks/useLoadScript"
import { getENV } from "Utils/getENV"
import type { ArtsyShippingEstimate_artwork$key } from "__generated__/ArtsyShippingEstimate_artwork.graphql"
import { useEffect, useState } from "react"
import { graphql, useFragment } from "react-relay"

/* TODOs:
 * - May need to add properties to artwork in metaphysics
 *   eg: how granular of a location is needed - can we get away with just country?
 * Need price major
 * May need weight
 * Need artwork location or can we get away with shippingOrigin? I think we need at least city x country
 */

const ARTA_API_KEY = getENV("ARTA_API_KEY")

type Arta = typeof import("@artaio/arta-browser").default

type EstimateWidgetState = {
  loaded: boolean
  widget: ArtaEstimate | null
}

interface Props {
  artwork: ArtsyShippingEstimate_artwork$key
}

const Loader = () => <SkeletonText variant="sm">Estimate shipping</SkeletonText>

export const ArtsyShippingEstimate = ({ artwork }: Props) => {
  const artworkData = useFragment(ARTWORK_FRAGMENT, artwork)
  const estimateInput = estimateRequestBodyForArtwork(
    artworkData as ShippableArtwork,
  )

  const featureEnabled = useFeatureFlag("emerald_shipping-estimate-widget")

  const [Arta, setArta] = useState<Arta | null>(null)

  useLoadScript({
    id: "arta-browser-script",
    src: "https://cdn.jsdelivr.net/npm/@artaio/arta-browser@2.16.1/dist/bundle.js",
    onReady: () => {
      setArta(window["Arta"])
    },
  })

  const initialState: EstimateWidgetState = !!estimateInput
    ? { loaded: false, widget: null }
    : { loaded: true, widget: null }

  const [state, setState] = useState<EstimateWidgetState>(initialState)

  useEffect(() => {
    if (!featureEnabled || !estimateInput || !ARTA_API_KEY) {
      setState({ loaded: true, widget: null })
      return
    }

    if (state.loaded || !Arta) {
      return
    }

    const loadEstimate = async () => {
      console.log("***", "oading estimate", estimateInput)
      Arta.init(ARTA_API_KEY)

      const artsyEstimateWidget =
        Arta && estimateInput && Arta.estimate(estimateInput)

      if (!artsyEstimateWidget) {
        setState({ loaded: true, widget: null })
        return
      }

      try {
        await artsyEstimateWidget.validate()
        setState({ loaded: true, widget: artsyEstimateWidget })
        return
      } catch (e) {
        console.error("*** Error validating artsy shipping estimate:", e)
        setState({ loaded: true, widget: null })
      }
    }
    loadEstimate()
  }, [Arta, estimateInput, state.loaded, state, featureEnabled])

  if (!state.loaded) {
    return <Loader />
  }

  if (!state.widget) {
    return <Text> </Text>
  }

  const estimateWidget = state.widget

  return estimateWidget.isReady ? (
    <Link color="black60" onClick={() => estimateWidget.open()}>
      Estimate Shipping Cost
    </Link>
  ) : (
    <Loader />
  )
}

const ARTWORK_FRAGMENT = graphql`
  fragment ArtsyShippingEstimate_artwork on Artwork {
    isFramed
    category # Raw category required for mapping to Arta subtype
    shippingOrigin
    shippingCountry
    location {
      country
      postalCode
      city
    }
    priceCurrency
    priceListed {
      major
    }
    heightCm
    widthCm
    # shippingWeight # may need to be added?
  }
`

const FRAMED_CATEGORY_MAP = {
  Photography: "photograph_framed",
  Painting: "painting_framed",
  Print: "work_on_paper_framed",
  Posters: "work_on_paper_framed",
  "Drawing, Collage or other Work on Paper": "work_on_paper_framed",
  "Mixed Media": "mixed_media_framed",
  "Design/Decorative Art": "other_decorative_arts",
  Installation: "other_art",
  "Textile Arts": "tapestry",
  "Books and Portfolios": "book",
  "Ephemera or Merchandise": "memorabilia", // temporary fix while arta builds out support for self ship types
  Other: "other_art",
} as const

const UNFRAMED_CATEGORY_MAP = {
  Photography: "photograph_unframed",
  Painting: "painting_unframed",
  Print: "work_on_paper_unframed",
  Posters: "work_on_paper_unframed",
  "Drawing, Collage or other Work on Paper": "work_on_paper_unframed",
  "Mixed Media": "mixed_media_unframed",
  Sculpture: "sculpture",
  "Design/Decorative Art": "other_decorative_arts",
  Installation: "other_art",
  "Textile Arts": "tapestry",
  "Books and Portfolios": "book",
  "Ephemera or Merchandise": "memorabilia", // temporary fix while arta builds out support for self ship types
  Other: "other_art",
} as const

interface ShippableArtwork {
  shippingOrigin: string
  location: {
    country: string
    postalCode?: string
    city?: string
  }

  priceCurrency: SupportedCurrency
  priceListed: { major: number }
  isFramed: boolean
  category:
    | keyof typeof FRAMED_CATEGORY_MAP
    | keyof typeof UNFRAMED_CATEGORY_MAP
  framedMetric?: string
  framedHeight?: number
  framedDiameter?: number
  framedWidth?: number
  framedDepth?: number
  heightCm?: number
  diameterCm?: number
  widthCm?: number
  depthCm?: number
}

type ArtaObjectDimensions = Pick<
  ArtaObject,
  "height" | "width" | "unit_of_measurement" | "depth"
>
const artworkDimensions = (
  artwork: ShippableArtwork,
): ArtaObjectDimensions | null => {
  if (artwork.isFramed && !!artwork.framedMetric) {
    if (!!(!!artwork.framedHeight && !!artwork.framedWidth)) {
      return {
        unit_of_measurement: artwork.framedMetric,
        height: artwork.framedHeight,
        width: artwork.framedWidth,
        depth: artwork.framedDepth,
      }
    }
    if (!!artwork.framedDiameter) {
      return {
        unit_of_measurement: artwork.framedMetric,
        height: artwork.framedDiameter,
        width: artwork.framedDiameter,
        depth: artwork.framedDepth,
      }
    }
  } else if (!!artwork.heightCm && !!artwork.widthCm) {
    return {
      unit_of_measurement: "cm",
      height: artwork.heightCm,
      width: artwork.widthCm,
      depth: artwork.depthCm,
    }
  } else if (!!artwork.diameterCm) {
    return {
      unit_of_measurement: "cm",
      height: artwork.diameterCm,
      width: artwork.diameterCm,
      depth: artwork.depthCm,
    }
  }
  return null
}

type ArtworkValue = Pick<ArtaObject, "value" | "value_currency">
const artworkValue = (artwork: ShippableArtwork): ArtworkValue | null => {
  if (!!artwork.heightCm && !!artwork.widthCm) {
    return {
      value: artwork.priceListed?.major || 500, // TODO: get a real value
      value_currency: artwork.priceCurrency,
    }
  }
  return null
}

const artaObject = (artwork: ShippableArtwork): ArtaObject | null => {
  const framed = artwork.isFramed

  const subtype = framed
    ? FRAMED_CATEGORY_MAP[artwork.category]
    : UNFRAMED_CATEGORY_MAP[artwork.category]

  const dimensions = artworkDimensions(artwork)
  const value = artworkValue(artwork)

  if (!!subtype && !!dimensions && !!value) {
    return { subtype, ...dimensions, ...value }
  }
  return null
}

const artaLocation = (artwork: ShippableArtwork): ArtaLocation | null => {
  const shippingOrigin = artwork.shippingOrigin.split(", ")
  const city = shippingOrigin[0]
  const country = shippingOrigin[shippingOrigin.length - 1]
  return shippingOrigin.length > 1 && !!city && !!country
    ? {
        city,
        country,
      }
    : null
}

const estimateRequestBodyForArtwork = (
  artwork: ShippableArtwork,
): EstimateBody | null => {
  try {
    const origin = artaLocation(artwork)
    const artworkObject = artaObject(artwork)

    if (!origin || !artworkObject) {
      return null
    }
    return {
      origin,
      objects: [artworkObject],
    }
  } catch (e) {
    console.error("***", "estimateRequestBodyForArtwork error", e)
    return null
  }
}
