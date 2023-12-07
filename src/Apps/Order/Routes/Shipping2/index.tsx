import { FC, useCallback, useMemo, useEffect, useReducer } from "react"
import { Router } from "found"
import { RelayProp, createFragmentContainer, graphql } from "react-relay"
import { compact } from "lodash"

import { Shipping2_order$data } from "__generated__/Shipping2_order.graphql"
import { Shipping2_me$data } from "__generated__/Shipping2_me.graphql"
import { CommerceSetShippingInput } from "__generated__/SetShippingMutation.graphql"

import { Box, Button, Flex, Spacer, Text, usePrevious } from "@artsy/palette"
import { RouterLink } from "System/Router/RouterLink"
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
import {
  ErrorDialogs,
  getErrorDialogCopy,
} from "Apps/Order/Utils/getErrorDialogCopy"
import { FulfillmentDetailsFragmentContainer } from "Apps/Order/Routes/Shipping2/FulfillmentDetails"
import { FormikHelpers } from "formik"
import { useComputeShippingContext } from "Apps/Order/Routes/Shipping2/Hooks/useShippingContext"

import {
  addressWithFallbackValues,
  FulfillmentType,
  FulfillmentValues,
  matchAddressFields,
  ShipValues,
} from "Apps/Order/Routes/Shipping2/Utils/shippingUtils"
import { useOrderTracking } from "Apps/Order/Utils/useOrderTracking"
import { useSaveFulfillmentDetails } from "Apps/Order/Routes/Shipping2/Mutations/useSaveFulfillmentDetails"
import { useCreateSavedAddress } from "Apps/Order/Routes/Shipping2/Mutations/useCreateSavedAddress"
import { useSelectShippingQuote } from "Apps/Order/Routes/Shipping2/Mutations/useSelectShippingQuote"
import { ShippingContext } from "Apps/Order/Routes/Shipping2/Utils/ShippingContext"
import { useDeleteSavedAddress } from "Apps/Order/Routes/Shipping2/Mutations/useDeleteSavedAddress"
import { useUpdateSavedAddress } from "Apps/Order/Routes/Shipping2/Mutations/useUpdateSavedAddress"
import { ParsedOrderData } from "Apps/Order/Routes/Shipping2/Hooks/useParseOrderData"

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

export type ShippingStage = "fulfillment_details" | "shipping_quotes"

interface State {
  newSavedAddressId: string | null
  selectedShippingQuoteId: string | null
  stage: ShippingStage
}

export const ShippingRoute: FC<ShippingProps> = props => {
  const { order, isCommittingMutation } = props

  const saveFulfillmentDetails = useSaveFulfillmentDetails()
  const createSavedAddress = useCreateSavedAddress()
  const updateSavedAddress = useUpdateSavedAddress()
  const deleteSavedAddress = useDeleteSavedAddress()
  const selectShippingQuote = useSelectShippingQuote()

  const orderContext = useComputeShippingContext(props)

  const {
    parsedOrderData,
    helpers: { fulfillmentDetails: fulfillmentFormHelpers },
  } = orderContext

  const isOffer = order.mode === "OFFER"
  const isArtsyShipping =
    parsedOrderData.savedFulfillmentDetails?.isArtsyShipping

  const [state, dispatch] = useReducer(shippingStateReducer, {
    newSavedAddressId: null,
    selectedShippingQuoteId: parsedOrderData.selectedShippingQuoteId ?? null,
    stage: parsedOrderData.savedFulfillmentDetails?.isArtsyShipping
      ? "shipping_quotes"
      : "fulfillment_details",
  })

  const { requiresArtsyShippingTo, shippingQuotes } = parsedOrderData

  const advanceToPayment = useCallback(() => {
    props.router.push(`/orders/${props.order.internalID}/payment`)
  }, [props.router, props.order.internalID])

  const formValues = fulfillmentFormHelpers.values
  const previousFormValues = usePrevious(formValues)

  /* Go back to fulfillment details stage if the user edits the address */
  useEffect(() => {
    if (
      state.stage === "shipping_quotes" &&
      orderContext.parsedOrderData.savedFulfillmentDetails &&
      !matchAddressFields(formValues.attributes, previousFormValues.attributes)
    ) {
      actionDispatchers.setStage(dispatch, "fulfillment_details")
    }
  }, [
    formValues.attributes,
    orderContext.helpers.fulfillmentDetails.values,
    orderContext.parsedOrderData.savedFulfillmentDetails,
    previousFormValues.attributes,
    state.stage,
  ])

  // /**
  //  * Reset fulfillment details on load if artsy shipping to refresh shipping
  //  * quotes.
  //  */
  useEffect(() => {
    if (
      parsedOrderData.savedFulfillmentDetails?.fulfillmentType ===
        FulfillmentType.SHIP &&
      isArtsyShipping
    ) {
      actionDispatchers.setSelectedShippingQuote(dispatch, null)
      actionDispatchers.setStage(dispatch, "fulfillment_details")
      handleSubmitFulfillmentDetailsFactory({ skipUserAddressChecks: true })({
        fulfillmentType: FulfillmentType.SHIP,
        attributes: {
          ...parsedOrderData.savedFulfillmentDetails.fulfillmentDetails,
        } as ShipValues["attributes"],
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const orderTracking = useOrderTracking()

  const handleSubmitError = useCallback(
    (error: { code: string; data: string | null | undefined }) => {
      logger.error(error)
      const parsedData = error.data ? JSON.parse(error.data) : {}
      if (
        error.code === "missing_region" ||
        error.code === "missing_country" ||
        error.code === "missing_postal_code"
      ) {
        orderTracking.errorMessageViewed({
          error_code: error.code,
          title: "Invalid address",
          message:
            "There was an error processing your address. Please review and try again.",
          flow: "user submits a shipping option",
        })

        props.dialog.showErrorDialog({
          title: "Invalid address",
          message:
            "There was an error processing your address. Please review and try again.",
        })
      } else if (
        error.code === "unsupported_shipping_location" &&
        parsedData.failure_code === "domestic_shipping_only"
      ) {
        orderTracking.errorMessageViewed({
          error_code: error.code,
          title: "Can't ship to that address",
          message: "This work can only be shipped domestically.",
          flow: "user submits a shipping option",
        })

        props.dialog.showErrorDialog({
          title: "Can't ship to that address",
          message: "This work can only be shipped domestically.",
        })
      } else if (error.code === "destination_could_not_be_geocoded") {
        const { title, message, formattedMessage } = getErrorDialogCopy(
          ErrorDialogs.DestinationCouldNotBeGeocoded
        )

        orderTracking.errorMessageViewed({
          error_code: error.code,
          title: title,
          message: message,
          flow: "user submits a shipping option",
        })

        props.dialog.showErrorDialog({
          title,
          message: formattedMessage,
        })
      } else if (
        isArtsyShipping &&
        !orderContext.parsedOrderData.selectedShippingQuoteId
      ) {
        orderTracking.errorMessageViewed({
          error_code: null,
          title: "An error occurred",
          message:
            "There was a problem getting shipping quotes. Please contact orders@artsy.net.",
          flow: "user submits a shipping option",
        })

        props.dialog.showErrorDialog({
          message: <ArtaErrorDialogMessage />,
        })
      } else {
        orderTracking.errorMessageViewed({
          error_code: error.code,
          title: "An error occurred",
          message:
            "Something went wrong. Please try again or contact orders@artsy.net.",
          flow: "user submits a shipping option",
        })

        props.dialog.showErrorDialog()
      }
    },
    [
      isArtsyShipping,
      orderContext.parsedOrderData.selectedShippingQuoteId,
      orderTracking,
      props.dialog,
    ]
  )

  const handleUserAddressUpdates = useCallback(
    async ({
      newValues,
      previousData,
    }: {
      /* The values to use for user address updates */
      newValues: ShipValues["attributes"]
      previousData: {
        /* The saved fulfillment details from before the form was submitted */
        detailsForUpdate?: ParsedOrderData["savedFulfillmentDetails"]
        /* The saved user address associated with the order */
        newSavedAddressId: string | null
      }
    }) => {
      const addressShouldBeSaved = !!newValues.saveAddress

      try {
        if (addressShouldBeSaved) {
          if (!previousData.newSavedAddressId) {
            // Address not saved, create it
            const response = await createSavedAddress.submitMutation({
              variables: {
                input: { attributes: addressWithFallbackValues(newValues) },
              },
            })
            const newAddress = response?.createUserAddress?.userAddressOrErrors
            if (newAddress?.__typename === "UserAddress") {
              actionDispatchers.setNewSavedAddressId(
                dispatch,
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
            previousData.newSavedAddressId &&
            previousData.detailsForUpdate &&
            !matchAddressFields(previousData.detailsForUpdate, newValues)
          ) {
            await updateSavedAddress.submitMutation({
              variables: {
                input: {
                  userAddressID: previousData.newSavedAddressId,
                  attributes: addressWithFallbackValues(newValues),
                },
              },
            })
          }
        } else {
          // Address should not be saved, delete it if it exists
          if (state.newSavedAddressId) {
            await deleteSavedAddress.submitMutation({
              variables: {
                input: { userAddressID: state.newSavedAddressId },
              },
            })
            actionDispatchers.setNewSavedAddressId(dispatch, null)
          }
        }
      } catch (error) {
        handleSubmitError(error)
      }
    },
    [
      createSavedAddress,
      deleteSavedAddress,
      handleSubmitError,
      state.newSavedAddressId,
      updateSavedAddress,
    ]
  )

  const handleSubmitFulfillmentDetailsFactory = useCallback(
    ({
      skipUserAddressChecks = false,
    }: { skipUserAddressChecks?: boolean } = {}) => async (
      formValues: FulfillmentValues,
      formikHelpers?: FormikHelpers<FulfillmentValues>
    ) => {
      const { setSubmitting } = formikHelpers || {}
      setSubmitting && setSubmitting(true)
      try {
        let fulfillmentMutationValues: CommerceSetShippingInput
        let requiresArtsyShipping: boolean
        if (formValues.fulfillmentType === FulfillmentType.SHIP) {
          const {
            saveAddress,
            addressVerifiedBy,
            phoneNumber,
            ...addressValues
          } = formValues.attributes
          requiresArtsyShipping = requiresArtsyShippingTo(addressValues.country)

          fulfillmentMutationValues = {
            id: props.order.internalID,
            fulfillmentType: requiresArtsyShipping
              ? "SHIP_ARTA"
              : FulfillmentType.SHIP,
            phoneNumber,
            shipping: { ...addressValues, phoneNumber: "" },
          }

          if (addressVerifiedBy) {
            fulfillmentMutationValues.addressVerifiedBy = addressVerifiedBy
          }
        } else {
          requiresArtsyShipping = false
          fulfillmentMutationValues = {
            id: props.order.internalID,
            fulfillmentType: FulfillmentType.PICKUP,
            phoneNumber: formValues.attributes.phoneNumber,
            shipping: {
              addressLine1: "",
              addressLine2: "",
              country: "",
              name: "",
              city: "",
              postalCode: "",
              region: "",
              phoneNumber: "",
            },
          }
        }

        const result = await saveFulfillmentDetails.submitMutation({
          variables: { input: fulfillmentMutationValues },
        })

        const orderOrError = result.commerceSetShipping?.orderOrError

        if (orderOrError?.__typename === "CommerceOrderWithMutationFailure") {
          handleSubmitError(orderOrError.error)
          return
        }

        if (
          formValues.fulfillmentType === FulfillmentType.SHIP &&
          !skipUserAddressChecks
        ) {
          // Include existing address if it is an update
          await handleUserAddressUpdates({
            newValues: formValues.attributes,
            previousData: {
              detailsForUpdate: parsedOrderData.savedFulfillmentDetails,
              newSavedAddressId: state.newSavedAddressId,
            },
          })
        }
        if (requiresArtsyShipping) {
          actionDispatchers.setStage(dispatch, "shipping_quotes")
          return
        }
        return advanceToPayment()
      } catch (error) {
        orderTracking.errorMessageViewed({
          error_code: null,
          title: "An error occurred",
          message:
            "Something went wrong. Please try again or contact orders@artsy.net.",
          flow: "user selects a shipping option",
        })

        props.dialog.showErrorDialog()
      }
    },
    [
      parsedOrderData.savedFulfillmentDetails,
      state.newSavedAddressId,
      saveFulfillmentDetails,
      advanceToPayment,
      requiresArtsyShippingTo,
      props.order.internalID,
      props.dialog,
      handleSubmitError,
      handleUserAddressUpdates,
      orderTracking,
    ]
  )

  const saveSelectedShippingQuote = useCallback(async () => {
    const { order } = props

    if (!state.selectedShippingQuoteId) {
      logger.error("No shipping quote selected")
      return
    }
    if (
      parsedOrderData.savedFulfillmentDetails?.fulfillmentType !==
      FulfillmentType.SHIP
    ) {
      logger.error("No shipping address saved")
      return
    }
    try {
      const result = await selectShippingQuote.submitMutation({
        variables: {
          input: {
            id: order.internalID,
            selectedShippingQuoteId: state.selectedShippingQuoteId,
          },
        },
      })
      const orderOrError = result.commerceSelectShippingOption?.orderOrError

      if (orderOrError?.__typename === "CommerceOrderWithMutationFailure") {
        handleSubmitError(orderOrError.error)
        return
      }

      await handleUserAddressUpdates({
        newValues: (fulfillmentFormHelpers.values as ShipValues).attributes,
        previousData: {
          newSavedAddressId: state.newSavedAddressId,
        },
      })
      advanceToPayment()
    } catch (error) {
      logger.error(error)

      orderTracking.errorMessageViewed({
        error_code: null,
        title: "An error occurred",
        message:
          "There was a problem getting shipping quotes. Please contact orders@artsy.net.",
        flow: "user sets a shipping quote",
      })

      props.dialog.showErrorDialog({
        message: <ArtaErrorDialogMessage />,
      })
    }
  }, [
    props,
    state.selectedShippingQuoteId,
    state.newSavedAddressId,
    parsedOrderData.savedFulfillmentDetails,
    selectShippingQuote,
    handleUserAddressUpdates,
    fulfillmentFormHelpers.values,
    advanceToPayment,
    handleSubmitError,
    orderTracking,
  ])

  const handleShippingQuoteSelected = (newShippingQuoteId: string) => {
    orderTracking.clickedSelectShippingOption(newShippingQuoteId)
    actionDispatchers.setSelectedShippingQuote(dispatch, newShippingQuoteId)
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
    state.stage === "shipping_quotes" &&
    !!isArtsyShipping &&
    !!shippingQuotes &&
    shippingQuotes.length > 0

  const defaultShippingQuoteId = shippingQuotes?.[0]?.id
  const useDefaultArtsyShippingQuote =
    isArtsyShipping &&
    defaultShippingQuoteId &&
    !orderContext.parsedOrderData.selectedShippingQuoteId

  // Automatically selects first shipping quote when they change
  useEffect(() => {
    if (
      useDefaultArtsyShippingQuote &&
      orderContext.parsedOrderData.selectedShippingQuoteId !==
        defaultShippingQuoteId
    ) {
      actionDispatchers.setSelectedShippingQuote(
        dispatch,
        defaultShippingQuoteId
      )
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    orderContext.parsedOrderData.selectedShippingQuoteId,
    defaultShippingQuoteId,
    useDefaultArtsyShippingQuote,
  ])

  // handleSubmitFulfillmentDetailsFactory result, passed back from formik
  const submitFulfillmentDetailsFormik = fulfillmentFormHelpers.submitForm

  const onContinueButtonPressed = useCallback(async () => {
    if (state.stage === "fulfillment_details") {
      // TODO: Create vs update details for different mutations. do we need a separate state?
      return submitFulfillmentDetailsFormik()
    }

    if (state.stage === "shipping_quotes") {
      await saveSelectedShippingQuote()

      return
    }
  }, [state.stage, submitFulfillmentDetailsFormik, saveSelectedShippingQuote])

  const disableSubmit = useMemo(() => {
    if (state.stage === "fulfillment_details") {
      return !(fulfillmentFormHelpers.isValid || isCommittingMutation)
    } else if (state.stage === "shipping_quotes") {
      return !(state.selectedShippingQuoteId || isCommittingMutation)
    }
  }, [
    state.stage,
    fulfillmentFormHelpers.isValid,
    isCommittingMutation,
    state.selectedShippingQuoteId,
  ])

  const maybeShippingQuotesConnectionEdges =
    order.lineItems?.edges?.[0]?.node?.shippingQuoteOptions?.edges
  const shippingQuotesConnectionEdges = maybeShippingQuotesConnectionEdges
    ? compact(maybeShippingQuotesConnectionEdges)
    : ([] as NonNullable<typeof maybeShippingQuotesConnectionEdges>)
  return (
    <Analytics contextPageOwnerId={order.internalID}>
      <Box data-test="orderShipping">
        <ShippingContext.Provider value={{ ...orderContext }}>
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
                  onSubmit={handleSubmitFulfillmentDetailsFactory()}
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
                      orderContext.parsedOrderData.selectedShippingQuoteId
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
        </ShippingContext.Provider>
      </Box>
    </Analytics>
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

const ArtaErrorDialogMessage = () => (
  <>
    There was a problem getting shipping quotes. <br />
    Please contact{" "}
    <RouterLink inline to={`mailto:orders@artsy.net`}>
      orders@artsy.net
    </RouterLink>
    .
  </>
)

type Action =
  | { type: "SET_SELECTED_SHIPPING_QUOTE"; payload: string | null }
  | { type: "SET_NEW_SAVED_ADDRESS_ID"; payload: string | null }
  | { type: "SET_STAGE"; payload: ShippingStage }

const shippingStateReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_SELECTED_SHIPPING_QUOTE":
      return { ...state, selectedShippingQuoteId: action.payload }
    case "SET_NEW_SAVED_ADDRESS_ID":
      return { ...state, newSavedAddressId: action.payload }
    case "SET_STAGE":
      logger.log("SET_STAGE", action.payload)
      return { ...state, stage: action.payload }
    default:
      return state
  }
}

const actionDispatchers: Record<
  string,
  (dispatch: React.Dispatch<Action>, payload?: Action["payload"]) => void
> = {
  setSelectedShippingQuote: (dispatch, payload: string | null) =>
    dispatch({ type: "SET_SELECTED_SHIPPING_QUOTE", payload }),
  setNewSavedAddressId: (dispatch, payload: string | null) =>
    dispatch({ type: "SET_NEW_SAVED_ADDRESS_ID", payload }),
  setStage: (dispatch, payload: ShippingStage) => {
    dispatch({ type: "SET_STAGE", payload })
  },
}
