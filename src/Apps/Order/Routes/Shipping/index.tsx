import {
  BorderedRadio,
  Box,
  Button,
  Checkbox,
  Flex,
  RadioGroup,
  Spacer,
  Text,
} from "@artsy/palette"
import { useSystemContext } from "System/Hooks/useSystemContext"
import { RouterLink } from "System/Components/RouterLink"
import { Shipping_order$data } from "__generated__/Shipping_order.graphql"
import {
  CommerceOrderFulfillmentTypeEnum,
  CommerceSetShippingInput,
} from "__generated__/SetShippingMutation.graphql"
import { ArtworkSummaryItemFragmentContainer as ArtworkSummaryItem } from "Apps/Order/Components/ArtworkSummaryItem"
import { PartnerOfferTimerItem } from "Apps/Order/Components/PartnerOfferTimerItem"
import {
  buyNowFlowSteps,
  offerFlowSteps,
} from "Apps/Order/Components/OrderStepper"
import {
  PhoneNumber,
  PhoneNumberChangeHandler,
  PhoneNumberError,
  PhoneNumberForm,
  PhoneNumberTouched,
} from "Apps/Order/Components/PhoneNumberForm"
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
import * as DeprecatedSchema from "@artsy/cohesion/dist/DeprecatedSchema"
import {
  Address,
  AddressChangeHandler,
  AddressErrors,
  AddressForm,
  AddressTouched,
} from "Components/Address/AddressForm"
import { Router } from "found"
import { FC, useState, useEffect } from "react"
import { COUNTRIES_IN_EUROPEAN_UNION } from "@artsy/commerce_helpers"
import { RelayProp, createFragmentContainer, graphql } from "react-relay"
import createLogger from "Utils/logger"
import { Media } from "Utils/Responsive"
import { BuyerGuarantee } from "Apps/Order/Components/BuyerGuarantee"
import { Collapse } from "Apps/Order/Components/Collapse"
import { Shipping_me$data } from "__generated__/Shipping_me.graphql"
import {
  startingPhoneNumber,
  startingAddress,
  MutationAddressResponse,
  convertShippingAddressForExchange,
  defaultShippingAddressIndex,
  getDefaultShippingQuoteId,
  getSelectedShippingQuoteId,
  getShippingQuotes,
  getShippingOption,
  ShippingQuotesType,
} from "Apps/Order/Utils/shippingUtils"
import {
  NEW_ADDRESS,
  SavedAddressesFragmentContainer as SavedAddresses,
} from "Apps/Order/Components/SavedAddresses"
import { createUserAddress } from "Apps/Order/Mutations/CreateUserAddress"
import { setShipping } from "Apps/Order/Mutations/SetShipping"
import { ShippingQuotesFragmentContainer } from "Apps/Order/Components/ShippingQuotes"
import { compact } from "lodash"
import { selectShippingOption } from "Apps/Order/Mutations/SelectShippingOption"
import { updateUserAddress } from "Apps/Order/Mutations/UpdateUserAddress"
import { deleteUserAddress } from "Apps/Order/Mutations/DeleteUserAddress"
import { CreateUserAddressMutation$data } from "__generated__/CreateUserAddressMutation.graphql"
import { UpdateUserAddressMutation$data } from "__generated__/UpdateUserAddressMutation.graphql"
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
import { useFeatureFlag } from "System/Hooks/useFeatureFlag"
import {
  AddressVerificationFlowQueryRenderer,
  AddressVerifiedBy,
} from "Apps/Order/Components/AddressVerificationFlow"
import { Analytics } from "System/Contexts/AnalyticsContext"
import {
  ErrorDialogs,
  getErrorDialogCopy,
} from "Apps/Order/Utils/getErrorDialogCopy"
import { Jump, useJump } from "Utils/Hooks/useJump"

const logger = createLogger("Order/Routes/Shipping/index.tsx")

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
  const { relayEnvironment } = useSystemContext()

  const addressVerificationUSEnabled = !!useFeatureFlag(
    "address_verification_us"
  )
  const addressVerificationIntlEnabled = !!useFeatureFlag(
    "address_verification_intl"
  )

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

  const [shippingOption, setShippingOption] = useState<
    CommerceOrderFulfillmentTypeEnum
  >(getShippingOption(props.order.requestedFulfillment?.__typename))

  const [shippingQuoteId, setShippingQuoteId] = useState<string | undefined>(
    getSelectedShippingQuoteId(props.order)
  )
  const [shippingQuotes, setShippingQuotes] = useState<ShippingQuotesType>(
    getShippingQuotes(props.order)
  )

  const [address, setAddress] = useState<Address>(
    // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
    startingAddress(props.me, props.order)
  )
  const [selectedAddressID, setSelectedAddressID] = useState<string>(
    defaultShippingAddressIndex(props.me, props.order)
  )
  const [addressErrors, setAddressErrors] = useState<AddressErrors | {}>({})
  const [addressTouched, setAddressTouched] = useState<AddressTouched>({})

  const [phoneNumber, setPhoneNumber] = useState<PhoneNumber>(
    startingPhoneNumber(props.me, props.order)
  )
  const [phoneNumberError, setPhoneNumberError] = useState<PhoneNumberError>("")
  const [phoneNumberTouched, setPhoneNumberTouched] = useState<
    PhoneNumberTouched
  >(false)
  const addressList = extractNodes(props.me?.addressConnection) ?? []

  const [saveAddress, setSaveAddress] = useState(true)
  const [deletedAddressID, setDeletedAddressID] = useState<string | undefined>()
  const [savedAddressID, setSavedAddressID] = useState<string | undefined>(
    undefined
  )

  useEffect(() => {
    const isAddressRemoved = !addressList.find(
      address => address.internalID === deletedAddressID
    )

    if (deletedAddressID && isAddressRemoved) {
      if (!addressList || addressList.length === 0) {
        setSelectedAddressID(NEW_ADDRESS)
        setShippingQuotes(null)
        setShippingQuoteId(undefined)
      } else if (selectedAddressID == deletedAddressID) {
        selectSavedAddress(
          addressList.find(address => address.isDefault)?.internalID as string
        )
      }

      setDeletedAddressID(undefined)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [addressList, deletedAddressID])

  const touchedAddress = () => {
    return {
      name: true,
      country: true,
      postalCode: true,
      addressLine1: true,
      addressLine2: true,
      city: true,
      region: true,
      phoneNumber: true,
    }
  }

  const handleAddressDelete = (deletedAddressID: string) => {
    setDeletedAddressID(deletedAddressID)
  }

  const getOrderArtwork = () => props.order.lineItems?.edges?.[0]?.node?.artwork
  const isCreateNewAddress = () => selectedAddressID === NEW_ADDRESS

  const checkIfArtsyShipping = () => {
    const artwork = getOrderArtwork()
    const processWithArtsyShippingDomestic = !!artwork?.processWithArtsyShippingDomestic
    const artsyShippingInternational = !!artwork?.artsyShippingInternational

    const shippingCountry = isCreateNewAddress()
      ? address.country
      : addressList &&
        addressList.find(address => address.internalID == selectedAddressID)
          ?.country

    const isDomesticOrder =
      (COUNTRIES_IN_EUROPEAN_UNION.includes(shippingCountry) &&
        COUNTRIES_IN_EUROPEAN_UNION.includes(artwork?.shippingCountry)) ||
      artwork?.shippingCountry == shippingCountry
    const isInternationalOrder = !isDomesticOrder

    return (
      shippingOption === "SHIP" &&
      ((processWithArtsyShippingDomestic && isDomesticOrder) ||
        (artsyShippingInternational && isInternationalOrder))
    )
  }

  const isAddressVerificationEnabled = (): boolean => {
    return address.country === "US"
      ? addressVerificationUSEnabled
      : addressVerificationIntlEnabled
  }

  // Save shipping info on the order. If it's Artsy shipping and a quote hasn't
  // been selected, this renders the quotes for user to select and finalize
  // again.
  const finalizeFulfillment = async () => {
    if (checkIfArtsyShipping() && !!shippingQuoteId) {
      selectShippingQuote()
    } else {
      selectShipping()
    }
  }

  /**
   * Perform basic form validation for address and phone number.
   *
   * @returns true if both are valid; false, otherwise
   */
  const validateAddressAndPhoneNumber = () => {
    const {
      errors: addressErrors,
      hasErrors: invalidAddress,
    } = validateAddress(address)
    const {
      error: phoneNumberError,
      hasError: invalidPhoneNumber,
    } = validatePhoneNumber(phoneNumber)

    if (invalidPhoneNumber) {
      setPhoneNumberError(phoneNumberError as string)
      setPhoneNumberTouched(true)
      !invalidAddress && jumpTo("phoneNumberTop", { behavior: "smooth" })
    }

    if (invalidAddress) {
      setAddressErrors(addressErrors)
      setAddressTouched(touchedAddress)
      jumpTo("deliveryAddressTop", { behavior: "smooth" })
    }

    return !invalidAddress && !invalidPhoneNumber
  }

  const onContinueButtonPressed = async () => {
    if (
      shippingOption === "SHIP" &&
      isCreateNewAddress() &&
      !validateAddressAndPhoneNumber()
    ) {
      return
    }

    if (
      isAddressVerificationEnabled() &&
      !addressVerifiedBy &&
      isCreateNewAddress()
    ) {
      /**
       * Setting addressNeedsVerification to true will cause the address
       * verification flow to be initiated on this render.
       */
      setAddressNeedsVerification(true)
      return
    }

    finalizeFulfillment()
  }

  const selectShipping = async (editedAddress?: MutationAddressResponse) => {
    if (shippingOption === "PICKUP") {
      const { error, hasError } = validatePhoneNumber(phoneNumber)
      if (hasError) {
        setPhoneNumberError(error as string)
        setPhoneNumberTouched(true)
        return
      }
    }

    try {
      // if not creating a new address, use the saved address selection for shipping
      const shipToAddress = isCreateNewAddress()
        ? address
        : convertShippingAddressForExchange(
            editedAddress
              ? editedAddress
              : // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                addressList.find(
                  address => address.internalID == selectedAddressID
                )!
          )

      const shipToPhoneNumber =
        isCreateNewAddress() || shippingOption === "PICKUP"
          ? phoneNumber
          : addressList.find(address => address.internalID == selectedAddressID)
              ?.phoneNumber

      setShippingQuotes(null)
      setShippingQuoteId(undefined)

      const isArtsyShipping = checkIfArtsyShipping()

      const mutationInput: CommerceSetShippingInput = {
        id: props.order.internalID,
        fulfillmentType: isArtsyShipping ? "SHIP_ARTA" : shippingOption,
        shipping: shipToAddress,
        phoneNumber: shipToPhoneNumber,
      }
      if (addressVerifiedBy) {
        mutationInput.addressVerifiedBy = addressVerifiedBy
      }

      const orderOrError = (
        await setShipping(props.commitMutation, {
          input: mutationInput,
        })
      ).commerceSetShipping?.orderOrError

      if (orderOrError?.error) {
        handleSubmitError(orderOrError.error)
        return
      }
      // update address when user is entering new address AND save checkbox is selected
      await updateAddress()

      if (isArtsyShipping) {
        setShippingQuotes(getShippingQuotes(orderOrError?.order))
        jumpTo("shippingOptionsTop", { behavior: "smooth" })
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

        await updateAddress()

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
          message: getArtaErrorMessage(),
        })
      }
    }
  }

  const updateAddress = async () => {
    const shouldCreateNewAddress = isCreateNewAddress()

    if (saveAddress) {
      if (
        shippingOption === "SHIP" &&
        shouldCreateNewAddress &&
        relayEnvironment
      ) {
        if (savedAddressID) {
          updateUserAddress(
            relayEnvironment,
            savedAddressID,
            {
              ...address,
              phoneNumber: phoneNumber,
            }, // address
            () => {},
            () => {
              message => {
                logger.error(message)
              }
            }, // onError
            () => {} // onSuccess
          )
        } else {
          await createUserAddress(
            relayEnvironment,
            {
              ...address,
              phoneNumber: phoneNumber,
            }, // address
            data => {
              setSavedAddressID(
                data?.createUserAddress?.userAddressOrErrors.internalID
              )
            }, // onSuccess
            () => {
              message => {
                logger.error(message)
              }
            }, // onError
            props.me, // me
            () => {}
          )
        }
      }
    } else if (savedAddressID) {
      deleteUserAddress(
        relayEnvironment,
        savedAddressID,
        () => {},
        message => {
          logger.error(message)
        }
      )
    }
  }

  const handleSubmitError = (error: {
    code: string
    data: string | null | undefined
  }) => {
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
    } else if (checkIfArtsyShipping() && shippingQuoteId) {
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
  }

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

  const onAddressChange: AddressChangeHandler = (newAddress, key) => {
    const { errors } = validateAddress(newAddress)
    setAddress(newAddress)
    setAddressErrors({
      ...addressErrors,
      ...errors,
    })
    setAddressTouched({
      ...addressTouched,
      [key]: true,
    })

    setShippingQuotes(null)
    setShippingQuoteId(undefined)

    // If the address has already been verified and the user is editing the form,
    // consider this a user-verified address (perform verification only once).
    if (addressVerifiedBy) {
      setAddressVerifiedBy(AddressVerifiedBy.USER)
    }
  }

  const onPhoneNumberChange: PhoneNumberChangeHandler = newPhoneNumber => {
    const { error } = validatePhoneNumber(newPhoneNumber)

    setPhoneNumber(newPhoneNumber)
    setPhoneNumberError(error as string)
    setPhoneNumberTouched(true)
    setShippingQuotes(null)
    setShippingQuoteId(undefined)
  }

  useEffect(() => {
    if (
      addressList?.length > 0 &&
      checkIfArtsyShipping() &&
      !isCreateNewAddress()
    ) {
      selectShipping()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shippingOption, selectedAddressID])

  const onSelectShippingOption = (
    newShippingOption: CommerceOrderFulfillmentTypeEnum
  ) => {
    trackEvent({
      action_type: DeprecatedSchema.ActionType.Click,
      subject:
        newShippingOption === "SHIP"
          ? DeprecatedSchema.Subject.BNMOProvideShipping
          : DeprecatedSchema.Subject.BNMOArrangePickup,
      flow: "buy now",
      type: "button",
    })

    if (shippingOption !== newShippingOption) {
      setShippingOption(newShippingOption)
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

  const selectSavedAddressWithTracking = (value: string) => {
    trackEvent({
      action: ActionType.clickedShippingAddress,
      context_module: ContextModule.ordersShipping,
      context_page_owner_type: "orders-shipping",
    } as ClickedShippingAddress)
    selectSavedAddress(value)
  }

  const selectSavedAddress = (value: string) => {
    if (selectedAddressID !== value) {
      setSelectedAddressID(value)
      setShippingQuotes(null)
      setShippingQuoteId(undefined)
    }
  }

  const handleAddressEdit = (
    editedAddress: UpdateUserAddressMutation$data["updateUserAddress"]
  ) => {
    // reload shipping quotes if selected address edited
    if (selectedAddressID === editedAddress?.userAddressOrErrors?.internalID) {
      setShippingQuotes(null)
      setShippingQuoteId(undefined)

      if (checkIfArtsyShipping()) {
        selectShipping(editedAddress.userAddressOrErrors)
      }
    }
  }

  const handleAddressCreate = (
    createdAddress: CreateUserAddressMutation$data["createUserAddress"]
  ) => {
    if (createdAddress?.userAddressOrErrors?.internalID) {
      selectSavedAddress(createdAddress.userAddressOrErrors.internalID)
    }
  }

  const isSaveAndContinueAllowed = (): boolean => {
    if (shippingOption === "PICKUP") {
      return !phoneNumber || !!phoneNumberError
    }

    return false
  }

  // Automatically proceed after address verification flow is completed.
  useEffect(() => {
    if (readyToSaveVerifiedAddress) {
      finalizeFulfillment()
    }
    // disabled because we only want this to run when once when readyToSaveVerifiedAddress changes to true
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [readyToSaveVerifiedAddress])

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

  const { order, isCommittingMutation } = props
  const artwork = getOrderArtwork()
  const shippingSelected =
    !artwork?.pickup_available || shippingOption === "SHIP"
  const showAddressForm =
    shippingSelected && (isCreateNewAddress() || addressList?.length === 0)
  const showSavedAddresses =
    shippingSelected && addressList && addressList.length > 0
  const isArtsyShipping = checkIfArtsyShipping()
  const showArtsyShipping =
    isArtsyShipping && !!shippingQuotes && shippingQuotes.length > 0
  const isOffer = order.mode === "OFFER"
  const useDefaultArtsyShippingQuote =
    isArtsyShipping &&
    shippingQuotes &&
    shippingQuotes.length > 0 &&
    !shippingQuoteId
  const { jumpTo } = useJump()

  // TODO: consider to move this block to a useEffect
  if (useDefaultArtsyShippingQuote) {
    const defaultShippingQuoteId = getDefaultShippingQuoteId(order)
    shippingQuoteId !== defaultShippingQuoteId &&
      setShippingQuoteId(defaultShippingQuoteId)
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
              {/* TODO: Make RadioGroup generic for the allowed values,
              which could also ensure the children only use
              allowed values. */}
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

              {/* SAVED ADDRESSES */}
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

              {/* NEW ADDRESS */}
              <Collapse data-test="addressFormCollapse" open={showAddressForm}>
                {isArtsyShipping &&
                  shippingQuotes &&
                  shippingQuotes.length === 0 &&
                  renderArtaErrorMessage()}
                <Jump id="deliveryAddressTop" />
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
                  domesticOnly={artwork?.onlyShipsDomestically as boolean}
                  euOrigin={artwork?.euShippingOrigin as boolean}
                  shippingCountry={artwork?.shippingCountry as string}
                  showPhoneNumberInput={false}
                />
                <Spacer y={2} />
                <Jump id="phoneNumberTop" />
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

              {/* PHONE NUMBER */}
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

              {/* SHIPPING OPTION */}
              <Collapse open={showArtsyShipping}>
                <Jump id="shippingOptionsTop" />
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
                  loading={isCommittingMutation}
                  variant="primaryBlack"
                  width="50%"
                  disabled={isSaveAndContinueAllowed()}
                >
                  Save and Continue
                </Button>
              </Media>
            </Flex>
          }
          sidebar={
            <Flex flexDirection="column">
              <Flex flexDirection="column">
                {order.source === "partner_offer" && order.mode === "BUY" && (
                  <>
                    <PartnerOfferTimerItem order={order} />
                    <Spacer y={2} />
                  </>
                )}
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
                  loading={isCommittingMutation}
                  variant="primaryBlack"
                  width="100%"
                  disabled={isSaveAndContinueAllowed()}
                >
                  Save and Continue
                </Button>
              </Media>
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
        source
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
        ...PartnerOfferTimerItem_order
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
