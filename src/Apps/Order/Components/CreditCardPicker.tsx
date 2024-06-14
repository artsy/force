import { CreditCardPicker_me$data } from "__generated__/CreditCardPicker_me.graphql"
import { CreditCardPicker_order$data } from "__generated__/CreditCardPicker_order.graphql"
import { CreditCardPickerCreateCreditCardMutation } from "__generated__/CreditCardPickerCreateCreditCardMutation.graphql"
import {
  Address,
  AddressChangeHandler,
  AddressErrors,
  AddressForm,
  AddressTouched,
  emptyAddress,
} from "Components/Address/AddressForm"

import { CreditCardInput } from "Components/CreditCardInput"
import { validateAddress } from "Apps/Order/Utils/formValidators"
import * as DeprecatedSchema from "@artsy/cohesion/dist/DeprecatedSchema"
import * as React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import type {
  StripeError,
  CreateTokenCardData,
  StripeElements,
  Stripe,
} from "@stripe/stripe-js"
import { CardNumberElement } from "@stripe/react-stripe-js"

import {
  BorderedRadio,
  Checkbox,
  Flex,
  Link,
  RadioGroup,
  Text,
  Spacer,
} from "@artsy/palette"
import { Collapse } from "Apps/Order/Components/Collapse"
import { CommitMutation } from "Apps/Order/Utils/commitMutation"
import { CreditCardDetails } from "./CreditCardDetails"
import { createStripeWrapper } from "Utils/createStripeWrapper"
import { isNull, mergeWith } from "lodash"
import track from "react-tracking"
import {
  SystemContextConsumer,
  SystemContextProps,
} from "System/Contexts/SystemContext"

export interface StripeProps {
  stripe: Stripe
  elements: StripeElements
}

export interface CreditCardPickerProps {
  order: CreditCardPicker_order$data
  me: CreditCardPicker_me$data
  commitMutation: CommitMutation
  innerRef: React.RefObject<CreditCardPicker>
}

interface CreditCardPickerState {
  hideBillingAddress: boolean
  address: Address
  addressErrors: AddressErrors
  addressTouched: AddressTouched
  stripeError: StripeError | null
  isCreatingStripeToken: boolean
  creditCardSelection: { type: "existing"; id: string } | { type: "new" }
  saveNewCreditCard: boolean
}

export class CreditCardPicker extends React.Component<
  CreditCardPickerProps & SystemContextProps & StripeProps,
  CreditCardPickerState
> {
  state: CreditCardPickerState = {
    hideBillingAddress: true,
    stripeError: null,
    isCreatingStripeToken: false,
    address: this.startingAddress(),
    addressErrors: {},
    addressTouched: {},
    creditCardSelection: this.getInitialCreditCardSelection(),
    saveNewCreditCard: true,
  }

  private getInitialCreditCardSelection(): CreditCardPickerState["creditCardSelection"] {
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
      const cardNumberElement = this.props.elements.getElement(
        CardNumberElement
      )!
      return await this.props.stripe.createToken(
        cardNumberElement,
        stripeBillingAddress
      )
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
  @track((props: CreditCardPickerProps, state, args) => {
    const showBillingAddress = !args[0]
    if (showBillingAddress && props.order.state === "PENDING") {
      return {
        action_type: DeprecatedSchema.ActionType.Click,
        subject: DeprecatedSchema.Subject.BNMOUseShippingAddress,
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

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
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
                  // @ts-ignore
                  const { internalID, ...creditCardProps } = e
                  return (
                    <BorderedRadio value={internalID} key={internalID}>
                      <CreditCardDetails {...creditCardProps} />
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
            <Spacer y={1} />
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
          {userHasExistingCards && <Spacer y={2} />}
          <Flex flexDirection="column">
            <CreditCardInput
              error={stripeError?.message}
              onChange={response => {
                this.setState({ stripeError: response.error as StripeError })
              }}
              required
            />

            {!this.isPickup() && (
              <>
                <Spacer y={2} />
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
              <Spacer y={2} />
              <AddressForm
                tabIndex={this.needsAddress() ? 0 : -1}
                value={address}
                errors={addressErrors}
                touched={addressTouched}
                onChange={this.onAddressChange}
                isCollapsed={hideBillingAddress}
                billing
              />
              <Spacer y={2} />
            </Collapse>
            <Spacer y={1} />
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
    variables: CreditCardPickerCreateCreditCardMutation["variables"]
  ) {
    return this.props.commitMutation<CreditCardPickerCreateCreditCardMutation>({
      variables,
      mutation: graphql`
        mutation CreditCardPickerCreateCreditCardMutation(
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
// ref to the CreditCardPicker instance (for getCreditCardId) we'll add an
// `innerRef` prop which gets sneakily injected here
const CreditCardPickerWithInnerRef: React.FC<
  CreditCardPickerProps & {
    innerRef: React.RefObject<CreditCardPicker>
  }
> = ({ innerRef, ...props }) => (
  <SystemContextConsumer>
    {({ isEigen }) => {
      return (
        <CreditCardPicker
          ref={innerRef}
          isEigen={isEigen}
          {...(props as any)}
        />
      )
    }}
  </SystemContextConsumer>
)

export const CreditCardPickerFragmentContainer = createFragmentContainer(
  track()(
    createStripeWrapper(CreditCardPickerWithInnerRef)
  ) as typeof CreditCardPickerWithInnerRef,
  {
    me: graphql`
      fragment CreditCardPicker_me on Me {
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
      fragment CreditCardPicker_order on CommerceOrder {
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
