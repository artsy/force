import {
  Box,
  Column,
  Flex,
  GridColumns,
  Spacer,
  Stack,
  Text,
} from "@artsy/palette"
import { SubmittingOrderSpinner } from "Apps/Order/Components/SubmittingOrderSpinner"
import {
  CheckoutStepName,
  CheckoutStepState,
} from "Apps/Order2/Routes/Checkout/CheckoutContext/types"
import { Order2ExpressCheckout } from "Apps/Order2/Routes/Checkout/Components/ExpressCheckout/Order2ExpressCheckout"
import { Order2FulfillmentDetailsStep } from "Apps/Order2/Routes/Checkout/Components/FulfillmentDetailsStep/Order2FulfillmentDetailsStep"
import { Order2CheckoutLoadingSkeleton } from "Apps/Order2/Routes/Checkout/Components/Order2CheckoutLoadingSkeleton"
import { Order2CollapsibleOrderSummary } from "Apps/Order2/Routes/Checkout/Components/Order2CollapsibleOrderSummary"
import { Order2ReviewStep } from "Apps/Order2/Routes/Checkout/Components/Order2ReviewStep"
import { Order2PaymentStep } from "Apps/Order2/Routes/Checkout/Components/PaymentStep/Order2PaymentStep"
import { useCheckoutContext } from "Apps/Order2/Routes/Checkout/Hooks/useCheckoutContext"
import { ErrorPage } from "Components/ErrorPage"
import { useSystemContext } from "System/Hooks/useSystemContext"
import type { Order2CheckoutApp_viewer$key } from "__generated__/Order2CheckoutApp_viewer.graphql"
import { useEffect } from "react"
import { Meta, Title } from "react-head"
import { graphql, useFragment } from "react-relay"
interface Order2CheckoutAppProps {
  viewer: Order2CheckoutApp_viewer$key
}

export const Order2CheckoutApp: React.FC<Order2CheckoutAppProps> = ({
  viewer,
}) => {
  const { isEigen } = useSystemContext()

  const data = useFragment(FRAGMENT, viewer)
  const order = data.me?.order ?? null

  const {
    isLoading,
    steps,
    activeFulfillmentDetailsTab,
    setExpressCheckoutLoaded,
    expressCheckoutSubmitting,
  } = useCheckoutContext()
  if (!order) {
    return <ErrorPage code={404} message="Order not found" />
  }

  const isOffer = order.mode === "OFFER"
  const isFixedShipping = order.lineItems[0]?.artwork?.isFixedShippingFeeOnly
  const isExpressCheckoutEligible = !isOffer && isFixedShipping

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    if (!isExpressCheckoutEligible) {
      setExpressCheckoutLoaded([])
    }
  }, [])

  const deliveryStepState = steps.find(
    step => step.name === CheckoutStepName.DELIVERY_OPTION,
  )?.state

  const showDeliveryOptionStep =
    deliveryStepState !== CheckoutStepState.HIDDEN ||
    activeFulfillmentDetailsTab === "DELIVERY"

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
      {isLoading && <Order2CheckoutLoadingSkeleton order={order} />}
      {expressCheckoutSubmitting && <SubmittingOrderSpinner />}
      <GridColumns
        pt={[0, "50px"]}
        px={[0, 0, 4]}
        backgroundColor="mono5"
        style={{
          display: isLoading || expressCheckoutSubmitting ? "none" : "grid",
        }}
      >
        <Column span={[12, 12, 7]} start={[1, 1, 1]}>
          <Box
            maxWidth={"754px"}
            width="100%"
            justifySelf={["center", "center", "end"]}
          >
            <Stack gap={1}>
              <Box display={["block", "block", "none"]}>
                <Order2CollapsibleOrderSummary order={order} />
              </Box>

              {isExpressCheckoutEligible && (
                <Order2ExpressCheckout order={order} />
              )}

              <Order2FulfillmentDetailsStep order={order} />

              {showDeliveryOptionStep && (
                <Flex flexDirection="column" backgroundColor="mono0" p={2}>
                  <Text
                    variant="sm-display"
                    fontWeight="medium"
                    color="mono100"
                  >
                    Shipping Method
                  </Text>
                  <Text variant={["xs", "xs", "sm"]} color="mono60">
                    Options vary based on address and artwork size
                  </Text>
                </Flex>
              )}

              <Order2PaymentStep order={order} />
            </Stack>
            <Box display={["block", "block", "none"]}>
              <Spacer y={1} />
              <Order2ReviewStep order={order} />
            </Box>
          </Box>
        </Column>

        <Column
          start={[1, 1, 8]}
          span={[12, 12, 5]}
          display={["none", "none", "block"]}
        >
          <Box width={"445px"} position="sticky" top={80}>
            <Order2ReviewStep order={order} />
          </Box>
        </Column>
      </GridColumns>
    </>
  )
}

const FRAGMENT = graphql`
  fragment Order2CheckoutApp_viewer on Viewer
  @argumentDefinitions(orderID: { type: "ID!" }) {
    me {
      order(id: $orderID) @required(action: NONE) {
        internalID
        fulfillmentOptions {
          type
        }
        mode
        lineItems {
          artwork {
            isFixedShippingFeeOnly
          }
        }
        ...Order2ExpressCheckout_order
        ...Order2CollapsibleOrderSummary_order
        ...Order2FulfillmentDetailsStep_order
        ...Order2PaymentStep_order
        ...Order2ReviewStep_order
        ...Order2CheckoutLoadingSkeleton_order
      }
      addressConnection(first: 10) {
        edges {
          node {
            internalID
          }
        }
      }
    }
  }
`
