import { Box, Spacer, Text } from "@artsy/palette"
import {
  ExpressCheckoutElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js"
import type {
  ClickResolveDetails,
  ExpressCheckoutAddress,
  StripeExpressCheckoutElementClickEvent,
  StripeExpressCheckoutElementOptions,
  StripeExpressCheckoutElementShippingAddressChangeEvent,
  StripeExpressCheckoutElementShippingRateChangeEvent,
} from "@stripe/stripe-js"
import { useSaveFulfillmentDetails } from "Apps/Order/Routes/Shipping/Mutations/useSaveFulfillmentDetails"
import { ALL_COUNTRY_CODES, EU_COUNTRY_CODES } from "Components/CountrySelect"
import { extractNodes } from "Utils/extractNodes"
import type { ExpressCheckoutUI_order$key } from "__generated__/ExpressCheckoutUI_order.graphql"
import { useState } from "react"
import { graphql, useFragment } from "react-relay"
import styled from "styled-components"

interface ExpressCheckoutUIProps {
  order: ExpressCheckoutUI_order$key
  pickup: boolean
}

const expressCheckoutOptions: StripeExpressCheckoutElementOptions = {
  buttonTheme: {
    applePay: "white-outline",
  },
  buttonHeight: 50,
}

export const ExpressCheckoutUI = ({
  order,
  pickup = true,
}: ExpressCheckoutUIProps) => {
  const orderData = useFragment(ORDER_FRAGMENT, order)
  const [visible, setVisible] = useState(false)
  const elements = useElements()
  const stripe = useStripe()
  const saveFulfillmentDetails = useSaveFulfillmentDetails()
  const clientSecret = "client_secret_id"

  const firstLineItem = extractNodes(orderData.lineItems)[0]
  const validatedOrderData = validateAndExtractLineItemData(firstLineItem)

  if (!validatedOrderData?.artwork) {
    return null
  }

  const { artwork } = validatedOrderData

  const checkoutOptions: ClickResolveDetails = {
    shippingAddressRequired: !pickup,
    phoneNumberRequired: true,
    // initial shipping rates
    shippingRates: pickup ? PICKUP_RATE : FALLBACK_RATE,
    allowedShippingCountries: extractAllowedShippingCountries(artwork),
  }

  const handleClick = ({ resolve }: StripeExpressCheckoutElementClickEvent) => {
    resolve(checkoutOptions)
  }

  const onConfirm = async () => {
    if (!stripe || !elements) {
      return
    }

    const { error } = await stripe.confirmPayment({
      elements: elements,
      clientSecret,
      confirmParams: {
        return_url: "https://artsy.net/",
      },
    })

    if (error) {
      console.error(error)
    }
  }

  const handleShippingAddressChange = async ({
    // Stripe type only guarantees a partial address
    address,
    name,
    resolve,
    reject,
  }: StripeExpressCheckoutElementShippingAddressChangeEvent) => {
    console.log("Express checkout element address change", address)

    alert("onShippingAddressChange")
    try {
      let variables: any
      if (pickup) {
        // TODO: From looking at the types on the checkout element events, saving pickup
        // might be required at the confirm step - ie save pickup, then submit order.
        // See the type for this address and references to phoneNumber in that typedefs file
        // variables = {
        //   input: {
        //     id: orderData.internalID,
        //     fulfillmentType: "PICKUP",
        //     phoneNumber: address.phone,
        //   },
        // }
        console.warn("Pickup does not apply")
        resolve()
      } else {
        // TODO: FIXME: NO PHONE NUMBER AVAILABLE ON ADDRESS OR BEFORE CONFIRM???
        console.log("Shipping address change", address)
        const fulfilmentType = requiresArtsyShippingTo(address.country, artwork)
          ? "SHIP_ARTA"
          : "SHIP"
        variables = {
          input: {
            id: orderData.internalID,
            fulfillmentType: fulfilmentType,
            shipping: {
              addressLine1: (address as ExpressCheckoutAddress).line1 ?? "",
              addressLine2: (address as ExpressCheckoutAddress).line2 ?? "",
              city: address.city,
              country: address.country,
              postalCode: address.postal_code,
              region: address.state,
              phoneNumber: "555-555-5555", //address.phone,
            },
          },
        }
      }
      const result = await saveFulfillmentDetails.submitMutation({
        variables,
      })
      const { orderOrError } = result.commerceSetShipping ?? {}
      console.log("Order or error", orderOrError)
      if (orderOrError?.__typename === "CommerceOrderWithMutationSuccess") {
        const firstLineItem = extractNodes(orderOrError.order.lineItems)[0]
        const lineItemResult = validateAndExtractLineItemData(firstLineItem)

        if (lineItemResult) {
          if (lineItemResult.requestedFulfillment === "PICKUP") {
            // TODO: Again, should not happen
            resolve()
            return
          }

          const shippingRates = extractShippingRates(
            lineItemResult,
            orderOrError.order,
          )

          resolve({
            shippingRates,
          })
        }
        return
      }
    } catch (error) {
      console.error(error)
      reject()
    }
  }

  const handleShippingRateChange = async ({
    shippingRate,
    resolve,
    reject,
  }: StripeExpressCheckoutElementShippingRateChangeEvent) => {
    console.log("Shipping rate change", shippingRate)
    try {
      resolve()
    } catch (error) {
      reject()
    }
  }

  return (
    <UncollapsingBox visible={visible}>
      <Text variant="lg-display">Express checkout</Text>
      <Spacer y={1} />

      <ExpressCheckoutElement
        options={expressCheckoutOptions}
        onClick={handleClick}
        onCancel={() => {
          // TODO: This is where we could reset the order back to its pre-checkout state
          console.log("Express checkout element cancelled")
        }}
        onReady={e => {
          if (!!e.availablePaymentMethods) {
            setVisible(true)
          }
        }}
        onShippingAddressChange={handleShippingAddressChange}
        onShippingRateChange={handleShippingRateChange}
        onLoadError={e => {
          console.log("Express checkout element error", e)
        }}
        onConfirm={onConfirm}
      />

      <Spacer y={4} />
    </UncollapsingBox>
  )
}

// Fallback rate for if no fulfillment type is set yet
// this cannot be an empty array but feels like a hack to start with
// 'free' 'calculating' shipping
// Technically this could also be a flat rate if we know the artwork only
// ships to a single flat rate region
const FALLBACK_RATE: ClickResolveDetails["shippingRates"] = [
  {
    id: "calculating-shipping",
    displayName: "Calculating...",
    amount: 0,
  },
]

const PICKUP_RATE: ClickResolveDetails["shippingRates"] = [
  {
    id: "pickup",
    displayName: "Pick up in person",
    amount: 0,
  },
]

// TODO: This should also be used when handling the onShippingAddressChange mutation
// to `resolve()` with new shipping rates
const extractShippingRates = (
  lineItem: ValidatedLineItemData,
  order: { shippingTotalCents?: number | null },
): ClickResolveDetails["shippingRates"] => {
  const { requestedFulfillment, savedShippingQuotes } = lineItem

  const flatFeeShipping = requestedFulfillment === "SHIP"
  if (flatFeeShipping) {
    const amount = order.shippingTotalCents ?? 0
    return [
      {
        id: "flat-fee-shipping",
        displayName: amount === 0 ? "Shipping" : "Flat fee shipping",
        amount,
      },
    ]
  }

  const isArtsyShipping = requestedFulfillment === "SHIP_ARTA"
  if (isArtsyShipping) {
    if (savedShippingQuotes) {
      return savedShippingQuotes.map(quote => ({
        id: quote.tier,
        displayName: quote.name!,
        amount: quote.priceCents,
      }))
    }
  }

  throw new Error("Shipping options not available")
}

interface LineItemArtwork {
  shippingCountry: string
  onlyShipsDomestically: boolean | null
  euShippingOrigin: boolean | null
  processWithArtsyShippingDomestic: boolean | null
  artsyShippingInternational: boolean | null
}
interface ShippingQuote {
  id: string
  isSelected: boolean
  name: string
  tier: string
  priceCents: number
}

interface ValidatedLineItemData {
  artwork: LineItemArtwork
  allowedShippingCountries: ClickResolveDetails["allowedShippingCountries"]
  savedShippingQuotes: Array<ShippingQuote>
  requestedFulfillment: string | null
}

const validateAndExtractLineItemData = (
  lineItemLike?: any,
): ValidatedLineItemData | null => {
  const artwork = lineItemLike?.artwork

  if (!lineItemLike || !artwork) {
    return null
  }

  const requestedFulfillment =
    lineItemLike.requestedFulfillment?.__typename ?? null

  const savedShippingQuotes = extractNodes<ShippingQuote>(
    lineItemLike.shippingQuoteOptions,
  )

  if (!validateArtwork(artwork)) {
    return null
  } else {
    const allowedShippingCountries = extractAllowedShippingCountries(artwork)

    return {
      artwork,
      allowedShippingCountries,
      requestedFulfillment,
      savedShippingQuotes,
    }
  }
}

// TODO: Migrated from shipping context
const extractAllowedShippingCountries = (
  artwork: LineItemArtwork,
): ClickResolveDetails["allowedShippingCountries"] => {
  // // FIXME: Non-null assertion
  // // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  // const firstLineItem = extractNodes(order.lineItems)[0]!
  // // FIXME: Non-null assertion
  // // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  // const firstArtwork = firstLineItem.artwork!
  // FIXME: Non-null assertion
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const shipsFrom = artwork.shippingCountry!
  const domesticOnly = !!artwork.onlyShipsDomestically
  const euOrigin = !!artwork.euShippingOrigin

  const lockShippingCountryTo = domesticOnly
    ? euOrigin
      ? "EU"
      : shipsFrom
    : null

  const availableShippingCountries = !lockShippingCountryTo
    ? ALL_COUNTRY_CODES
    : lockShippingCountryTo === "EU"
      ? EU_COUNTRY_CODES
      : [lockShippingCountryTo]

  return availableShippingCountries
    .map(country => country.toLowerCase())
    .filter(Boolean)
}

// For determining which kind of shipping to set in mutation
const requiresArtsyShippingTo = (
  shipToCountry: string,
  artwork: LineItemArtwork,
) => {
  const isDomesticShipping =
    (shipToCountry && shipToCountry === artwork.shippingCountry) ||
    (EU_COUNTRY_CODES.includes(shipToCountry) &&
      EU_COUNTRY_CODES.includes(artwork.shippingCountry))

  const requiresArtsyShipping =
    (isDomesticShipping && artwork.processWithArtsyShippingDomestic) ||
    (!isDomesticShipping && !!artwork.artsyShippingInternational)

  return requiresArtsyShipping
}

const validateArtwork = (artwork: any): artwork is LineItemArtwork => {
  if (!artwork) {
    console.warn("Artwork is missing")
    return false
  }
  if (
    typeof artwork.shippingCountry === "string" &&
    artwork.shippingCountry.length === 2
  ) {
    return true
  } else {
    console.warn(
      "Shipping country code is not a valid ISO 3166-1 alpha-2 code",
      artwork.shippingCountry,
    )
    return false
  }
}

const ORDER_FRAGMENT = graphql`
  fragment ExpressCheckoutUI_order on CommerceOrder {
    internalID
    mode
    buyerTotalCents
    requestedFulfillment {
      __typename
    }
    currencyCode
    shippingTotalCents
    lineItems {
      edges {
        node {
          artwork {
            processWithArtsyShippingDomestic
            artsyShippingInternational
            euShippingOrigin
            shippingCountry
            onlyShipsDomestically
          }
          shippingQuoteOptions {
            edges {
              node {
                name
                priceCents
                tier
              }
            }
          }
        }
      }
    }
  }
`

// Only max-height can be animated
const UncollapsingBox = styled(Box)<{ visible: boolean }>`
  display: flex;
  flex-direction: column;
  max-height: ${({ visible }) => (visible ? "1000px" : "0")};
  overflow: hidden;
  transition: max-height 0.3s ease-in-out;
`
