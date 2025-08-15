import { ContextModule } from "@artsy/cohesion"
import {
  Box,
  Column,
  GridColumns,
  Separator,
  Spacer,
  Stack,
} from "@artsy/palette"
import { SubmittingOrderSpinner } from "Apps/Order/Components/SubmittingOrderSpinner"
import { ConnectedModalDialog } from "Apps/Order/Dialogs"
import { Order2HelpLinksWithInquiry } from "Apps/Order2/Components/Order2HelpLinks"
import {
  CheckoutStepName,
  CheckoutStepState,
} from "Apps/Order2/Routes/Checkout/CheckoutContext/types"
import { Order2DeliveryOptionsStep } from "Apps/Order2/Routes/Checkout/Components/DeliveryOptionsStep/Order2DeliveryOptionsStep"
import { Order2ExpressCheckout } from "Apps/Order2/Routes/Checkout/Components/ExpressCheckout/Order2ExpressCheckout"
import { Order2FulfillmentDetailsStep } from "Apps/Order2/Routes/Checkout/Components/FulfillmentDetailsStep/Order2FulfillmentDetailsStep"
import { Order2CheckoutLoadingSkeleton } from "Apps/Order2/Routes/Checkout/Components/Order2CheckoutLoadingSkeleton"
import { Order2CollapsibleOrderSummary } from "Apps/Order2/Routes/Checkout/Components/Order2CollapsibleOrderSummary"
import { Order2ReviewStep } from "Apps/Order2/Routes/Checkout/Components/Order2ReviewStep"
import { Order2PaymentStep } from "Apps/Order2/Routes/Checkout/Components/PaymentStep/Order2PaymentStep"
import { useCheckoutContext } from "Apps/Order2/Routes/Checkout/Hooks/useCheckoutContext"
import { useStripePaymentBySetupIntentId } from "Apps/Order2/Routes/Checkout/Hooks/useStripePaymentBySetupIntentId"
import { ErrorPage } from "Components/ErrorPage"
import { useSystemContext } from "System/Hooks/useSystemContext"
import type { Order2CheckoutApp_me$key } from "__generated__/Order2CheckoutApp_me.graphql"
import type { Order2CheckoutApp_order$key } from "__generated__/Order2CheckoutApp_order.graphql"
import { useEffect } from "react"
import { Meta, Title } from "react-head"
import { graphql, useFragment } from "react-relay"
// eslint-disable-next-line no-restricted-imports
import { Provider } from "unstated"
interface Order2CheckoutAppProps {
  order: Order2CheckoutApp_order$key
  me: Order2CheckoutApp_me$key
}

export const Order2CheckoutApp: React.FC<Order2CheckoutAppProps> = ({
  order,
  me,
}) => {
  const { isEigen } = useSystemContext()

  const orderData = useFragment(ORDER_FRAGMENT, order)
  const meData = useFragment(ME_FRAGMENT, me)
  const artworkSlug = orderData?.lineItems[0]?.artwork?.slug

  const {
    isLoading,
    setExpressCheckoutLoaded,
    expressCheckoutSubmitting,
    steps,
    checkoutTracking,
  } = useCheckoutContext()

  // Handle Stripe redirect for bank account setup
  useStripePaymentBySetupIntentId(orderData.internalID, orderData)
  if (!order) {
    return <ErrorPage code={404} message="Order not found" />
  }

  const isOffer = orderData.mode === "OFFER"
  const isFixedShipping =
    orderData.lineItems[0]?.artwork?.isFixedShippingFeeOnly
  const isExpressCheckoutEligible = !isOffer && isFixedShipping

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    if (!isExpressCheckoutEligible) {
      setExpressCheckoutLoaded([])
    }
  }, [])

  const activeStep = steps.find(step => step.state === CheckoutStepState.ACTIVE)
  useEffect(() => {
    switch (activeStep?.name) {
      case CheckoutStepName.CONFIRMATION:
        checkoutTracking.orderProgressionViewed(ContextModule.ordersReview)
        break
      case CheckoutStepName.FULFILLMENT_DETAILS:
        checkoutTracking.orderProgressionViewed(ContextModule.ordersFulfillment)
        break
      case CheckoutStepName.PAYMENT:
        checkoutTracking.orderProgressionViewed(ContextModule.ordersPayment)
        break
      case CheckoutStepName.OFFER_AMOUNT:
        checkoutTracking.orderProgressionViewed(ContextModule.ordersOffer)
        break
      case CheckoutStepName.DELIVERY_OPTION:
        checkoutTracking.orderProgressionViewed(
          ContextModule.ordersShippingMethods,
        )
        break
    }
  }, [activeStep?.name, checkoutTracking])

  return (
    <Provider>
      <Title>Checkout | Artsy</Title>
      <Meta
        name="viewport"
        content={
          isEigen
            ? "width=device-width, user-scalable=no"
            : "width=device-width, initial-scale=1, maximum-scale=5 viewport-fit=cover"
        }
      />
      {isLoading && <Order2CheckoutLoadingSkeleton order={orderData} />}
      <GridColumns
        py={[0, 4]}
        px={[0, 4]}
        style={{
          display: isLoading ? "none" : "grid",
        }}
      >
        <Column span={[12, 7, 6, 5]} start={[1, 1, 2, 3]}>
          {expressCheckoutSubmitting && <SubmittingOrderSpinner />}
          <Box
            style={{
              display: expressCheckoutSubmitting ? "none" : "grid",
            }}
          >
            <Stack gap={1}>
              <Box display={["block", "none"]}>
                <Order2CollapsibleOrderSummary order={orderData} />
              </Box>
              {isExpressCheckoutEligible && (
                <Order2ExpressCheckout order={orderData} />
              )}
              <Order2FulfillmentDetailsStep order={orderData} />
              <Order2DeliveryOptionsStep order={orderData} />
              <Order2PaymentStep order={orderData} me={meData} />
            </Stack>
            <Box display={["block", "none"]}>
              <Spacer y={1} />
              <Order2ReviewStep order={orderData} />
              <Order2HelpLinksWithInquiry
                order={orderData}
                artworkID={artworkSlug as string}
                contextModule={ContextModule.ordersCheckout}
              />
            </Box>
          </Box>
        </Column>

        <Column
          span={[12, 5, 4, 3]}
          start={[1, 8, 8, 8]}
          display={["none", "block"]}
        >
          <Box position={["initial", "sticky"]} top="100px">
            <Order2ReviewStep order={orderData} />
            <Separator as="hr" />
            <Order2HelpLinksWithInquiry
              order={orderData}
              artworkID={artworkSlug as string}
              contextModule={ContextModule.ordersCheckout}
            />
          </Box>
        </Column>
      </GridColumns>
      <ConnectedModalDialog />
    </Provider>
  )
}

const ME_FRAGMENT = graphql`
  fragment Order2CheckoutApp_me on Me {
    ...Order2PaymentStep_me
  }
`

const ORDER_FRAGMENT = graphql`
  fragment Order2CheckoutApp_order on Order {
    internalID
    mode
    selectedFulfillmentOption {
      type
    }
    lineItems {
      artwork {
        slug
        isFixedShippingFeeOnly
      }
    }
    ...Order2ExpressCheckout_order
    ...Order2CollapsibleOrderSummary_order
    ...Order2FulfillmentDetailsStep_order
    ...Order2DeliveryOptionsStep_order
    ...Order2PaymentStep_order
    ...Order2ReviewStep_order
    ...Order2CheckoutLoadingSkeleton_order
    ...Order2HelpLinks_order
  }
`
