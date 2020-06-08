import { find } from "lodash"
import { Elements, StripeProvider, injectStripe } from "react-stripe-elements"
import React, { useEffect, useState } from "react"
import { data as sd } from "sharify"

import { Address } from "v2/Components/AddressForm"

export const toStripeAddress = (address: Address): stripe.TokenOptions => {
  return {
    name: address.name,
    address_line1: address.addressLine1,
    address_line2: address.addressLine2,
    address_country: address.country,
    address_city: address.city,
    address_state: address.region,
    address_zip: address.postalCode,
  }
}

export const getSelectedBid = ({
  initialSelectedBid,
  displayIncrements,
}: {
  initialSelectedBid: string
  displayIncrements: Array<{ value: string; text: string }>
}): string => {
  let selectedIncrement: { value: string }

  if (!initialSelectedBid) {
    selectedIncrement = displayIncrements[0]
  } else {
    const selectedNum = Number(initialSelectedBid)
    const lastGoodIncrement = find(
      displayIncrements,
      i => Number(i.value) === selectedNum
    )
    selectedIncrement = lastGoodIncrement || displayIncrements[0]
  }
  return selectedIncrement.value
}

export const determineDisplayRequirements = (
  bidder: object,
  me: { hasQualifiedCreditCards: boolean }
) => {
  const isRegistered = !!bidder

  return {
    requiresCheckbox: !isRegistered,
    requiresPaymentInformation: !(isRegistered || me.hasQualifiedCreditCards),
  }
}

export function createStripeWrapper<T>(Component: React.FC<T>): React.FC<T> {
  const StripeInjectedComponent = injectStripe(Component)

  return props => {
    const [stripe, setStripe] = useState(null)

    function setupStripe() {
      setStripe(window.Stripe(sd.STRIPE_PUBLISHABLE_KEY))
    }

    useEffect(() => {
      if (window.Stripe) {
        setStripe(window.Stripe(sd.STRIPE_PUBLISHABLE_KEY))
      } else {
        document
          .querySelector("#stripe-js")
          .addEventListener("load", setupStripe)

        return () => {
          document
            .querySelector("#stripe-js")
            .removeEventListener("load", setupStripe)
        }
      }
    }, [])

    return (
      <StripeProvider stripe={stripe}>
        <Elements>
          <StripeInjectedComponent {...props} />
        </Elements>
      </StripeProvider>
    )
  }
}
