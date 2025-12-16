import { Flex } from "@artsy/palette"
import { Elements, useStripe } from "@stripe/react-stripe-js"
import type {
  StripeElementsOptions,
  StripeElementsUpdateOptions,
} from "@stripe/stripe-js"
import {
  CheckoutStepName,
  CheckoutStepState,
} from "Apps/Order2/Routes/Checkout/CheckoutContext/types"
import { Order2ExpressCheckoutUI } from "Apps/Order2/Routes/Checkout/Components/ExpressCheckout/Order2ExpressCheckoutUI"
import { useCheckoutContext } from "Apps/Order2/Routes/Checkout/Hooks/useCheckoutContext"
import { SystemQueryRenderer } from "System/Relay/SystemQueryRenderer"
import createLogger from "Utils/logger"
import type { Order2ExpressCheckoutQuery } from "__generated__/Order2ExpressCheckoutQuery.graphql"
import type {
  Order2ExpressCheckout_order$data,
  Order2ExpressCheckout_order$key,
} from "__generated__/Order2ExpressCheckout_order.graphql"
import { graphql, useFragment } from "react-relay"

const logger = createLogger("Order2ExpressCheckout.tsx")

interface Order2ExpressCheckoutProps {
  order: Order2ExpressCheckout_order$key
}

type Seller = Exclude<
  Order2ExpressCheckout_order$data["seller"],
  { __typename: "%other" }
>

export const Order2ExpressCheckout: React.FC<Order2ExpressCheckoutProps> = ({
  order,
}) => {
  const orderData = useFragment(FRAGMENT, order)
  const stripe = useStripe()
  const { expressCheckoutPaymentMethods, steps } = useCheckoutContext()

  const expressCheckoutLoadedEmpty = expressCheckoutPaymentMethods?.length === 0

  const activeStep = steps.find(step => step.state === CheckoutStepState.ACTIVE)

  if (
    expressCheckoutLoadedEmpty ||
    activeStep?.name === CheckoutStepName.CONFIRMATION
  ) {
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
    <Flex flexDirection="column" backgroundColor="mono0" py={2} px={[2, 2, 4]}>
      <Elements stripe={stripe} options={options}>
        <Order2ExpressCheckoutUI order={orderData} />
      </Elements>
    </Flex>
  )
}

const FRAGMENT = graphql`
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
