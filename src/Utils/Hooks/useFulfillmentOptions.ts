import { useFragment } from "react-relay"
import { useFulfillmentOptions_artwork$key } from "__generated__/useFulfillmentOptions_artwork.graphql"
import { useFulfillmentOptions_me$key } from "__generated__/useFulfillmentOptions_me.graphql"
import { graphql } from "relay-runtime"

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
  artwork?: useFulfillmentOptions_artwork$key,
  me?: useFulfillmentOptions_me$key,
): FulfillmentOptions | null => {
  if (!artwork) {
    return null
  }
  const artworkData = useFragment(ARTWORK_FRAGMENT, artwork)
  const meData = useFragment(ME_FRAGMENT, me)

  const {
    isPurchasable,
    shippingCountry,
    domesticShippingFee,
    euShippingOrigin,
    internationalShippingFee,
    artsyShippingDomestic,
    artsyShippingInternational,
    pickupAvailable,
    onlyShipsDomestically,
  } = artworkData

  if (!isPurchasable || !shippingCountry) {
    return null
  }

  const freeGlobalShipping: boolean =
    domesticShippingFee?.minor === 0 && internationalShippingFee?.minor === 0

  let freeShippingToUserCountry = freeGlobalShipping

  if (meData) {
    const userCountryCode = meData?.location?.countryCode

    if (!freeShippingToUserCountry && userCountryCode) {
      if (userCountryCode === shippingCountry) {
        freeShippingToUserCountry = true
      } else if (
        euShippingOrigin &&
        EU_COUNTRY_CODES.includes(
          userCountryCode as (typeof EU_COUNTRY_CODES)[number],
        )
      ) {
        freeShippingToUserCountry = true
      }
    }
  }

  const artworkLocation: FulfillmentOptions["artworkLocation"] = {
    countryCode: shippingCountry,
  }

  let domesticShipping: FulfillmentOptions["domesticShipping"] = null
  if (artsyShippingDomestic) {
    domesticShipping = "ARTSY_SHIPPING"
  } else if (domesticShippingFee) {
    domesticShipping = domesticShippingFee
  }

  let internationalShipping: FulfillmentOptions["internationalShipping"] = null
  if (artsyShippingInternational) {
    internationalShipping = "ARTSY_SHIPPING"
  } else if (internationalShippingFee) {
    internationalShipping = internationalShippingFee
  }

  const result = {
    artworkLocation,
    domesticShipping,
    internationalShipping,
    pickupAvailable: !!pickupAvailable,
    onlyShipsDomestically: !!onlyShipsDomestically,
    freeGlobalShipping,
    freeShippingToUserCountry,
  }
  return result
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
    shippingCountry
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
