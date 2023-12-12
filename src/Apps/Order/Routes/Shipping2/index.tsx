import { FC, useCallback, useMemo, useEffect } from "react"
import { Router } from "found"
import { RelayProp, createFragmentContainer, graphql } from "react-relay"
import { compact } from "lodash"

import { Shipping2_order$data } from "__generated__/Shipping2_order.graphql"
import { Shipping2_me$data } from "__generated__/Shipping2_me.graphql"

import { Box, Button, Flex, Spacer, Text, usePrevious } from "@artsy/palette"
import createLogger from "Utils/logger"
import { Media } from "Utils/Responsive"

import { ArtworkSummaryItemFragmentContainer as ArtworkSummaryItem } from "Apps/Order/Components/ArtworkSummaryItem"
import {
  buyNowFlowSteps,
  offerFlowSteps,
} from "Apps/Order/Components/OrderStepper"
import { TransactionDetailsSummaryItemFragmentContainer as TransactionDetailsSummaryItem } from "Apps/Order/Components/TransactionDetailsSummaryItem"

import { Dialog, injectDialog } from "Apps/Order/Dialogs"
import {
  CommitMutation,
  injectCommitMutation,
} from "Apps/Order/Utils/commitMutation"

import { BuyerGuarantee } from "Apps/Order/Components/BuyerGuarantee"
import { Collapse } from "Apps/Order/Components/Collapse"
import { ShippingQuotesFragmentContainer } from "Apps/Order/Components/ShippingQuotes"
import { ContextModule, OwnerType } from "@artsy/cohesion"
import { OrderRouteContainer } from "Apps/Order/Components/OrderRouteContainer"
import { Analytics } from "System/Analytics/AnalyticsContext"
import { FulfillmentDetailsFragmentContainer } from "Apps/Order/Routes/Shipping2/FulfillmentDetails"
import {
  addressWithFallbackValues,
  FulfillmentType,
  FulfillmentValues,
  matchAddressFields,
} from "Apps/Order/Routes/Shipping2/Utils/shippingUtils"
import { useCreateSavedAddress } from "Apps/Order/Routes/Shipping2/Mutations/useCreateSavedAddress"
import { useSelectShippingQuote } from "Apps/Order/Routes/Shipping2/Mutations/useSelectShippingQuote"
import { ShippingContextProvider } from "Apps/Order/Routes/Shipping2/Utils/ShippingContext/ShippingContext"
import { useDeleteSavedAddress } from "Apps/Order/Routes/Shipping2/Mutations/useDeleteSavedAddress"
import { useUpdateSavedAddress } from "Apps/Order/Routes/Shipping2/Mutations/useUpdateSavedAddress"
import { extractNodes } from "Utils/extractNodes"
import { ArtaErrorDialogMessage } from "Apps/Order/Utils/getErrorDialogCopy"
import { useShippingContext } from "Apps/Order/Routes/Shipping2/Hooks/useShippingContext"

const logger = createLogger("Order/Routes/Shipping/index.tsx")

export interface ShippingProps {
  order: Shipping2_order$data
  me: Shipping2_me$data
  relay?: RelayProp
  router: Router
  dialog: Dialog
  isCommittingMutation: boolean
  commitMutation: CommitMutation
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
          isCommittingMutation={props.isCommittingMutation}
          commitMutation={props.commitMutation}
          router={props.router}
        />
      </ShippingContextProvider>
    </Analytics>
  )
}

const ShippingRouteLayout: FC<ShippingProps> = props => {
  const { order, isCommittingMutation } = props

  const createSavedAddress = useCreateSavedAddress()
  const updateSavedAddress = useUpdateSavedAddress()
  const deleteSavedAddress = useDeleteSavedAddress()
  const selectShippingQuote = useSelectShippingQuote()

  const shippingContext = useShippingContext()

  const {
    parsedOrderData,
    helpers: { fulfillmentDetails: fulfillmentFormHelpers },
  } = shippingContext

  const isOffer = order.mode === "OFFER"
  const isArtsyShipping =
    parsedOrderData.savedFulfillmentDetails?.isArtsyShipping

  const advanceToPayment = useCallback(() => {
    props.router.push(`/orders/${props.order.internalID}/payment`)
  }, [props.router, props.order.internalID])

  const handleFulfillmentDetailsSaved = useCallback(
    ({ requiresArtsyShipping }: { requiresArtsyShipping: boolean }) => {
      if (requiresArtsyShipping) {
        shippingContext.helpers.setStage("shipping_quotes")
      } else {
        advanceToPayment()
      }
    },
    [advanceToPayment, shippingContext.helpers]
  )

  const formValues = fulfillmentFormHelpers.values
  const previousFormValues = usePrevious(formValues)

  const savedAddresses = extractNodes(props.me.addressConnection)
  const previousSavedAddresses = usePrevious(savedAddresses)

  /* Go back to fulfillment details stage if the user edits the address
   * or deletes a saved address.
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
      deletedNewSavedAddress &&
        shippingContext.helpers.setNewSavedAddressId(null)
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

  const currentSavedFulfillmentDetails =
    parsedOrderData.savedFulfillmentDetails?.fulfillmentDetails
  const handleUserAddressUpdates = useCallback(
    async (formValues: FulfillmentValues) => {
      if (formValues.fulfillmentType !== FulfillmentType.SHIP) {
        return
      }
      const formAddressAttributes = formValues.attributes
      const addressShouldBeSaved = !!formAddressAttributes.saveAddress
      const current = {
        newSavedAddressId: shippingContext.state.newSavedAddressId,
        savedFulfillmentDetails: currentSavedFulfillmentDetails,
      }

      try {
        if (addressShouldBeSaved) {
          if (!current.newSavedAddressId) {
            // Address not saved, create it
            const response = await createSavedAddress.submitMutation({
              variables: {
                input: {
                  attributes: addressWithFallbackValues(formAddressAttributes),
                },
              },
            })
            const newAddress = response?.createUserAddress?.userAddressOrErrors
            if (newAddress?.__typename === "UserAddress") {
              shippingContext.helpers.setNewSavedAddressId(
                newAddress.internalID
              )
              return
            }
            // Address create failed
            // const errorMessage = newAddress?.__typename === "Errors"
            //   ? newAddress.errors.map(e => e.message).join(", ")
            //   : "Something went wrong."
            // throw new Error(errorMessage)
            return
          } else if (
            current.newSavedAddressId &&
            current.savedFulfillmentDetails &&
            !matchAddressFields(
              current.savedFulfillmentDetails,
              formAddressAttributes
            )
          ) {
            await updateSavedAddress.submitMutation({
              variables: {
                input: {
                  userAddressID: current.newSavedAddressId,
                  attributes: addressWithFallbackValues(formAddressAttributes),
                },
              },
            })
          }
        } else {
          // Address should not be saved, delete it if it exists
          if (shippingContext.state.newSavedAddressId) {
            await deleteSavedAddress.submitMutation({
              variables: {
                input: {
                  userAddressID: shippingContext.state.newSavedAddressId,
                },
              },
            })
            shippingContext.helpers.setNewSavedAddressId(null)
          }
        }
      } catch (error) {
        logger.error(error)
      }
    },
    [
      createSavedAddress,
      currentSavedFulfillmentDetails,
      deleteSavedAddress,
      shippingContext.helpers,
      shippingContext.state.newSavedAddressId,
      updateSavedAddress,
    ]
  )

  const savedFulfillmentType =
    parsedOrderData.savedFulfillmentDetails?.fulfillmentType
  const saveSelectedShippingQuote = useCallback(async () => {
    const { order } = props

    if (!shippingContext.state.selectedShippingQuoteId) {
      logger.error("No shipping quote selected")
      return
    }
    if (savedFulfillmentType !== FulfillmentType.SHIP) {
      logger.error("No shipping address saved")
      return
    }
    try {
      const result = await selectShippingQuote.submitMutation({
        variables: {
          input: {
            id: order.internalID,
            selectedShippingQuoteId:
              shippingContext.state.selectedShippingQuoteId,
          },
        },
      })
      const orderOrError = result.commerceSelectShippingOption?.orderOrError

      if (orderOrError?.__typename === "CommerceOrderWithMutationFailure") {
        shippingContext.helpers.handleExchangeError(orderOrError.error, logger)
        return
      }

      await handleUserAddressUpdates(fulfillmentFormHelpers.values)
      advanceToPayment()
    } catch (error) {
      logger.error(error)

      shippingContext.helpers.orderTracking.errorMessageViewed({
        error_code: null,
        title: "An error occurred",
        message:
          "There was a problem getting shipping quotes. Please contact orders@artsy.net.",
        flow: "user sets a shipping quote",
      })

      shippingContext.helpers.dialog.showErrorDialog({
        message: <ArtaErrorDialogMessage />,
      })
    }
  }, [
    props,
    shippingContext.state.selectedShippingQuoteId,
    savedFulfillmentType,
    selectShippingQuote,
    handleUserAddressUpdates,
    fulfillmentFormHelpers.values,
    advanceToPayment,
    shippingContext.helpers,
  ])

  const handleShippingQuoteSelected = (newShippingQuoteId: string) => {
    shippingContext.helpers.orderTracking.clickedSelectShippingOption(
      newShippingQuoteId
    )
    shippingContext.helpers.setSelectedShippingQuote(newShippingQuoteId)
  }

  const renderArtsyShippingOptionText = () => {
    let text
    if (isOffer) {
      text =
        "Please note that these are estimates and may change once offer is finalized. "
    } else {
      text = ""
    }
    return `${text}All options are eligible for Artsy’s Buyer Protection policy, which protects against damage and loss.`
  }

  const showArtsyShipping =
    shippingContext.state.stage === "shipping_quotes" &&
    !!isArtsyShipping &&
    !!parsedOrderData.shippingQuotes &&
    parsedOrderData.shippingQuotes.length > 0

  const defaultShippingQuoteId = parsedOrderData.shippingQuotes?.[0]?.id
  const useDefaultArtsyShippingQuote =
    isArtsyShipping &&
    defaultShippingQuoteId &&
    !shippingContext.parsedOrderData.selectedShippingQuoteId

  // Automatically selects first shipping quote when they change
  useEffect(() => {
    if (
      useDefaultArtsyShippingQuote &&
      shippingContext.parsedOrderData.selectedShippingQuoteId !==
        defaultShippingQuoteId
    ) {
      shippingContext.helpers.setSelectedShippingQuote(defaultShippingQuoteId)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    shippingContext.parsedOrderData.selectedShippingQuoteId,
    defaultShippingQuoteId,
    useDefaultArtsyShippingQuote,
  ])

  const submitFulfillmentDetailsFormik = fulfillmentFormHelpers.submitForm

  const onContinueButtonPressed = useCallback(async () => {
    if (shippingContext.state.stage === "fulfillment_details") {
      return submitFulfillmentDetailsFormik()
    }

    if (shippingContext.state.stage === "shipping_quotes") {
      await saveSelectedShippingQuote()

      return
    }
  }, [
    shippingContext.state.stage,
    submitFulfillmentDetailsFormik,
    saveSelectedShippingQuote,
  ])

  const disableSubmit = useMemo(() => {
    if (shippingContext.state.stage === "fulfillment_details") {
      return !(fulfillmentFormHelpers.isValid || isCommittingMutation)
    } else if (shippingContext.state.stage === "shipping_quotes") {
      return !(
        shippingContext.state.selectedShippingQuoteId || isCommittingMutation
      )
    }
  }, [
    shippingContext.state.stage,
    fulfillmentFormHelpers.isValid,
    isCommittingMutation,
    shippingContext.state.selectedShippingQuoteId,
  ])

  const maybeShippingQuotesConnectionEdges =
    order.lineItems?.edges?.[0]?.node?.shippingQuoteOptions?.edges
  const shippingQuotesConnectionEdges = maybeShippingQuotesConnectionEdges
    ? compact(maybeShippingQuotesConnectionEdges)
    : ([] as NonNullable<typeof maybeShippingQuotesConnectionEdges>)
  return (
    <Box data-test="orderShipping">
      <OrderRouteContainer
        order={order}
        currentStep="Shipping"
        steps={isOffer ? offerFlowSteps : buyNowFlowSteps}
        content={
          <Flex
            flexDirection="column"
            style={isCommittingMutation ? { pointerEvents: "none" } : {}}
          >
            <FulfillmentDetailsFragmentContainer
              me={props.me}
              order={props.order}
              onFulfillmentDetailsSaved={handleFulfillmentDetailsSaved}
              handleUserAddressUpdates={handleUserAddressUpdates}
            />

            {/* SHIPPING Quotes */}
            <Collapse
              data-testid="ShippingQuotes_collapse"
              open={showArtsyShipping}
            >
              <Text variant="sm">Artsy shipping options</Text>
              <Text variant="xs" mb="1" color="black60">
                {renderArtsyShippingOptionText()}
              </Text>
              <ShippingQuotesFragmentContainer
                mb={3}
                selectedShippingQuoteId={
                  shippingContext.parsedOrderData.selectedShippingQuoteId
                }
                shippingQuotes={shippingQuotesConnectionEdges}
                onSelect={handleShippingQuoteSelected}
              />
              <Spacer y={4} />
            </Collapse>
            <Media greaterThan="xs">
              <Button
                type="submit"
                onClick={onContinueButtonPressed}
                disabled={disableSubmit}
                loading={isCommittingMutation || undefined}
                variant="primaryBlack"
                width="50%"
              >
                Save and Continue
              </Button>
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
              <Button
                type="submit"
                onClick={onContinueButtonPressed}
                disabled={disableSubmit}
                loading={isCommittingMutation}
                variant="primaryBlack"
                width="100%"
              >
                Save and Continue
              </Button>
            </Media>
          </Flex>
        }
      />
    </Box>
  )
}

export const ShippingFragmentContainer = createFragmentContainer(
  injectCommitMutation(injectDialog(ShippingRoute)),
  {
    order: graphql`
      fragment Shipping2_order on CommerceOrder {
        __typename
        id
        ...FulfillmentDetailsForm_order
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
