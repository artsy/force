import { Column, Flex, GridColumns, Stack, Text } from "@artsy/palette"
import { CheckoutStepName } from "Apps/Order2/Routes/Checkout/Components/Order2CheckoutContext"
import { Order2CheckoutLoadingSkeleton } from "Apps/Order2/Routes/Checkout/Components/Order2CheckoutLoadingSkeleton"
import { Order2CollapsibleOrderSummary } from "Apps/Order2/Routes/Checkout/Components/Order2CollapsibleOrderSummary"
import { Order2FulfillmentDetailsStep } from "Apps/Order2/Routes/Checkout/Components/Order2FulfillmentDetailsStep/Order2FulfillmentDetailsStep"
import { Order2ReviewStep } from "Apps/Order2/Routes/Checkout/Components/Order2ReviewStep"
import { useCheckoutContext } from "Apps/Order2/Routes/Checkout/Hooks/useCheckoutContext"
import { ErrorPage } from "Components/ErrorPage"
import { useSystemContext } from "System/Hooks/useSystemContext"
import createLogger from "Utils/logger"
import type { Order2CheckoutApp_viewer$key } from "__generated__/Order2CheckoutApp_viewer.graphql"
import { Meta, Title } from "react-head"
import { graphql, useFragment } from "react-relay"
interface Order2CheckoutAppProps {
  viewer: Order2CheckoutApp_viewer$key
}

const logger = createLogger("Order2CheckoutApp.tsx")

export const Order2CheckoutApp: React.FC<Order2CheckoutAppProps> = ({
  viewer,
}) => {
  const { isEigen } = useSystemContext()

  const data = useFragment(FRAGMENT, viewer)
  const order = data.me?.order

  // TODO: CTX is always present, but the hook needs to be updated after we can guarantee
  // this from its usage in the shared express checkout
  const { isLoading, steps } = useCheckoutContext()!

  const stepNames = steps?.map(step => step.name)

  logger.log(
    { stepNames },
    stepNames.includes(CheckoutStepName.DELIVERY_OPTION),
  )

  if (!order) {
    return <ErrorPage code={404} message="Order not found" />
  }

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
      <GridColumns style={{ display: isLoading ? "none" : "block" }}>
        <Column span={[12, 8]} start={[1, 2]}>
          <Stack gap={1} bg="mono5">
            {/* Collapsible order summary */}
            <Order2CollapsibleOrderSummary order={order} />

            {/* Fulfillment details Step */}
            <Order2FulfillmentDetailsStep order={order} />

            {/* Shipping method Step */}
            {stepNames.includes(CheckoutStepName.DELIVERY_OPTION) && (
              <Flex flexDirection="column" backgroundColor="mono0" p={2}>
                <Text variant="sm-display" fontWeight="medium" color="mono100">
                  Shipping Method
                </Text>
                <Text variant="xs" color="mono60">
                  Options vary based on address and artwork size
                </Text>
              </Flex>
            )}

            {/* Payment method Step */}
            <Flex flexDirection="column" backgroundColor="mono0" p={2}>
              <Text variant="sm-display" fontWeight="medium" color="mono100">
                Payment
              </Text>
              <Text variant="xs" color="mono60">
                Options vary based on price, gallery, and location
              </Text>
              {/* <PaymentForm /> */}
            </Flex>

            <Order2ReviewStep order={order} />
          </Stack>
        </Column>
      </GridColumns>
    </>
  )
}

const FRAGMENT = graphql`
  fragment Order2CheckoutApp_viewer on Viewer
  @argumentDefinitions(orderID: { type: "ID!" }) {
    me {
      order(id: $orderID) {
        internalID
        fulfillmentOptions {
          type
        }
        ...Order2CollapsibleOrderSummary_order
        ...Order2FulfillmentDetailsStep_order
        ...Order2ReviewStep_order
        ...useLoadCheckout_order
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
