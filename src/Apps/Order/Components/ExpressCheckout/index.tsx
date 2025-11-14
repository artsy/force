import { ExpressCheckoutUI } from "Apps/Order/Components/ExpressCheckout/ExpressCheckoutUI"
import { SystemQueryRenderer } from "System/Relay/SystemQueryRenderer"
import { getENV } from "Utils/getENV"
import { Elements } from "@stripe/react-stripe-js"
import {
  loadStripe,
  type StripeElementsOptions,
  type StripeElementsUpdateOptions,
} from "@stripe/stripe-js"
import type {
  ExpressCheckout_order$data,
  ExpressCheckout_order$key,
} from "__generated__/ExpressCheckout_order.graphql"
import type { ExpressCheckoutQuery } from "__generated__/ExpressCheckoutQuery.graphql"
import type { Dispatch, SetStateAction } from "react"
import { graphql, useFragment } from "react-relay"

const stripePromise = loadStripe(getENV("STRIPE_PUBLISHABLE_KEY"))

interface Props {
  order: ExpressCheckout_order$key
  setShowSpinner?: Dispatch<SetStateAction<boolean>>
}

type Seller = Exclude<
  ExpressCheckout_order$data["seller"],
  { __typename: "%other" }
>

export const ExpressCheckout = ({ order, setShowSpinner }: Props) => {
  const orderData = useFragment(ORDER_FRAGMENT, order)

  const { itemsTotal, seller } = orderData

  if (!(itemsTotal && orderData.availableShippingCountries.length)) {
    return null
  }

  const sellerStripeAccountId = (seller as Seller)?.merchantAccount?.externalId

  if (!sellerStripeAccountId) {
    console.error(
      "No seller's Stripe account found. Cannot proceed with Express Checkout.",
    )
    return null
  }

  const orderOptions: StripeElementsUpdateOptions = {
    amount: itemsTotal.minor,
    currency: itemsTotal.currencyCode.toLowerCase(),
    setupFutureUsage: "off_session",
    captureMethod: "manual",
    onBehalfOf: sellerStripeAccountId,
  }

  const options: StripeElementsOptions = {
    mode: "payment",
    appearance: {
      variables: {
        borderRadius: "50px",
      },
    },
    ...orderOptions,
  }

  return (
    <>
      <Elements stripe={stripePromise} options={options}>
        <ExpressCheckoutUI order={orderData} setShowSpinner={setShowSpinner} />
      </Elements>
    </>
  )
}

const ORDER_FRAGMENT = graphql`
  fragment ExpressCheckout_order on Order {
    ...ExpressCheckoutUI_order
    availableShippingCountries
    buyerTotal {
      minor
      currencyCode
    }
    itemsTotal {
      minor
      currencyCode
    }
    seller {
      __typename
      ... on Partner {
        merchantAccount {
          externalId
        }
      }
    }
  }
`

interface ExpressCheckoutQueryRendererProps {
  orderID: string
  setShowSpinner?: Dispatch<SetStateAction<boolean>>
}

export const ExpressCheckoutQueryRenderer: React.FC<
  ExpressCheckoutQueryRendererProps
> = ({ orderID, setShowSpinner }) => {
  return (
    <SystemQueryRenderer<ExpressCheckoutQuery>
      // lazyLoad
      query={graphql`
        query ExpressCheckoutQuery($orderID: ID!) {
          me {
            order(id: $orderID) {
              ...ExpressCheckout_order
            }
          }
        }
      `}
      variables={{ orderID }}
      render={({ props }) => {
        if (props?.me?.order) {
          return (
            <ExpressCheckout
              order={props.me.order}
              setShowSpinner={setShowSpinner}
            />
          )
        }
        return null
      }}
    />
  )
}
