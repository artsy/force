import { FC, useState, useCallback, useMemo, useEffect } from "react"
import { Router } from "found"
import { RelayProp, createFragmentContainer, graphql } from "react-relay"
import { compact } from "lodash"

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
import {
  FulfillmentDetailsFragmentContainer,
  FulfillmentValues,
} from "Apps/Order/Routes/Shipping2/FulfillmentDetails"
import { FormikHelpers } from "formik"
import { useComputeShippingContext } from "Apps/Order/Routes/Shipping2/Hooks/useShippingContext"

import { FulfillmentType } from "Apps/Order/Routes/Shipping2/Utils/shippingUtils"
import { useOrderTracking } from "Apps/Order/Utils/useOrderTracking"
import { useSaveFulfillmentDetails } from "Apps/Order/Routes/Shipping2/Mutations/useSaveFulfillmentDetails"
import { useCreateSavedAddress } from "Apps/Order/Routes/Shipping2/Mutations/useCreateSavedAddress"
import { useSelectShippingQuote } from "Apps/Order/Routes/Shipping2/Mutations/useSelectShippingQuote"
import { ShippingContext } from "Apps/Order/Routes/Shipping2/Utils/ShippingContext"

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

export const ShippingRoute: FC<ShippingProps> = props => {
  const { order, isCommittingMutation } = props

  const saveFulfillmentDetails = useSaveFulfillmentDetails().submitMutation
  const createSavedAddress = useCreateSavedAddress().submitMutation
  const selectShippingQuote = useSelectShippingQuote().submitMutation

  const orderContext = useComputeShippingContext(props)
  const {
    initialValues,
    parsedOrderData,
    step,
    helpers: { fulfillmentDetails: fulfillmentFormHelpers },
  } = orderContext

  const isOffer = order.mode === "OFFER"

  const {
    isArtsyShipping,
    requiresArtsyShippingTo,
    shippingQuotes,
  } = parsedOrderData

  const advanceToPayment = useCallback(() => {
    props.router.push(`/orders/${props.order.internalID}/payment`)
  }, [props.router, props.order.internalID])

  /**
   * Reset fulfillment details on load if artsy shipping to refresh shipping
   * quotes. See EMI-1534.
   */
  useEffect(() => {
    if (
      parsedOrderData.fulfillmentType === FulfillmentType.SHIP &&
      isArtsyShipping
    ) {
      handleSubmitFulfillmentDetails(initialValues.fulfillmentDetails)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const [selectedShippingQuoteId, setSelectedShippingQuoteId] = useState<
    string | undefined
  >(initialValues.shippingQuotes.selectedShippingQuoteId ?? undefined)

  const orderTracking = useOrderTracking()

  const handleSubmitError = useCallback(
    (error: { code: string; data: string | null }) => {
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
      } else if (isArtsyShipping && selectedShippingQuoteId) {
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
    [isArtsyShipping, orderTracking, props.dialog, selectedShippingQuoteId]
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
              country: "US",
              name: "",
              city: "",
              postalCode: "",
              region: "",
              phoneNumber: "",
            },
          }
        }

        const result = await saveFulfillmentDetails({
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
          await createSavedAddress({
            variables: { input: { attributes: { ...formValues.attributes } } },
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
      createSavedAddress,
      advanceToPayment,
      orderTracking,
    ]
  )

  const saveSelectedShippingQuote = useCallback(async () => {
    const { order } = props

    if (selectedShippingQuoteId && order.internalID) {
      try {
        const result = await selectShippingQuote({
          variables: {
            input: {
              id: order.internalID,
              selectedShippingQuoteId: selectedShippingQuoteId,
            },
          },
        })
        // TODO: result.commerceSelectShippingOption may be null due to other error?
        const orderOrError = result.commerceSelectShippingOption?.orderOrError

        if (orderOrError?.error) {
          handleSubmitError(orderOrError.error)
          return
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
    }
  }, [
    props,
    selectShippingQuote,
    selectedShippingQuoteId,
    advanceToPayment,
    handleSubmitError,
    orderTracking,
  ])

  // TODO: Make sure we re-set address verified by in the fulfillment details form
  //   // If the address has already been verified and the user is editing the form,
  //   // consider this a user-verified address (perform verification only once).
  //   if (addressVerifiedBy) {
  //     setAddressVerifiedBy(AddressVerifiedBy.USER)
  //   }
  // }

  const handleShippingQuoteSelected = (newShippingQuoteId: string) => {
    orderTracking.clickedSelectShippingOption(newShippingQuoteId)

    setSelectedShippingQuoteId(newShippingQuoteId)
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
    isArtsyShipping && defaultShippingQuoteId && !selectedShippingQuoteId

  // Automatically selects first shipping quote when they change
  useEffect(() => {
    if (
      useDefaultArtsyShippingQuote &&
      selectedShippingQuoteId !== defaultShippingQuoteId
    ) {
      setSelectedShippingQuoteId(defaultShippingQuoteId)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    selectedShippingQuoteId,
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
      return !fulfillmentFormHelpers.isValid
    } else if (step === "shipping_quotes") {
      return !selectedShippingQuoteId
    }
  }, [step, fulfillmentFormHelpers.isValid, selectedShippingQuoteId])

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
                    selectedShippingQuoteId={selectedShippingQuoteId}
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
