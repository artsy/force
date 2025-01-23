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

interface ArtworkFulfillmentData {
  readonly artsyShippingDomestic: boolean | null | undefined
  readonly artsyShippingInternational: boolean | null | undefined
  readonly shippingCountry: string | null | undefined
  readonly domesticShippingFee:
    | {
        readonly minor: any
      }
    | null
    | undefined
  readonly euShippingOrigin: boolean | null | undefined
  readonly internationalShippingFee:
    | {
        readonly minor: any
      }
    | null
    | undefined
  readonly isPurchasable: boolean | null | undefined
  readonly onlyShipsDomestically: boolean | null | undefined
  readonly pickupAvailable: boolean | null | undefined
}

type MaybeMe =
  | {
      location?: { countryCode?: string | null | undefined } | null | undefined
    }
  | null
  | undefined

export const processArtworkFulfillmentOptions = (
  artwork?: ArtworkFulfillmentData,
  me?: MaybeMe,
): FulfillmentOptions | null => {
  if (!artwork) {
    return null
  }

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
  } = artwork

  if (!isPurchasable || !shippingCountry) {
    return null
  }

  const freeGlobalShipping: boolean =
    domesticShippingFee?.minor === 0 && internationalShippingFee?.minor === 0

  let freeShippingToUserCountry

  if (me) {
    let freeShippingToUserCountry = freeGlobalShipping

    const userCountryCode = me?.location?.countryCode

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
