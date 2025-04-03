import { Elements } from "@stripe/react-stripe-js"
import {
  type StripeElementsOptions,
  type StripeElementsUpdateOptions,
  loadStripe,
} from "@stripe/stripe-js"
import { ExpressCheckoutUI } from "Apps/Order/Components/ExpressCheckout/ExpressCheckoutUI"
import { SystemQueryRenderer } from "System/Relay/SystemQueryRenderer"
import { getENV } from "Utils/getENV"
import type { ExpressCheckoutQuery } from "__generated__/ExpressCheckoutQuery.graphql"
import type {
  ExpressCheckout_order$key,
  ExpressCheckout_order$data,
} from "__generated__/ExpressCheckout_order.graphql"
import { graphql, useFragment } from "react-relay"

const stripePromise = loadStripe(getENV("STRIPE_PUBLISHABLE_KEY"))

interface Props {
  order: ExpressCheckout_order$key
}

type Seller = Exclude<
  ExpressCheckout_order$data["seller"],
  { __typename: "%other" }
>

export const ExpressCheckout = ({ order }: Props) => {
  const orderData = useFragment(ORDER_FRAGMENT, order)

  // Use itemsTotal on load, but subsequent updates inside ExpressCheckoutUI
  // will use the updated buyersTotal.
  const { itemsTotal, seller } = orderData

  if (!(itemsTotal && orderData.availableShippingCountries.length)) {
    return null
  }

  const sellerStripeAccountId = (seller as Seller)?.merchantAccount?.externalId
  // TODO: Handle exceptional cases with no seller's Stripe account
  //   - When passing `onBehalfOf: ""` below, a validation error is raised in the console and the Apple Pay button will
  //     not render.
  //   - When passing `onBehalfOf: null`, the Apple Pay button will render but Artsy's Stripe account will (incorrectly)
  //     be used. When confirming the payment on the server, it might eventually fail due to mismatched `onBehalfOf`.

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
        <ExpressCheckoutUI order={orderData} />
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

export const ExpressCheckoutQueryRenderer: React.FC<{ orderID: string }> = ({
  orderID,
}) => {
  return (
    <SystemQueryRenderer<ExpressCheckoutQuery>
      // lazyLoad
      query={graphql`
        query ExpressCheckoutQuery($orderID: String!) {
          me {
            order(id: $orderID) {
              ...ExpressCheckout_order
            }
          }
        }
      `}
      variables={{ orderID }}
      render={({ props }) => {
        console.log("****", props)
        if (props?.me?.order) {
          return <ExpressCheckout order={props.me.order} />
        }
        return null
      }}
    />
  )
}
