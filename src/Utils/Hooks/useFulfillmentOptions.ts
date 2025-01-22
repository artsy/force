import { useFragment } from "react-relay"
import { useFulfillmentOptions_artwork$key } from "__generated__/useFulfillmentOptions_artwork.graphql"
import { useFulfillmentOptions_me$key } from "__generated__/useFulfillmentOptions_me.graphql"
import { graphql } from "relay-runtime"

// import { EU_COUNTRY_CODES } from "Components/CountrySelect"

const EU_COUNTRY_CODES = [
  "AT",
  "BE",
  "BG",
  "HR",
  "CY",
  "CZ",
  "DK",
  "EE",
  "FI",
  "FR",
  "DE",
  "GR",
  "HU",
  "IE",
  "IT",
  "LV",
  "LT",
  "LU",
  "MT",
  "NL",
  "PL",
  "PT",
  "RO",
  "SK",
  "SI",
  "ES",
  "SE",
] as const

type MPMoney = {
  minor: any
}

type ShippingUnion = MPMoney | "ARTSY_SHIPPING" | null

type FulfillmentOptions = {
  artworkLocation: {
    countryCode: string
  }
  pickupAvailable: boolean
  onlyShipsDomestically: boolean
  domesticShipping: ShippingUnion
  internationalShipping: ShippingUnion
  freeGlobalShipping: boolean
  freeShippingToUserCountry?: boolean
}

export const useFulfillmentOptionsForArtwork = (
  artwork: useFulfillmentOptions_artwork$key,
  me?: useFulfillmentOptions_me$key,
): FulfillmentOptions | null => {
  const artworkData = useFragment(ARTWORK_FRAGMENT, artwork)
  const meData = useFragment(ME_FRAGMENT, me)

  const {
    isPurchasable,
    countryCode,
    domesticShippingFee,
    euShippingOrigin,
    internationalShippingFee,
    artsyShippingDomestic,
    artsyShippingInternational,
    pickupAvailable,
    onlyShipsDomestically,
  } = artworkData

  if (!isPurchasable || !countryCode) {
    return null
  }

  const freeGlobalShipping: boolean =
    domesticShippingFee?.minor === 0 && internationalShippingFee?.minor === 0

  let freeShippingToUserCountry

  if (meData) {
    let freeShippingToUserCountry = freeGlobalShipping

    const userCountryCode = meData?.location?.countryCode

    if (!freeShippingToUserCountry && userCountryCode) {
      if (userCountryCode === countryCode) {
        freeShippingToUserCountry = true
      } else if (
        euShippingOrigin &&
        EU_COUNTRY_CODES.includes(userCountryCode)
      ) {
        freeShippingToUserCountry = true
      }
    }
  }

  const artworkLocation: FulfillmentOptions["artworkLocation"] = {
    countryCode: countryCode,
  }

  const domesticShipping: FulfillmentOptions["domesticShipping"] =
    artsyShippingDomestic
      ? "ARTSY_SHIPPING"
      : domesticShippingFee
        ? domesticShippingFee
        : null

  const internationalShipping: FulfillmentOptions["internationalShipping"] =
    artsyShippingInternational
      ? "ARTSY_SHIPPING"
      : internationalShippingFee
        ? internationalShippingFee
        : null

  return {
    artworkLocation,
    domesticShipping,
    internationalShipping,
    pickupAvailable: !!pickupAvailable,
    onlyShipsDomestically: !!onlyShipsDomestically,
    freeGlobalShipping,
    freeShippingToUserCountry,
  }
}

const ME_FRAGMENT = graphql`
  fragment useFulfillmentOptions_me on Me {
    location {
      countryCode
    }
  }
`

const ARTWORK_FRAGMENT = graphql`
  fragment useFulfillmentOptions_artwork on Artwork {
    isPurchasable
    countryCode: shippingCountry
    domesticShippingFee {
      minor
    }
    euShippingOrigin
    internationalShippingFee {
      minor
    }
    artsyShippingDomestic
    artsyShippingInternational
    pickupAvailable
    onlyShipsDomestically # maybe ignored for make offer?
  }
`
