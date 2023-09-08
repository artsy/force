import {
  BorderedRadio,
  Box,
  Button,
  Checkbox,
  Collapse,
  Flex,
  RadioGroup,
  Spacer,
  Text,
} from "@artsy/palette"
import { RouterLink } from "System/Router/RouterLink"
import { Shipping_order$data } from "__generated__/Shipping_order.graphql"
import { ArtworkSummaryItemFragmentContainer as ArtworkSummaryItem } from "Apps/Order/Components/ArtworkSummaryItem"
import {
  buyNowFlowSteps,
  offerFlowSteps,
} from "Apps/Order/Components/OrderStepper"
import { PhoneNumberForm } from "Apps/Order/Components/PhoneNumberForm"
import { TransactionDetailsSummaryItemFragmentContainer as TransactionDetailsSummaryItem } from "Apps/Order/Components/TransactionDetailsSummaryItem"
import { Dialog, injectDialog } from "Apps/Order/Dialogs"
import {
  CommitMutation,
  injectCommitMutation,
} from "Apps/Order/Utils/commitMutation"
import {
  validateAddress,
  validatePhoneNumber,
} from "Apps/Order/Utils/formValidators"
import { Address, emptyAddress } from "Components/Address/AddressForm"
import { Router } from "found"
import { FC, useState, useEffect } from "react"
import { COUNTRIES_IN_EUROPEAN_UNION } from "@artsy/commerce_helpers"
import { RelayProp, createFragmentContainer, graphql } from "react-relay"
import createLogger from "Utils/logger"
import { BuyerGuarantee } from "Apps/Order/Components/BuyerGuarantee"
import { Shipping_me$data } from "__generated__/Shipping_me.graphql"
import {
  startingAddress,
  addressWithEmptyValues,
  getDefaultShippingQuoteId,
  getSelectedShippingQuoteId,
  getShippingQuotes,
  getShippingOption,
  ShippingQuotesType,
  SavedAddressType,
  FulfillmentType,
} from "Apps/Order/Utils/shippingUtils"
import { SavedAddressesFragmentContainer as SavedAddresses } from "Apps/Order/Components/SavedAddresses"
import { ShippingQuotesFragmentContainer } from "Apps/Order/Components/ShippingQuotes"
import { compact, pick } from "lodash"
import { selectShippingOption } from "Apps/Order/Mutations/SelectShippingOption"
import {
  ActionType,
  ClickedSelectShippingOption,
  ContextModule,
  OwnerType,
} from "@artsy/cohesion"
import { useTracking } from "react-tracking"
import { OrderRouteContainer } from "Apps/Order/Components/OrderRouteContainer"
import { extractNodes } from "Utils/extractNodes"
import { useFeatureFlag } from "System/useFeatureFlag"
import { AddressVerifiedBy } from "Apps/Order/Components/AddressVerificationFlow"
import { Analytics } from "System/Analytics/AnalyticsContext"
import {
  ErrorDialogs,
  getErrorDialogCopy,
} from "Apps/Order/Utils/getErrorDialogCopy"
import { useShippingOperations } from "Apps/Order/Mutations/useShippingOperations"
import {
  AddressFormValues,
  AddressFormWrapper,
  AddressInputs,
} from "Components/Address/NewAddressForm"
import { FormikErrors, Form, FormikProps, FormikHelpers } from "formik"

const logger = createLogger("Order/Routes/Shipping/index.tsx")

enum SaveAddressAction {
  CREATE = "create",
  USE_EXISTING = "use_existing",
  UPDATE = "update",
}

interface BaseFormValues extends AddressFormValues {
  name: string
  fulfillmentType: FulfillmentType
  phoneNumber: string
  saveAddress: false
  saveAddressAction: SaveAddressAction | null
}

export interface ShippingValues {
  fulfillmentType: FulfillmentType.SHIP
  name: string
  phoneNumber: string
  addressLine1: string
  addressLine2: string
  city: string
  region: string
  postalCode: string
  country: string
  /* Save new address to user's address book */
  saveAddress: boolean
  /* Update the user's address book */
  selectedAddressID: string | null
  /* Metadata for instructions onSubmit */
  saveAddressAction: SaveAddressAction
}

export interface PickupValues {
  fulfillmentType: FulfillmentType.PICKUP
  name: string
  phoneNumber: string
}

// Formik values for pickup
export type PickupFormValues = BaseFormValues & PickupValues
export type ShippingFormValues = BaseFormValues & ShippingValues

// The values in the formik context
export type FulfillmentDetailsValues = ShippingFormValues | PickupFormValues

// The values we can actually submit to the mutation
export type ShippingMutationValues<
  T extends FulfillmentDetailsValues = FulfillmentDetailsValues
> = Omit<T, "saveAddressAction" | "saveAddress" | "selectedAddressID">

// export type ShippingMutationValues =
//   | Omit<ShippingFormValues, "saveAddressAction">
//   | Omit<PickupFormValues, "saveAddressAction">

export interface ShippingProps {
  order: Shipping_order$data
  me: Shipping_me$data
  relay?: RelayProp
  router: Router
  dialog: Dialog
  commitMutation: CommitMutation
  isCommittingMutation: boolean
}

export const ShippingRoute: FC<ShippingProps> = props => {
  const { trackEvent } = useTracking()
  const shippingOperations = useShippingOperations(props, logger)

  ///// ADDRESS VERIFICATION FLOW (to update & reenable) /////
  const addressVerificationUSEnabled = !!useFeatureFlag(
    "address_verification_us"
  )
  const addressVerificationIntlEnabled = !!useFeatureFlag(
    "address_verification_intl"
  )

  const isAddressVerificationEnabled = (): boolean => {
    return shippingCountry === "US"
      ? addressVerificationUSEnabled
      : addressVerificationIntlEnabled
  }
  // true if the current address needs to be verified
  // TODO: Is this necessary, or can it just use the checks above?
  const [addressNeedsVerification, setAddressNeedsVerification] = useState<
    boolean
  >(false)

  // Presence of addressVerifiedBy indicates that the address has been verified
  // via the address verification flow.
  const [
    addressVerifiedBy,
    setAddressVerifiedBy,
  ] = useState<AddressVerifiedBy | null>(null)

  const [readyToSaveVerifiedAddress, setReadyToSaveVerifiedAddress] = useState(
    false
  )

  // TODO: Handle post-verification flow
  // Automatically proceed after address verification flow is completed.
  useEffect(() => {
    if (readyToSaveVerifiedAddress) {
      // finalizeFulfillment()
    }
    // disabled because we only want this to run when once when readyToSaveVerifiedAddress changes to true
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [readyToSaveVerifiedAddress])

  const shippingOption = getShippingOption(
    props.order.requestedFulfillment?.__typename
  )

  const [shippingQuoteId, setShippingQuoteId] = useState<string | undefined>(
    getSelectedShippingQuoteId(props.order)
  )
  const [shippingQuotes, setShippingQuotes] = useState<ShippingQuotesType>(
    getShippingQuotes(props.order)
  )

  const addressList = extractNodes(props.me?.addressConnection) ?? []

  const orderPrimaryArtwork = props.order.lineItems?.edges?.[0]?.node?.artwork

  const artwork = orderPrimaryArtwork
  const processWithArtsyShippingDomestic = !!artwork?.processWithArtsyShippingDomestic
  const artsyShippingInternational = !!artwork?.artsyShippingInternational

  const shippingCountry = startingAddress(props.me, props.order).country

  const isDomesticOrder =
    (COUNTRIES_IN_EUROPEAN_UNION.includes(shippingCountry) &&
      COUNTRIES_IN_EUROPEAN_UNION.includes(artwork?.shippingCountry)) ||
    artwork?.shippingCountry == shippingCountry
  const isInternationalOrder = !isDomesticOrder

  const isArtsyShipping = Boolean(
    shippingOption === "SHIP" &&
      ((processWithArtsyShippingDomestic && isDomesticOrder) ||
        (artsyShippingInternational && isInternationalOrder))
  )

  const selectShippingQuote = async () => {
    const { order } = props

    if (shippingQuoteId && order.internalID) {
      try {
        const orderOrError = (
          await selectShippingOption(props.commitMutation, {
            input: {
              id: order.internalID,
              selectedShippingQuoteId: shippingQuoteId,
            },
          })
        ).commerceSelectShippingOption?.orderOrError

        if (orderOrError?.error) {
          handleSubmitError(orderOrError.error)
          return
        }

        props.router.push(`/orders/${props.order.internalID}/payment`)
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
          message: <ArtaErrorDialogContent />,
        })
      }
    }
  }

  const handleShippingQuoteSelected = (newShippingQuoteId: string) => {
    trackEvent({
      // analytics data missing if default shipping is already selected?
      action: ActionType.clickedSelectShippingOption,
      context_module: ContextModule.ordersShipping,
      context_page_owner_type: "orders-shipping",
      subject: newShippingQuoteId,
    } as ClickedSelectShippingOption)

    setShippingQuoteId(newShippingQuoteId)
  }

  const { order, isCommittingMutation } = props

  const isOffer = order.mode === "OFFER"

  const artsyShippingOptionText = `${
    isOffer
      ? "Please note that these are estimates and may change once offer is finalized. "
      : ""
  }All options are eligible for Artsy’s Buyer Protection policy, which protects against damage and loss.`

  const useDefaultArtsyShippingQuote =
    isArtsyShipping &&
    shippingQuotes &&
    shippingQuotes.length > 0 &&
    !shippingQuoteId

  // TODO: consider to move this block to a useEffect
  if (useDefaultArtsyShippingQuote) {
    const defaultShippingQuoteId = getDefaultShippingQuoteId(order)
    shippingQuoteId !== defaultShippingQuoteId &&
      setShippingQuoteId(defaultShippingQuoteId)
  }

  const handleSubmitError = (error: { code: string; data: string | null }) => {
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
    } else if (isArtsyShipping && shippingQuoteId) {
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
        message: <ArtaErrorDialogContent />,
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
  }

  const fulfillmentDetailsComplete =
    (order.requestedFulfillment?.__typename === "CommercePickup" &&
      !validatePhoneNumber(order.requestedFulfillment?.phoneNumber || "")
        .hasError) ||
    !validateAddress((order.requestedFulfillment || {}) as Partial<Address>)
      .hasErrors

  const [fulfillmentStepActive, setFulfillmentStepActive] = useState(
    !fulfillmentDetailsComplete
  )

  useEffect(() => {
    if (fulfillmentDetailsComplete) {
      setFulfillmentStepActive(false)
    }
  }, [fulfillmentDetailsComplete])

  const handleSubmitFulfillmentDetails = async (
    formValues: FulfillmentDetailsValues,
    formikHelpers: FormikHelpers<AddressFormValues>
  ) => {
    console.log("***** handleSubmitFulfillmentDetails ******", {
      formValues,
    })
    let fulfillmentMutationValues:
      | ShippingMutationValues<ShippingFormValues>
      | ShippingMutationValues<PickupFormValues>

    const { setSubmitting } = formikHelpers

    setSubmitting(true)
    try {
      if (formValues.fulfillmentType === "PICKUP") {
        fulfillmentMutationValues = pick(formValues, [
          "name",
          "phoneNumber",
          "fulfillmentType",
        ])
      } else {
        const {
          saveAddressAction,
          saveAddress,
          selectedAddressID,
          ...values
        } = formValues
        fulfillmentMutationValues = values
      }
      setShippingQuotes(null)
      setShippingQuoteId(undefined)

      const orderOrError = await shippingOperations.saveFulfillmentDetails(
        fulfillmentMutationValues,
        isArtsyShipping,
        addressVerifiedBy
      )

      if (orderOrError?.error) {
        handleSubmitError(orderOrError.error)
        return
      }

      // TODO: NEXT - CREATE/UPDATE ADDRESS BASED ON STATUS
      // TODO: Does saveAddress MEAN CREATE AND SELECTEDADDRESSID? DO WE NOT NEED SAVEADDRESSACTION?
      // MAYBE NOT - THERE IS ALSO THE EXISTING ADDRESS CASE
      if (formValues.saveAddress) {
        await shippingOperations.createUserAddress(fulfillmentMutationValues)
      } else if (values.selectedAddressID) {
        await shippingOperations.updateUserAddress(
          values.existingAddressID,
          values
        )
      }

      // TODO: maybe not necessary if the hook above catches the prop changes,
      // we just want this to be state so that the form can un-set it.
      setFulfillmentStepActive(false)

      if (isArtsyShipping) {
        setShippingQuotes(getShippingQuotes(orderOrError?.order))
      } else {
        props.router.push(`/orders/${props.order.internalID}/payment`)
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
  }

  // TODO: Can probably refactor with yup
  const handleValidate = (values: FulfillmentDetailsValues) => {
    let errors: FormikErrors<FulfillmentDetailsValues> = {}
    const phoneResult = validatePhoneNumber(values.phoneNumber!)
    if (phoneResult.error) {
      errors.phoneNumber = phoneResult.error
    }
    if (values.fulfillmentType === "SHIP") {
      const addressResult = validateAddress(values)
      if (addressResult.hasErrors) {
        Object.entries(addressResult.errors).forEach(([key, value]) => {
          if (!!value) {
            errors[key] = value
          }
        })
      }
    }
    if (Object.keys(errors).length > 0) {
      logger.error(
        `error validating fulfillment with ${values.fulfillmentType}, saveAddressAction ${values.saveAddressAction}`,
        errors
      )
    }
    return errors
  }

  const showArtsyShipping =
    isArtsyShipping &&
    !fulfillmentStepActive &&
    !!shippingQuotes &&
    shippingQuotes.length > 0

  const initialFulfillmentValues: FulfillmentDetailsValues = {
    ...startingAddress(props.me, props.order),
    saveAddress: true,
    fulfillmentType: "SHIP",
    selectedAddressID: addressList.find(a => a.isDefault)?.id,
    saveAddressAction: addressList.length > 0 ? "use_existing" : "create",
  }

  // factory for re-setting multiple fields in the formik context (eg an entire address)
  const buildSetFormValues = (
    formikProps: FormikProps<FulfillmentDetailsValues>
  ) => (
    input: Partial<FulfillmentDetailsValues>,
    shouldValidate: boolean = false
  ) => {
    Object.entries(input).forEach(([key, value]) => {
      formikProps.setFieldValue(key, value, shouldValidate)
    })
  }

  return (
    <Analytics contextPageOwnerId={order.internalID}>
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
              <AddressFormWrapper<FulfillmentDetailsValues>
                initialStatus={initialFormStatus}
                // NEXT: Uh oh the form status isn't available here
                onSubmit={(values, helpers) =>
                  handleSubmitFulfillmentDetails(values, formStatus, helpers)
                }
                initialValues={initialFulfillmentValues}
                validate={handleValidate}
              >
                {formikProps => {
                  const setFormValues = buildSetFormValues(formikProps)
                  const [formStatus, setFormStatus] = buildFormikStatusHelpers(
                    formikProps
                  )
                  // Show saved values when the step is inactive, preserving formik context above
                  // TODO: These should come from the relay-provided props, not form state
                  // and they should look nice
                  return (
                    <>
                      <Collapse
                        open={!fulfillmentStepActive}
                        data-test="savedFulfillmentDetailsCollapse"
                      >
                        <Text variant="lg-display">
                          Saved fulfillment details
                        </Text>
                        <Text variant="xs">
                          {JSON.stringify(formikProps.values, null, 2)}
                        </Text>
                        <Button
                          variant="secondaryNeutral"
                          onClick={() => setFulfillmentStepActive(true)}
                        >
                          Edit
                        </Button>
                      </Collapse>
                      <Collapse
                        data-test="fulfillmentFormCollapse"
                        open={fulfillmentStepActive}
                      >
                        <Form noValidate={true}>
                          <Box>
                            <RadioGroup
                              data-test="shipping-options"
                              onSelect={value => {
                                // TODO: Should these have been tracked?
                                formikProps.setFieldValue(
                                  "fulfillmentType",
                                  value
                                )
                              }}
                              defaultValue={formikProps.values.fulfillmentType}
                            >
                              <Text variant="lg-display" mb="1">
                                Delivery method
                              </Text>
                              <BorderedRadio value="SHIP" label="Shipping" />
                              <BorderedRadio
                                value="PICKUP"
                                label="Arrange for pickup (free)"
                                data-test="pickupOption"
                              >
                                <Collapse
                                  open={
                                    formikProps.values.fulfillmentType ===
                                    "PICKUP"
                                  }
                                >
                                  <Text variant="xs" color="black60">
                                    After your order is confirmed, a specialist
                                    will contact you to coordinate pickup.
                                  </Text>
                                </Collapse>
                              </BorderedRadio>
                            </RadioGroup>
                            {/* SAVED ADDRESSES */}
                            <Collapse
                              data-test="savedAddressesCollapse"
                              open={
                                formikProps.values.fulfillmentType === "SHIP" &&
                                addressList.length > 0
                              }
                            >
                              <Text variant="lg-display" mb="1">
                                Delivery address
                              </Text>
                              {isArtsyShipping &&
                                shippingQuotes?.length === 0 && (
                                  <ArtaErrorMessage />
                                )}
                              <SavedAddresses
                                me={props.me}
                                selectedAddress={
                                  formikProps.values.selectedAddressID
                                }
                                onSelect={(addressID: string) => {
                                  const address = addressList.find(
                                    a => a.id === addressID
                                  )
                                  if (!address) {
                                    logger.error(
                                      `addressID ${addressID} was set but no address was found in addressList`
                                    )
                                    return
                                  }
                                  const newValues = {
                                    selectedAddressID: addressID,
                                    ...address,
                                    saveAddress: false,
                                    saveAddressAction:
                                      SaveAddressAction.USE_EXISTING,
                                  } as Partial<ShippingFormValues>

                                  setFormValues(newValues)
                                  formikProps.setFieldValue(
                                    "selectedAddressID",
                                    addressID
                                  )
                                }}
                                onAddressDelete={(
                                  addressID: string,
                                  onSuccess: () => void,
                                  onError?: (message: string) => void
                                ) => {
                                  return shippingOperations.deleteUserAddress(
                                    addressID,
                                    onSuccess,
                                    onError
                                  )
                                }}
                                onAddressCreate={() => {
                                  setFormStatus({
                                    saveAddressAction: "create",
                                  })
                                  formikProps.setFieldValue(
                                    "existingAddressID",
                                    null
                                  )
                                  formikProps.setFieldValue("saveAddress", true)
                                  const initialDefaultAddress = pick(
                                    // FIXME: The initialValues seem to change even though
                                    // formik ignores these changes for form state.
                                    formikProps.initialValues,
                                    Object.keys(emptyAddress)
                                  )
                                  // TODO: The initial values aren't actually empty any more maybe?
                                  logger.log(
                                    "creating new address with an empty default address - or is it?",
                                    {
                                      shouldBeEmpty: initialDefaultAddress,
                                    }
                                  )
                                  setFormValues(emptyAddress)
                                  // TODO: Do soemthing to display the address form?
                                }}
                                onAddressEdit={(
                                  savedAddress: SavedAddressType
                                ) => {
                                  setFormStatus({
                                    saveAddressAction: "update",
                                  })
                                  formikProps.setFieldValue(
                                    "existingAddressID",
                                    savedAddress.id
                                  )
                                  // TODO: When editing a saved address, form should display differently
                                  // without the save new address checkbox
                                  // setFieldValue("saveAddress", false)
                                  setFormValues(
                                    addressWithEmptyValues(savedAddress)
                                  )
                                }}
                              />
                            </Collapse>
                            <Collapse
                              data-test="addressFormCollapse"
                              open={fulfillmentStepActive}
                            >
                              <Collapse
                                data-test="addressFieldsCollapse"
                                open={
                                  formikProps.values.fulfillmentType ===
                                    "SHIP" &&
                                  formStatus.saveAddressAction !==
                                    "use_existing"
                                }
                              >
                                <AddressInputs />
                              </Collapse>
                              <PhoneNumberForm
                                tabIndex={fulfillmentStepActive ? 0 : -1}
                                value={formikProps.values.phoneNumber}
                                errors={formikProps.errors.phoneNumber || ""}
                                touched={!!formikProps.touched.phoneNumber}
                                onChange={value => {
                                  formikProps.setFieldValue(
                                    "phoneNumber",
                                    value
                                  )
                                }}
                                label="Required for shipping logistics"
                              />
                            </Collapse>
                            <Checkbox
                              tabIndex={fulfillmentStepActive ? 0 : -1}
                              onSelect={selected =>
                                formikProps.setFieldValue(
                                  "saveAddress",
                                  selected
                                )
                              }
                              selected={formikProps.values.saveAddress}
                              data-test="save-address-checkbox"
                            >
                              Save shipping address for later use
                            </Checkbox>
                            <Button
                              type="submit"
                              variant="primaryBlack"
                              width="50%"
                              loading={isCommittingMutation}
                            >
                              Save and Continue
                            </Button>
                          </Box>
                        </Form>
                      </Collapse>
                    </>
                  )
                }}
              </AddressFormWrapper>

              {/* SHIPPING OPTION */}
              <Collapse open={showArtsyShipping}>
                <Text variant="sm">Artsy shipping options</Text>
                <Text variant="xs" mb="1" color="black60">
                  {artsyShippingOptionText}
                </Text>
                <ShippingQuotesFragmentContainer
                  mb={3}
                  selectedShippingQuoteId={shippingQuoteId}
                  shippingQuotes={compact(shippingQuotes)}
                  onSelect={handleShippingQuoteSelected}
                />
                <Spacer y={4} />
                <Button
                  onClick={selectShippingQuote}
                  loading={isCommittingMutation}
                  variant="primaryBlack"
                  width="50%"
                  disabled={
                    !!fulfillmentDetailsComplete && !!selectShippingQuote
                  }
                >
                  Save and Continue
                </Button>
              </Collapse>
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
            </Flex>
          }
        />
      </Box>
    </Analytics>
  )
}

export const ShippingFragmentContainer = createFragmentContainer(
  injectCommitMutation(injectDialog(ShippingRoute)),
  {
    order: graphql`
      fragment Shipping_order on CommerceOrder {
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
      fragment Shipping_me on Me
        @argumentDefinitions(
          first: { type: "Int", defaultValue: 30 }
          last: { type: "Int" }
          after: { type: "String" }
          before: { type: "String" }
        ) {
        name
        email
        id
        location {
          country
        }
        ...SavedAddresses_me
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

const ArtaErrorMessage = () => {
  return (
    <Text
      py={1}
      px={2}
      mb={2}
      bg="red10"
      color="red100"
      data-test="artaErrorMessage"
    >
      In order to provide a shipping quote, we need some more information from
      you. Please contact{" "}
      <RouterLink color="red100" to="mailto:orders@artsy.net">
        orders@artsy.net
      </RouterLink>{" "}
      so we can assist you.
    </Text>
  )
}

const ArtaErrorDialogContent = () => (
  <>
    There was a problem getting shipping quotes. <br />
    Please contact{" "}
    <RouterLink inline to={`mailto:orders@artsy.net`}>
      orders@artsy.net
    </RouterLink>
    .
  </>
)
