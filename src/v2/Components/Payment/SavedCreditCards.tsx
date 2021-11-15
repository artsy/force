import { BorderBox, Flex, Text, Spinner, Clickable } from "@artsy/palette"
import {
  SavedCreditCardsDeleteCreditCardMutation,
  SavedCreditCardsDeleteCreditCardMutationResponse,
} from "v2/__generated__/SavedCreditCardsDeleteCreditCardMutation.graphql"
import { CreditCardDetails } from "v2/Apps/Order/Components/CreditCardDetails"
import { ErrorModal } from "v2/Components/Modal/ErrorModal"
import * as React from "react"
import { RelayProp, commitMutation, graphql } from "react-relay"
import { ConnectionHandler, RecordSourceSelectorProxy } from "relay-runtime"
import styled from "styled-components"
import { PaymentSection_me } from "v2/__generated__/PaymentSection_me.graphql"
import { CreditCardType } from "v2/Apps/Payment/Components/PaymentSection"
interface SavedCreditCardsProps {
  creditCards: CreditCardType[]
  me: PaymentSection_me
  relay?: RelayProp
}

interface CreditCardsState {
  isErrorModalOpen: boolean
  isCommittingMutation: boolean
}

interface CreditCardProps {
  creditCard?: CreditCardType
  me: PaymentSection_me
  relay?: RelayProp
}

export class CreditCard extends React.Component<
  CreditCardProps,
  CreditCardsState
> {
  state = { isErrorModalOpen: false, isCommittingMutation: false }

  render() {
    return (
      <>
        <BorderBox flexDirection="column" p={2} mb={2}>
          <Flex justifyContent="space-between" alignItems="center">
            <CreditCardDetails {...this.props.creditCard!} />
            <Text variant="md" color="red100">
              {this.state.isCommittingMutation ? (
                <SpinnerContainer>
                  <Spinner />
                </SpinnerContainer>
              ) : (
                <RemoveLink onClick={() => this.deleteCreditCard()}>
                  Remove
                </RemoveLink>
              )}
            </Text>
          </Flex>
        </BorderBox>
        <ErrorModal
          onClose={this.onCloseModal}
          show={this.state.isErrorModalOpen}
          contactEmail="support@artsy.net"
        />
      </>
    )
  }

  onCloseModal = () => {
    this.setState({ isErrorModalOpen: false })
  }

  private deleteCreditCard() {
    this.setState({ isCommittingMutation: true }, () => {
      commitMutation<SavedCreditCardsDeleteCreditCardMutation>(
        // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
        this.props.relay.environment,
        {
          onCompleted: (data, errors) => {
            const {
              // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
              deleteCreditCard: { creditCardOrError },
            } = data

            if (creditCardOrError.creditCard) {
              this.setState({ isCommittingMutation: false })
            } else {
              this.onMutationError(errors)
            }
          },
          onError: this.onMutationError.bind(this),
          mutation: graphql`
            mutation SavedCreditCardsDeleteCreditCardMutation(
              $input: DeleteCreditCardInput!
            ) {
              deleteCreditCard(input: $input) {
                creditCardOrError {
                  ... on CreditCardMutationSuccess {
                    creditCard {
                      internalID
                      id
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
            // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
            input: { id: this.props.creditCard.internalID },
          },
          updater: (store, data) => this.onCreditCardDeleted(store, data),
        }
      )
    })
  }

  private onCreditCardDeleted(
    store: RecordSourceSelectorProxy<
      SavedCreditCardsDeleteCreditCardMutationResponse
    >,
    data: SavedCreditCardsDeleteCreditCardMutationResponse
  ) {
    const {
      // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
      deleteCreditCard: { creditCardOrError },
    } = data

    // Explicitly update relay store so the UI updates immediately
    if (creditCardOrError.creditCard) {
      const mutationPayload = store.getRootField("deleteCreditCard")
      const creditCardOrErrorEdge = mutationPayload.getLinkedRecord(
        "creditCardOrError"
      )
      const creditCardEdge = creditCardOrErrorEdge.getLinkedRecord("creditCard")
      const creditCardId = creditCardEdge.getValue("id")
      const meStore = store.get(this.props.me.id)
      let connection = null
      // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
      connection = ConnectionHandler.getConnection(
        meStore!,
        "UserSettingsPayments_creditCards"
      )
      if (!connection) {
        // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
        connection = ConnectionHandler.getConnection(
          meStore!,
          "PaymentSection_creditCards"
        )
      }
      ConnectionHandler.deleteNode(connection!, creditCardId)
    }
  }

  private onMutationError(errors) {
    this.setState({ isErrorModalOpen: true, isCommittingMutation: false })
  }
}

export const RemoveLink = styled(Clickable)`
  text-align: right;
  text-decoration: underline;
`

const SpinnerContainer = styled.div`
  padding-right: 30px;
  position: relative;
`

export const SavedCreditCards: React.FC<SavedCreditCardsProps> = props => {
  return (
    <>
      {props.creditCards.map((creditCard, i) => (
        <CreditCard
          creditCard={creditCard}
          key={i}
          relay={props.relay}
          me={props.me}
        />
      ))}
    </>
  )
}
