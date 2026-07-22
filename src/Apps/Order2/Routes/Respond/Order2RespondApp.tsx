import { ContextModule } from "@artsy/cohesion"
import {
  Box,
  Column,
  GridColumns,
  Separator,
  Stack,
  breakpoints,
} from "@artsy/palette"
import { OrderErrorApp } from "Apps/Order2/Components/Order2ErrorApp"
import { Order2HelpLinksWithInquiry } from "Apps/Order2/Components/Order2HelpLinks"
import { CheckoutModal } from "Apps/Order2/Routes/Checkout/Components/CheckoutModal"
import { useCheckoutModal } from "Apps/Order2/Routes/Checkout/Hooks/useCheckoutModal"
import { useRespondContext } from "Apps/Order2/Routes/Respond/Hooks/useRespondContext"
// TODO: These imports from the checkout route should either be hoisted up to the general Apps/Order2/Components folder or copied into the respond route.
import { Order2DeliveryOptionsCompletedView } from "Apps/Order2/Routes/Checkout/Components/DeliveryOptionsStep/Order2DeliveryOptionsCompletedView"
import { useCompleteDeliveryOptionData } from "Apps/Order2/Routes/Checkout/Components/DeliveryOptionsStep/useCompleteDeliveryOptionData"
import { Order2FulfillmentDetailsCompletedView } from "Apps/Order2/Routes/Checkout/Components/FulfillmentDetailsStep/Order2FulfillmentDetailsCompletedView"
import { useCompleteFulfillmentDetailsData } from "Apps/Order2/Routes/Checkout/Components/FulfillmentDetailsStep/useCompleteFulfillmentDetailsData"
import { Order2PaymentCompletedView } from "Apps/Order2/Routes/Checkout/Components/PaymentStep/Order2PaymentCompletedView"
import { Order2OfferHistory } from "Apps/Order2/Routes/Respond/Components/Order2OfferHistory"
import { Order2RespondForm } from "Apps/Order2/Routes/Respond/Components/Order2RespondForm"
import { Order2RespondSummary } from "Apps/Order2/Routes/Respond/Components/Order2RespondSummary"
import { NOT_FOUND_ERROR } from "Apps/Order2/constants"
import { useSystemContext } from "System/Hooks/useSystemContext"
import type { Order2RespondApp_order$key } from "__generated__/Order2RespondApp_order.graphql"
import { Meta, Title } from "react-head"
import { graphql, useFragment } from "react-relay"

interface Order2RespondAppProps {
  order: Order2RespondApp_order$key
}

export const Order2RespondApp: React.FC<Order2RespondAppProps> = ({
  order,
}) => {
  const { isEigen } = useSystemContext()
  const { artworkPath, checkoutTracking } = useRespondContext()
  const { checkoutModalError, checkoutModalTitle, checkoutModalDescription } =
    useCheckoutModal()

  const orderData = useFragment(ORDER_FRAGMENT, order)
  const artworkSlug = orderData?.lineItems[0]?.artwork?.slug

  // Reuse the checkout step data hooks (context-free) to derive the same
  // collapsed summaries. Rendered read-only here (no `onEdit`).
  const fulfillmentDetailsProps = useCompleteFulfillmentDetailsData(orderData)
  const deliveryOptionProps = useCompleteDeliveryOptionData(orderData)

  if (!order) {
    return <OrderErrorApp code={404} message={NOT_FOUND_ERROR} />
  }

  return (
    <>
      <Title>Respond to Offer | Artsy</Title>
      <Meta
        name="viewport"
        content={
          isEigen
            ? "width=device-width, user-scalable=no"
            : "width=device-width, initial-scale=1, maximum-scale=5 viewport-fit=cover"
        }
      />
      <GridColumns px={[0, 0, 4]} py={[0, 4]}>
        <Column span={[12, 12, 6]} start={[1, 1, 2]}>
          <Box maxWidth={["100%", breakpoints.sm, "100%"]} mx={[0, "auto", 0]}>
            <Stack gap={1}>
              <Order2RespondForm order={orderData} />

              <Order2OfferHistory order={orderData} />

              {/* Respond form (EMI-3172) renders above these summaries. */}
              {fulfillmentDetailsProps && (
                <Box backgroundColor="mono0" py={2} px={[2, 2, 4]}>
                  <Order2FulfillmentDetailsCompletedView
                    {...fulfillmentDetailsProps}
                  />
                </Box>
              )}

              {deliveryOptionProps && (
                <Order2DeliveryOptionsCompletedView {...deliveryOptionProps} />
              )}

              {orderData.paymentMethod && (
                <Box backgroundColor="mono0" py={2} px={[2, 2, 4]}>
                  <Order2PaymentCompletedView order={orderData} />
                </Box>
              )}

              <Box display={["block", "block", "none"]}>
                <Order2RespondSummary order={orderData} />
                <Order2HelpLinksWithInquiry
                  order={orderData}
                  artworkID={artworkSlug as string}
                  contextModule={ContextModule.ordersRespond}
                />
              </Box>
            </Stack>
          </Box>
        </Column>

        {/* desktop */}
        <Column
          span={[12, 12, 4]}
          start={[1, 1, 8]}
          display={["none", "none", "block"]}
          alignSelf="start"
        >
          <Box position={["initial", "initial", "sticky"]} top="100px">
            <Order2RespondSummary order={orderData} />
            <Separator as="hr" />
            <Order2HelpLinksWithInquiry
              order={orderData}
              artworkID={artworkSlug as string}
              contextModule={ContextModule.ordersRespond}
            />
          </Box>
        </Column>
      </GridColumns>
      <CheckoutModal
        error={checkoutModalError}
        artworkPath={artworkPath}
        checkoutTracking={checkoutTracking}
        overrideTitle={checkoutModalTitle}
        overrideDescription={checkoutModalDescription}
      />
    </>
  )
}

const ORDER_FRAGMENT = graphql`
  fragment Order2RespondApp_order on Order {
    paymentMethod
    lineItems {
      artwork {
        slug
      }
    }
    ...Order2RespondSummary_order
    ...useCompleteFulfillmentDetailsData_order
    ...useCompleteDeliveryOptionData_order
    ...Order2PaymentCompletedView_order
    ...Order2RespondForm_order
    ...Order2OfferHistory_order
    ...Order2HelpLinks_order
  }
`
