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
import { useEffect, useRef } from "react"
import { Meta, Title } from "react-head"
import { graphql, useFragment } from "react-relay"

interface Order2CheckoutAppProps {
  order: Order2CheckoutApp_order$key
  me: Order2CheckoutApp_me$key
}

const STEP_TO_CONTEXT_MODULE: Partial<
  Record<
    CheckoutStepName,
    | ContextModule.ordersOffer
    | ContextModule.ordersFulfillment
    | ContextModule.ordersShippingMethods
    | ContextModule.ordersPayment
    | ContextModule.ordersReview
  >
> = {
  [CheckoutStepName.OFFER_AMOUNT]: ContextModule.ordersOffer,
  [CheckoutStepName.FULFILLMENT_DETAILS]: ContextModule.ordersFulfillment,
  [CheckoutStepName.DELIVERY_OPTION]: ContextModule.ordersShippingMethods,
  [CheckoutStepName.PAYMENT]: ContextModule.ordersPayment,
  [CheckoutStepName.CONFIRMATION]: ContextModule.ordersReview,
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
    expressCheckoutState,
    steps,
    checkoutTracking,
    checkoutMode,
    artworkPath,
    isFulfillmentDetailsSaving,
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

  // Fire `orderProgressionViewed` exactly once per step per checkout session,
  // and only when the step is actually visible to the user — or was just
  // auto-skipped through (e.g. flat/free shipping where DELIVERY_OPTION
  // auto-completes immediately after the address is saved).
  //
  // The rules:
  //   1. The step's preceding non-HIDDEN steps must all be COMPLETED — only
  //      then can the user actually see it.
  //   2. We only fire for steps that have been seen as ACTIVE at some point,
  //      so a step that was already COMPLETED on initial load (e.g. a saved
  //      address) doesn't retroactively emit an event.
  const firedStepsRef = useRef(new Set<CheckoutStepName>())
  const seenActiveRef = useRef(new Set<CheckoutStepName>())

  useEffect(() => {
    const visibleSteps = steps.filter(
      step => step.state !== CheckoutStepState.HIDDEN,
    )

    for (let i = 0; i < visibleSteps.length; i++) {
      const step = visibleSteps[i]

      if (step.state === CheckoutStepState.ACTIVE) {
        seenActiveRef.current.add(step.name)
      }

      if (firedStepsRef.current.has(step.name)) continue

      const allPrevCompleted = visibleSteps
        .slice(0, i)
        .every(s => s.state === CheckoutStepState.COMPLETED)
      if (!allPrevCompleted) continue

      const isAutoSkipped =
        step.state === CheckoutStepState.COMPLETED &&
        seenActiveRef.current.has(step.name)
      const isNewlyVisible = step.state === CheckoutStepState.ACTIVE
      if (!isAutoSkipped && !isNewlyVisible) continue

      const contextModule = STEP_TO_CONTEXT_MODULE[step.name]
      if (!contextModule) continue

      firedStepsRef.current.add(step.name)
      checkoutTracking.orderProgressionViewed(contextModule)
    }
  }, [steps, checkoutTracking])

  // Scroll to top when returning to standard checkout mode (and at load time)
  useEffect(() => {
    if (checkoutMode === "standard") {
      window.scrollTo({ top: 0, behavior: "smooth" })
    }
  }, [checkoutMode])

  const showLoadingSkeleton = isLoading || expressCheckoutState !== null

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
      {showLoadingSkeleton && (
        <Order2CheckoutLoadingSkeleton
          order={orderData}
          expressCheckoutState={expressCheckoutState}
        />
      )}
      <GridColumns
        px={[0, 0, 4]}
        // add vertical padding at `sm` instead of `md` because horizontal padding starts to appear
        // at [maxWidth=] breakpoints.sm
        py={[0, 4]}
        style={{
          display: showLoadingSkeleton ? "none" : "grid",
        }}
      >
        <Column span={[12, 12, 6]} start={[1, 1, 2]}>
          <Box
            // Introduce padding with constrained single-column width at `sm` breakpoint
            maxWidth={["100%", breakpoints.sm, "100%"]}
            mx={[0, "auto", 0]}
          >
            <Stack gap={1}>
              <Box display={["block", "block", "none"]}>
                <Order2CollapsibleOrderSummary
                  order={orderData}
                  checkoutTracking={checkoutTracking}
                  artworkPath={artworkPath}
                  isFulfillmentDetailsSaving={isFulfillmentDetailsSaving}
                />
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
              <Order2DeliveryOptionsStep order={orderData} />
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
