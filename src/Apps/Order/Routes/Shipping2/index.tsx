import { FC, useState, useCallback, useMemo, useEffect } from "react"
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

import { selectShippingOption } from "Apps/Order/Mutations/SelectShippingOption"
import { ShippingQuotesFragmentContainer } from "Apps/Order/Components/ShippingQuotes"

import {
  ActionType,
  ClickedSelectShippingOption,
  ContextModule,
  OwnerType,
} from "@artsy/cohesion"
import { useTracking } from "react-tracking"
import { OrderRouteContainer } from "Apps/Order/Components/OrderRouteContainer"
import { Analytics } from "System/Analytics/AnalyticsContext"
import {
  ErrorDialogs,
  getErrorDialogCopy,
} from "Apps/Order/Utils/getErrorDialogCopy"
import {
  FulfillmentDetailsFragmentContainer,
  FulfillmentValues,
  ShipValues,
} from "Apps/Order/Routes/Shipping2/FulfillmentDetails"
import { FormikHelpers, FormikProps } from "formik"
import {
  ShippingContextProps,
  ShippingContext,
} from "Apps/Order/Routes/Shipping2/ShippingContext"
import { createUserAddress } from "Apps/Order/Mutations/CreateUserAddress"
import { useSystemContext } from "System/useSystemContext"
import { setShipping } from "Apps/Order/Mutations/SetShipping"
import {
  addressWithFallbackValues,
  FulfillmentType,
  getDefaultUserAddress,
  SavedAddressType,
  ShippingAddressFormValues,
} from "Apps/Order/Routes/Shipping2/shippingUtils"
import { extractNodes } from "Utils/extractNodes"
import { usePrevious } from "Utils/Hooks/usePrevious"

import { COUNTRIES_IN_EUROPEAN_UNION } from "@artsy/commerce_helpers"
// TODO: Duplicated list ^
import { ALL_COUNTRY_CODES, EU_COUNTRY_CODES } from "Components/CountrySelect"

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

type ShippingRouteStep =
  | "fulfillment_details"
  | "shipping_quotes"
  | "ready_to_proceed"

export const ShippingRoute: FC<ShippingProps> = props => {
  const { relayEnvironment } = useSystemContext()
  const { order, isCommittingMutation } = props
  const { trackEvent } = useTracking()
  const {
    initialValues,
    savedOrderData,
    targetStep: currentStep,
  } = useLoadOrder(props)

  const isOffer = order.mode === "OFFER"

  const {
    isArtsyShipping,
    requiresArtsyShippingTo,
    shippingQuotesEdges,
    selectedShippingQuoteId: savedSelectedShippingQuoteId,
  } = savedOrderData

  const advanceToPayment = useCallback(() => {
    props.router.push(`/orders/${props.order.internalID}/payment`)
  }, [props.router, props.order.internalID])

  // Reset fulfillment details on load if artsy shipping to refresh shipping quotes
  // Note: exact current behavior is documented in notion. On load of shipping page, it
  // re-saves the order using the default address (not what is selected) which triggers a
  // shipping quote refresh. the *selected shipping quote is not reset.*
  useEffect(() => {
    if (
      savedOrderData.fulfillmentType === FulfillmentType.SHIP &&
      isArtsyShipping
    ) {
      handleSubmitFulfillmentDetails(initialValues.fulfillmentDetails)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const previousActiveStep = usePrevious(currentStep)

  // Advance to payment when the order is ready to proceed unless it loaded that way
  useEffect(() => {
    if (
      currentStep === "ready_to_proceed" &&
      previousActiveStep !== "ready_to_proceed"
    ) {
      advanceToPayment()
    }
  }, [advanceToPayment, currentStep, previousActiveStep])

  const [selectedShippingQuoteId, setSelectedShippingQuoteId] = useState<
    string | undefined
  >(savedSelectedShippingQuoteId)

  // const selectShipping = async (editedAddress?: MutationAddressResponse) => {
  // ...

  //   TODO: Tracking
  //     trackEvent({
  //       action: ActionType.errorMessageViewed,
  //       context_owner_type: OwnerType.ordersShipping,
  //       context_owner_id: props.order.internalID,
  //       title: "An error occurred",
  //       message:
  //         "Something went wrong. Please try again or contact orders@artsy.net.",
  //       error_code: null,
  //       flow: "user selects a shipping option",
  //     })

  //     props.dialog.showErrorDialog()
  //   }
  // }

  const handleSubmitError = useCallback(
    (error: { code: string; data: string | null }) => {
      logger.error(error)
      const parsedData = error.data ? JSON.parse(error.data) : {}
      if (
        error.code === "missing_region" ||
        error.code === "missing_country" ||
        error.code === "missing_postal_code"
      ) {
        trackEvent({
          action: ActionType.errorMessageViewed,
          context_owner_type: OwnerType.ordersShipping,
          context_owner_id: props.order.internalID,
          title: "Invalid address",
          message:
            "There was an error processing your address. Please review and try again.",
          error_code: error.code,
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
        trackEvent({
          action: ActionType.errorMessageViewed,
          context_owner_type: OwnerType.ordersShipping,
          context_owner_id: props.order.internalID,
          title: "Can't ship to that address",
          message: "This work can only be shipped domestically.",
          error_code: error.code,
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

        trackEvent({
          action: ActionType.errorMessageViewed,
          context_owner_type: OwnerType.ordersShipping,
          context_owner_id: props.order.internalID,
          title,
          message,
          error_code: error.code,
          flow: "user submits a shipping option",
        })

        props.dialog.showErrorDialog({
          title,
          message: formattedMessage,
        })
      } else if (isArtsyShipping && selectedShippingQuoteId) {
        trackEvent({
          action: ActionType.errorMessageViewed,
          context_owner_type: OwnerType.ordersShipping,
          context_owner_id: props.order.internalID,
          title: "An error occurred",
          message:
            "There was a problem getting shipping quotes. Please contact orders@artsy.net.",
          error_code: null,
          flow: "user submits a shipping option",
        })

        props.dialog.showErrorDialog({
          message: <ArtaErrorDialogMessage />,
        })
      } else {
        trackEvent({
          action: ActionType.errorMessageViewed,
          context_owner_type: OwnerType.ordersShipping,
          context_owner_id: props.order.internalID,
          title: "An error occurred",
          message:
            "Something went wrong. Please try again or contact orders@artsy.net.",
          error_code: null,
          flow: "user submits a shipping option",
        })

        props.dialog.showErrorDialog()
      }
    },
    [
      isArtsyShipping,
      props.dialog,
      props.order.internalID,
      selectedShippingQuoteId,
      trackEvent,
    ]
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
            shipping: addressValues,
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

        trackEvent({
          action: ActionType.errorMessageViewed,
          context_owner_type: OwnerType.ordersShipping,
          context_owner_id: props.order.internalID,
          title: "An error occurred",
          message:
            "Something went wrong. Please try again or contact orders@artsy.net.",
          error_code: null,
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
      trackEvent,
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

        trackEvent({
          action: ActionType.errorMessageViewed,
          context_owner_type: OwnerType.ordersShipping,
          context_owner_id: props.order.internalID,
          title: "An error occurred",
          message:
            "There was a problem getting shipping quotes. Please contact orders@artsy.net.",
          error_code: null,
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
    trackEvent,
  ])

  // TODO: Pass this into the fulfillment details form (according to current structure)

  // TODO: Make sure we re-set address verified by in the fulfillment details form
  //   // If the address has already been verified and the user is editing the form,
  //   // consider this a user-verified address (perform verification only once).
  //   if (addressVerifiedBy) {
  //     setAddressVerifiedBy(AddressVerifiedBy.USER)
  //   }
  // }

  // const onSelectShippingOption = (
  //   newShippingOption: CommerceOrderFulfillmentTypeEnum
  // ) => {
  //   TODO: (Erik): Tracking
  //   trackEvent({
  //     action_type: DeprecatedSchema.ActionType.Click,
  //     subject:
  //       newShippingOption === "SHIP"
  //         ? DeprecatedSchema.Subject.BNMOProvideShipping
  //         : DeprecatedSchema.Subject.BNMOArrangePickup,
  //     flow: "buy now",
  //     type: "button",
  //   })

  //   if (shippingOption !== newShippingOption) {
  //     setShippingOption(newShippingOption)
  //   }
  // }

  const handleShippingQuoteSelected = (newShippingQuoteId: string) => {
    trackEvent({
      // analytics data missing if default shipping is already selected?
      action: ActionType.clickedSelectShippingOption,
      context_module: ContextModule.ordersShipping,
      context_page_owner_type: "orders-shipping",
      subject: newShippingQuoteId,
    } as ClickedSelectShippingOption)

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

  const shippingQuotes = compact(shippingQuotesEdges.map(edge => edge?.node))
  const showArtsyShipping = !!isArtsyShipping && shippingQuotes.length > 0

  const defaultShippingQuoteId = shippingQuotes[0]?.id
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

  // Because there is a single button for both fulfillment details and
  // shipping quote steps (and duplicated in the sidebar)
  // we need to hack some formik values UP from the fulfillment details
  // form.
  // handleSubmit: Used to submit the form
  // isValid: Used to disable the button
  // values: Used to get the form values for un-saving the address if the user
  //   unchecks it after saving it in the fulfillment details step.
  const [fulfillmentFormHelpers, setFulfillmentFormHelpers] = useState<
    Pick<FormikProps<FulfillmentValues>, "handleSubmit" | "isValid" | "values">
  >({
    handleSubmit: () => {},
    isValid: false,
    values: {
      attributes: {
        saveAddress: false,
      },
    } as any,
  })

  const onContinueButtonPressed = useMemo(() => {
    if (currentStep === "fulfillment_details") {
      return (...args) => fulfillmentFormHelpers.handleSubmit(...args)
    }
    if (currentStep === "shipping_quotes") {
      return selectShippingQuote
    }
    if (currentStep === "ready_to_proceed") {
      return advanceToPayment
    }
  }, [
    currentStep,
    fulfillmentFormHelpers,
    selectShippingQuote,
    advanceToPayment,
  ])

  const disableSubmit = useMemo(() => {
    if (currentStep === "fulfillment_details") {
      return !fulfillmentFormHelpers.isValid
    } else if (currentStep === "shipping_quotes") {
      return !selectedShippingQuoteId
    }
  }, [currentStep, fulfillmentFormHelpers.isValid, selectedShippingQuoteId])

  const orderContext: ShippingContextProps = useMemo(
    () =>
      pick(
        savedOrderData,
        "lockShippingCountryTo",
        "isArtsyShipping",
        "availableShippingCountries",
        "shipsFrom",
        "requiresArtsyShippingTo",
        "selectedSavedAddressId",
        "fulfillmentDetails",
        "fulfillmentType"
      ),
    [savedOrderData]
  )

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
                  initialFulfillmentValues={initialValues.fulfillmentDetails}
                  active={currentStep === "fulfillment_details"}
                  order={props.order}
                  onSubmit={handleSubmitFulfillmentDetails}
                  setFulfillmentFormHelpers={setFulfillmentFormHelpers}
                  renderMissingShippingQuotesError={
                    !!(
                      isArtsyShipping &&
                      shippingQuotes &&
                      shippingQuotes.length === 0
                    )
                  }
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
                    shippingQuotes={compact(shippingQuotesEdges)}
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

// Get information from the order and user, savedOrderData (shared, computed context about order)
// initial values for forms, and the current step in the shipping route
// values for forms
export const useLoadOrder = (
  props: ShippingProps
): {
  savedOrderData: ReturnType<typeof useLoadComputedData>
  initialValues: {
    fulfillmentDetails: FulfillmentValues
  }
  targetStep: ShippingRouteStep
} => {
  const orderData = useLoadComputedData(props)
  const initialValues = getInitialValues(props, orderData)

  const {
    fulfillmentType: savedFulfillmentType,
    selectedShippingQuoteId,
    isArtsyShipping,
  } = orderData

  const targetStep: ShippingRouteStep = useMemo(() => {
    if (!savedFulfillmentType) {
      return "fulfillment_details"
    }
    if (isArtsyShipping && !selectedShippingQuoteId) {
      return "shipping_quotes"
    }
    if (isArtsyShipping && selectedShippingQuoteId) {
      return "ready_to_proceed"
    }
    if (!!savedFulfillmentType && !isArtsyShipping) {
      return "ready_to_proceed"
    }
    return "fulfillment_details"
  }, [isArtsyShipping, savedFulfillmentType, selectedShippingQuoteId])

  return {
    savedOrderData: orderData,
    initialValues,
    targetStep,
  }
}

const getInitialValues = (
  props: ShippingProps,
  orderData: ShippingContextProps
): {
  fulfillmentDetails: FulfillmentValues
} => {
  const { me } = props
  const {
    fulfillmentType: savedFulfillmentType,
    fulfillmentDetails: savedFulfillmentDetails,
  } = orderData

  if (savedFulfillmentType) {
    return {
      fulfillmentDetails: {
        fulfillmentType: savedFulfillmentType,
        attributes: {
          ...addressWithFallbackValues(savedFulfillmentDetails),
          saveAddress: false,
          addressVerifiedBy: null,
        },
      } as FulfillmentValues,
    }
  }
  const savedAddresses = extractNodes(me?.addressConnection) ?? []

  // The default ship-to address should be the first one that
  // can be shipped-to, preferring the default

  const defaultUserAddress = getDefaultUserAddress(
    savedAddresses,
    orderData.availableShippingCountries
  )

  const shippableDefaultAddress = defaultUserAddress
    ? addressWithFallbackValues(defaultUserAddress)
    : null

  if (shippableDefaultAddress) {
    return {
      fulfillmentDetails: {
        fulfillmentType: FulfillmentType.SHIP,
        attributes: {
          ...shippableDefaultAddress,
          saveAddress: false,
          addressVerifiedBy: null,
        },
      },
    }
  }

  // The user doesn't have a valid ship-to address, so we'll return empty values.
  // TODO: This doesn't account for matching the saved address id
  // (that is still in savedOrderData). In addition the initial values
  // are less relevant if the user has saved addresses - Setting country
  // doesn't matter.
  const initialFulfillmentValues: ShipValues["attributes"] = {
    ...addressWithFallbackValues({ country: orderData.shipsFrom }),

    addressVerifiedBy: null,
    saveAddress: savedAddresses.length === 0,
  }

  return {
    fulfillmentDetails: {
      fulfillmentType: FulfillmentType.SHIP,
      attributes: initialFulfillmentValues,
    },
  }
}

const matchAddressFields = (...addressPair: [object, object]) => {
  const [a1, a2] = addressPair.map(a => addressWithFallbackValues(a))
  return (
    a1.addressLine1 === a2.addressLine1 &&
    a1.addressLine2 === a2.addressLine2 &&
    a1.city === a2.city &&
    a1.country === a2.country &&
    a1.name === a2.name &&
    a1.phoneNumber === a2.phoneNumber &&
    a1.postalCode === a2.postalCode &&
    a1.region === a2.region
  )
}

const getSavedFulfillmentData = (
  order: ShippingProps["order"],
  me: ShippingProps["me"]
): {
  fulfillmentType: FulfillmentType
  isArtsyShipping: boolean
  fulfillmentDetails: FulfillmentValues["attributes"]
  selectedSavedAddressId: string | null
} | null => {
  if (
    !order.requestedFulfillment ||
    Object.keys(order.requestedFulfillment).length === 0
  ) {
    return null
  }

  const requestedFulfillmentType = order.requestedFulfillment.__typename
  if (requestedFulfillmentType === "CommercePickup") {
    const phoneNumber = order.requestedFulfillment.phoneNumber!
    return {
      fulfillmentType: FulfillmentType.PICKUP,
      isArtsyShipping: false,
      // TODO: [When things are working again]
      // figure out what `name` is used for w/ pickup, where to get it from
      fulfillmentDetails: { phoneNumber } as FulfillmentValues["attributes"],
      selectedSavedAddressId: null,
    }
  }
  const fulfillmentDetails: ShippingAddressFormValues = addressWithFallbackValues(
    order.requestedFulfillment
  )

  const addressList =
    extractNodes(me?.addressConnection) ??
    ([] as SavedAddressType[]).filter(a => !!a)

  // we don't store the address id on exchange orders, so we need to match every field
  const selectedSavedAddressId =
    addressList.find(node => matchAddressFields(node, fulfillmentDetails))
      ?.internalID || null

  if (requestedFulfillmentType === "CommerceShipArta") {
    return {
      fulfillmentType: FulfillmentType.SHIP,
      isArtsyShipping: true,
      fulfillmentDetails,
      selectedSavedAddressId,
    }
  }
  if (requestedFulfillmentType === "CommerceShip") {
    return {
      fulfillmentType: FulfillmentType.SHIP,
      isArtsyShipping: false,
      fulfillmentDetails,
      selectedSavedAddressId,
    }
  }
  // Should never happen. Log it?
  return null
}

type ShippingQuotesConnectionEdges = NonNullable<
  NonNullable<
    NonNullable<
      NonNullable<
        NonNullable<
          NonNullable<
            NonNullable<Shipping2_order$data["lineItems"]>["edges"]
          >[number]
        >
      >["node"]
    >["shippingQuoteOptions"]
  >["edges"]
>

// Interface to separate local values from what we want to expose
// in the react context.
interface OrderData extends ShippingContextProps {
  shippingQuotesEdges: ShippingQuotesConnectionEdges
  selectedShippingQuoteId?: string
}

// Compute and memoize data from the saved order.
export const useLoadComputedData = (props: ShippingProps): OrderData => {
  const { me, order } = props
  const firstArtwork = extractNodes(order.lineItems)[0]!.artwork!
  const artworkCountry = firstArtwork?.shippingCountry
  const savedFulfillmentData = getSavedFulfillmentData(order, me)

  const shipsFrom = firstArtwork.shippingCountry!
  const domesticOnly = !!firstArtwork.onlyShipsDomestically
  const euOrigin = !!firstArtwork.euShippingOrigin

  const lockShippingCountryTo = domesticOnly
    ? euOrigin
      ? "EU"
      : shipsFrom
    : null

  const availableShippingCountries = !lockShippingCountryTo
    ? ALL_COUNTRY_CODES
    : lockShippingCountryTo === "EU"
    ? EU_COUNTRY_CODES
    : [lockShippingCountryTo]

  const requiresArtsyShippingTo = useCallback(
    (shipToCountry: string) => {
      const isDomesticShipping =
        (shipToCountry && shipToCountry === artworkCountry) ||
        (COUNTRIES_IN_EUROPEAN_UNION.includes(shipToCountry) &&
          COUNTRIES_IN_EUROPEAN_UNION.includes(artworkCountry))

      const requiresArtsyShipping =
        (isDomesticShipping &&
          firstArtwork?.processWithArtsyShippingDomestic) ||
        (!isDomesticShipping && firstArtwork?.artsyShippingInternational)
      return requiresArtsyShipping
    },
    [
      artworkCountry,
      firstArtwork.artsyShippingInternational,
      firstArtwork.processWithArtsyShippingDomestic,
    ]
  )
  const shippingQuotesEdges: ShippingQuotesConnectionEdges =
    (order?.lineItems?.edges &&
      order.lineItems.edges[0]?.node?.shippingQuoteOptions?.edges) ||
    (([] as unknown) as ShippingQuotesConnectionEdges)

  const selectedShippingQuote =
    shippingQuotesEdges.find(quote => quote?.node?.isSelected) || null

  return {
    fulfillmentDetails: savedFulfillmentData?.fulfillmentDetails || null,
    fulfillmentType: savedFulfillmentData?.fulfillmentType || null,
    selectedSavedAddressId:
      savedFulfillmentData?.selectedSavedAddressId || null,
    isArtsyShipping: savedFulfillmentData?.isArtsyShipping,
    selectedShippingQuoteId: selectedShippingQuote?.node?.id,
    shippingQuotesEdges,
    availableShippingCountries,
    lockShippingCountryTo,
    requiresArtsyShippingTo,
    shipsFrom,
  }
}
