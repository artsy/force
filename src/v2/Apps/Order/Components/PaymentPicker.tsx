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
import { track } from "v2/System/Analytics"
import * as Schema from "v2/System/Analytics/Schema"
import * as React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import type {
  StripeError,
  CreateTokenCardData,
  StripeElements,
  Stripe,
} from "@stripe/stripe-js"
import { CardElement } from "@stripe/react-stripe-js"

import {
  BorderedRadio,
  Checkbox,
  Collapse,
  Flex,
  Link,
  RadioGroup,
  Text,
  Spacer,
} from "@artsy/palette"
import { CommitMutation } from "v2/Apps/Order/Utils/commitMutation"
import { CreditCardDetails } from "./CreditCardDetails"
import {
  SystemContextConsumer,
  SystemContextProps,
} from "v2/System/SystemContext"
import { createStripeWrapper } from "v2/Utils/createStripeWrapper"
import { isNull, mergeWith } from "lodash"

export interface StripeProps {
  stripe: Stripe
  elements: StripeElements
}

export interface PaymentPickerProps {
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
  stripeError: StripeError
  isCreatingStripeToken: boolean
  creditCardSelection: { type: "existing"; id: string } | { type: "new" }
  saveNewCreditCard: boolean
}

export class PaymentPicker extends React.Component<
  PaymentPickerProps & SystemContextProps & StripeProps,
  PaymentPickerState
> {
  // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
  state = {
    hideBillingAddress: true,
    stripeError: null,
    isCreatingStripeToken: false,
    address: this.startingAddress(),
    addressErrors: {},
    addressTouched: {},
    creditCardSelection: this.getInitialCreditCardSelection(),
    saveNewCreditCard: true,
  }

  private getInitialCreditCardSelection(): PaymentPickerState["creditCardSelection"] {
    if (this.props.order.creditCard) {
      return {
        type: "existing",
        id: this.props.order.creditCard.internalID,
      }
    } else {
      return this.props.me.creditCards?.edges?.length
        ? {
            type: "existing",
            id: this.props.me.creditCards.edges[0]?.node?.internalID!,
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

  private createStripeToken = async () => {
    try {
      this.setState({ isCreatingStripeToken: true })
      const stripeBillingAddress = this.getStripeBillingAddress()
      const element = this.props.elements.getElement(CardElement)!
      return await this.props.stripe.createToken(element, stripeBillingAddress)
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
      return { type: "success", creditCardId: creditCardSelection.id }
    }

    if (this.needsAddress()) {
      const { errors, hasErrors } = validateAddress(this.state.address)
      if (hasErrors) {
        this.setState({
          // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
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
          token: stripeResult?.token?.id!,
          oneTimeUse: !saveNewCreditCard,
        },
      })
    ).createCreditCard?.creditCardOrError

    if (
      creditCardOrError?.mutationError &&
      creditCardOrError.mutationError.detail
    ) {
      return {
        type: "error",
        error: creditCardOrError.mutationError.detail,
      }
    } else if (
      creditCardOrError?.mutationError &&
      creditCardOrError.mutationError.message
    ) {
      return {
        type: "internal_error",
        error: creditCardOrError.mutationError.message,
      }
    } else
      return {
        type: "success",
        creditCardId: creditCardOrError?.creditCard?.internalID!,
      }
  }

  // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
  @track((props: PaymentPickerProps, state, args) => {
    const showBillingAddress = !args[0]
    if (showBillingAddress && props.order.state === "PENDING") {
      return {
        action_type: Schema.ActionType.Click,
        subject: Schema.Subject.BNMOUseShippingAddress,
        flow: "buy now",
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
      hideBillingAddress,
    } = this.state
    const {
      me: { creditCards },
      isEigen,
    } = this.props

    const orderCard = this.props.order.creditCard

    const creditCardsArray = creditCards?.edges?.map(e => e?.node)!

    // only add the unsaved card to the cards array if it exists and is not already there
    if (
      orderCard != null &&
      !creditCardsArray.some(card => card?.internalID === orderCard.internalID)
    ) {
      creditCardsArray.unshift(orderCard)
    }

    const userHasExistingCards = creditCardsArray.length > 0

    return (
      <>
        {userHasExistingCards && (
          <>
            <RadioGroup
              data-test="credit-cards"
              onSelect={val => {
                if (val === "new") {
                  this.setState({ creditCardSelection: { type: "new" } })
                } else {
                  this.setState({
                    creditCardSelection: { type: "existing", id: val },
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
                  // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
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
              <Text variant="xs">
                <Link href="/user/payments" target="_blank">
                  Manage cards
                </Link>
              </Text>
            )}
          </>
        )}

        <Collapse open={this.state.creditCardSelection.type === "new"}>
          {userHasExistingCards && <Spacer mb={2} />}
          <Flex flexDirection="column">
            <Text mb={1} size="md" color="black100" lineHeight="1.1em">
              Credit card
            </Text>
            <CreditCardInput
              error={stripeError!}
              onChange={response => {
                this.setState({ stripeError: response.error! })
              }}
            />

            {!this.isPickup() && (
              <>
                <Spacer mb={2} />
                <Checkbox
                  selected={hideBillingAddress}
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
                isCollapsed={hideBillingAddress}
                billing
              />
              <Spacer mb={2} />
            </Collapse>
            <Spacer mb={1} />
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

  private getStripeBillingAddress(): CreateTokenCardData {
    // replace null items in requestedFulfillment with empty string to keep stripe happy
    const shippingAddress = mergeWith(
      {},
      emptyAddress,
      this.props.order.requestedFulfillment,
      (o, s) => (isNull(s) ? o : s)
    )
    const selectedBillingAddress = (this.needsAddress()
      ? this.state.address
      : shippingAddress) as Address
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
      name,
      address_line1: addressLine1,
      address_line2: addressLine2,
      address_city: city,
      address_state: region,
      address_zip: postalCode,
      address_country: country,
    }
  }

  private createCreditCard(
    variables: PaymentPickerCreateCreditCardMutation["variables"]
  ) {
    return this.props.commitMutation<PaymentPickerCreateCreditCardMutation>({
      variables,
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
    })
  }

  private isPickup = () => {
    return (
      this.props.order.requestedFulfillment?.__typename === "CommercePickup"
    )
  }

  private needsAddress = () => {
    return this.isPickup() || !this.state.hideBillingAddress
  }
}

// Our mess of HOC wrappers is not amenable to ref forwarding, so to expose a
// ref to the PaymentPicker instance (for getCreditCardId) we'll add an
// `innerRef` prop which gets sneakily injected here
const PaymentPickerWithInnerRef: React.FC<
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
  track()(
    createStripeWrapper(PaymentPickerWithInnerRef)
  ) as typeof PaymentPickerWithInnerRef,
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
          ... on CommerceShipArta {
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
