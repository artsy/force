import {
  BorderedRadio,
  Box,
  Button,
  Col,
  Collapse,
  Flex,
  RadioGroup,
  Row,
  Sans,
  Spacer,
  Text,
} from "@artsy/palette"
import styled from "styled-components"
import { Shipping_order } from "v2/__generated__/Shipping_order.graphql"
import {
  CommerceOrderFulfillmentTypeEnum,
  ShippingOrderAddressUpdateMutation,
} from "v2/__generated__/ShippingOrderAddressUpdateMutation.graphql"
import { HorizontalPadding } from "v2/Apps/Components/HorizontalPadding"
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
import { validatePresence } from "v2/Apps/Order/Utils/formValidators"
import { track } from "v2/Artsy/Analytics"
import * as Schema from "v2/Artsy/Analytics/Schema"
import {
  Address,
  AddressChangeHandler,
  AddressErrors,
  AddressForm,
  AddressTouched,
  emptyAddress,
} from "v2/Components/AddressForm"
import { Router } from "found"
import { pick, omit } from "lodash"
import React, { Component } from "react"
import { RelayProp, createFragmentContainer, graphql } from "react-relay"
import { get } from "v2/Utils/get"
import createLogger from "v2/Utils/logger"
import { Media } from "v2/Utils/Responsive"
import { BuyerGuarantee } from "../../Components/BuyerGuarantee"
import { Shipping_me } from "v2/__generated__/Shipping_me.graphql"

export interface ShippingProps {
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
  showEditModal: boolean
}

const logger = createLogger("Order/Routes/Shipping/index.tsx")

const EditButton = styled(Text)`
  &:hover {
    text-decoration: underline;
  }
`

@track()
export class ShippingRoute extends Component<ShippingProps, ShippingState> {
  state: ShippingState = {
    shippingOption: (this.props.order.requestedFulfillment &&
    this.props.order.requestedFulfillment.__typename !== "CommerceShip"
      ? "PICKUP"
      : "SHIP") as CommerceOrderFulfillmentTypeEnum,
    address: this.startingAddress,
    addressErrors: {},
    addressTouched: {},
    phoneNumber: this.startingPhoneNumber,
    phoneNumberError: "",
    phoneNumberTouched: false,
    showEditModal: false,
  }

  get startingPhoneNumber() {
    const defaultSavedPhoneNumber = this.defaultAddress?.phoneNumber
    if (defaultSavedPhoneNumber) {
      return defaultSavedPhoneNumber
    } else {
      return this.props.order.requestedFulfillment &&
        (this.props.order.requestedFulfillment.__typename === "CommerceShip" ||
          this.props.order.requestedFulfillment.__typename === "CommercePickup")
        ? this.props.order.requestedFulfillment.phoneNumber
        : ""
    }
  }

  get startingAddress() {
    const defaultSavedAddress = this.defaultAddress
    if (defaultSavedAddress) {
      const startingAddress = this.convertShippingAddressForExchange(
        defaultSavedAddress
      )
      return startingAddress
    } else {
      const initialAddress = {
        ...emptyAddress,
        country: this.props.order.lineItems.edges[0].node.artwork
          .shippingCountry,

        // We need to pull out _only_ the values specified by the Address type,
        // since our state will be used for Relay variables later on. The
        // easiest way to do this is with the emptyAddress.
        ...pick(
          this.props.order.requestedFulfillment,
          Object.keys(emptyAddress)
        ),
      }
      return initialAddress
    }
  }

  get defaultAddress() {
    const addressList = this.props.me.addressConnection.edges
    if (addressList.length > 0) {
      const defaultAddress =
        addressList.find(address => address.node.isDefault)?.node ||
        addressList[0].node
      return defaultAddress
    } else {
      return null
    }
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

  // Gravity address has isDefault and addressLine3 but exchange does not
  convertShippingAddressForExchange(address) {
    return omit(address, ["isDefault", "addressLine3"])
  }

  setShipping(variables: ShippingOrderAddressUpdateMutation["variables"]) {
    return this.props.commitMutation<ShippingOrderAddressUpdateMutation>({
      variables,
      // TODO: Inputs to the mutation might have changed case of the keys!
      mutation: graphql`
        mutation ShippingOrderAddressUpdateMutation(
          $input: CommerceSetShippingInput!
        ) {
          commerceSetShipping(input: $input) {
            orderOrError {
              ... on CommerceOrderWithMutationSuccess {
                __typename
                order {
                  internalID
                  state
                  requestedFulfillment {
                    __typename
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
                  }
                }
              }
              ... on CommerceOrderWithMutationFailure {
                error {
                  type
                  code
                  data
                }
              }
            }
          }
        }
      `,
    })
  }

  onContinueButtonPressed = async () => {
    const { address, shippingOption, phoneNumber } = this.state

    if (shippingOption === "SHIP") {
      const { errors, hasErrors } = this.validateAddress(this.state.address)
      const { error, hasError } = this.validatePhoneNumber(
        this.state.phoneNumber
      )
      if (hasErrors && hasError) {
        this.setState({
          addressErrors: errors,
          addressTouched: this.touchedAddress,
          phoneNumberError: error,
          phoneNumberTouched: true,
        })
        return
      } else if (hasErrors) {
        this.setState({
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
    } else {
      const { error, hasError } = this.validatePhoneNumber(
        this.state.phoneNumber
      )
      if (hasError) {
        this.setState({
          phoneNumberError: error,
          phoneNumberTouched: true,
        })
        return
      }
    }

    try {
      const orderOrError = (
        await this.setShipping({
          input: {
            id: this.props.order.internalID,
            fulfillmentType: shippingOption,
            shipping: address,
            phoneNumber,
          },
        })
      ).commerceSetShipping.orderOrError

      if (orderOrError.error) {
        this.handleSubmitError(orderOrError.error)
        return
      }

      this.props.router.push(`/orders/${this.props.order.internalID}/payment`)
    } catch (error) {
      logger.error(error)
      this.props.dialog.showErrorDialog()
    }
  }

  handleSubmitError(error: { code: string; data: string }) {
    logger.error(error)
    const parsedData = get(error, e => JSON.parse(e.data), {})
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

  handleClickEdit = () => {
    // Open edit modal
  }

  private validateAddress(address: Address) {
    const { name, addressLine1, city, region, country, postalCode } = address
    const usOrCanada = country === "US" || country === "CA"
    const errors = {
      name: validatePresence(name),
      addressLine1: validatePresence(addressLine1),
      city: validatePresence(city),
      region: usOrCanada && validatePresence(region),
      country: validatePresence(country),
      postalCode: usOrCanada && validatePresence(postalCode),
    }
    const hasErrors = Object.keys(errors).filter(key => errors[key]).length > 0

    return {
      errors,
      hasErrors,
    }
  }

  private validatePhoneNumber(phoneNumber: string) {
    const error = validatePresence(phoneNumber)
    const hasError = error !== null

    return {
      error,
      hasError,
    }
  }

  onAddressChange: AddressChangeHandler = (address, key) => {
    const { errors } = this.validateAddress(address)
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
    })
  }

  onPhoneNumberChange: PhoneNumberChangeHandler = phoneNumber => {
    const { error } = this.validatePhoneNumber(phoneNumber)
    this.setState({
      phoneNumber,
      phoneNumberError: error,
      phoneNumberTouched: true,
    })
  }

  renderAddressList = addressList => {
    return addressList.map((address, index) =>
      this.formatAddressBox(address.node, index)
    )
  }

  formatAddressBox = (address, index: number) => {
    const {
      addressLine1,
      addressLine2,
      addressLine3,
      city,
      country,
      name,
      phoneNumber,
      postalCode,
      region,
    } = address

    const formattedAddressLine = [city, region, country, postalCode]
      .filter(el => el)
      .join(", ")
    return (
      <BorderedRadio
        value={`${index}`}
        key={index}
        position="relative"
        data-test="savedAddress"
      >
        <Flex width="100%">
          <Flex flexDirection="column">
            {[name, addressLine1, addressLine2, addressLine3].map(
              (line, index) =>
                line && (
                  <Text
                    style={{ textTransform: "capitalize" }}
                    variant="text"
                    key={index}
                  >
                    {line}
                  </Text>
                )
            )}
            <Text textColor="black60" style={{ textTransform: "capitalize" }}>
              {formattedAddressLine}
            </Text>
            <Text textColor="black60">{phoneNumber}</Text>
          </Flex>
          <EditButton
            position="absolute"
            top={"20px"}
            right={"20px"}
            onClick={() => this.handleClickEdit.bind(this)}
            textColor="blue100"
            size="2"
          >
            Edit
          </EditButton>
        </Flex>
      </BorderedRadio>
    )
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
    this.setState({ shippingOption })
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
    } = this.state
    const artwork = get(
      this.props,
      props => props.order.lineItems.edges[0].node.artwork
    )
    const addressList = this.props.me.addressConnection.edges

    const defaultAddressIndex = () => {
      const indexOfDefaultAddress = addressList.findIndex(
        address => address.node.isDefault
      )
      return `${indexOfDefaultAddress > -1 ? indexOfDefaultAddress : 0}`
    }

    const onSelectAddressOption = value => {
      if (value == "NEW_ADDRESS") {
        // opens address form
        // this.setState({ openAddressForm: true })
      } else {
        const selectedAddress = this.convertShippingAddressForExchange(
          addressList[parseInt(value)].node
        )
        this.setState({ address: selectedAddress })
        this.setState({ phoneNumber: selectedAddress.phoneNumber })
      }
    }

    return (
      <Box data-test="orderShipping">
        <HorizontalPadding px={[0, 4]}>
          <Row>
            <Col>
              <OrderStepper
                currentStep="Shipping"
                steps={
                  order.mode === "OFFER" ? offerFlowSteps : buyNowFlowSteps
                }
              />
            </Col>
          </Row>
        </HorizontalPadding>

        <HorizontalPadding>
          <TwoColumnLayout
            Content={
              <Flex
                flexDirection="column"
                style={isCommittingMutation ? { pointerEvents: "none" } : {}}
              >
                {/* TODO: Make RadioGroup generic for the allowed values,
                  which could also ensure the children only use
                  allowed values. */}
                {artwork.pickup_available && (
                  <>
                    <RadioGroup
                      onSelect={this.onSelectShippingOption.bind(this)}
                      defaultValue={this.state.shippingOption}
                    >
                      <Text variant="mediumText" mb="1">
                        Delivery Method
                      </Text>
                      <BorderedRadio value="SHIP" label="Shipping" />

                      <BorderedRadio
                        value="PICKUP"
                        label="Arrange for pickup (free)"
                        data-test="pickupOption"
                      >
                        <Collapse open={this.state.shippingOption === "PICKUP"}>
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
                <Collapse
                  data-test="addressFormCollapse"
                  open={
                    !artwork.pickup_available ||
                    (this.state.shippingOption === "SHIP" &&
                      !addressList.length)
                  }
                >
                  <AddressForm
                    value={address}
                    errors={addressErrors}
                    touched={addressTouched}
                    onChange={this.onAddressChange}
                    domesticOnly={artwork.onlyShipsDomestically}
                    euOrigin={artwork.euShippingOrigin}
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
                </Collapse>

                <Collapse
                  data-test="phoneNumberCollapse"
                  open={this.state.shippingOption === "PICKUP"}
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
                {addressList.length > 0 && (
                  <>
                    <RadioGroup
                      onSelect={onSelectAddressOption.bind(this)}
                      defaultValue={defaultAddressIndex()}
                    >
                      {this.renderAddressList(addressList)}
                      <BorderedRadio value={"NEW_ADDRESS"}>
                        <Text variant="text">Add a new shipping address</Text>
                      </BorderedRadio>
                    </RadioGroup>
                    <Spacer p="2" />
                  </>
                )}
                <Media greaterThan="xs">
                  <Button
                    onClick={this.onContinueButtonPressed}
                    loading={isCommittingMutation}
                    size="large"
                    width="100%"
                  >
                    Continue
                  </Button>
                </Media>
              </Flex>
            }
            Sidebar={
              <Flex flexDirection="column">
                <Flex flexDirection="column">
                  <ArtworkSummaryItem order={order} />
                  <TransactionDetailsSummaryItem order={order} />
                </Flex>
                <BuyerGuarantee />
                <Spacer mb={[2, 3]} />
                <Media at="xs">
                  <Spacer mb={3} />
                  <Button
                    onClick={this.onContinueButtonPressed}
                    loading={isCommittingMutation}
                    size="large"
                    width="100%"
                  >
                    Continue
                  </Button>
                </Media>
              </Flex>
            }
          />
        </HorizontalPadding>
      </Box>
    )
  }
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
        }
        lineItems {
          edges {
            node {
              artwork {
                slug
                pickup_available: pickupAvailable
                onlyShipsDomestically
                euShippingOrigin
                shippingCountry
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
        addressConnection(
          first: $first
          last: $last
          before: $before
          after: $after
        ) {
          edges {
            node {
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
