import { Box, Button, Flex, Join, Serif, Spacer } from "@artsy/palette"
import { PaymentFormCreateCreditCardMutation } from "v2/__generated__/PaymentFormCreateCreditCardMutation.graphql"
import { UserSettingsPayments_me } from "v2/__generated__/UserSettingsPayments_me.graphql"
import { CreditCardInput } from "v2/Apps/Order/Components/CreditCardInput"
import { validateAddress } from "v2/Apps/Order/Utils/formValidators"
import {
  Address,
  AddressErrors,
  AddressForm,
  AddressTouched,
  emptyAddress,
} from "v2/Components/AddressForm"
import { ErrorModal } from "v2/Components/Modal/ErrorModal"
import React, { Component } from "react"
import { RelayProp, commitMutation, graphql } from "react-relay"
import { ReactStripeElements, injectStripe } from "react-stripe-elements"
import { ConnectionHandler, RecordSourceSelectorProxy } from "relay-runtime"
import { ErrorWithMetadata } from "v2/Utils/errors"
import createLogger from "v2/Utils/logger"
import { Responsive } from "v2/Utils/Responsive"

export interface PaymentFormProps
  extends ReactStripeElements.InjectedStripeProps {
  relay?: RelayProp
  me: UserSettingsPayments_me
}

interface PaymentFormState {
  address: Address
  hideBillingAddress: boolean
  error: stripe.Error
  isCommittingMutation: boolean
  isErrorModalOpen: boolean
  errorModalMessage: string
  addressErrors: AddressErrors
  addressTouched: AddressTouched
}

const logger = createLogger("Components/Payment/PaymentForm.tsx")

class PaymentForm extends Component<PaymentFormProps, PaymentFormState> {
  private cardElement

  state = {
    address: { ...emptyAddress, country: "US" },
    hideBillingAddress: true,
    error: null,
    isCommittingMutation: false,
    isErrorModalOpen: false,
    errorModalMessage: null,
    addressErrors: {},
    addressTouched: {},
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

  onSubmit = () => {
    const billingAddress = this.getSelectedBillingAddress()
    const { me } = this.props
    this.setState({ isCommittingMutation: true }, () => {
      const { errors, hasErrors } = validateAddress(this.state.address)
      if (hasErrors) {
        this.setState({
          isCommittingMutation: false,
          addressErrors: errors,
          addressTouched: this.touchedAddress,
        })
        return
      }

      this.props.stripe.createToken(billingAddress).then(({ error, token }) => {
        if (error) {
          this.setState({
            error,
            isCommittingMutation: false,
          })
        } else {
          this.createCreditCard({ token: token.id, me })
        }
      })
    })
  }

  render() {
    const { error, isCommittingMutation } = this.state

    return (
      <>
        <Responsive>
          {({ xs }) => {
            return (
              <Flex flexDirection={xs ? "column" : "row"}>
                <Box width="100%" maxWidth={542}>
                  <Join separator={<Spacer mb={3} />}>
                    <Flex flexDirection="column">
                      <Serif
                        mb={1}
                        size="3t"
                        color="black100"
                        lineHeight="1.1em"
                      >
                        Credit Card
                      </Serif>
                      <CreditCardInput
                        error={error}
                        onChange={response =>
                          this.setState({ error: response.error })
                        }
                        ref={el => (this.cardElement = el)}
                      />
                    </Flex>

                    <AddressForm
                      value={this.state.address}
                      onChange={address => this.setState({ address })}
                      errors={this.state.addressErrors}
                      touched={this.state.addressTouched}
                      billing
                    />
                    <Button
                      size="large"
                      width="100%"
                      onClick={this.onSubmit}
                      loading={isCommittingMutation}
                    >
                      Submit
                    </Button>
                  </Join>
                  <Spacer mb={3} />
                </Box>
              </Flex>
            )
          }}
        </Responsive>
        <ErrorModal
          onClose={this.onCloseModal}
          show={this.state.isErrorModalOpen}
          contactEmail="support@artsy.net"
          detailText={this.state.errorModalMessage}
        />
      </>
    )
  }

  onCloseModal = () => {
    this.setState({ isErrorModalOpen: false })
  }

  private getSelectedBillingAddress(): stripe.TokenOptions {
    const {
      name,
      addressLine1,
      addressLine2,
      city,
      region,
      postalCode,
      country,
    } = this.state.address

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

  onCreditCardAdded(
    me: UserSettingsPayments_me,
    store: RecordSourceSelectorProxy<any>,
    data: PaymentFormCreateCreditCardMutation["response"]
  ): void {
    const {
      createCreditCard: { creditCardOrError },
    } = data

    // Explicitly update the relay store to be aware of the new credit card
    if (creditCardOrError.creditCardEdge) {
      const meStore = store.get(me.id)
      const connection = ConnectionHandler.getConnection(
        meStore,
        "UserSettingsPayments_creditCards"
      )
      const mutationPayload = store.getRootField("createCreditCard")
      const creditCardOrErrorEdge = mutationPayload.getLinkedRecord(
        "creditCardOrError"
      )
      const creditCardEdge = creditCardOrErrorEdge.getLinkedRecord(
        "creditCardEdge"
      )
      ConnectionHandler.insertEdgeAfter(connection, creditCardEdge)
    }
  }

  private createCreditCard({ token, me }) {
    commitMutation<PaymentFormCreateCreditCardMutation>(
      this.props.relay.environment,
      {
        onCompleted: (data, errors) => {
          const {
            createCreditCard: { creditCardOrError },
          } = data

          if (creditCardOrError.creditCardEdge) {
            this.setState({
              isCommittingMutation: false,
              address: { ...emptyAddress, country: "US" },
              addressErrors: {},
              addressTouched: {},
            })
            this.cardElement && this.cardElement.cardInputElement.clear()
            window.scrollTo(0, 0)
          } else {
            if (errors) {
              errors.forEach(this.onMutationError.bind(this))
            } else {
              const mutationError = creditCardOrError.mutationError
              this.onMutationError(
                new ErrorWithMetadata(mutationError.message, mutationError),
                mutationError.detail
              )
            }
          }
        },
        onError: this.onMutationError.bind(this),
        // TODO: Inputs to the mutation might have changed case of the keys!
        mutation: graphql`
          mutation PaymentFormCreateCreditCardMutation(
            $input: CreditCardInput!
          ) {
            createCreditCard(input: $input) {
              creditCardOrError {
                ... on CreditCardMutationSuccess {
                  creditCardEdge {
                    node {
                      ...UserSettingsPaymentsCreditCard @relay(mask: false)
                    }
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
        variables: {
          input: { token },
        },
        updater: (store, data) => this.onCreditCardAdded(me, store, data),
      }
    )
  }

  private onMutationError(error, errorModalMessage?) {
    logger.error(error)
    this.setState({
      isCommittingMutation: false,
      isErrorModalOpen: true,
      errorModalMessage,
    })
  }
}

export default injectStripe(PaymentForm)
