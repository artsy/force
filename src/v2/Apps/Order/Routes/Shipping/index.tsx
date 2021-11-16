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
import { RouterLink } from "v2/System/Router/RouterLink"
import { Shipping_order } from "v2/__generated__/Shipping_order.graphql"
import { CommerceOrderFulfillmentTypeEnum } from "v2/__generated__/SetShippingMutation.graphql"
import { ArtworkSummaryItemFragmentContainer as ArtworkSummaryItem } from "v2/Apps/Order/Components/ArtworkSummaryItem"
import {
  OrderStepper,
  buyNowFlowSteps,
  offerFlowSteps,
} from "v2/Apps/Order/Components/OrderStepper"
import {
  PhoneNumber,
  PhoneNumberChangeHandler,
  PhoneNumberError,
  PhoneNumberForm,
  PhoneNumberTouched,
} from "v2/Apps/Order/Components/PhoneNumberForm"
import { TransactionDetailsSummaryItemFragmentContainer as TransactionDetailsSummaryItem } from "v2/Apps/Order/Components/TransactionDetailsSummaryItem"
import { TwoColumnLayout } from "v2/Apps/Order/Components/TwoColumnLayout"
import { Dialog, injectDialog } from "v2/Apps/Order/Dialogs"
import {
  CommitMutation,
  injectCommitMutation,
} from "v2/Apps/Order/Utils/commitMutation"
import {
  validateAddress,
  validatePhoneNumber,
} from "v2/Apps/Order/Utils/formValidators"
import { track } from "v2/System/Analytics"
import * as Schema from "v2/System/Analytics/Schema"
import {
  Address,
  AddressChangeHandler,
  AddressErrors,
  AddressForm,
  AddressTouched,
} from "v2/Components/AddressForm"
import { Router } from "found"
import { useState, useEffect } from "react"
import { RelayProp, createFragmentContainer, graphql } from "react-relay"
import createLogger from "v2/Utils/logger"
import { Media } from "v2/Utils/Responsive"
import { BuyerGuarantee } from "v2/Apps/Order/Components/BuyerGuarantee"
import { Shipping_me } from "v2/__generated__/Shipping_me.graphql"
import {
  startingPhoneNumber,
  startingAddress,
  convertShippingAddressForExchange,
  defaultShippingAddressIndex,
  getSelectedShippingQuoteId,
  getShippingQuotes,
  getShippingOption,
  ShippingQuotesType,
} from "v2/Apps/Order/Utils/shippingUtils"
import {
  NEW_ADDRESS,
  SavedAddressesFragmentContainer as SavedAddresses,
} from "v2/Apps/Order/Components/SavedAddresses"
import { createUserAddress } from "v2/Apps/Order/Mutations/CreateUserAddress"
import { setShipping } from "v2/Apps/Order/Mutations/SetShipping"
import { SystemContextProps, withSystemContext } from "v2/System/SystemContext"
import { ShippingQuotesFragmentContainer } from "v2/Apps/Order/Components/ShippingQuotes"
import { compact } from "lodash"
import { selectShippingOption } from "v2/Apps/Order/Mutations/SelectShippingOption"
import { updateUserAddress } from "v2/Apps/Order/Mutations/UpdateUserAddress"
import { deleteUserAddress } from "v2/Apps/Order/Mutations/DeleteUserAddress"
import { CreateUserAddressMutationResponse } from "v2/__generated__/CreateUserAddressMutation.graphql"
import { UpdateUserAddressMutationResponse } from "v2/__generated__/UpdateUserAddressMutation.graphql"
import {
  ActionType,
  ClickedSelectShippingOption,
  ClickedShippingAddress,
  ContextModule,
  OwnerType,
} from "@artsy/cohesion"

export interface ShippingProps extends SystemContextProps {
  order: Shipping_order
  me: Shipping_me
  relay?: RelayProp
  router: Router
  dialog: Dialog
  commitMutation: CommitMutation
  isCommittingMutation: boolean
}

export interface ShippingState {
  shippingOption: CommerceOrderFulfillmentTypeEnum
  address: Address
  phoneNumber: PhoneNumber
  phoneNumberError: PhoneNumberError
  phoneNumberTouched: PhoneNumberTouched
  addressErrors: AddressErrors | {}
  addressTouched: AddressTouched
  selectedAddressID: string
  saveAddress: boolean
  shippingQuotes: ShippingQuotesType
  shippingQuoteId?: string
  savedAddressID?: string
}

const logger = createLogger("Order/Routes/Shipping/index.tsx")

track()
// export class ShippingRoute extends Component<ShippingProps, ShippingState> {
export const ShippingRoute: React.FC<ShippingProps> = props => {
  const [shippingOption, setShippingOption] = useState<
    CommerceOrderFulfillmentTypeEnum
  >(getShippingOption(props.order.requestedFulfillment?.__typename))
  const [address, setAddress] = useState<Address>(
    startingAddress(props.me, props.order) as Address
  )
  const [addressErrors, setAddressErrors] = useState<AddressErrors | {}>({})
  const [addressTouched, setAddressTouched] = useState<AddressTouched>({})
  const [savedAddressID, setSavedAddressID] = useState<string | undefined>(
    undefined
  )
  const [phoneNumber, setPhoneNumber] = useState<PhoneNumber>(
    startingPhoneNumber(props.me, props.order)
  )
  const [phoneNumberError, setPhoneNumberError] = useState<PhoneNumberError>("")
  const [phoneNumberTouched, setPhoneNumberTouched] = useState<
    PhoneNumberTouched
  >(false)
  const [selectedAddressID, setSelectedAddressID] = useState<string>(
    defaultShippingAddressIndex(props.me, props.order)
  )
  const [shippingQuotes, setShippingQuotes] = useState<ShippingQuotesType>(
    getShippingQuotes(props.order)
  )
  const [shippingQuoteId, setShippingQuoteId] = useState<string | undefined>(
    getSelectedShippingQuoteId(props.order)
  )
  const [saveAddressToggle, setSaveAddressToggle] = useState<boolean>(true)

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
    const addressList = getAddressList()

    if (!addressList || addressList.length === 0) {
      setSelectedAddressID(NEW_ADDRESS)
      setShippingQuotes(null)
      setShippingQuoteId(undefined)
    } else if (selectedAddressID == deletedAddressID) {
      selectSavedAddress(
        addressList.find(address => address?.node?.isDefault)?.node?.internalID!
      )
    }
  }

  const getAddressList = () => props.me.addressConnection?.edges

  const getOrderArtwork = () => props.order.lineItems?.edges?.[0]?.node?.artwork

  const isCreateNewAddress = () => selectedAddressID === NEW_ADDRESS

  const isArtaShipping = () => {
    const addresses = getAddressList()
    const artaShippingEnabled = !!getOrderArtwork()?.artaShippingEnabled

    const shippingCountry = isCreateNewAddress()
      ? address.country
      : addresses &&
        addresses.find(
          address => address?.node?.internalID == selectedAddressID
        )?.node?.country

    return (
      shippingOption === "SHIP" &&
      artaShippingEnabled &&
      shippingCountry === "US"
    )
  }

  const onContinueButtonPressed = async () => {
    if (isArtaShipping() && !!shippingQuoteId) {
      selectShippingQuote()
    } else {
      selectShipping()
    }
  }

  const selectShipping = async () => {
    if (shippingOption === "SHIP") {
      if (isCreateNewAddress()) {
        // validate when order is not pickup and the address is new
        const { errors, hasErrors } = validateAddress(address)
        const { error, hasError } = validatePhoneNumber(phoneNumber)
        if (hasErrors && hasError) {
          setAddressErrors(errors!)
          setAddressTouched(touchedAddress())
          setPhoneNumberError(error!)
          setPhoneNumberTouched(true)
          return
        } else if (hasErrors) {
          setAddressErrors(errors!)
          setAddressTouched(touchedAddress())
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
            getAddressList()?.find(
              address => address?.node?.internalID == selectedAddressID
            )?.node!
          )
      const shipToPhoneNumber = isCreateNewAddress()
        ? phoneNumber
        : getAddressList()?.find(
            address => address?.node?.internalID == selectedAddressID
          )?.node?.phoneNumber
      setShippingQuotes(null)
      setShippingQuoteId(undefined)

      // const isArtaShipping = isArtaShipping()

      const orderOrError = (
        await setShipping(props.commitMutation, {
          input: {
            id: props.order.internalID,
            fulfillmentType: isArtaShipping() ? "SHIP_ARTA" : shippingOption,
            shipping: shipToAddress,
            phoneNumber: shipToPhoneNumber,
          },
        })
      ).commerceSetShipping?.orderOrError

      if (orderOrError?.error) {
        handleSubmitError(orderOrError.error)
        return
      }
      // save address when user is entering new address AND save checkbox is selected
      await saveAddress()

      if (isArtaShipping()) {
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
    // const { shippingQuoteId } = state
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

        await saveAddress()

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

  const saveAddress = async () => {
    // const {
    //   address,
    //   phoneNumber,
    //   shippingOption,
    //   saveAddress,
    //   savedAddressID,
    // } = state
    const { relayEnvironment } = props
    // const isCreateNewAddress = isCreateNewAddress()

    if (saveAddressToggle) {
      if (
        shippingOption === "SHIP" &&
        isCreateNewAddress() &&
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
    } else if (isArtaShipping() && shippingQuoteId) {
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

  const onAddressChange: AddressChangeHandler = (address, key) => {
    const { errors } = validateAddress(address)
    setAddress(address)
    setAddressErrors(prevState => ({
      ...prevState,
      ...errors,
    }))
    setAddressTouched({
      ...addressTouched,
      [key]: true,
    })
    setShippingQuotes(null)
    setShippingQuoteId(undefined)
  }

  const onPhoneNumberChange: PhoneNumberChangeHandler = phoneNumber => {
    const { error } = validatePhoneNumber(phoneNumber)
    setPhoneNumber(phoneNumber)
    setPhoneNumberError(error!)
    setPhoneNumberTouched(true)
    setShippingQuotes(null)
    setShippingQuoteId(undefined)
  }

  track((props, state, args) => ({
    action_type: Schema.ActionType.Click,
    subject:
      args[0] === "SHIP"
        ? Schema.Subject.BNMOProvideShipping
        : Schema.Subject.BNMOArrangePickup,
    flow: "buy now",
    type: "button",
  }))

  useEffect(() => {
    const addressList = getAddressList()
    if (addressList && addressList.length > 0 && isArtaShipping()) {
      selectShipping()
    }
  }, [shippingOption, shippingQuotes, shippingQuoteId])

  const onSelectShippingOption = (
    shippingOptionProp: CommerceOrderFulfillmentTypeEnum
  ) => {
    if (shippingOption !== shippingOptionProp) {
      setShippingOption(shippingOptionProp)
      setShippingQuotes(null)
      setShippingQuoteId(undefined)
    }
  }

  track(
    (_props, _state, args) =>
      ({
        action: ActionType.clickedSelectShippingOption,
        context_module: ContextModule.ordersShipping,
        context_page_owner_type: "orders-shipping",
        subject: args[0],
      } as ClickedSelectShippingOption)
  )

  const handleShippingQuoteSelected = (shippingQuoteId: string) => {
    setShippingQuoteId(shippingQuoteId)
  }

  track(
    () =>
      ({
        action: ActionType.clickedShippingAddress,
        context_module: ContextModule.ordersShipping,
        context_page_owner_type: "orders-shipping",
      } as ClickedShippingAddress)
  )

  const selectSavedAddressWithTracking = (value: string) => {
    selectSavedAddress(value)
  }

  useEffect(() => {
    if (
      isArtaShipping() &&
      selectedAddressID &&
      !shippingQuotes &&
      !shippingQuoteId
    ) {
      selectShipping()
    }
  }, [selectedAddressID, shippingQuotes, shippingQuoteId])

  const selectSavedAddress = (value: string) => {
    if (selectedAddressID !== value) {
      setSelectedAddressID(value)
      setShippingQuotes(null)
      setShippingQuoteId(undefined)
    }
  }

  const handleAddressEdit = (
    address: UpdateUserAddressMutationResponse["updateUserAddress"]
  ) => {
    // reload shipping quotes if selected address edited
    if (selectedAddressID === address?.userAddressOrErrors?.internalID) {
      setShippingQuotes(null)
      setShippingQuoteId(undefined)
      // () => {
      //   if (isArtaShipping()) {
      //     selectShipping()
      //   }
      // }
    }
  }

  useEffect(() => {
    if (!shippingQuotes && !shippingQuoteId && isArtaShipping()) {
      selectShipping()
    }
  }, [shippingQuotes, shippingQuoteId])

  const handleAddressCreate = (
    address: CreateUserAddressMutationResponse["createUserAddress"]
  ) => {
    if (address?.userAddressOrErrors?.internalID) {
      selectSavedAddress(address.userAddressOrErrors.internalID)
    }
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

  useEffect(() => {
    if (isArtaShipping() && !isCreateNewAddress() && !shippingQuoteId) {
      selectShipping()
    }
  }, [shippingQuoteId, isArtaShipping, isCreateNewAddress])

  const { order, isCommittingMutation } = props
  // const {
  //   address,
  //   addressErrors,
  //   addressTouched,
  //   phoneNumber,
  //   phoneNumberError,
  //   phoneNumberTouched,
  //   shippingQuotes,
  //   shippingOption,
  //   shippingQuoteId,
  //   selectedAddressID,
  // } = state
  const artwork = getOrderArtwork()
  const addressList = getAddressList()

  const shippingSelected =
    !artwork?.pickup_available || shippingOption === "SHIP"

  const showAddressForm =
    shippingSelected && (isCreateNewAddress() || addressList?.length === 0)

  const showSavedAddresses =
    shippingSelected && addressList && addressList.length > 0
  const isAnArtaShipping = isArtaShipping()
  const isContinueButtonDisabled = isCommittingMutation
    ? false
    : isAnArtaShipping &&
      !!shippingQuotes &&
      shippingQuotes.length > 0 &&
      !shippingQuoteId

  return (
    <Box data-test="orderShipping">
      <OrderStepper
        currentStep="Shipping"
        steps={order.mode === "OFFER" ? offerFlowSteps : buyNowFlowSteps}
      />
      <TwoColumnLayout
        Content={
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
                  <Text variant="md" mb="1">
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
                        you within 2 business days to coordinate pickup.
                      </Text>
                    </Collapse>
                  </BorderedRadio>
                </RadioGroup>
                <Spacer mb={4} />
              </>
            )}

            <Collapse
              data-test="savedAddressesCollapse"
              open={!!showSavedAddresses}
            >
              <Text variant="md" mb="1">
                Delivery address
              </Text>
              {isAnArtaShipping &&
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
              {isAnArtaShipping &&
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
              <Spacer mb={2} />
              <PhoneNumberForm
                value={phoneNumber}
                errors={phoneNumberError}
                touched={phoneNumberTouched}
                onChange={onPhoneNumberChange}
                label="Required for shipping logistics"
              />
              <Checkbox
                onSelect={selected => setSaveAddressToggle(selected)}
                selected={saveAddressToggle}
                data-test="save-address-checkbox"
              >
                Save shipping address for later use
              </Checkbox>
              <Spacer mt={4} />
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
            </Collapse>

            <Collapse
              open={
                isAnArtaShipping &&
                !!shippingQuotes &&
                shippingQuotes.length > 0
              }
            >
              <Text variant="sm">Artsy Shipping options</Text>
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
              <Spacer mt={4} />
            </Collapse>

            <Media greaterThan="xs">
              <Button
                onClick={onContinueButtonPressed}
                loading={isCommittingMutation}
                disabled={isContinueButtonDisabled}
                variant="primaryBlack"
                width="100%"
              >
                Continue
              </Button>
            </Media>
          </Flex>
        }
        Sidebar={
          <Flex flexDirection="column" mt={[0, 4]}>
            <Flex flexDirection="column">
              <ArtworkSummaryItem order={order} />
              <TransactionDetailsSummaryItem order={order} />
            </Flex>
            <BuyerGuarantee
              contextModule={ContextModule.ordersShipping}
              contextPageOwnerType={OwnerType.ordersShipping}
            />
            <Spacer mb={[2, 4]} />
            <Media at="xs">
              <Button
                onClick={onContinueButtonPressed}
                loading={isCommittingMutation}
                disabled={isContinueButtonDisabled}
                variant="primaryBlack"
                width="100%"
              >
                Continue
              </Button>
            </Media>
          </Flex>
        }
      />
    </Box>
  )
}

export const ShippingFragmentContainer = createFragmentContainer(
  withSystemContext(injectCommitMutation(injectDialog(ShippingRoute))),
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
                artaShippingEnabled
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
