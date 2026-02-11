import { ContextModule } from "@artsy/cohesion"
import {
  Box,
  Column,
  GridColumns,
  Separator,
  Spacer,
  Stack,
  breakpoints,
} from "@artsy/palette"
import { OrderErrorApp } from "Apps/Order2/Components/Order2ErrorApp"
import { Order2HelpLinksWithInquiry } from "Apps/Order2/Components/Order2HelpLinks"
import { Order2Spinner } from "Apps/Order2/Components/Order2Spinner"
import {
  CheckoutStepName,
  CheckoutStepState,
} from "Apps/Order2/Routes/Checkout/CheckoutContext/types"
import { CheckoutModal } from "Apps/Order2/Routes/Checkout/Components/CheckoutModal"
import { Order2DeliveryOptionsStep } from "Apps/Order2/Routes/Checkout/Components/DeliveryOptionsStep/Order2DeliveryOptionsStep"
import { Order2ExpressCheckout } from "Apps/Order2/Routes/Checkout/Components/ExpressCheckout/Order2ExpressCheckout"
import { Order2FulfillmentDetailsStep } from "Apps/Order2/Routes/Checkout/Components/FulfillmentDetailsStep/Order2FulfillmentDetailsStep"
import { Order2OfferStep } from "Apps/Order2/Routes/Checkout/Components/OfferStep/Order2OfferStep"
import { Order2CheckoutLoadingSkeleton } from "Apps/Order2/Routes/Checkout/Components/Order2CheckoutLoadingSkeleton"
import { Order2CollapsibleOrderSummary } from "Apps/Order2/Routes/Checkout/Components/Order2CollapsibleOrderSummary"
import { Order2ReviewStep } from "Apps/Order2/Routes/Checkout/Components/Order2ReviewStep"
import { Order2PaymentStep } from "Apps/Order2/Routes/Checkout/Components/PaymentStep/Order2PaymentStep"
import {
  STEP_JUMP_MAP,
  useCheckoutAutoScroll,
} from "Apps/Order2/Routes/Checkout/Hooks/useCheckoutAutoScroll"
import { useCheckoutContext } from "Apps/Order2/Routes/Checkout/Hooks/useCheckoutContext"
import { useCheckoutModal } from "Apps/Order2/Routes/Checkout/Hooks/useCheckoutModal"
import { useLoadCheckout } from "Apps/Order2/Routes/Checkout/Hooks/useLoadCheckout"
import { NOT_FOUND_ERROR } from "Apps/Order2/constants"
import { useSystemContext } from "System/Hooks/useSystemContext"
import { Jump } from "Utils/Hooks/useJump"
import type { Order2CheckoutApp_me$key } from "__generated__/Order2CheckoutApp_me.graphql"
import type { Order2CheckoutApp_order$key } from "__generated__/Order2CheckoutApp_order.graphql"
import { useEffect } from "react"
import { Meta, Title } from "react-head"
import { graphql, useFragment } from "react-relay"

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
    expressCheckoutSpinner,
    steps,
    checkoutTracking,
  } = useCheckoutContext()

  const { checkoutModalError, checkoutModalTitle, checkoutModalDescription } =
    useCheckoutModal()

  // Load checkout and manage window side effects
  useLoadCheckout(orderData)
  useCheckoutAutoScroll()

  if (!order) {
    return <OrderErrorApp code={404} message={NOT_FOUND_ERROR} />
  }

  const isOffer = orderData.mode === "OFFER"
  const isFixedShipping =
    orderData.lineItems[0]?.artwork?.isFixedShippingFeeOnly
  const isExpressCheckoutEligible = !isOffer && isFixedShipping

  // biome-ignore lint/correctness/useExhaustiveDependencies: Mount effect
  useEffect(() => {
    if (!isExpressCheckoutEligible) {
      setExpressCheckoutLoaded([])
    }
  }, [isExpressCheckoutEligible])

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
    <>
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
        px={[0, 0, 4]}
        // add vertical padding at `sm` instead of `md` because horizontal padding starts to appear
        // at [maxWidth=] breakpoints.sm
        py={[0, 4]}
        style={{
          display: isLoading ? "none" : "grid",
        }}
      >
        <Column span={[12, 12, 6]} start={[1, 1, 2]}>
          {expressCheckoutSpinner && (
            <Order2Spinner state={expressCheckoutSpinner} />
          )}
          <Box
            // Introduce padding with constrained single-column width at `sm` breakpoint
            maxWidth={["100%", breakpoints.sm, "100%"]}
            mx={[0, "auto", 0]}
            style={{
              display: expressCheckoutSpinner ? "none" : "block",
            }}
          >
            <Stack gap={1}>
              <Box display={["block", "block", "none"]}>
                <Order2CollapsibleOrderSummary order={orderData} />
              </Box>
              {isExpressCheckoutEligible && (
                <Order2ExpressCheckout order={orderData} />
              )}
              {isOffer && (
                <Box>
                  <Jump id={STEP_JUMP_MAP.OFFER_AMOUNT} />
                  <Order2OfferStep order={orderData} />
                </Box>
              )}
              <Box>
                <Jump id={STEP_JUMP_MAP.FULFILLMENT_DETAILS} />
                <Order2FulfillmentDetailsStep order={orderData} me={meData} />
              </Box>
              <Box>
                <Jump id={STEP_JUMP_MAP.DELIVERY_OPTION} />
                <Order2DeliveryOptionsStep order={orderData} />
              </Box>
              <Box>
                <Jump id={STEP_JUMP_MAP.PAYMENT} />
                <Order2PaymentStep order={orderData} me={meData} />
              </Box>
            </Stack>
            <Box display={["block", "block", "none"]}>
              <Spacer y={1} />
              <Box>
                <Jump id={STEP_JUMP_MAP.CONFIRMATION} />
                <Order2ReviewStep order={orderData} />
              </Box>
              <Order2HelpLinksWithInquiry
                order={orderData}
                artworkID={artworkSlug as string}
                contextModule={ContextModule.ordersCheckout}
              />
            </Box>
          </Box>
        </Column>

        <Column
          span={[12, 12, 4]}
          start={[1, 1, 8]}
          display={["none", "none", "block"]}
        >
          <Box position={["initial", "initial", "sticky"]} top="100px">
            <Box>
              <Jump id={STEP_JUMP_MAP.CONFIRMATION} />
              <Order2ReviewStep order={orderData} />
            </Box>
            <Separator as="hr" />
            <Order2HelpLinksWithInquiry
              order={orderData}
              artworkID={artworkSlug as string}
              contextModule={ContextModule.ordersCheckout}
            />
          </Box>
        </Column>
      </GridColumns>
      <CheckoutModal
        error={checkoutModalError}
        overrideTitle={checkoutModalTitle}
        overrideDescription={checkoutModalDescription}
      />
    </>
  )
}

const ME_FRAGMENT = graphql`
  fragment Order2CheckoutApp_me on Me {
    ...Order2PaymentStep_me
    ...Order2FulfillmentDetailsStep_me
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
    ...useLoadCheckout_order
    ...Order2ExpressCheckout_order
    ...Order2CollapsibleOrderSummary_order
    ...Order2OfferStep_order
    ...Order2FulfillmentDetailsStep_order
    ...Order2DeliveryOptionsStep_order
    ...Order2PaymentStep_order
    ...Order2ReviewStep_order
    ...Order2CheckoutLoadingSkeleton_order
    ...Order2HelpLinks_order
  }
`
