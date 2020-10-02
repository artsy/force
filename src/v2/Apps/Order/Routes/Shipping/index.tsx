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
} from "@artsy/palette"
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
import { pick } from "lodash"
import React, { Component } from "react"
import { RelayProp, createFragmentContainer, graphql } from "react-relay"
import { get } from "v2/Utils/get"
import createLogger from "v2/Utils/logger"
import { Media } from "v2/Utils/Responsive"

export interface ShippingProps {
  order: Shipping_order
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
}

const logger = createLogger("Order/Routes/Shipping/index.tsx")

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
    phoneNumber:
      this.props.order.requestedFulfillment &&
      (this.props.order.requestedFulfillment.__typename === "CommerceShip" ||
        this.props.order.requestedFulfillment.__typename === "CommercePickup")
        ? this.props.order.requestedFulfillment.phoneNumber
        : "",
    phoneNumberError: "",
    phoneNumberTouched: false,
  }

  get startingAddress() {
    return {
      ...emptyAddress,
      country: this.props.order.lineItems.edges[0].node.artwork.shippingCountry,

      // We need to pull out _only_ the values specified by the Address type,
      // since our state will be used for Relay variables later on. The
      // easiest way to do this is with the emptyAddress.
      ...pick(this.props.order.requestedFulfillment, Object.keys(emptyAddress)),
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
                      <BorderedRadio
                        value="SHIP"
                        label="Add shipping address"
                      />

                      <BorderedRadio
                        value="PICKUP"
                        label="Arrange for pickup (free)"
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
                  open={
                    !artwork.pickup_available ||
                    this.state.shippingOption === "SHIP"
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

                <Collapse open={this.state.shippingOption === "PICKUP"}>
                  <PhoneNumberForm
                    value={phoneNumber}
                    errors={phoneNumberError}
                    touched={phoneNumberTouched}
                    onChange={this.onPhoneNumberChange}
                    label="Number to contact you for pickup logistics"
                  />
                </Collapse>

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
  }
)
