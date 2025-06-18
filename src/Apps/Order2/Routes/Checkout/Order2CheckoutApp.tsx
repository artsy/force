import {
  Box,
  Column,
  GridColumns,
  Separator,
  Spacer,
  Stack,
} from "@artsy/palette"
import { SubmittingOrderSpinner } from "Apps/Order/Components/SubmittingOrderSpinner"
import { Order2DeliveryOptionsStep } from "Apps/Order2/Routes/Checkout/Components/DeliveryOptionsStep/Order2DeliveryOptionsStep"
import { Order2ExpressCheckout } from "Apps/Order2/Routes/Checkout/Components/ExpressCheckout/Order2ExpressCheckout"
import { Order2FulfillmentDetailsStep } from "Apps/Order2/Routes/Checkout/Components/FulfillmentDetailsStep/Order2FulfillmentDetailsStep"
import { Order2CheckoutLoadingSkeleton } from "Apps/Order2/Routes/Checkout/Components/Order2CheckoutLoadingSkeleton"
import { Order2CollapsibleOrderSummary } from "Apps/Order2/Routes/Checkout/Components/Order2CollapsibleOrderSummary"
import { Order2HelpLinksWithInquiry } from "Apps/Order2/Routes/Checkout/Components/Order2HelpLinks"
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
  const artworkSlug = order?.lineItems[0]?.artwork?.slug

  const { isLoading, setExpressCheckoutLoaded, expressCheckoutSubmitting } =
    useCheckoutContext()
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
        py={[0, 4]}
        px={[0, 0, 4]}
        style={{
          display: isLoading || expressCheckoutSubmitting ? "none" : "grid",
        }}
      >
        <Column span={[12, 12, 7]} width="100%">
          <Box
            width="100%"
            maxWidth="754px"
            mx={["auto", "auto", 0]}
            ml={[0, "auto", "auto"]}
          >
            <Stack gap={1}>
              <Box display={["block", "block", "none"]}>
                <Order2CollapsibleOrderSummary order={order} />
              </Box>
              {isExpressCheckoutEligible && (
                <Order2ExpressCheckout order={order} />
              )}
              <Order2FulfillmentDetailsStep order={order} />
              <Order2DeliveryOptionsStep />
              <Order2PaymentStep order={order} />
            </Stack>
            <Box display={["block", "block", "none"]}>
              <Spacer y={1} />
              <Order2ReviewStep order={order} />
              <Order2HelpLinksWithInquiry
                order={order}
                artworkID={artworkSlug as string}
                // @ts-expect-error TODO: update when we have checkout context menu
                contextModule=""
              />
            </Box>
          </Box>
        </Column>

        <Column
          span={[12, 12, 5]}
          display={["none", "none", "block"]}
          maxWidth="445px"
        >
          <Box position={["initial", "initial", "fixed"]}>
            <Order2ReviewStep order={order} />
            <Separator as="hr" />
            <Order2HelpLinksWithInquiry
              order={order}
              artworkID={artworkSlug as string}
              // @ts-expect-error TODO: update when we have checkout context menu
              contextModule=""
            />
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
            slug
            isFixedShippingFeeOnly
          }
        }
        ...Order2ExpressCheckout_order
        ...Order2CollapsibleOrderSummary_order
        ...Order2FulfillmentDetailsStep_order
        ...Order2PaymentStep_order
        ...Order2ReviewStep_order
        ...Order2CheckoutLoadingSkeleton_order
        ...Order2HelpLinks_order
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
