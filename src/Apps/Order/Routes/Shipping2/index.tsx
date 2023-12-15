import { FC, useEffect } from "react"
import { Router } from "found"
import { RelayProp, createFragmentContainer, graphql } from "react-relay"
import { compact } from "lodash"
import { Box, Flex, Spacer, Text, usePrevious } from "@artsy/palette"

import { Shipping2_order$data } from "__generated__/Shipping2_order.graphql"
import { Shipping2_me$data } from "__generated__/Shipping2_me.graphql"

import { Media } from "Utils/Responsive"
import { ArtworkSummaryItemFragmentContainer as ArtworkSummaryItem } from "Apps/Order/Components/ArtworkSummaryItem"
import {
  buyNowFlowSteps,
  offerFlowSteps,
} from "Apps/Order/Components/OrderStepper"
import { TransactionDetailsSummaryItemFragmentContainer as TransactionDetailsSummaryItem } from "Apps/Order/Components/TransactionDetailsSummaryItem"
import { Dialog, injectDialog } from "Apps/Order/Dialogs"
import { BuyerGuarantee } from "Apps/Order/Components/BuyerGuarantee"
import { Collapse } from "Apps/Order/Components/Collapse"
import { ShippingQuotes2 } from "Apps/Order/Routes/Shipping2/Components/ShippingQuotes2"
import { ContextModule, OwnerType } from "@artsy/cohesion"
import { OrderRouteContainer } from "Apps/Order/Components/OrderRouteContainer"
import { Analytics } from "System/Analytics/AnalyticsContext"
import { FulfillmentDetails } from "Apps/Order/Routes/Shipping2/Components/FulfillmentDetails"
import { matchAddressFields } from "Apps/Order/Routes/Shipping2/Utils/shippingUtils"
import { ShippingContextProvider } from "Apps/Order/Routes/Shipping2/ShippingContext"
import { extractNodes } from "Utils/extractNodes"
import { useShippingContext } from "Apps/Order/Routes/Shipping2/Hooks/useShippingContext"
import { SaveAndContinueButton } from "Apps/Order/Routes/Shipping2/Components/SaveAndContinueButton"

export type ShippingStage =
  | "fulfillment_details"
  | "shipping_quotes"
  | "refresh_shipping_quotes"

export interface ShippingProps {
  order: Shipping2_order$data
  me: Shipping2_me$data
  relay?: RelayProp
  router: Router
  dialog: Dialog
}

export const ShippingRoute: FC<ShippingProps> = props => {
  return (
    <Analytics contextPageOwnerId={props.order.internalID}>
      <ShippingContextProvider
        dialog={props.dialog}
        order={props.order}
        me={props.me}
      >
        <ShippingRouteLayout
          dialog={props.dialog}
          order={props.order}
          me={props.me}
          router={props.router}
        />
      </ShippingContextProvider>
    </Analytics>
  )
}

const ShippingRouteLayout: FC<ShippingProps> = ({ me, order }) => {
  const shippingContext = useShippingContext()
  const savedAddresses = extractNodes(me.addressConnection)
  const previousSavedAddresses = usePrevious(savedAddresses)

  const isOffer = order.mode === "OFFER"

  const isArtsyShipping =
    shippingContext.parsedOrderData.savedFulfillmentDetails?.isArtsyShipping

  const formValues = shippingContext.helpers.fulfillmentDetails.values
  const previousFormValues = usePrevious(formValues)

  const showArtsyShipping =
    shippingContext.state.stage === "shipping_quotes" &&
    !!isArtsyShipping &&
    !!shippingContext.parsedOrderData.shippingQuotes &&
    shippingContext.parsedOrderData.shippingQuotes.length > 0

  const defaultShippingQuoteId =
    shippingContext.parsedOrderData.shippingQuotes?.[0]?.id

  const bestArtsyShippingQuote = isArtsyShipping
    ? shippingContext.parsedOrderData.shippingQuotes?.find(
        quote => quote.isSelected
      )?.id || defaultShippingQuoteId
    : null

  const maybeShippingQuotesConnectionEdges =
    order.lineItems?.edges?.[0]?.node?.shippingQuoteOptions?.edges

  const shippingQuotesConnectionEdges = maybeShippingQuotesConnectionEdges
    ? compact(maybeShippingQuotesConnectionEdges)
    : ([] as NonNullable<typeof maybeShippingQuotesConnectionEdges>)

  /**
   * Go back to fulfillment details stage if the user edits the address or
   * deletes a saved address.
   */
  useEffect(() => {
    if (
      shippingContext.state.stage === "fulfillment_details" ||
      !shippingContext.parsedOrderData.savedFulfillmentDetails
    ) {
      return
    }

    const addressValuesChanged = !matchAddressFields(
      formValues.attributes,
      previousFormValues.attributes
    )

    const deletedNewSavedAddress =
      shippingContext.state.newSavedAddressId &&
      previousSavedAddresses.length > savedAddresses.length &&
      !savedAddresses.find(
        a => a.internalID === shippingContext.state.newSavedAddressId
      )

    if (addressValuesChanged || deletedNewSavedAddress) {
      shippingContext.helpers.setStage("fulfillment_details")

      if (deletedNewSavedAddress) {
        shippingContext.helpers.setNewSavedAddressId(null)
      }
    }
  }, [
    formValues.attributes,
    shippingContext.helpers.fulfillmentDetails.values,
    shippingContext.parsedOrderData.savedFulfillmentDetails,
    previousFormValues.attributes,
    previousSavedAddresses.length,
    savedAddresses,
    savedAddresses.length,
    shippingContext.state.newSavedAddressId,
    shippingContext.state.stage,
    shippingContext.helpers,
  ])

  // Automatically selects first shipping quote when they change
  useEffect(() => {
    if (
      bestArtsyShippingQuote &&
      bestArtsyShippingQuote !==
        shippingContext.parsedOrderData.selectedShippingQuoteId
    ) {
      shippingContext.helpers.setSelectedShippingQuote(bestArtsyShippingQuote)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    shippingContext.parsedOrderData.selectedShippingQuoteId,
    defaultShippingQuoteId,
    bestArtsyShippingQuote,
  ])

  const handleShippingQuoteSelected = (newShippingQuoteId: string) => {
    shippingContext.helpers.orderTracking.clickedSelectShippingOption(
      newShippingQuoteId
    )
    shippingContext.helpers.setSelectedShippingQuote(newShippingQuoteId)
  }

  return (
    <Box data-test="orderShipping">
      <OrderRouteContainer
        order={order}
        currentStep="Shipping"
        steps={isOffer ? offerFlowSteps : buyNowFlowSteps}
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

            <Collapse
              data-testid="ShippingQuotes_collapse"
              open={showArtsyShipping}
            >
              <Text variant="sm">Artsy shipping options</Text>

              <Text variant="xs" mb="1" color="black60">
                {isOffer ? (
                  <>
                    Please note that these are estimates and may change once
                    offer is finalized. All options are eligible for Artsy’s
                    Buyer Protection policy, which protects against damage and
                    loss.
                  </>
                ) : (
                  <>
                    All options are eligible for Artsy’s Buyer Protection
                    policy, which protects against damage and loss.
                  </>
                )}
              </Text>

              <ShippingQuotes2
                shippingQuotes={shippingQuotesConnectionEdges}
                onSelect={handleShippingQuoteSelected}
              />

              <Spacer y={4} />
            </Collapse>

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

export const ShippingFragmentContainer = createFragmentContainer(
  injectDialog(ShippingRoute),
  {
    order: graphql`
      fragment Shipping2_order on CommerceOrder {
        ...FulfillmentDetailsForm_order
        ...SaveAndContinueButton_order

        __typename
        id
        internalID
        mode
        state
        requestedFulfillment {
          __typename
          ... on CommercePickup {
            phoneNumber
          }
          ... on CommerceShip {
            name
            addressLine1
            addressLine2
            city
            region
            country
            postalCode
            phoneNumber
          }
          ... on CommerceShipArta {
            name
            addressLine1
            addressLine2
            city
            region
            country
            postalCode
            phoneNumber
          }
        }
        lineItems {
          edges {
            node {
              artwork {
                slug
                processWithArtsyShippingDomestic
                artsyShippingInternational
                pickup_available: pickupAvailable
                onlyShipsDomestically
                euShippingOrigin
                shippingCountry
              }
              shippingQuoteOptions {
                edges {
                  ...ShippingQuotes_shippingQuotes
                  node {
                    id
                    isSelected
                  }
                }
              }
            }
          }
        }
        ...ArtworkSummaryItem_order
        ...TransactionDetailsSummaryItem_order
        ...OrderStepper_order
      }
    `,
    me: graphql`
      fragment Shipping2_me on Me
        @argumentDefinitions(
          first: { type: "Int", defaultValue: 30 }
          last: { type: "Int" }
          after: { type: "String" }
          before: { type: "String" }
        ) {
        ...FulfillmentDetailsForm_me
        ...SavedAddresses2_me
        name
        email
        id
        location {
          country
        }
        addressConnection(
          first: $first
          last: $last
          before: $before
          after: $after
        ) {
          edges {
            node {
              id
              internalID
              addressLine1
              addressLine2
              addressLine3
              city
              country
              isDefault
              name
              phoneNumber
              postalCode
              region
            }
          }
        }
      }
    `,
  }
)
