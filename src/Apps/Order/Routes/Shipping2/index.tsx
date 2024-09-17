import { FC, useEffect } from "react"
import { graphql, useFragment } from "react-relay"
import { Box, Flex, Spacer } from "@artsy/palette"
import {
  Shipping2_order$data,
  Shipping2_order$key,
} from "__generated__/Shipping2_order.graphql"
import {
  Shipping2_me$data,
  Shipping2_me$key,
} from "__generated__/Shipping2_me.graphql"
import { Media } from "Utils/Responsive"
import { ArtworkSummaryItemFragmentContainer as ArtworkSummaryItem } from "Apps/Order/Components/ArtworkSummaryItem"
import {
  buyNowFlowSteps,
  offerFlowSteps,
} from "Apps/Order/Components/OrderStepper"
import { TransactionDetailsSummaryItemFragmentContainer as TransactionDetailsSummaryItem } from "Apps/Order/Components/TransactionDetailsSummaryItem"
import { Dialog, injectDialog } from "Apps/Order/Dialogs"
import { BuyerGuarantee } from "Apps/Order/Components/BuyerGuarantee"
import { ShippingQuotes2 } from "Apps/Order/Routes/Shipping2/Components/ShippingQuotes2"
import { ContextModule, OwnerType } from "@artsy/cohesion"
import { OrderRouteContainer } from "Apps/Order/Components/OrderRouteContainer"
import { Analytics } from "System/Contexts/AnalyticsContext"
import { FulfillmentDetails } from "Apps/Order/Routes/Shipping2/Components/FulfillmentDetails"
import { ShippingContextProvider } from "Apps/Order/Routes/Shipping2/ShippingContext"
import { useShippingContext } from "Apps/Order/Routes/Shipping2/Hooks/useShippingContext"
import { SaveAndContinueButton } from "Apps/Order/Routes/Shipping2/Components/SaveAndContinueButton"
import { useJump, Jump } from "Utils/Hooks/useJump"
import { FulfillmentType } from "Apps/Order/Routes/Shipping2/Utils/shippingUtils"
import { useHandleSaveFulfillmentDetails } from "Apps/Order/Routes/Shipping2/Hooks/useHandleSaveFulfillmentDetails"

export type ShippingStage =
  // User choosing fulfillment type
  | "fulfillment_details"
  // Temporary stage after address has been automatically saved
  // to wait for click
  | "fulfillment_details_saved"
  // User choosing shipping quote
  | "shipping_quotes"

export interface ShippingProps {
  order: Shipping2_order$data
  me: Shipping2_me$data
  dialog: Dialog
}

export const ShippingRoute: FC<{
  order: Shipping2_order$key
  me: Shipping2_me$key
  dialog: Dialog
}> = props => {
  const orderData = useFragment(ORDER_FRAGMENT, props.order)
  const meData = useFragment(ME_FRAGMENT, props.me)
  return (
    <Analytics contextPageOwnerId={orderData.internalID}>
      <ShippingContextProvider
        dialog={props.dialog}
        order={orderData}
        me={meData}
      >
        <ShippingRouteLayout order={orderData} me={meData} />
      </ShippingContextProvider>
    </Analytics>
  )
}

const ShippingRouteLayout: FC<Omit<ShippingProps, "dialog">> = ({
  me,
  order,
}) => {
  const shippingContext = useShippingContext()
  const { handleSaveFulfillmentDetails } = useHandleSaveFulfillmentDetails()

  const { jumpTo } = useJump()

  useEffect(() => {
    if (shippingContext.state.stage === "shipping_quotes") {
      jumpTo("shippingOptionsTop", { behavior: "smooth" })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shippingContext.state.stage])

  /*
   * Re-save fulfillment details on load if they are already saved &
   * require artsy shipping to advance to shipping quotes
   */
  useEffect(() => {
    const { savedFulfillmentDetails } = shippingContext.orderData

    const isArtsyShippingSaved =
      savedFulfillmentDetails?.fulfillmentType === FulfillmentType.SHIP &&
      savedFulfillmentDetails.isArtsyShipping

    if (!isArtsyShippingSaved) {
      return
    }
    const refreshShippingQuotes = async () => {
      const result = await handleSaveFulfillmentDetails({
        attributes: savedFulfillmentDetails.attributes,
        fulfillmentType: FulfillmentType.SHIP,
        meta: {
          // FIXME: Will clobber previous address verification (but we can't
          // know what the previous status was until we can read from server)
          addressVerifiedBy: null,
        },
      })

      shippingContext.actions.setIsPerformingOperation(false)

      if (result) {
        shippingContext.actions.setStage("shipping_quotes")
      }
    }

    refreshShippingQuotes()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Box data-testid="orderShipping">
      <OrderRouteContainer
        order={order}
        currentStep="Shipping"
        steps={
          shippingContext.orderData.isOffer ? offerFlowSteps : buyNowFlowSteps
        }
        content={
          <Flex
            flexDirection="column"
            style={
              shippingContext.state.isPerformingOperation
                ? { pointerEvents: "none" }
                : {}
            }
          >
            <FulfillmentDetails me={me} order={order} />

            <Jump id="shippingOptionsTop" />
            <ShippingQuotes2 order={order} />

            <Media greaterThan="xs">
              <SaveAndContinueButton width="50%" order={order} />
            </Media>
          </Flex>
        }
        sidebar={
          <Flex flexDirection="column">
            <Flex flexDirection="column">
              <ArtworkSummaryItem order={order} />

              <TransactionDetailsSummaryItem
                order={order}
                transactionStep="shipping"
              />
            </Flex>

            <BuyerGuarantee
              contextModule={ContextModule.ordersShipping}
              contextPageOwnerType={OwnerType.ordersShipping}
            />

            <Spacer y={[2, 4]} />

            <Media at="xs">
              <SaveAndContinueButton width="100%" order={order} />
            </Media>
          </Flex>
        }
      />
    </Box>
  )
}

const ORDER_FRAGMENT = graphql`
  fragment Shipping2_order on CommerceOrder {
    ...ShippingContext_order
    ...FulfillmentDetailsForm_order
    ...SaveAndContinueButton_order
    ...ArtworkSummaryItem_order
    ...TransactionDetailsSummaryItem_order
    ...OrderStepper_order
    ...ShippingQuotes2_order
    internalID
  }
`
const ME_FRAGMENT = graphql`
  fragment Shipping2_me on Me
    @argumentDefinitions(
      first: { type: "Int", defaultValue: 30 }
      last: { type: "Int" }
      after: { type: "String" }
      before: { type: "String" }
    ) {
    ...FulfillmentDetailsForm_me
    ...ShippingContext_me
      @arguments(first: $first, last: $last, before: $before, after: $after)
  }
`

export const ShippingRouteWithDialog = injectDialog(ShippingRoute)
