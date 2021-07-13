import {
  BorderedRadio,
  Box,
  Button,
  Checkbox,
  Col,
  Collapse,
  Flex,
  RadioGroup,
  Row,
  Sans,
  Spacer,
  Text,
} from "@artsy/palette"
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
import React, { Component } from "react"
import { RelayProp, createFragmentContainer, graphql } from "react-relay"
import createLogger from "v2/Utils/logger"
import { Media } from "v2/Utils/Responsive"
import { BuyerGuarantee } from "../../Components/BuyerGuarantee"
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
} from "../../Utils/shippingUtils"
import {
  NEW_ADDRESS,
  SavedAddressesFragmentContainer as SavedAddresses,
} from "../../Components/SavedAddresses"
import { createUserAddress } from "../../Mutations/CreateUserAddress"
import { setShipping } from "../../Mutations/SetShipping"
import { SystemContextProps, withSystemContext } from "v2/System/SystemContext"
import { ShippingQuotesFragmentContainer } from "../../Components/ShippingQuotes"
import { compact } from "lodash"
import { selectShippingOption } from "../../Mutations/SelectShippingOption"

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
  addressErrors: AddressErrors
  addressTouched: AddressTouched
  selectedSavedAddress: string
  saveAddress: boolean
  shippingQuotes: ShippingQuotesType
  shippingQuoteId?: string
}

const logger = createLogger("Order/Routes/Shipping/index.tsx")
@track()
export class ShippingRoute extends Component<ShippingProps, ShippingState> {
  state: ShippingState = {
    shippingOption: getShippingOption(
      this.props.order.requestedFulfillment?.__typename
    ),
    // @ts-expect-error STRICT_NULL_CHECK
    address: startingAddress(this.props.me, this.props.order),
    addressErrors: {},
    addressTouched: {},
    // @ts-expect-error STRICT_NULL_CHECK
    phoneNumber: startingPhoneNumber(this.props.me, this.props.order),
    phoneNumberError: "",
    phoneNumberTouched: false,
    selectedSavedAddress: defaultShippingAddressIndex(
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

  handleAddressDelete = (isLast: boolean) => {
    if (isLast) {
      this.setState({ selectedSavedAddress: NEW_ADDRESS })
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

  // @ts-expect-error STRICT_NULL_CHECK
  getAddressList = () => this.props.me.addressConnection.edges

  getOrderArtwork = () => this.props.order.lineItems?.edges?.[0]?.node?.artwork

  isCreateNewAddress = () => this.state.selectedSavedAddress === NEW_ADDRESS

  isArtaShipping = () => {
    const addresses = this.getAddressList()
    const artaShippingEnabled = !!this.getOrderArtwork()?.artaShippingEnabled

    const shippingCountry = this.isCreateNewAddress()
      ? this.state.address.country
      : addresses &&
        addresses[parseInt(this.state.selectedSavedAddress)]?.node?.country

    return (
      this.state.shippingOption === "SHIP" &&
      artaShippingEnabled &&
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
      selectedSavedAddress,
    } = this.state

    if (shippingOption === "SHIP") {
      if (this.isCreateNewAddress()) {
        // validate when order is not pickup and the address is new
        const { errors, hasErrors } = validateAddress(address)
        const { error, hasError } = validatePhoneNumber(phoneNumber)
        if (hasErrors && hasError) {
          this.setState({
            // @ts-expect-error STRICT_NULL_CHECK
            addressErrors: errors,
            addressTouched: this.touchedAddress,
            phoneNumberError: error,
            phoneNumberTouched: true,
          })
          return
        } else if (hasErrors) {
          this.setState({
            // @ts-expect-error STRICT_NULL_CHECK
            addressErrors: errors,
            addressTouched: this.touchedAddress,
          })
          return
        } else if (hasError) {
          this.setState({
            phoneNumberError: error,
            phoneNumberTouched: true,
          })
          return
        }
      }
    } else {
      const { error, hasError } = validatePhoneNumber(phoneNumber)
      if (hasError) {
        this.setState({
          phoneNumberError: error,
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
            // @ts-expect-error STRICT_NULL_CHECK
            this.getAddressList()[parseInt(selectedSavedAddress)].node
          )
      const shipToPhoneNumber = this.isCreateNewAddress()
        ? phoneNumber
        : // @ts-expect-error STRICT_NULL_CHECK
          this.getAddressList()[parseInt(selectedSavedAddress)].node.phoneNumber

      this.setState({
        shippingQuotes: null,
        shippingQuoteId: undefined,
      })

      const isArtaShipping = this.isArtaShipping()

      // @ts-expect-error STRICT_NULL_CHECK
      const orderOrError = (
        await setShipping(this.props.commitMutation, {
          input: {
            id: this.props.order.internalID,
            fulfillmentType: isArtaShipping ? "SHIP_ARTA" : shippingOption,
            shipping: shipToAddress,
            phoneNumber: shipToPhoneNumber,
          },
        })
      ).commerceSetShipping.orderOrError

      // save address when user is entering new address AND save checkbox is selected
      await this.saveAddress()

      if (orderOrError.error) {
        this.handleSubmitError(orderOrError.error)
        return
      }

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
        this.props.dialog.showErrorDialog()
      }
    }
  }

  saveAddress = async () => {
    const { address, phoneNumber, shippingOption, saveAddress } = this.state
    const { relayEnvironment } = this.props
    const isCreateNewAddress = this.isCreateNewAddress()

    if (
      shippingOption === "SHIP" &&
      isCreateNewAddress &&
      saveAddress &&
      relayEnvironment
    ) {
      await createUserAddress(
        relayEnvironment,
        {
          ...address,
          phoneNumber: phoneNumber,
        }, // address
        () => {
          // TODO: refetch delivery addresses
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
    } else {
      this.props.dialog.showErrorDialog()
    }
  }

  onAddressChange: AddressChangeHandler = (address, key) => {
    const { errors } = validateAddress(address)
    this.setState({
      address,
      // @ts-expect-error STRICT_NULL_CHECK
      addressErrors: {
        ...this.state.addressErrors,
        ...errors,
      },
      addressTouched: {
        ...this.state.addressTouched,
        [key]: true,
      },
    })
  }

  onPhoneNumberChange: PhoneNumberChangeHandler = phoneNumber => {
    const { error } = validatePhoneNumber(phoneNumber)
    this.setState({
      phoneNumber,
      phoneNumberError: error,
      phoneNumberTouched: true,
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
      this.setState({ shippingOption }, () => {
        const addressList = this.getAddressList()
        if (addressList && addressList.length > 0 && this.isArtaShipping()) {
          this.selectShipping()
        }
      })
    }
  }

  handleShippingQuoteSelected = (shippingQuoteId: string) => {
    this.setState({ shippingQuoteId: shippingQuoteId })
  }

  onSelectSavedAddress = (value: string) => {
    if (this.state.selectedSavedAddress !== value) {
      this.setState({ selectedSavedAddress: value }, () => {
        if (this.isArtaShipping()) {
          this.selectShipping()
        }
      })
    }
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
      selectedSavedAddress,
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
      : isArtaShipping && !shippingQuoteId && !this.isCreateNewAddress()

    return (
      <Box data-test="orderShipping">
        <Row>
          <Col>
            <OrderStepper
              currentStep="Shipping"
              steps={order.mode === "OFFER" ? offerFlowSteps : buyNowFlowSteps}
            />
          </Col>
        </Row>
        <TwoColumnLayout
          Content={
            <Flex
              flexDirection="column"
              style={isCommittingMutation ? { pointerEvents: "none" } : {}}
            >
              {/* TODO: Make RadioGroup generic for the allowed values,
                  which could also ensure the children only use
                  allowed values. */}
              {/* @ts-expect-error STRICT_NULL_CHECK */}
              {artwork.pickup_available && (
                <>
                  <RadioGroup
                    data-test="shipping-options"
                    onSelect={this.onSelectShippingOption.bind(this)}
                    defaultValue={shippingOption}
                  >
                    <Text variant="mediumText" mb="1">
                      Delivery method
                    </Text>
                    <BorderedRadio value="SHIP" label="Shipping" />

                    <BorderedRadio
                      value="PICKUP"
                      label="Arrange for pickup (free)"
                      data-test="pickupOption"
                    >
                      <Collapse open={shippingOption === "PICKUP"}>
                        <Sans size="2" color="black60">
                          After your order is confirmed, a specialist will
                          contact you within 2 business days to coordinate
                          pickup.
                        </Sans>
                      </Collapse>
                    </BorderedRadio>
                  </RadioGroup>
                  <Spacer mb={3} />
                </>
              )}
              {showSavedAddresses && (
                <>
                  <Text variant="mediumText" mb="1">
                    Delivery address
                  </Text>
                  <SavedAddresses
                    me={this.props.me}
                    selectedAddress={selectedSavedAddress}
                    onSelect={this.onSelectSavedAddress}
                    inCollectorProfile={false}
                    onAddressDelete={this.handleAddressDelete}
                  />
                </>
              )}

              <Collapse data-test="addressFormCollapse" open={showAddressForm}>
                {/* @ts-expect-error STRICT_NULL_CHECK */}
                <AddressForm
                  value={address}
                  errors={addressErrors}
                  touched={addressTouched}
                  onChange={this.onAddressChange}
                  // @ts-expect-error STRICT_NULL_CHECK
                  domesticOnly={artwork.onlyShipsDomestically}
                  // @ts-expect-error STRICT_NULL_CHECK
                  euOrigin={artwork.euShippingOrigin}
                  // @ts-expect-error STRICT_NULL_CHECK
                  shippingCountry={artwork.shippingCountry}
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
                <Spacer mt={3} />
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

              <Collapse open={isArtaShipping && !!shippingQuotes}>
                <Text variant="mediumText" mb="1">
                  Shipping options
                </Text>

                <ShippingQuotesFragmentContainer
                  mb={3}
                  selectedShippingQuoteId={shippingQuoteId}
                  shippingQuotes={compact(shippingQuotes)}
                  onSelect={this.handleShippingQuoteSelected}
                />
              </Collapse>

              <Media greaterThan="xs">
                <Button
                  onClick={this.onContinueButtonPressed}
                  loading={isCommittingMutation}
                  disabled={isContinueButtonDisabled}
                  size="large"
                  width="100%"
                >
                  Continue
                </Button>
              </Media>
            </Flex>
          }
          Sidebar={
            <Flex flexDirection="column" mt={[0, 3]}>
              <Flex flexDirection="column">
                <ArtworkSummaryItem order={order} />
                <TransactionDetailsSummaryItem order={order} />
              </Flex>
              <BuyerGuarantee />
              <Spacer mb={[2, 3]} />
              <Media at="xs">
                <Button
                  onClick={this.onContinueButtonPressed}
                  loading={isCommittingMutation}
                  disabled={isContinueButtonDisabled}
                  size="large"
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
