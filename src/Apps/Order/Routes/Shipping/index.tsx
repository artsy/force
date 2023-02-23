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
import { useSystemContext } from "System"
import { RouterLink } from "System/Router/RouterLink"
import { Shipping_order$data } from "__generated__/Shipping_order.graphql"
import { CommerceOrderFulfillmentTypeEnum } from "__generated__/SetShippingMutation.graphql"
import { ArtworkSummaryItemFragmentContainer as ArtworkSummaryItem } from "Apps/Order/Components/ArtworkSummaryItem"
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
} from "Components/AddressForm"
import { Router } from "found"
import { FC, useState, useEffect } from "react"
import { COUNTRIES_IN_EUROPEAN_UNION } from "@artsy/commerce_helpers"
import { RelayProp, createFragmentContainer, graphql } from "react-relay"
import createLogger from "Utils/logger"
import { Media } from "Utils/Responsive"
import { BuyerGuarantee } from "Apps/Order/Components/BuyerGuarantee"
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
          addressList.find(address => address.isDefault)?.internalID!
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

  useEffect(() => {
    if (checkIfArtsyShipping() && !isCreateNewAddress() && !shippingQuoteId) {
      selectShipping()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedAddressID])

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

  const onContinueButtonPressed = async () => {
    if (checkIfArtsyShipping() && !!shippingQuoteId) {
      selectShippingQuote()
    } else {
      selectShipping()
    }
  }

  const selectShipping = async (editedAddress?: MutationAddressResponse) => {
    if (shippingOption === "SHIP") {
      if (isCreateNewAddress()) {
        // validate when order is not pickup and the address is new
        const { errors, hasErrors } = validateAddress(address)
        const { error, hasError } = validatePhoneNumber(phoneNumber)
        if (hasErrors && hasError) {
          setAddressErrors(errors!)
          setAddressTouched(touchedAddress)
          setPhoneNumberError(error!)
          setPhoneNumberTouched(true)
          return
        } else if (hasErrors) {
          setAddressErrors(errors!)
          setAddressTouched(touchedAddress)
          return
        } else if (hasError) {
          setPhoneNumberError(error!)
          setPhoneNumberTouched(true)
          return
        }
      }
    } else {
      const { error, hasError } = validatePhoneNumber(phoneNumber)
      if (hasError) {
        setPhoneNumberError(error!)
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
              : addressList.find(
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

      const orderOrError = (
        await setShipping(props.commitMutation, {
          input: {
            id: props.order.internalID,
            fulfillmentType: isArtsyShipping ? "SHIP_ARTA" : shippingOption,
            shipping: shipToAddress,
            phoneNumber: shipToPhoneNumber,
          },
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
      } else {
        props.router.push(`/orders/${props.order.internalID}/payment`)
      }
    } catch (error) {
      logger.error(error)
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
        relayEnvironment!,
        savedAddressID,
        () => {},
        message => {
          logger.error(message)
        }
      )
    }
  }

  const handleSubmitError = (error: { code: string; data: string | null }) => {
    logger.error(error)
    const parsedData = error.data ? JSON.parse(error.data) : {}
    if (
      error.code === "missing_region" ||
      error.code === "missing_country" ||
      error.code === "missing_postal_code"
    ) {
      props.dialog.showErrorDialog({
        title: "Invalid address",
        message:
          "There was an error processing your address. Please review and try again.",
      })
    } else if (
      error.code === "unsupported_shipping_location" &&
      parsedData.failure_code === "domestic_shipping_only"
    ) {
      props.dialog.showErrorDialog({
        title: "Can't ship to that address",
        message: "This work can only be shipped domestically.",
      })
    } else if (checkIfArtsyShipping() && shippingQuoteId) {
      props.dialog.showErrorDialog({
        message: getArtaErrorMessage(),
      })
    } else {
      props.dialog.showErrorDialog()
    }
  }

  const getArtaErrorMessage = () => (
    <>
      There was a problem getting shipping quotes. <br />
      Please contact{" "}
      <RouterLink to={`mailto:orders@artsy.net`}>orders@artsy.net</RouterLink>.
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
  }

  const onPhoneNumberChange: PhoneNumberChangeHandler = newPhoneNumber => {
    const { error } = validatePhoneNumber(newPhoneNumber)

    setPhoneNumber(newPhoneNumber)
    setPhoneNumberError(error!)
    setPhoneNumberTouched(true)
    setShippingQuotes(null)
    setShippingQuoteId(undefined)
  }

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
      setShippingQuotes(null)
      setShippingQuoteId(undefined)

      if (addressList && addressList.length > 0 && checkIfArtsyShipping()) {
        selectShipping()
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
        We need to confirm some details with you before processing this order.
        Please reach out to{" "}
        <RouterLink color="red100" to="mailto:orders@artsy.net">
          orders@artsy.net
        </RouterLink>{" "}
        for assistance.
      </Text>
    )
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

  return (
    <Box data-test="orderShipping">
      <OrderRouteContainer
        order={order}
        currentStep="Shipping"
        steps={order.mode === "OFFER" ? offerFlowSteps : buyNowFlowSteps}
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
                        After your order is confirmed, a specialist will contact
                        you to coordinate pickup.
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
                inCollectorProfile={false}
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
              <AddressForm
                value={address}
                errors={addressErrors}
                touched={addressTouched}
                onChange={onAddressChange}
                domesticOnly={artwork?.onlyShipsDomestically!}
                euOrigin={artwork?.euShippingOrigin!}
                shippingCountry={artwork?.shippingCountry!}
                showPhoneNumberInput={false}
              />
              <Spacer y={2} />
              <PhoneNumberForm
                value={phoneNumber}
                errors={phoneNumberError}
                touched={phoneNumberTouched}
                onChange={onPhoneNumberChange}
                label="Required for shipping logistics"
              />
              <Checkbox
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
                data-test="pickupPhoneNumberForm"
                value={phoneNumber}
                errors={phoneNumberError}
                touched={phoneNumberTouched}
                onChange={onPhoneNumberChange}
                label="Number to contact you for pickup logistics"
              />
              <Spacer y={4} />
            </Collapse>

            <Collapse
              open={
                isArtsyShipping && !!shippingQuotes && shippingQuotes.length > 0
              }
            >
              <Text variant="sm">Artsy shipping options</Text>
              <Text variant="xs" mb="1" color="black60">
                All options are eligible for Artsy’s Buyer Protection policy,
                which protects against damage and loss.
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
