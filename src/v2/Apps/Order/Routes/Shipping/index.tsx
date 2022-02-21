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
import { Shipping_order$data } from "v2/__generated__/Shipping_order.graphql"
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
import { Component } from "react"
import { RelayProp, createFragmentContainer, graphql } from "react-relay"
import createLogger from "v2/Utils/logger"
import { Media } from "v2/Utils/Responsive"
import { BuyerGuarantee } from "v2/Apps/Order/Components/BuyerGuarantee"
import { Shipping_me$data } from "v2/__generated__/Shipping_me.graphql"
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
import { CreateUserAddressMutation$data } from "v2/__generated__/CreateUserAddressMutation.graphql"
import { UpdateUserAddressMutation$data } from "v2/__generated__/UpdateUserAddressMutation.graphql"
import {
  ActionType,
  ClickedSelectShippingOption,
  ClickedShippingAddress,
  ContextModule,
  OwnerType,
} from "@artsy/cohesion"

export interface ShippingProps extends SystemContextProps {
  order: Shipping_order$data
  me: Shipping_me$data
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
@track()
export class ShippingRoute extends Component<ShippingProps, ShippingState> {
  state: ShippingState = {
    shippingOption: getShippingOption(
      this.props.order.requestedFulfillment?.__typename
    ),
    // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
    address: startingAddress(this.props.me, this.props.order),
    addressErrors: {},
    addressTouched: {},
    savedAddressID: undefined,
    phoneNumber: startingPhoneNumber(this.props.me, this.props.order),
    phoneNumberError: "",
    phoneNumberTouched: false,
    selectedAddressID: defaultShippingAddressIndex(
      this.props.me,
      this.props.order
    ),
    shippingQuotes: getShippingQuotes(this.props.order),
    shippingQuoteId: getSelectedShippingQuoteId(this.props.order),
    saveAddress: true,
  }

  get touchedAddress() {
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

  handleAddressDelete = (deletedAddressID: string) => {
    const addressList = this.getAddressList()

    if (!addressList || addressList.length === 0) {
      this.setState({
        selectedAddressID: NEW_ADDRESS,
        shippingQuotes: null,
        shippingQuoteId: undefined,
      })
    } else if (this.state.selectedAddressID == deletedAddressID) {
      this.selectSavedAddress(
        addressList.find(address => address?.node?.isDefault)?.node?.internalID!
      )
    }
  }

  componentDidMount() {
    if (
      this.isArtaShipping() &&
      !this.isCreateNewAddress() &&
      !this.state.shippingQuoteId
    ) {
      this.selectShipping()
    }
  }

  getAddressList = () => this.props.me.addressConnection?.edges

  getOrderArtwork = () => this.props.order.lineItems?.edges?.[0]?.node?.artwork

  isCreateNewAddress = () => this.state.selectedAddressID === NEW_ADDRESS

  isArtaShipping = () => {
    const addresses = this.getAddressList()
    const processWithArtaShipping = !!this.getOrderArtwork()
      ?.processWithArtaShipping

    const shippingCountry = this.isCreateNewAddress()
      ? this.state.address.country
      : addresses &&
        addresses.find(
          address => address?.node?.internalID == this.state.selectedAddressID
        )?.node?.country

    return (
      this.state.shippingOption === "SHIP" &&
      processWithArtaShipping &&
      shippingCountry === "US"
    )
  }

  onContinueButtonPressed = async () => {
    if (this.isArtaShipping() && !!this.state.shippingQuoteId) {
      this.selectShippingQuote()
    } else {
      this.selectShipping()
    }
  }

  selectShipping = async () => {
    const {
      address,
      shippingOption,
      phoneNumber,
      selectedAddressID,
    } = this.state

    if (shippingOption === "SHIP") {
      if (this.isCreateNewAddress()) {
        // validate when order is not pickup and the address is new
        const { errors, hasErrors } = validateAddress(address)
        const { error, hasError } = validatePhoneNumber(phoneNumber)
        if (hasErrors && hasError) {
          this.setState({
            addressErrors: errors!,
            addressTouched: this.touchedAddress,
            phoneNumberError: error!,
            phoneNumberTouched: true,
          })
          return
        } else if (hasErrors) {
          this.setState({
            addressErrors: errors!,
            addressTouched: this.touchedAddress,
          })
          return
        } else if (hasError) {
          this.setState({
            phoneNumberError: error!,
            phoneNumberTouched: true,
          })
          return
        }
      }
    } else {
      const { error, hasError } = validatePhoneNumber(phoneNumber)
      if (hasError) {
        this.setState({
          phoneNumberError: error!,
          phoneNumberTouched: true,
        })
        return
      }
    }

    try {
      // if not creating a new address, use the saved address selection for shipping
      const shipToAddress = this.isCreateNewAddress()
        ? address
        : convertShippingAddressForExchange(
            this.getAddressList()?.find(
              address => address?.node?.internalID == selectedAddressID
            )?.node!
          )
      const shipToPhoneNumber = this.isCreateNewAddress()
        ? phoneNumber
        : this.getAddressList()?.find(
            address => address?.node?.internalID == selectedAddressID
          )?.node?.phoneNumber

      this.setState({
        shippingQuotes: null,
        shippingQuoteId: undefined,
      })

      const isArtaShipping = this.isArtaShipping()

      const orderOrError = (
        await setShipping(this.props.commitMutation, {
          input: {
            id: this.props.order.internalID,
            fulfillmentType: isArtaShipping ? "SHIP_ARTA" : shippingOption,
            shipping: shipToAddress,
            phoneNumber: shipToPhoneNumber,
          },
        })
      ).commerceSetShipping?.orderOrError

      if (orderOrError?.error) {
        this.handleSubmitError(orderOrError.error)
        return
      }
      // save address when user is entering new address AND save checkbox is selected
      await this.saveAddress()

      if (isArtaShipping) {
        this.setState({
          shippingQuotes: getShippingQuotes(orderOrError?.order),
        })
      } else {
        this.props.router.push(`/orders/${this.props.order.internalID}/payment`)
      }
    } catch (error) {
      logger.error(error)
      this.props.dialog.showErrorDialog()
    }
  }

  selectShippingQuote = async () => {
    const { shippingQuoteId } = this.state
    const { order } = this.props

    if (shippingQuoteId && order.internalID) {
      try {
        const orderOrError = (
          await selectShippingOption(this.props.commitMutation, {
            input: {
              id: order.internalID,
              selectedShippingQuoteId: shippingQuoteId,
            },
          })
        ).commerceSelectShippingOption?.orderOrError

        await this.saveAddress()

        if (orderOrError?.error) {
          this.handleSubmitError(orderOrError.error)
          return
        }

        this.props.router.push(`/orders/${this.props.order.internalID}/payment`)
      } catch (error) {
        logger.error(error)
        this.props.dialog.showErrorDialog({
          message: this.getArtaErrorMessage(),
        })
      }
    }
  }

  saveAddress = async () => {
    const {
      address,
      phoneNumber,
      shippingOption,
      saveAddress,
      savedAddressID,
    } = this.state
    const { relayEnvironment } = this.props
    const isCreateNewAddress = this.isCreateNewAddress()

    if (saveAddress) {
      if (shippingOption === "SHIP" && isCreateNewAddress && relayEnvironment) {
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
              this.setState({
                savedAddressID:
                  data?.createUserAddress?.userAddressOrErrors.internalID,
              })
            }, // onSuccess
            () => {
              message => {
                logger.error(message)
              }
            }, // onError
            this.props.me, // me
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

  handleSubmitError(error: { code: string; data: string | null }) {
    logger.error(error)
    const parsedData = error.data ? JSON.parse(error.data) : {}
    if (
      error.code === "missing_region" ||
      error.code === "missing_country" ||
      error.code === "missing_postal_code"
    ) {
      this.props.dialog.showErrorDialog({
        title: "Invalid address",
        message:
          "There was an error processing your address. Please review and try again.",
      })
    } else if (
      error.code === "unsupported_shipping_location" &&
      parsedData.failure_code === "domestic_shipping_only"
    ) {
      this.props.dialog.showErrorDialog({
        title: "Can't ship to that address",
        message: "This work can only be shipped domestically.",
      })
    } else if (this.isArtaShipping() && this.state.shippingQuoteId) {
      this.props.dialog.showErrorDialog({
        message: this.getArtaErrorMessage(),
      })
    } else {
      this.props.dialog.showErrorDialog()
    }
  }

  getArtaErrorMessage = () => (
    <>
      There was a problem getting shipping quotes. <br />
      Please contact{" "}
      <RouterLink to={`mailto:orders@artsy.net`}>orders@artsy.net</RouterLink>.
    </>
  )

  onAddressChange: AddressChangeHandler = (address, key) => {
    const { errors } = validateAddress(address)
    this.setState({
      address,
      addressErrors: {
        ...this.state.addressErrors,
        ...errors,
      },
      addressTouched: {
        ...this.state.addressTouched,
        [key]: true,
      },
      shippingQuotes: null,
      shippingQuoteId: undefined,
    })
  }

  onPhoneNumberChange: PhoneNumberChangeHandler = phoneNumber => {
    const { error } = validatePhoneNumber(phoneNumber)
    this.setState({
      phoneNumber,
      phoneNumberError: error!,
      phoneNumberTouched: true,
      shippingQuotes: null,
      shippingQuoteId: undefined,
    })
  }

  @track((props, state, args) => ({
    action_type: Schema.ActionType.Click,
    subject:
      args[0] === "SHIP"
        ? Schema.Subject.BNMOProvideShipping
        : Schema.Subject.BNMOArrangePickup,
    flow: "buy now",
    type: "button",
  }))
  onSelectShippingOption(shippingOption: CommerceOrderFulfillmentTypeEnum) {
    if (this.state.shippingOption !== shippingOption) {
      this.setState(
        { shippingOption, shippingQuotes: null, shippingQuoteId: undefined },
        () => {
          const addressList = this.getAddressList()
          if (addressList && addressList.length > 0 && this.isArtaShipping()) {
            this.selectShipping()
          }
        }
      )
    }
  }

  @track(
    (_props, _state, args) =>
      ({
        action: ActionType.clickedSelectShippingOption,
        context_module: ContextModule.ordersShipping,
        context_page_owner_type: "orders-shipping",
        subject: args[0],
      } as ClickedSelectShippingOption)
  )
  handleShippingQuoteSelected(shippingQuoteId: string) {
    this.setState({ shippingQuoteId: shippingQuoteId })
  }

  @track(
    () =>
      ({
        action: ActionType.clickedShippingAddress,
        context_module: ContextModule.ordersShipping,
        context_page_owner_type: "orders-shipping",
      } as ClickedShippingAddress)
  )
  selectSavedAddressWithTracking(value: string) {
    this.selectSavedAddress(value)
  }

  selectSavedAddress = (value: string) => {
    if (this.state.selectedAddressID !== value) {
      this.setState(
        {
          selectedAddressID: value,
          shippingQuotes: null,
          shippingQuoteId: undefined,
        },
        () => {
          if (this.isArtaShipping()) {
            this.selectShipping()
          }
        }
      )
    }
  }

  handleAddressEdit = (
    address: UpdateUserAddressMutation$data["updateUserAddress"]
  ) => {
    // reload shipping quotes if selected address edited
    if (
      this.state.selectedAddressID === address?.userAddressOrErrors?.internalID
    ) {
      this.setState(
        {
          shippingQuotes: null,
          shippingQuoteId: undefined,
        },
        () => {
          if (this.isArtaShipping()) {
            this.selectShipping()
          }
        }
      )
    }
  }

  handleAddressCreate = (
    address: CreateUserAddressMutation$data["createUserAddress"]
  ) => {
    if (address?.userAddressOrErrors?.internalID) {
      this.selectSavedAddress(address.userAddressOrErrors.internalID)
    }
  }

  renderArtaErrorMessage() {
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

  render() {
    const { order, isCommittingMutation } = this.props
    const {
      address,
      addressErrors,
      addressTouched,
      phoneNumber,
      phoneNumberError,
      phoneNumberTouched,
      shippingQuotes,
      shippingOption,
      shippingQuoteId,
      selectedAddressID,
    } = this.state
    const artwork = this.getOrderArtwork()
    const addressList = this.getAddressList()

    const shippingSelected =
      !artwork?.pickup_available || shippingOption === "SHIP"

    const showAddressForm =
      shippingSelected &&
      (this.isCreateNewAddress() || addressList?.length === 0)

    const showSavedAddresses =
      shippingSelected && addressList && addressList.length > 0
    const isArtaShipping = this.isArtaShipping()
    const isContinueButtonDisabled = isCommittingMutation
      ? false
      : isArtaShipping &&
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
                    onSelect={this.onSelectShippingOption.bind(this)}
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
                          After your order is confirmed, a specialist will
                          contact you within 2 business days to coordinate
                          pickup.
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
                {isArtaShipping &&
                  shippingQuotes &&
                  shippingQuotes.length === 0 &&
                  this.renderArtaErrorMessage()}
                <SavedAddresses
                  me={this.props.me}
                  selectedAddress={selectedAddressID}
                  onSelect={this.selectSavedAddressWithTracking.bind(this)}
                  inCollectorProfile={false}
                  onAddressDelete={this.handleAddressDelete}
                  onAddressCreate={this.handleAddressCreate}
                  onAddressEdit={this.handleAddressEdit}
                />
              </Collapse>

              <Collapse data-test="addressFormCollapse" open={showAddressForm}>
                {isArtaShipping &&
                  shippingQuotes &&
                  shippingQuotes.length === 0 &&
                  this.renderArtaErrorMessage()}
                <AddressForm
                  value={address}
                  errors={addressErrors}
                  touched={addressTouched}
                  onChange={this.onAddressChange}
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
                  onChange={this.onPhoneNumberChange}
                  label="Required for shipping logistics"
                />
                <Checkbox
                  onSelect={selected =>
                    this.setState({ saveAddress: selected })
                  }
                  selected={this.state.saveAddress}
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
                  onChange={this.onPhoneNumberChange}
                  label="Number to contact you for pickup logistics"
                />
              </Collapse>

              <Collapse
                open={
                  isArtaShipping &&
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
                  onSelect={this.handleShippingQuoteSelected.bind(this)}
                />
                <Spacer mt={4} />
              </Collapse>

              <Media greaterThan="xs">
                <Button
                  onClick={this.onContinueButtonPressed}
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
                <TransactionDetailsSummaryItem
                  order={order}
                  transactionStep="shipping"
                />
              </Flex>
              <BuyerGuarantee
                contextModule={ContextModule.ordersShipping}
                contextPageOwnerType={OwnerType.ordersShipping}
              />
              <Spacer mb={[2, 4]} />
              <Media at="xs">
                <Button
                  onClick={this.onContinueButtonPressed}
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
                processWithArtaShipping
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
