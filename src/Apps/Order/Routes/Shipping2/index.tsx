import { FC, useCallback, useMemo, useEffect, useReducer } from "react"
import { Router } from "found"
import { RelayProp, createFragmentContainer, graphql } from "react-relay"
import { compact, pick } from "lodash"

import { Shipping2_order$data } from "__generated__/Shipping2_order.graphql"
import { Shipping2_me$data } from "__generated__/Shipping2_me.graphql"
import { CommerceSetShippingInput } from "__generated__/SetShippingMutation.graphql"

import { Box, Button, Flex, Spacer, Text } from "@artsy/palette"
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
  onlyAddressValues,
  ShippingAddressFormValues,
  ShipValues,
} from "Apps/Order/Routes/Shipping2/Utils/shippingUtils"
import { useOrderTracking } from "Apps/Order/Utils/useOrderTracking"
import { useSaveFulfillmentDetails } from "Apps/Order/Routes/Shipping2/Mutations/useSaveFulfillmentDetails"
import { useCreateSavedAddress } from "Apps/Order/Routes/Shipping2/Mutations/useCreateSavedAddress"
import { useSelectShippingQuote } from "Apps/Order/Routes/Shipping2/Mutations/useSelectShippingQuote"
import { ShippingContext } from "Apps/Order/Routes/Shipping2/Utils/ShippingContext"
import { useDeleteSavedAddress } from "Apps/Order/Routes/Shipping2/Mutations/useDeleteSavedAddress"
import { CreateUserAddressInput } from "__generated__/CreateUserAddressMutation.graphql"
import { useUpdateSavedAddress } from "Apps/Order/Routes/Shipping2/Mutations/useUpdateSavedAddress"

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

export type ShippingRouteStep = "fulfillment_details" | "shipping_quotes"

interface State {
  newSavedAddressID: string | null
  selectedShippingQuoteId: string | null
}

type Action =
  | { type: "SET_SELECTED_SHIPPING_QUOTE"; payload: string | null }
  | { type: "SET_NEW_SAVED_ADDRESS_ID"; payload: string | null }

const shippingStateReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_SELECTED_SHIPPING_QUOTE":
      return { ...state, selectedShippingQuoteId: action.payload }
    case "SET_NEW_SAVED_ADDRESS_ID":
      return { ...state, newSavedAddressID: action.payload }
    default:
      return state
  }
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
    step,
    helpers: { fulfillmentDetails: fulfillmentFormHelpers },
  } = orderContext

  const isOffer = order.mode === "OFFER"
  const isArtsyShipping = parsedOrderData.savedFulfillmentData?.isArtsyShipping

  const initialState = {
    newSavedAddressID: null,
    selectedShippingQuoteId: parsedOrderData.selectedShippingQuoteId ?? null,
  }
  const [state, dispatch] = useReducer(shippingStateReducer, initialState)

  const { requiresArtsyShippingTo, shippingQuotes } = parsedOrderData

  const advanceToPayment = useCallback(() => {
    props.router.push(`/orders/${props.order.internalID}/payment`)
  }, [props.router, props.order.internalID])

  // /**
  //  * Reset fulfillment details on load if artsy shipping to refresh shipping
  //  * quotes. See EMI-1534.
  //  */
  // useEffect(() => {
  //   if (
  //     parsedOrderData.savedFulfillmentData?.fulfillmentType ===
  //       FulfillmentType.SHIP &&
  //     isArtsyShipping
  //   ) {
  //     handleSubmitFulfillmentDetails(initialValues.fulfillmentDetails)
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [])

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

  const handleSaveNewAddress = useCallback(
    async (address: CreateUserAddressInput["attributes"]) => {
      try {
        const response = await createSavedAddress.submitMutation({
          variables: {
            input: { attributes: addressWithFallbackValues(address) },
          },
        })
        const newAddress = response?.createUserAddress?.userAddressOrErrors
        if (newAddress?.errors) {
          // handleSubmitError(newAddress.errors[0])
          logger.error(newAddress.errors[0])
        }
        if (newAddress?.internalID) {
          dispatch({
            type: "SET_NEW_SAVED_ADDRESS_ID",
            payload: newAddress.internalID,
          })
        }
      } catch (error) {
        handleSubmitError(error)
      }
    },
    [createSavedAddress, handleSubmitError]
  )

  const handleSubmitFulfillmentDetails = useCallback(
    async (
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
          formValues.attributes.saveAddress
        ) {
          await handleSaveNewAddress({
            ...formValues.attributes,
          })
        }
        if (!requiresArtsyShipping) {
          advanceToPayment()
        }
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
      saveFulfillmentDetails,
      requiresArtsyShippingTo,
      props.order.internalID,
      props.dialog,
      handleSubmitError,
      handleSaveNewAddress,
      advanceToPayment,
      orderTracking,
    ]
  )

  const saveSelectedShippingQuote = useCallback(async () => {
    const { order } = props
    if (!state.selectedShippingQuoteId) {
      logger.error("No shipping quote selected")
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
      // TODO: result.commerceSelectShippingOption may be null due to other error?
      const orderOrError = result.commerceSelectShippingOption?.orderOrError

      if (orderOrError?.error) {
        handleSubmitError(orderOrError.error)
        return
      }

      // Handle possible updates to the shipping address.
      const shippingFormValues = fulfillmentFormHelpers.values as ShipValues
      const savedShippingAddress =
        parsedOrderData.savedFulfillmentData?.fulfillmentType ===
        FulfillmentType.SHIP
          ? parsedOrderData.savedFulfillmentData.fulfillmentDetails
          : null
      const addressShouldBeSaved = !!shippingFormValues.attributes.saveAddress
      // TODO: address update logic should move into the submitFulfillmentDetails mutation
      // since it should happen when shipping quotes are hidden and unhidden.

      if (savedShippingAddress) {
        if (state.newSavedAddressID) {
          const addressNeedsUpdates = !matchAddressFields(
            savedShippingAddress,
            shippingFormValues.attributes
          )
          if (addressNeedsUpdates) {
            await updateSavedAddress.submitMutation({
              variables: {
                input: {
                  userAddressID: state.newSavedAddressID,
                  attributes: shippingFormValues.attributes,
                },
              },
            })
          }
          if (!addressShouldBeSaved) {
            await deleteSavedAddress.submitMutation({
              variables: { input: { userAddressID: state.newSavedAddressID } },
            })
          }
        } else if (addressShouldBeSaved) {
          await handleSaveNewAddress(savedShippingAddress)
        }
      }

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
    state.newSavedAddressID,
    selectShippingQuote,
    fulfillmentFormHelpers.values,
    parsedOrderData.savedFulfillmentData,
    advanceToPayment,
    handleSubmitError,
    updateSavedAddress,
    deleteSavedAddress,
    handleSaveNewAddress,
    orderTracking,
  ])

  const handleShippingQuoteSelected = (newShippingQuoteId: string) => {
    orderTracking.clickedSelectShippingOption(newShippingQuoteId)
    dispatch({
      type: "SET_SELECTED_SHIPPING_QUOTE",
      payload: newShippingQuoteId,
    })
  }

  // TODO: (Erik) - we will need some way of handling the user going back.
  // not sure if this is what's happening here, just a reminder

  // const handleAddressEdit = (
  //   editedAddress: UpdateUserAddressMutation$data["updateUserAddress"]
  // ) => {
  //   // reload shipping quotes if selected address edited
  //   if (selectedAddressID === editedAddress?.userAddressOrErrors?.internalID) {
  //     setShippingQuotes(null)
  //     setShippingQuoteId(undefined)

  //     if (checkIfArtsyShipping()) {
  //       selectShipping(editedAddress.userAddressOrErrors)
  //     }
  //   }
  // }

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
    !!isArtsyShipping && !!shippingQuotes && shippingQuotes.length > 0

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
      dispatch({
        type: "SET_SELECTED_SHIPPING_QUOTE",
        payload: defaultShippingQuoteId,
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    orderContext.parsedOrderData.selectedShippingQuoteId,
    defaultShippingQuoteId,
    useDefaultArtsyShippingQuote,
  ])

  const {
    handleSubmit: fulfillmentDetailsFormikHandleSubmit,
  } = fulfillmentFormHelpers
  const onContinueButtonPressed = useMemo(() => {
    if (step === "fulfillment_details") {
      return (...args) => fulfillmentDetailsFormikHandleSubmit(...args)
    }
    return saveSelectedShippingQuote
  }, [step, fulfillmentDetailsFormikHandleSubmit, saveSelectedShippingQuote])

  const disableSubmit = useMemo(() => {
    if (step === "fulfillment_details") {
      return !(fulfillmentFormHelpers.isValid || isCommittingMutation)
    } else if (step === "shipping_quotes") {
      return !(state.selectedShippingQuoteId || isCommittingMutation)
    }
  }, [
    step,
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
                  onSubmit={handleSubmitFulfillmentDetails}
                />

                {/* SHIPPING Quotes */}
                <Collapse open={showArtsyShipping}>
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
