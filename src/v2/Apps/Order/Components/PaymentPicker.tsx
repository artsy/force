import { PaymentPicker_me } from "v2/__generated__/PaymentPicker_me.graphql"
import { PaymentPicker_order } from "v2/__generated__/PaymentPicker_order.graphql"
import { PaymentPickerCreateCreditCardMutation } from "v2/__generated__/PaymentPickerCreateCreditCardMutation.graphql"
import {
  Address,
  AddressChangeHandler,
  AddressErrors,
  AddressForm,
  AddressTouched,
  emptyAddress,
} from "v2/Components/AddressForm"

import { CreditCardInput } from "v2/Apps/Order/Components/CreditCardInput"
import { validateAddress } from "v2/Apps/Order/Utils/formValidators"
import { track } from "v2/Artsy/Analytics"
import * as Schema from "v2/Artsy/Analytics/Schema"
import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { ReactStripeElements, injectStripe } from "react-stripe-elements"

import {
  BorderedRadio,
  Checkbox,
  Collapse,
  Flex,
  Link,
  RadioGroup,
  Sans,
  Serif,
  Spacer,
} from "@artsy/palette"
import { CommitMutation } from "v2/Apps/Order/Utils/commitMutation"
import { CreditCardDetails } from "./CreditCardDetails"
import {
  SystemContextConsumer,
  SystemContextProps,
} from "v2/Artsy/SystemContext"

export interface PaymentPickerProps
  extends ReactStripeElements.InjectedStripeProps {
  order: PaymentPicker_order
  me: PaymentPicker_me
  commitMutation: CommitMutation
  innerRef: React.RefObject<PaymentPicker>
}

interface PaymentPickerState {
  hideBillingAddress: boolean
  address: Address
  addressErrors: AddressErrors
  addressTouched: AddressTouched
  stripeError: stripe.Error
  isCreatingStripeToken: boolean
  creditCardSelection: { type: "existing"; id: string } | { type: "new" }
  saveNewCreditCard: boolean
}

export class PaymentPicker extends React.Component<
  PaymentPickerProps & SystemContextProps,
  PaymentPickerState
> {
  state = {
    address: this.startingAddress(),
    addressErrors: {},
    addressTouched: {},
    creditCardSelection: this.getInitialCreditCardSelection(),
    hideBillingAddress: true,
    isCreatingStripeToken: false,
    saveNewCreditCard: true,
    stripeError: null,
  }

  private getInitialCreditCardSelection(): PaymentPickerState["creditCardSelection"] {
    if (this.props.order.creditCard) {
      return {
        id: this.props.order.creditCard.internalID,
        type: "existing",
      }
    } else {
      return this.props.me.creditCards.edges.length
        ? {
            id: this.props.me.creditCards.edges[0].node.internalID,
            type: "existing",
          }
        : { type: "new" }
    }
  }

  private startingAddress(): Address {
    return {
      ...emptyAddress,
      country: "US",
    }
  }

  private get touchedAddress() {
    return {
      addressLine1: true,
      addressLine2: true,
      city: true,
      country: true,
      name: true,
      phoneNumber: true,
      postalCode: true,
      region: true,
    }
  }

  private createStripeToken = async () => {
    try {
      this.setState({ isCreatingStripeToken: true })
      const stripeBillingAddress = this.getStripeBillingAddress()
      return await this.props.stripe.createToken(stripeBillingAddress)
    } finally {
      this.setState({ isCreatingStripeToken: false })
    }
  }

  getCreditCardId: () => Promise<
    | { type: "error"; error: string | undefined }
    | { type: "internal_error"; error: string | undefined }
    | { type: "invalid_form" }
    | { type: "success"; creditCardId: string }
  > = async () => {
    const { creditCardSelection, saveNewCreditCard } = this.state
    if (creditCardSelection.type === "existing") {
      return { creditCardId: creditCardSelection.id, type: "success" }
    }

    if (this.needsAddress()) {
      const { errors, hasErrors } = validateAddress(this.state.address)
      if (hasErrors) {
        this.setState({
          addressErrors: errors,
          addressTouched: this.touchedAddress,
        })
        return { type: "invalid_form" }
      }
    }

    const stripeResult = await this.createStripeToken()
    if (stripeResult.error) {
      this.setState({
        stripeError: stripeResult.error,
      })
      return { type: "invalid_form" }
    }

    const creditCardOrError = (
      await this.createCreditCard({
        input: {
          oneTimeUse: !saveNewCreditCard,
          token: stripeResult.token.id,
        },
      })
    ).createCreditCard.creditCardOrError

    if (
      creditCardOrError.mutationError &&
      creditCardOrError.mutationError.detail
    ) {
      return {
        error: creditCardOrError.mutationError.detail,
        type: "error",
      }
    } else if (
      creditCardOrError.mutationError &&
      creditCardOrError.mutationError.message
    ) {
      return {
        error: creditCardOrError.mutationError.message,
        type: "internal_error",
      }
    } else
      return {
        creditCardId: creditCardOrError.creditCard.internalID,
        type: "success",
      }
  }

  @track((props: PaymentPickerProps, state, args) => {
    const showBillingAddress = !args[0]
    if (showBillingAddress && props.order.state === "PENDING") {
      return {
        action_type: Schema.ActionType.Click,
        flow: "buy now",
        subject: Schema.Subject.BNMOUseShippingAddress,
        type: "checkbox",
      }
    }
  })
  private handleChangeHideBillingAddress(hideBillingAddress: boolean) {
    if (!hideBillingAddress) {
      this.setState({
        address: {
          ...emptyAddress,
          country: "US",
        },
      })
    }

    this.setState({ hideBillingAddress })
  }

  private onAddressChange: AddressChangeHandler = (address, key) => {
    const { errors } = validateAddress(address)
    this.setState({
      address,
      addressErrors: {
        ...this.state.addressErrors,
        [key]: errors[key],
      },
      addressTouched: {
        ...this.state.addressTouched,
        [key]: true,
      },
    })
  }

  render() {
    const {
      stripeError,
      address,
      addressErrors,
      addressTouched,
      creditCardSelection,
    } = this.state
    const {
      me: { creditCards },
      isEigen,
    } = this.props

    const orderCard = this.props.order.creditCard

    const creditCardsArray = creditCards.edges.map(e => e.node)

    // only add the unsaved card to the cards array if it exists and is not already there
    if (
      orderCard != null &&
      !creditCardsArray.some(card => card.internalID === orderCard.internalID)
    ) {
      creditCardsArray.unshift(orderCard)
    }

    const userHasExistingCards = creditCardsArray.length > 0

    return (
      <>
        {userHasExistingCards && (
          <>
            <RadioGroup
              onSelect={val => {
                if (val === "new") {
                  this.setState({ creditCardSelection: { type: "new" } })
                } else {
                  this.setState({
                    creditCardSelection: { id: val, type: "existing" },
                  })
                }
              }}
              defaultValue={
                creditCardSelection.type === "new"
                  ? "new"
                  : creditCardSelection.id
              }
            >
              {creditCardsArray
                .map(e => {
                  const { internalID, ...creditCardProps } = e
                  return (
                    <BorderedRadio value={internalID} key={internalID}>
                      <CreditCardDetails
                        responsive={false}
                        {...creditCardProps}
                      />
                    </BorderedRadio>
                  )
                })
                .concat([
                  <BorderedRadio
                    data-test="AddNewCard"
                    value="new"
                    key="new"
                    selected={creditCardSelection.type === "new"}
                  >
                    Add another card.
                  </BorderedRadio>,
                ])}
            </RadioGroup>
            <Spacer mb={1} />
            {!isEigen && (
              <Sans size="2">
                <Link href="/user/payments" target="_blank">
                  Manage cards
                </Link>
              </Sans>
            )}
          </>
        )}

        <Collapse open={this.state.creditCardSelection.type === "new"}>
          {userHasExistingCards && <Spacer mb={3} />}
          <Flex flexDirection="column">
            <Serif mb={1} size="3t" color="black100" lineHeight="1.1em">
              Credit card
            </Serif>
            <CreditCardInput
              error={stripeError}
              onChange={response => {
                this.setState({ stripeError: response.error })
              }}
            />

            {!this.isPickup() && (
              <>
                <Spacer mb={2} />
                <Checkbox
                  selected={this.state.hideBillingAddress}
                  onSelect={this.handleChangeHideBillingAddress.bind(this)}
                  data-test="BillingAndShippingAreTheSame"
                >
                  Billing and shipping addresses are the same.
                </Checkbox>
              </>
            )}
            <Collapse open={this.needsAddress()}>
              <Spacer mb={2} />
              <AddressForm
                value={address}
                errors={addressErrors}
                touched={addressTouched}
                onChange={this.onAddressChange}
                billing
              />
              <Spacer mb={2} />
            </Collapse>
            <Checkbox
              data-test="SaveNewCreditCard"
              selected={this.state.saveNewCreditCard}
              onSelect={() =>
                this.setState({
                  saveNewCreditCard: !this.state.saveNewCreditCard,
                })
              }
            >
              Save credit card for later use.
            </Checkbox>
          </Flex>
        </Collapse>
      </>
    )
  }

  private getStripeBillingAddress(): stripe.TokenOptions {
    const selectedBillingAddress = (this.needsAddress()
      ? this.state.address
      : this.props.order.requestedFulfillment) as Address
    const {
      name,
      addressLine1,
      addressLine2,
      city,
      region,
      postalCode,
      country,
    } = selectedBillingAddress
    return {
      address_city: city,
      address_country: country,
      address_line1: addressLine1,
      address_line2: addressLine2,
      address_state: region,
      address_zip: postalCode,
      name,
    }
  }

  private createCreditCard(
    variables: PaymentPickerCreateCreditCardMutation["variables"]
  ) {
    return this.props.commitMutation<PaymentPickerCreateCreditCardMutation>({
      mutation: graphql`
        mutation PaymentPickerCreateCreditCardMutation(
          $input: CreditCardInput!
        ) {
          createCreditCard(input: $input) {
            creditCardOrError {
              ... on CreditCardMutationSuccess {
                creditCard {
                  internalID
                  name
                  street1
                  street2
                  city
                  state
                  country
                  postalCode
                  expirationMonth
                  expirationYear
                  lastDigits
                  brand
                }
              }
              ... on CreditCardMutationFailure {
                mutationError {
                  type
                  message
                  detail
                }
              }
            }
          }
        }
      `,
      variables,
    })
  }

  private isPickup = () => {
    return this.props.order.requestedFulfillment.__typename === "CommercePickup"
  }

  private needsAddress = () => {
    return this.isPickup() || !this.state.hideBillingAddress
  }
}

// Our mess of HOC wrappers is not amenable to ref forwarding, so to expose a
// ref to the PaymentPicker instance (for getCreditCardId) we'll add an
// `innerRef` prop which gets sneakily injected here
const PaymentPickerWithInnerRef: React.SFC<
  PaymentPickerProps & {
    innerRef: React.RefObject<PaymentPicker>
  }
> = ({ innerRef, ...props }) => (
  <SystemContextConsumer>
    {({ isEigen }) => {
      return (
        <PaymentPicker ref={innerRef} isEigen={isEigen} {...(props as any)} />
      )
    }}
  </SystemContextConsumer>
)

export const PaymentPickerFragmentContainer = createFragmentContainer(
  // 😭 HOCs
  injectStripe(
    track()(PaymentPickerWithInnerRef) as typeof PaymentPickerWithInnerRef
  ),
  {
    me: graphql`
      fragment PaymentPicker_me on Me {
        creditCards(first: 100) {
          edges {
            node {
              internalID
              brand
              lastDigits
              expirationMonth
              expirationYear
            }
          }
        }
      }
    `,
    order: graphql`
      fragment PaymentPicker_order on CommerceOrder {
        internalID
        mode
        state
        creditCard {
          internalID
          name
          street1
          street2
          city
          state
          country
          postalCode
          expirationMonth
          expirationYear
          lastDigits
          brand
        }
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
          }
          ... on CommercePickup {
            fulfillmentType
          }
        }
        lineItems {
          edges {
            node {
              artwork {
                slug
              }
            }
          }
        }
      }
    `,
  }
)
