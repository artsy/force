import { FC } from "react"
import { RelayProp, createFragmentContainer, graphql } from "react-relay"
import { Box, Flex, Spacer, Text } from "@artsy/palette"
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
import { ShippingQuotes2 } from "Apps/Order/Routes/Shipping2/Components/ShippingQuotes2"
import { ContextModule, OwnerType } from "@artsy/cohesion"
import { OrderRouteContainer } from "Apps/Order/Components/OrderRouteContainer"
import { Analytics } from "System/Analytics/AnalyticsContext"
import { FulfillmentDetails } from "Apps/Order/Routes/Shipping2/Components/FulfillmentDetails"
import { ShippingContextProvider } from "Apps/Order/Routes/Shipping2/ShippingContext"
import { useShippingContext } from "Apps/Order/Routes/Shipping2/Hooks/useShippingContext"
import { SaveAndContinueButton } from "Apps/Order/Routes/Shipping2/Components/SaveAndContinueButton"
import { useBackToFullfillmentDetails } from "Apps/Order/Routes/Shipping2/Hooks/useBackToFulfillmentDetails"
import { useSelectFirstShippingQuote } from "Apps/Order/Routes/Shipping2/Hooks/useSelectFirstShippingQuote"
import { CollapseDetails } from "Apps/Order/Routes/Shipping2/Components/CollapseDetails"

export type ShippingStage =
  | "fulfillment_details"
  | "shipping_quotes"
  | "refresh_shipping_quotes"

export interface ShippingProps {
  order: Shipping2_order$data
  me: Shipping2_me$data
  relay?: RelayProp
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
        <ShippingRouteLayout order={props.order} me={props.me} />
      </ShippingContextProvider>
    </Analytics>
  )
}

const ShippingRouteLayout: FC<Omit<ShippingProps, "dialog">> = ({
  me,
  order,
}) => {
  const shippingContext = useShippingContext()

  const isOffer = order.mode === "OFFER"

  // Go back to fulfillment details stage if the user edits the address or
  // deletes a saved address.
  useBackToFullfillmentDetails(me)

  // Automatically selects first shipping quote when they change
  useSelectFirstShippingQuote()

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

            <CollapseDetails>
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

              {order.lineItems?.edges?.[0]?.node && (
                <ShippingQuotes2
                  commerceLineItem={order.lineItems?.edges?.[0]?.node}
                />
              )}

              <Spacer y={4} />
            </CollapseDetails>

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
        ...ArtworkSummaryItem_order
        ...TransactionDetailsSummaryItem_order
        ...OrderStepper_order

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
              ...ShippingQuotes2_commerceLineItem
              shippingQuoteOptions {
                edges {
                  node {
                    id
                    isSelected
                    price(precision: 2)
                    priceCents
                    typeName
                  }
                }
              }
              artwork {
                slug
                processWithArtsyShippingDomestic
                artsyShippingInternational
                pickup_available: pickupAvailable
                onlyShipsDomestically
                euShippingOrigin
                shippingCountry
              }
            }
          }
        }
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
