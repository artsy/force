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

import { selectShippingOption } from "Apps/Order/Mutations/SelectShippingOption"
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
import {
  ShippingContext,
  useComputeOrderContext,
} from "Apps/Order/Routes/Shipping2/ShippingContext"
import { createUserAddress } from "Apps/Order/Mutations/CreateUserAddress"
import { useSystemContext } from "System/useSystemContext"
import { setShipping } from "Apps/Order/Mutations/SetShipping"
import {
  FulfillmentType,
  ShippingAddressFormValues,
} from "Apps/Order/Routes/Shipping2/shippingUtils"
import { usePrevious } from "Utils/Hooks/usePrevious"
import { useOrderTracking } from "Apps/Order/Utils/useOrderTracking"

const logger = createLogger("Order/Routes/Shipping/index.tsx")

export interface ShippingProps {
  order: Shipping2_order$data
  me: Shipping2_me$data
  relay?: RelayProp
  router: Router
  dialog: Dialog
  commitMutation: CommitMutation
  isCommittingMutation: boolean
}

export type ShippingRouteStep =
  | "fulfillment_details"
  | "shipping_quotes"
  | "ready_to_proceed"

export const ShippingRoute: FC<ShippingProps> = props => {
  const { relayEnvironment } = useSystemContext()
  const { order, isCommittingMutation } = props
  const orderContext = useComputeOrderContext(props)
  const {
    initialValues,
    computedOrderData,
    step,
    helpers: { fulfillmentDetails: fulfillmentFormHelpers },
  } = orderContext

  const isOffer = order.mode === "OFFER"

  const {
    isArtsyShipping,
    requiresArtsyShippingTo,
    shippingQuotes,
  } = computedOrderData

  const advanceToPayment = useCallback(() => {
    props.router.push(`/orders/${props.order.internalID}/payment`)
  }, [props.router, props.order.internalID])

  // Reset fulfillment details on load if artsy shipping to refresh shipping quotes
  // Note: exact current behavior is documented in notion. On load of shipping page, it
  // re-saves the order using the default address (not what is selected) which triggers a
  // shipping quote refresh. the *selected shipping quote is not reset.*
  useEffect(() => {
    if (
      computedOrderData.fulfillmentType === FulfillmentType.SHIP &&
      isArtsyShipping
    ) {
      handleSubmitFulfillmentDetails(initialValues.fulfillmentDetails)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const previousStep = usePrevious(step)

  // Advance to payment when the order is ready to proceed unless it loaded that way
  useEffect(() => {
    if (step === "ready_to_proceed" && previousStep !== "ready_to_proceed") {
      advanceToPayment()
    }
  }, [advanceToPayment, step, previousStep])

  const [selectedShippingQuoteId, setSelectedShippingQuoteId] = useState<
    string | undefined
  >(initialValues.shippingQuotes.selectedShippingQuoteId)

  const { clickedSelectShippingOption, errorMessageViewed } = useOrderTracking()

  const handleSubmitError = useCallback(
    (error: { code: string; data: string | null }) => {
      logger.error(error)
      const parsedData = error.data ? JSON.parse(error.data) : {}
      if (
        error.code === "missing_region" ||
        error.code === "missing_country" ||
        error.code === "missing_postal_code"
      ) {
        errorMessageViewed({
          error_code: error.code,
          title: "Missing information",
          message: "Please complete all required fields.",
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
        errorMessageViewed({
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

        errorMessageViewed({
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
        errorMessageViewed({
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
        errorMessageViewed({
          error_code: error.code,
          title: "An error occurred",
          message:
            "Something went wrong. Please try again or contact orders@artsy.net.",
          flow: "user submits a shipping option",
        })

        props.dialog.showErrorDialog()
      }
    },
    [errorMessageViewed, isArtsyShipping, props.dialog, selectedShippingQuoteId]
  )

  const createUserAddressMutation = useCallback(
    async (values: ShippingAddressFormValues) => {
      createUserAddress(
        relayEnvironment!,
        {
          addressLine1: values.addressLine1,
          addressLine2: values.addressLine2,
          city: values.city,
          country: values.country,
          name: values.name,
          phoneNumber: values.phoneNumber,
          postalCode: values.postalCode,
          region: values.region,
        },
        () => null,
        logger.error,
        props.me,
        () => null
      )
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [props.me.id, relayEnvironment]
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
          }
        }

        const result = await setShipping(props.commitMutation, {
          input: fulfillmentMutationValues,
        })

        const orderOrError = result.commerceSetShipping?.orderOrError

        if (orderOrError?.error) {
          handleSubmitError(orderOrError.error)
          return
        }

        if (
          formValues.fulfillmentType === FulfillmentType.SHIP &&
          formValues.attributes.saveAddress
        ) {
          await createUserAddressMutation(formValues.attributes)
        }
      } catch (error) {
        logger.error(error)

        errorMessageViewed({
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
      props.commitMutation,
      props.order.internalID,
      props.dialog,
      requiresArtsyShippingTo,
      handleSubmitError,
      createUserAddressMutation,
      errorMessageViewed,
    ]
  )

  const selectShippingQuote = useCallback(async () => {
    const { order } = props

    if (selectedShippingQuoteId && order.internalID) {
      try {
        const orderOrError = (
          await selectShippingOption(props.commitMutation, {
            input: {
              id: order.internalID,
              selectedShippingQuoteId: selectedShippingQuoteId,
            },
          })
        ).commerceSelectShippingOption?.orderOrError

        if (orderOrError?.error) {
          handleSubmitError(orderOrError.error)
          return
        }

        advanceToPayment()
      } catch (error) {
        logger.error(error)

        errorMessageViewed({
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
    advanceToPayment,
    handleSubmitError,
    props,
    selectedShippingQuoteId,
    errorMessageViewed,
  ])

  // TODO: Pass this into the fulfillment details form (according to current structure)

  // TODO: Make sure we re-set address verified by in the fulfillment details form
  //   // If the address has already been verified and the user is editing the form,
  //   // consider this a user-verified address (perform verification only once).
  //   if (addressVerifiedBy) {
  //     setAddressVerifiedBy(AddressVerifiedBy.USER)
  //   }
  // }

  const handleShippingQuoteSelected = (newShippingQuoteId: string) => {
    clickedSelectShippingOption(newShippingQuoteId)

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
    if (step === "shipping_quotes") {
      return selectShippingQuote
    }
    if (step === "ready_to_proceed") {
      return advanceToPayment
    }
  }, [
    step,
    fulfillmentDetailsFormikHandleSubmit,
    selectShippingQuote,
    advanceToPayment,
  ])

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
                  // maybe move to context
                  // setFulfillmentFormHelpers={setFulfillmentFormHelpers}
                  // move all of these to shipping context
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
