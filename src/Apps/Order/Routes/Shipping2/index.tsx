import { Box, Button, Flex, Spacer, Text } from "@artsy/palette"
import { Shipping2_order$data } from "__generated__/Shipping2_order.graphql"
import { Shipping2_me$data } from "__generated__/Shipping2_me.graphql"
import { RouterLink } from "System/Router/RouterLink"
import { CommerceSetShippingInput } from "__generated__/SetShippingMutation.graphql"
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

import { Router } from "found"
import { FC, useState, useCallback, useMemo } from "react"
import { RelayProp, createFragmentContainer, graphql } from "react-relay"
import createLogger from "Utils/logger"
import { Media } from "Utils/Responsive"
import { BuyerGuarantee } from "Apps/Order/Components/BuyerGuarantee"
import { Collapse } from "Apps/Order/Components/Collapse"
import {
  MutationAddressResponse,
  getDefaultShippingQuoteId,
  getSelectedShippingQuoteId,
  getShippingQuotes,
  ShippingQuotesType,
  FulfillmentType,
  getDefaultUserAddress,
  addressWithFallbackValues,
} from "Apps/Order/Utils/shippingUtils"
import {
  NEW_ADDRESS,
  SavedAddressesFragmentContainer as SavedAddresses,
} from "Apps/Order/Components/SavedAddresses"
import { createUserAddress } from "Apps/Order/Mutations/CreateUserAddress"
import { setShipping } from "Apps/Order/Mutations/SetShipping"
import { ShippingQuotesFragmentContainer } from "Apps/Order/Components/ShippingQuotes"
import { compact, omit } from "lodash"
import { selectShippingOption } from "Apps/Order/Mutations/SelectShippingOption"
import { updateUserAddress } from "Apps/Order/Mutations/UpdateUserAddress"
import { deleteUserAddress } from "Apps/Order/Mutations/DeleteUserAddress"
import { CreateUserAddressMutation$data } from "__generated__/CreateUserAddressMutation.graphql"
import {
  UpdateUserAddressMutation$data,
  UserAddressAttributes,
} from "__generated__/UpdateUserAddressMutation.graphql"
import {
  ActionType,
  ClickedSelectShippingOption,
  ClickedShippingAddress,
  ContextModule,
  OwnerType,
} from "@artsy/cohesion"
import { useTracking } from "react-tracking"
import { OrderRouteContainer } from "Apps/Order/Components/OrderRouteContainer"
import { extractNodes } from "Utils/extractNodes"

import { Analytics } from "System/Analytics/AnalyticsContext"
import {
  ErrorDialogs,
  getErrorDialogCopy,
} from "Apps/Order/Utils/getErrorDialogCopy"
import {
  FulfillmentDetailsFormFragmentContainer,
  FulfillmentValues,
  ShipValues,
} from "Apps/Order/Routes/Shipping2/FulfillmentDetailsForm"
import { FormikHelpers, FormikProps } from "formik"
import {
  SaveFulfillmentDetailsResponse,
  useShippingOperations,
} from "Apps/Order/Mutations/useShippingOperations"
import {
  ShippingContextProps,
  ShippingContext,
  useLoadOrderContext,
} from "Apps/Order/Routes/Shipping2/ShippingContext"
import { useSystemContext } from "System/useSystemContext"

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

const getSavedFulfillment = (
  order:
    | ShippingProps["order"]
    | NonNullable<SaveFulfillmentDetailsResponse["order"]>
): {
  fulfillmentType: FulfillmentType
  isArtsyShipping: boolean
  fulfillmentDetails: FulfillmentValues["attributes"]
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
      // TODO: [When things are working again] - fix types, figure out what `name` is used for w/ pickup.
      fulfillmentDetails: { phoneNumber } as FulfillmentValues["attributes"],
    }
  }
  const fulfillmentDetails: Omit<
    FulfillmentValues["attributes"],
    "saveAddress" | "addressVerifiedBy"
  > = addressWithFallbackValues(omit(order.requestedFulfillment, "__typename"))

  if (requestedFulfillmentType === "CommerceShipArta") {
    return {
      fulfillmentType: FulfillmentType.SHIP,
      isArtsyShipping: true,
      fulfillmentDetails,
    }
  }
  if (requestedFulfillmentType === "CommerceShip") {
    return {
      fulfillmentType: FulfillmentType.SHIP,
      isArtsyShipping: false,
      fulfillmentDetails,
    }
  }
  // Should never happen. Log it?
  return null
}

// Get information from the order and user, including shared context and initial
// values for forms
const useLoadOrder = (
  me: ShippingProps["me"],
  order: ShippingProps["order"]
): {
  orderContext: ShippingContextProps
  initialValues: {
    fulfillmentDetails: FulfillmentValues
  }
} => {
  const {
    fulfillmentType: savedFulfillmentType,
    fulfillmentDetails: savedFulfillmentDetails,
  } = getSavedFulfillment(order) || {}

  const orderContext = useLoadOrderContext(order)

  const savedAddresses = extractNodes(me?.addressConnection) ?? []

  // TODO: How to render this as a saved address vs new address? Need to detect & match somehow
  // - return saved address values
  // - move command attributes into a meta property like { meta: { saveAddress: boolean, verifyAddress boolean } }
  // - when savedAddresses mount, somehow detect if the form values match a saved address and select it
  //   - Maybe we can just return a saved address index as part of this and let the form select it
  //     similar to before
  // - saved addresses should disable countries that are not supported by the shipping location

  // what if available shipping locations no longer support saved address?
  // TODO: If the initial address is US but the country select doesn't show it bc is it EU only
  // (as one example) then the form state will stay on US (invalid) until the user updates the
  // country input

  if (savedFulfillmentType) {
    return {
      orderContext,
      initialValues: {
        fulfillmentDetails: {
          fulfillmentType: savedFulfillmentType,
          attributes: {
            ...addressWithFallbackValues(savedFulfillmentDetails),
            saveAddress: false,
            addressVerifiedBy: null,
          },
        } as FulfillmentValues, // ???
      },
    }
  }

  // if user has a valid default ship-to address, set it in the form.
  // otherwise set the initial country to the artwork's country
  const defaultUserAddress = getDefaultUserAddress(savedAddresses)

  const shippableDefaultAddress =
    defaultUserAddress &&
    orderContext.availableShippingCountries.includes(defaultUserAddress.country)
      ? addressWithFallbackValues(defaultUserAddress)
      : null

  if (shippableDefaultAddress) {
    return {
      orderContext,
      initialValues: {
        fulfillmentDetails: {
          fulfillmentType: FulfillmentType.SHIP,
          attributes: {
            ...shippableDefaultAddress,
            saveAddress: false,
            addressVerifiedBy: null,
          },
        },
      },
    }
  }

  // TODO: Expose existing addressVerifiedBy from order?
  // Maybe not, they go through the flow when they submit the form
  // and that is desirable. But what if it is a SAVED USER ADDRESS?
  // That could be a problem. Thoughts:
  // - If the user edits a saved address, we can verify and
  //   save to user from THAT form (in the future), then keep it in these
  //   values for saving to the order.
  // - If we know a user is using a saved address,
  //   we can skip verification no matter what (new form value)
  // - If we have an initial verifiedBy value from the relay order, we can
  //   set it here, then unset it if they edit the address
  // - We might want to add another non-form value similar to saveAddress
  //   rather than relying on the boolean
  const initialFulfillmentValues: ShipValues["attributes"] = {
    ...addressWithFallbackValues({ country: orderContext.shipsFrom }),

    addressVerifiedBy: null,
    // TODO: only if they have no saved addresses
    saveAddress: true,
  }

  return {
    orderContext,
    initialValues: {
      fulfillmentDetails: {
        fulfillmentType: FulfillmentType.SHIP,
        attributes: initialFulfillmentValues,
      },
    },
  }
}

export const ShippingRoute: FC<ShippingProps> = props => {
  const { order, isCommittingMutation, commitMutation } = props
  const { relayEnvironment } = useSystemContext()
  const { trackEvent } = useTracking()

  const saveFulfillmentDetails = useCallback(
    async (values: Omit<CommerceSetShippingInput, "id">) => {
      const mutationInput: CommerceSetShippingInput = {
        id: order.internalID,
        ...values,
      }

      const result = await setShipping(commitMutation, {
        input: mutationInput,
      })
      return result.commerceSetShipping?.orderOrError
    },
    [commitMutation, order.internalID]
  )

  const updateUserAddress = useCallback(
    async (
      existingAddressID: string,
      values: UserAddressAttributes,
      closeModal: () => void = () => null,
      onSuccess: (address: UpdateUserAddressMutation$data) => void = () => null,
      onError: (message: string) => void = logger.error
    ) => {
      return updateUserAddress(
        relayEnvironment!,
        existingAddressID,
        // TODO: Formik/yup validator type in Components/Address/Utils may be
        // able to coerce this
        values,
        closeModal,
        onSuccess,
        onError
      )
    },
    [relayEnvironment]
  )

  const { initialValues, orderContext } = useLoadOrder(props.me, props.order)

  const { isArtsyShipping, requiresArtsyShippingTo } = orderContext
  /* TODO:  possible states:
  - fulfillment_details
    - fulfillment details are not saved
    - editing fulfillment details
  - shipping_quotes
    - shipping quotes are present, but not selected
  - click to continue on to payment
    - can still change fulfillment details
  */
  const [activeStep, setActiveStep] = useState<
    "fulfillment_details" | "shipping_quotes"
  >("fulfillment_details")

  const [shippingQuoteId, setShippingQuoteId] = useState<string | undefined>(
    getSelectedShippingQuoteId(props.order)
  )
  const shippingQuotes = getShippingQuotes(props.order)

  // const selectShipping = async (editedAddress?: MutationAddressResponse) => {
  //   if (shippingOption === "PICKUP") {
  //     const { error, hasError } = validatePhoneNumber(phoneNumber)
  //     if (hasError) {
  //       setPhoneNumberError(error!)
  //       setPhoneNumberTouched(true)
  //       return
  //     }
  //   }

  //   try {
  //     // if not creating a new address, use the saved address selection for shipping
  //     const shipToAddress = isCreateNewAddress()
  //       ? address
  //       : convertShippingAddressForExchange(
  //           editedAddress
  //             ? editedAddress
  //             : addressList.find(
  //                 address => address.internalID == selectedAddressID
  //               )!
  //         )

  //     const shipToPhoneNumber =
  //       isCreateNewAddress() || shippingOption === "PICKUP"
  //         ? phoneNumber
  //         : addressList.find(address => address.internalID == selectedAddressID)
  //             ?.phoneNumber

  //     setShippingQuotes(null)
  //     setShippingQuoteId(undefined)

  //     const isArtsyShipping = checkIfArtsyShipping()

  //     const mutationInput: CommerceSetShippingInput = {
  //       id: props.order.internalID,
  //       fulfillmentType: isArtsyShipping ? "SHIP_ARTA" : shippingOption,
  //       shipping: shipToAddress,
  //       phoneNumber: shipToPhoneNumber,
  //     }
  //     if (addressVerifiedBy) {
  //       mutationInput.addressVerifiedBy = addressVerifiedBy
  //     }

  //     const orderOrError = (
  //       await setShipping(props.commitMutation, {
  //         input: mutationInput,
  //       })
  //     ).commerceSetShipping?.orderOrError

  //     if (orderOrError?.error) {
  //       handleSubmitError(orderOrError.error)
  //       return
  //     }
  //     // update address when user is entering new address AND save checkbox is selected
  //     await updateAddress()

  //     if (isArtsyShipping) {
  //       setShippingQuotes(getShippingQuotes(orderOrError?.order))
  //     } else {
  //       props.router.push(`/orders/${props.order.internalID}/payment`)
  //     }
  //   } catch (error) {
  //     logger.error(error)

  //   TODO: (Erik): Tracking
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
          message: getArtaErrorMessage(),
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
      shippingQuoteId,
      trackEvent,
    ]
  )

  // TODO: (Erik): Pass this into the fulfillment details form (according to current structure)
  const getArtaErrorMessage = () => (
    <>
      There was a problem getting shipping quotes. <br />
      Please contact{" "}
      <RouterLink inline to={`mailto:orders@artsy.net`}>
        orders@artsy.net
      </RouterLink>
      .
    </>
  )

  // const onAddressChange: AddressChangeHandler = (newAddress, key) => {
  //   const { errors } = validateAddress(newAddress)
  //   setAddress(newAddress)
  //   setAddressErrors({
  //     ...addressErrors,
  //     ...errors,
  //   })
  //   setAddressTouched({
  //     ...addressTouched,
  //     [key]: true,
  //   })

  //   setShippingQuotes(null)
  //   setShippingQuoteId(undefined)

  // TODO: (Erik): Make sure we re-set address verified by in the fulfillment details form
  //   // If the address has already been verified and the user is editing the form,
  //   // consider this a user-verified address (perform verification only once).
  //   if (addressVerifiedBy) {
  //     setAddressVerifiedBy(AddressVerifiedBy.USER)
  //   }
  // }

  // const onPhoneNumberChange: PhoneNumberChangeHandler = newPhoneNumber => {
  //   const { error } = validatePhoneNumber(newPhoneNumber)

  //   setPhoneNumber(newPhoneNumber)
  //   setPhoneNumberError(error!)
  //   setPhoneNumberTouched(true)
  //   setShippingQuotes(null)
  //   setShippingQuoteId(undefined)
  // }

  // useEffect(() => {
  //   if (
  //     addressList?.length > 0 &&
  //     checkIfArtsyShipping() &&
  //     !isCreateNewAddress()
  //   ) {
  //     selectShipping()
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [shippingOption, selectedAddressID])

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

    setShippingQuoteId(newShippingQuoteId)
  }

  // TODO: (Erik) - move to SavedAddresses tracking
  const selectSavedAddressWithTracking = (value: string) => {
    trackEvent({
      action: ActionType.clickedShippingAddress,
      context_module: ContextModule.ordersShipping,
      context_page_owner_type: "orders-shipping",
    } as ClickedShippingAddress)
    // selectSavedAddress(value)
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

  // const handleAddressCreate = (
  //   createdAddress: CreateUserAddressMutation$data["createUserAddress"]
  // ) => {
  //   if (createdAddress?.userAddressOrErrors?.internalID) {
  //     selectSavedAddress(createdAddress.userAddressOrErrors.internalID)
  //   }
  // }

  // // Automatically proceed after address verification flow is completed.
  // useEffect(() => {
  //   if (readyToSaveVerifiedAddress) {
  //     finalizeFulfillment()
  //   }
  //   // disabled because we only want this to run when once when readyToSaveVerifiedAddress changes to true
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [readyToSaveVerifiedAddress])

  // pass into fulfillment details
  const renderArtaErrorMessage = () => {
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
    activeStep === "shipping_quotes" &&
    !!isArtsyShipping &&
    !!shippingQuotes &&
    shippingQuotes.length > 0
  const isOffer = order.mode === "OFFER"

  const useDefaultArtsyShippingQuote =
    !!isArtsyShipping &&
    shippingQuotes &&
    shippingQuotes.length > 0 &&
    !shippingQuoteId

  // TODO: consider to move this block to a useEffect
  if (useDefaultArtsyShippingQuote) {
    const defaultShippingQuoteId = getDefaultShippingQuoteId(order)
    shippingQuoteId !== defaultShippingQuoteId &&
      setShippingQuoteId(defaultShippingQuoteId)
  }

  const advanceToPayment = useCallback(() => {
    props.router.push(`/orders/${props.order.internalID}/payment`)
  }, [props.router, props.order.internalID])

  const handleSubmitFulfillmentDetails = useCallback(
    async (
      formValues: FulfillmentValues,
      formikHelpers: FormikHelpers<FulfillmentValues>
    ) => {
      const { setSubmitting } = formikHelpers

      setSubmitting(true)
      try {
        let fulfillmentMutationValues: CommerceSetShippingInput
        if (formValues.fulfillmentType === FulfillmentType.SHIP) {
          const {
            saveAddress,
            addressVerifiedBy,
            phoneNumber,
            ...addressValues
          } = formValues.attributes
          const requiresArtsyShipping = requiresArtsyShippingTo(
            addressValues.country
          )
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
          fulfillmentMutationValues = {
            id: props.order.internalID,
            fulfillmentType: FulfillmentType.PICKUP,
            phoneNumber: formValues.attributes.phoneNumber,
          }
        }

        const orderOrError = await shippingOperations.saveFulfillmentDetails(
          fulfillmentMutationValues
        )

        if (orderOrError?.error) {
          handleSubmitError(orderOrError.error)
          return
        }
        const orderResult = orderOrError?.order!

        if (
          formValues.fulfillmentType === FulfillmentType.SHIP &&
          formValues.attributes.saveAddress
        ) {
          await shippingOperations.createUserAddress(formValues.attributes)
        }

        const {
          isArtsyShipping: orderResultRequiresArtsyShipping,
        } = getSavedFulfillment(orderResult)!

        if (orderResultRequiresArtsyShipping) {
          setActiveStep("shipping_quotes")
        } else {
          advanceToPayment()
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
      shippingOperations,
      requiresArtsyShippingTo,
      props.order.internalID,
      props.dialog,
      handleSubmitError,
      advanceToPayment,
      trackEvent,
    ]
  )
  const selectShippingQuote = useCallback(async () => {
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

        // TODO: (Erik): Figure out why this was here. Probably not needed any more.
        // await updateAddress()

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
          message: getArtaErrorMessage(),
        })
      }
    }
  }, [advanceToPayment, handleSubmitError, props, shippingQuoteId, trackEvent])

  // Because the button is in the sidebar as well as the main form area,
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
    if (activeStep === "fulfillment_details") {
      return (...args) => fulfillmentFormHelpers.handleSubmit(...args)
    }
    if (activeStep === "shipping_quotes") {
      return selectShippingQuote
    }
  }, [activeStep, fulfillmentFormHelpers, selectShippingQuote])

  const disableSubmit = useMemo(() => {
    if (activeStep === "fulfillment_details") {
      return !fulfillmentFormHelpers.isValid
    } else if (activeStep === "shipping_quotes") {
      return !shippingQuoteId
    }
  }, [activeStep, fulfillmentFormHelpers.isValid, shippingQuoteId])

  return (
    <Analytics contextPageOwnerId={order.internalID}>
      <Box data-test="orderShipping">
        <ShippingContext.Provider value={orderContext}>
          <OrderRouteContainer
            order={order}
            currentStep="Shipping"
            steps={isOffer ? offerFlowSteps : buyNowFlowSteps}
            content={
              <Flex
                flexDirection="column"
                style={isCommittingMutation ? { pointerEvents: "none" } : {}}
              >
                <FulfillmentDetailsFormFragmentContainer
                  me={props.me}
                  initialFulfillmentValues={initialValues.fulfillmentDetails}
                  active={activeStep === "fulfillment_details"}
                  order={props.order}
                  onSubmit={handleSubmitFulfillmentDetails}
                  setFulfillmentFormHelpers={setFulfillmentFormHelpers}
                />
                {/* CUT FROM HERE
              
              {artwork?.pickup_available && (
                <>
                  <RadioGroup
                    data-test="shipping-options"
                    onSelect={onSelectShippingOption}
                    defaultValue={shippingOption}
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
                      <Collapse open={shippingOption === "PICKUP"}>
                        <Text variant="xs" color="black60">
                          After your order is confirmed, a specialist will
                          contact you to coordinate pickup.
                        </Text>
                      </Collapse>
                    </BorderedRadio>
                  </RadioGroup>
                  <Spacer y={4} />
                </>
              )}

              <Collapse
                data-test="savedAddressesCollapse"
                open={!!showSavedAddresses}
              >
                <Text variant="lg-display" mb="1">
                  Delivery address
                </Text>
                {isArtsyShipping &&
                  shippingQuotes &&
                  shippingQuotes.length === 0 &&
                  renderArtaErrorMessage()}
                <SavedAddresses
                  me={props.me}
                  selectedAddress={selectedAddressID}
                  onSelect={selectSavedAddressWithTracking}
                  onAddressDelete={handleAddressDelete}
                  onAddressCreate={handleAddressCreate}
                  onAddressEdit={handleAddressEdit}
                />
              </Collapse>


              <Collapse data-test="addressFormCollapse" open={showAddressForm}>
                {isArtsyShipping &&
                  shippingQuotes &&
                  shippingQuotes.length === 0 &&
                  renderArtaErrorMessage()}
                <Text variant="lg-display" mb="2">
                  Delivery address
                </Text>
                {addressNeedsVerification && (
                  <AddressVerificationFlowQueryRenderer
                    data-testid="address-verification-flow"
                    address={{
                      addressLine1: address.addressLine1,
                      addressLine2: address.addressLine2,
                      country: address.country,
                      city: address.city,
                      region: address.region,
                      postalCode: address.postalCode,
                    }}
                    onClose={() => {
                      setAddressNeedsVerification(false)
                      setAddressVerifiedBy(AddressVerifiedBy.USER)
                    }}
                    onChosenAddress={(verifiedBy, chosenAddress) => {
                      setAddressNeedsVerification(false)
                      setAddressVerifiedBy(verifiedBy)
                      setAddress(address => {
                        return { ...address, ...chosenAddress }
                      })
                      // trigger finalizeFulfillment() via useEffect
                      setReadyToSaveVerifiedAddress(true)
                    }}
                  />
                )}
                <AddressForm
                  tabIndex={showAddressForm ? 0 : -1}
                  value={address}
                  errors={addressErrors}
                  touched={addressTouched}
                  onChange={onAddressChange}
                  domesticOnly={artwork?.onlyShipsDomestically!}
                  euOrigin={artwork?.euShippingOrigin!}
                  shippingCountry={artwork?.shippingCountry!}
                  showphonenumberInput={false}
                />
                <Spacer y={2} />
                <PhoneNumberForm
                  tabIndex={showAddressForm ? 0 : -1}
                  value={phoneNumber}
                  errors={phoneNumberError}
                  touched={phoneNumberTouched}
                  onChange={onPhoneNumberChange}
                  label="Required for shipping logistics"
                />
                <Checkbox
                  tabIndex={showAddressForm ? 0 : -1}
                  onSelect={selected => setSaveAddress(selected)}
                  selected={saveAddress}
                  data-test="save-address-checkbox"
                >
                  Save shipping address for later use
                </Checkbox>
                <Spacer y={4} />
              </Collapse>


              <Collapse
                data-test="phoneNumberCollapse"
                open={shippingOption === "PICKUP"}
              >
                <PhoneNumberForm
                  tabIndex={shippingOption === "PICKUP" ? 0 : -1}
                  data-test="pickupPhoneNumberForm"
                  value={phoneNumber}
                  errors={phoneNumberError}
                  touched={phoneNumberTouched}
                  onChange={onPhoneNumberChange}
                  label="Number to contact you for pickup logistics"
                />
                <Spacer y={4} />
              </Collapse>
            
            */}
                {/* SHIPPING Quotes */}
                <Collapse open={showArtsyShipping}>
                  <Text variant="sm">Artsy shipping options</Text>
                  <Text variant="xs" mb="1" color="black60">
                    {renderArtsyShippingOptionText()}
                  </Text>
                  <ShippingQuotesFragmentContainer
                    mb={3}
                    selectedShippingQuoteId={shippingQuoteId}
                    shippingQuotes={compact(shippingQuotes)}
                    onSelect={handleShippingQuoteSelected}
                  />
                  <Spacer y={4} />
                </Collapse>
                <Media greaterThan="xs">
                  <Button
                    onClick={onContinueButtonPressed}
                    disabled={disableSubmit}
                    loading={isCommittingMutation}
                    variant="primaryBlack"
                    width="50%"
                  >
                    {/* TODO: Remove - the * is just to show what step the button thinks it is on */}
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
