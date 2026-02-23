import type { EstimateBody, PartialEstimateConfig } from "@artaio/arta-browser"
import type {
  ArtaLocation,
  ArtaObject,
  SupportedCurrency,
} from "@artaio/arta-browser/dist/MetadataTypes"
import type ArtaEstimate from "@artaio/arta-browser/dist/estimate"
import {
  ActionType,
  type ClickedEstimateShippingCost,
  OwnerType,
  type ShippingEstimateViewed,
} from "@artsy/cohesion"
import { Link, Spacer, Text } from "@artsy/palette"
import { useAnalyticsContext } from "System/Hooks/useAnalyticsContext"
import { useLoadScript } from "Utils/Hooks/useLoadScript"
import { getENV } from "Utils/getENV"
import type {
  ArtsyShippingEstimate_artwork$data,
  ArtsyShippingEstimate_artwork$key,
} from "__generated__/ArtsyShippingEstimate_artwork.graphql"
import { useCallback, useEffect, useRef, useState } from "react"
import { graphql, useFragment } from "react-relay"
import { useTracking } from "react-tracking"
import styled from "styled-components"

const ARTA_API_KEY = getENV("ARTA_API_KEY")

const WIDGET_TITLE = "Estimate Shipping Cost"

type Arta = typeof import("@artaio/arta-browser").default

type EstimateWidgetState = {
  loaded: boolean
  widget: ArtaEstimate | null
}

interface ArtsyShippingEstimateProps {
  artwork: ArtsyShippingEstimate_artwork$key
}

export const ArtsyShippingEstimate = (props: ArtsyShippingEstimateProps) => {
  return <ArtsyShippingEstimateLoader {...props} />
}

const ArtsyShippingEstimateLoader = ({
  artwork,
}: ArtsyShippingEstimateProps) => {
  const { trackEvent } = useTracking()
  const { contextPageOwnerId, contextPageOwnerSlug } = useAnalyticsContext()

  const artworkData = useFragment(ARTWORK_FRAGMENT, artwork)

  const estimateInput = estimateRequestBodyForArtwork(artworkData)

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

  const trackClickedEstimatePrice = () => {
    trackEvent({
      action: ActionType.clickedEstimateShippingCost,
      context_page_owner_type: OwnerType.artwork,
      context_page_owner_id: contextPageOwnerId,
      context_page_owner_slug: contextPageOwnerSlug,
    } as ClickedEstimateShippingCost)
  }

  const trackViewedEstimatedPrice = (estimate: PriceEstimate) => {
    trackEvent({
      action: ActionType.shippingEstimateViewed,
      context_page_owner_type: OwnerType.artwork,
      context_page_owner_id: contextPageOwnerId,
      context_page_owner_slug: contextPageOwnerSlug,
      origin: artworkData.shippingOrigin,
      estimate_available: estimate.estimateAvailable,
      destination: estimate.destination,
      minimum_estimate: estimate.minPrice,
      maximum_estimate: estimate.maxPrice,
      estimate_currency: estimate.currency,
    } as ShippingEstimateViewed)
  }

  const { connectWidgetObserver, disconnectWidgetObserver } = useWidgetObserver(
    {
      onViewEstimatedPrice: trackViewedEstimatedPrice,
    },
  )

  const openWidget = useCallback(() => {
    if (state.widget && !state.widget.isOpen) {
      state.widget.open()
      connectWidgetObserver()
    }
  }, [state.widget, connectWidgetObserver])

  const closeWidget = useCallback(() => {
    if (state.widget && state.widget.isOpen) {
      state.widget.close()
      disconnectWidgetObserver()
    }
  }, [state.widget, disconnectWidgetObserver])

  // close on unmount
  useEffect(() => {
    return () => {
      closeWidget()
    }
  }, [closeWidget])

  useEffect(() => {
    if (state.loaded || !Arta) {
      return
    }
    if (!estimateInput || !ARTA_API_KEY) {
      setState({ loaded: true, widget: null })
      return
    }

    const loadEstimate = async () => {
      Arta.init(ARTA_API_KEY)

      const artsyEstimateWidget =
        Arta && estimateInput && Arta.estimate(estimateInput, widgetConfig)

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
  }, [Arta, estimateInput, state.loaded, state])

  if (!state.loaded) {
    return <Loader />
  }

  if (!state.widget) {
    return <Spacer data-testid="loaded-no-widget" y={2} />
  }

  const estimateWidget = state.widget

  if (!estimateWidget.isReady) {
    return <Loader />
  }

  return (
    <LinkButton
      tabIndex={0}
      onClick={e => {
        e.preventDefault()
        e.stopPropagation()
        openWidget()
        trackClickedEstimatePrice()
      }}
      onKeyDown={e => {
        if (e.key === "Enter") {
          e.preventDefault()
          e.stopPropagation()
          openWidget()
          trackClickedEstimatePrice()
        }
      }}
    >
      <Text variant="xs">{WIDGET_TITLE}</Text>
    </LinkButton>
  )
}

interface PriceEstimate {
  destination: string | null
  estimateAvailable: boolean
  minPrice: number | null
  maxPrice?: number | null
  currency: string | null
}

interface UseWidgetObserverProps {
  onViewEstimatedPrice: (price: PriceEstimate) => void
}

const useWidgetObserver = ({
  onViewEstimatedPrice,
}: UseWidgetObserverProps) => {
  const widgetObserver = useRef<MutationObserver | null>(null)
  const [visiblePrice, setVisiblePrice] = useState<PriceEstimate | null>(null)

  const extractEstimateFromDom = useCallback((): PriceEstimate | null => {
    const destinationEl = document.getElementsByClassName(
      "artajs__modal__quotes__destination",
    )[0]
    // e.g. "Chicago, IL, US (destination)"
    const destination =
      destinationEl?.textContent?.match(/(.+)\(destination\)/)?.[1]

    if (!destination) {
      return null
    }

    const priceAmountEl = document.getElementsByClassName(
      "artajs__modal__quotes__price__amount",
    )[0]
    const amountTextContent = priceAmountEl?.textContent
    // e.g. "$1,000"
    const [minPrice, maxPrice] =
      amountTextContent
        ?.replace(/[^0-9,.-]+/g, "")
        ?.split("-")
        .map(n => Number.parseFloat(n)) || []

    if (!minPrice) {
      return {
        estimateAvailable: false,
        destination,
        minPrice: null,
        maxPrice: null,
        currency: null,
      }
    }

    const priceCurrencyEl = document.getElementsByClassName(
      "artajs__modal__quotes__price__currency_code",
    )[0]
    const currency = priceCurrencyEl?.textContent

    return {
      minPrice,
      maxPrice,
      currency,
      destination,
      estimateAvailable: true,
    }
  }, [])

  // biome-ignore lint/correctness/useExhaustiveDependencies: ignored using `--suppress`
  useEffect(() => {
    if (visiblePrice) {
      onViewEstimatedPrice(visiblePrice)
    }
  }, [visiblePrice])

  const connectWidgetObserver = useCallback(() => {
    const targetNode = document.getElementsByClassName("artajs__modal")[0]
    if (!targetNode) {
      console.error("*** Widget target node not found")
      return
    }
    // Options for the observer (which mutations to observe)
    const config = { attributes: true, childList: true, subtree: true }

    // Callback function to execute when mutations are observed
    const callback = (_mutationList, _observer) => {
      const price = extractEstimateFromDom()

      if (price) {
        setVisiblePrice(price)
      }
    }

    // Create an observer instance linked to the callback function
    const observer = new MutationObserver(callback)
    widgetObserver.current = observer

    // Start observing the target node for configured mutations
    observer.observe(targetNode, config)
  }, [extractEstimateFromDom])

  const disconnectWidgetObserver = useCallback(() => {
    widgetObserver.current?.disconnect()
    setVisiblePrice(null)
  }, [])

  return {
    connectWidgetObserver,
    disconnectWidgetObserver,
  }
}

const Loader = () => <Spacer y={2} />

const LinkButton = styled(Link)`
  color: ${props => props.theme.colors.mono60};
  &:hover {
    text-decoration: underline;
    color: ${props => props.theme.colors.mono100};
  }
`

const ARTWORK_FRAGMENT = graphql`
  fragment ArtsyShippingEstimate_artwork on Artwork {
    depthCm
    diameterCm
    framedHeight
    framedWidth
    framedDepth
    framedDiameter
    framedMetric
    heightCm
    isFramed
    listPrice {
      ... on Money {
        major
      }
      ... on PriceRange {
        maxPrice {
          major
        }
        minPrice {
          major
        }
      }
    }
    mediumType {
      name
    }
    priceCurrency
    shippingOrigin
    shippingWeight
    shippingWeightMetric
    widthCm
  }
`

const widgetConfig: PartialEstimateConfig = {
  style: {
    color: {
      border: "none",
      buttonBackground: "#1023D7",
      buttonBackgroundHover: "#1023D7",
      buttonBackgroundDisabled: "#C2C2C2",
      buttonText: "#FFFFFF",
      buttonTextHover: "#FFFFFF",
      buttonTextDisabled: "#FFFFFF",
    },
    position: "center",
    pricingDisplay: "starts_at",
    fontFamily: '"ll-unica77", "Helvetica Neue", Helvetica, Arial, sans-serif',
    fontSize: 16,
    width: 440,
    height: 440,
  },
  text: {
    detailOriginLabel: "(origin)",
    detailDestinationLabel: "(destination)",
    returnLinkLabel: "Change Destination",
    header: {
      title: WIDGET_TITLE,
    },
    destination: {
      descriptionLabel: "",
      buttonText: "Get Shipping Estimate",
      countryLabel: "Destination Country",
      zipLabel: "Destination City/Zip Code",
      cityLabel: "Destination City",
    },
    quoted: {
      shipFromLabel: "",
      shipToLabel: "",
      disclaimerLabel: "",
      rangeLabel: "Shipping estimated between",
      artaInsuranceLabel: "",
    },
    disqualified: {
      shipFromLabel: "",
      shipToLabel: "",
      contactEmail: "",
      emailHeaderLabel: "",
      emailFooterLabel: "An estimate is not available for this artwork.",
    },
  },
} as const

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

type ArtaObjectDimensions = Pick<
  ArtaObject,
  "height" | "width" | "depth" | "unit_of_measurement"
>
const artworkDimensions = (
  artwork: ArtsyShippingEstimate_artwork$data,
): ArtaObjectDimensions | null => {
  const {
    depthCm,
    diameterCm,
    framedMetric,
    framedHeight,
    framedWidth,
    framedDepth,
    framedDiameter,
    heightCm,
    isFramed,
    widthCm,
  } = artwork

  if (
    isFramed &&
    !!framedMetric &&
    // TODO: this line effectively ignores framed data for artworks with one edition set
    // We need to either get this framed data from editions sets in MP
    // or add merge functions in gravity to roll this data to the artwork level.
    (!!(!!framedHeight && !!framedWidth) || !!framedDiameter)
  ) {
    if (!!(!!framedHeight && !!framedWidth)) {
      return {
        unit_of_measurement: framedMetric,
        height: framedHeight,
        width: framedWidth,
        depth: framedDepth,
      }
    }
    if (!!framedDiameter) {
      return {
        unit_of_measurement: framedMetric,
        height: framedDiameter,
        width: framedDiameter,
        depth: framedDepth,
      }
    }
  } else if (!!heightCm && !!widthCm) {
    return {
      unit_of_measurement: "cm",
      height: heightCm,
      width: widthCm,
      depth: depthCm,
    }
  } else if (!!diameterCm) {
    return {
      unit_of_measurement: "cm",
      height: diameterCm,
      width: diameterCm,
      depth: depthCm,
    }
  }
  return null
}

type ArtworkValue = Pick<ArtaObject, "value" | "value_currency">
const artworkValue = (
  artwork: ArtsyShippingEstimate_artwork$data,
): ArtworkValue | null => {
  const priceCurrency = artwork.priceCurrency as SupportedCurrency
  if (!priceCurrency || !artwork.listPrice) {
    return null
  }

  const listPriceMajor = artwork.listPrice.major
  if (listPriceMajor) {
    return {
      value: listPriceMajor,
      value_currency: priceCurrency,
    }
  }

  const minPrice = artwork.listPrice.minPrice?.major
  const maxPrice = artwork.listPrice.maxPrice?.major
  if (minPrice && maxPrice) {
    return {
      value: (minPrice + maxPrice) / 2,
      value_currency: priceCurrency,
    }
  }
  return null
}

const artaObject = (
  artwork: ArtsyShippingEstimate_artwork$data,
): ArtaObject | null => {
  const { isFramed, mediumType, shippingWeight, shippingWeightMetric } = artwork

  let subtype
  if (isFramed) {
    subtype =
      (!!mediumType?.name && FRAMED_CATEGORY_MAP[mediumType.name]) ||
      FRAMED_CATEGORY_MAP.Other
  } else {
    subtype =
      (!!mediumType?.name && UNFRAMED_CATEGORY_MAP[mediumType.name]) ||
      UNFRAMED_CATEGORY_MAP.Other
  }

  const dimensions = artworkDimensions(artwork)
  const value = artworkValue(artwork)
  const weight = {
    weight: shippingWeight,
    weight_unit: shippingWeightMetric,
  }

  if (!!subtype && !!dimensions && !!value) {
    return { subtype, ...dimensions, ...value, ...weight }
  }
  return null
}

const artaLocation = (
  artwork: ArtsyShippingEstimate_artwork$data,
): ArtaLocation | null => {
  const shippingOrigin = artwork.shippingOrigin?.split(", ") ?? []
  const city = shippingOrigin[0]
  const state = shippingOrigin.length === 3 ? shippingOrigin[1] : ""
  const country = shippingOrigin[shippingOrigin.length - 1]
  return shippingOrigin.length > 1 && !!city && !!country
    ? {
        city,
        region: state,
        country,
      }
    : null
}

export const estimateRequestBodyForArtwork = (
  artwork: ArtsyShippingEstimate_artwork$data,
): EstimateBody | null => {
  try {
    const origin = artaLocation(artwork)
    const artworkObject = artaObject(artwork)

    if (!origin || !artworkObject) {
      return null
    }
    return {
      insurance: "arta_transit_insurance",
      additional_services: ["signature_delivery"],
      preferred_quote_types: ["self_ship", "parcel", "select", "premium"],
      currency: artwork.priceCurrency as SupportedCurrency,

      origin,
      objects: [artworkObject],
    }
  } catch (e) {
    console.error("***", "estimateRequestBodyForArtwork error", e)
    return null
  }
}
