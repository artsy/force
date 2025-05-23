import { Flex } from "@artsy/palette"
import { Elements } from "@stripe/react-stripe-js"
import {
  type StripeElementsOptions,
  type StripeElementsUpdateOptions,
  loadStripe,
} from "@stripe/stripe-js"
import { Order2ExpressCheckoutUI } from "Apps/Order2/Routes/Checkout/Components/ExpressCheckout/Order2ExpressCheckoutUI"
import { useCheckoutContext } from "Apps/Order2/Routes/Checkout/Hooks/useCheckoutContext"
import { SystemQueryRenderer } from "System/Relay/SystemQueryRenderer"
import { getENV } from "Utils/getENV"
import createLogger from "Utils/logger"
import type { Order2ExpressCheckoutQuery } from "__generated__/Order2ExpressCheckoutQuery.graphql"
import type {
  Order2ExpressCheckout_order$data,
  Order2ExpressCheckout_order$key,
} from "__generated__/Order2ExpressCheckout_order.graphql"
import { useEffect, useState } from "react"
import { graphql, useFragment } from "react-relay"

const logger = createLogger("Order2ExpressCheckout.tsx")

const stripePromise = loadStripe(getENV("STRIPE_PUBLISHABLE_KEY"))

interface Props {
  order: Order2ExpressCheckout_order$key
}

type Seller = Exclude<
  Order2ExpressCheckout_order$data["seller"],
  { __typename: "%other" }
>

export const Order2ExpressCheckout = ({ order }: Props) => {
  const orderData = useFragment(ORDER_FRAGMENT, order)
  const [isChrome, setIsChrome] = useState<boolean | null>(null)
  const { expressCheckoutPaymentMethods } = useCheckoutContext()

  const expressCheckoutLoadedEmpty = expressCheckoutPaymentMethods?.length === 0

  useEffect(() => {
    const chrome =
      typeof navigator !== "undefined" && /Chrome/.test(navigator.userAgent)
    setIsChrome(chrome)
  }, [])

  if (isChrome === null) return null
  if (expressCheckoutLoadedEmpty) {
    return null
  }

  const { itemsTotal, seller } = orderData

  if (!(itemsTotal && orderData.availableShippingCountries.length)) {
    return null
  }

  const sellerStripeAccountId = (seller as Seller)?.merchantAccount?.externalId

  if (!sellerStripeAccountId) {
    logger.error(
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
    <Flex flexDirection="column" backgroundColor="mono0" p={2}>
      <Elements stripe={stripePromise} options={options}>
        <Order2ExpressCheckoutUI order={orderData} isChrome={isChrome} />
      </Elements>
    </Flex>
  )
}

const ORDER_FRAGMENT = graphql`
  fragment Order2ExpressCheckout_order on Order {
    ...Order2ExpressCheckoutUI_order
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

interface Order2ExpressCheckoutQueryRendererProps {
  orderID: string
}

export const Order2ExpressCheckoutQueryRenderer: React.FC<
  Order2ExpressCheckoutQueryRendererProps
> = ({ orderID }) => {
  return (
    <SystemQueryRenderer<Order2ExpressCheckoutQuery>
      // lazyLoad
      query={graphql`
        query Order2ExpressCheckoutQuery($orderID: ID!) {
          me {
            order(id: $orderID) {
              ...Order2ExpressCheckout_order
            }
          }
        }
      `}
      variables={{ orderID }}
      render={({ props }) => {
        if (props?.me?.order) {
          return <Order2ExpressCheckout order={props.me.order} />
        }
        return null
      }}
    />
  )
}
