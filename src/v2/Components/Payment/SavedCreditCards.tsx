import { BorderBox, Flex, Sans, Spinner } from "@artsy/palette"
import {
  SavedCreditCardsDeleteCreditCardMutation,
  SavedCreditCardsDeleteCreditCardMutationResponse,
} from "v2/__generated__/SavedCreditCardsDeleteCreditCardMutation.graphql"
import { UserSettingsPayments_me } from "v2/__generated__/UserSettingsPayments_me.graphql"
import { CreditCardDetails } from "v2/Apps/Order/Components/CreditCardDetails"
import { ErrorModal } from "v2/Components/Modal/ErrorModal"
import React, { SFC } from "react"
import { RelayProp, commitMutation, graphql } from "react-relay"
import { ConnectionHandler, RecordSourceSelectorProxy } from "relay-runtime"
import styled from "styled-components"
import { CreditCardType } from "./UserSettingsPayments"

interface SavedCreditCardsProps {
  creditCards: CreditCardType[]
  me: UserSettingsPayments_me
  relay?: RelayProp
}

interface CreditCardsState {
  isErrorModalOpen: boolean
  isCommittingMutation: boolean
}

interface CreditCardProps {
  creditCard?: CreditCardType
  me: UserSettingsPayments_me
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
            <CreditCardDetails {...this.props.creditCard} />
            <Sans size="2" color="purple100">
              {this.state.isCommittingMutation ? (
                <SpinnerContainer>
                  <Spinner />
                </SpinnerContainer>
              ) : (
                <RemoveLink onClick={() => this.deleteCreditCard()}>
                  Remove
                </RemoveLink>
              )}
            </Sans>
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
        this.props.relay.environment,
        {
          onCompleted: (data, errors) => {
            const {
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
      const connection = ConnectionHandler.getConnection(
        meStore,
        "UserSettingsPayments_creditCards"
      )
      ConnectionHandler.deleteNode(connection, creditCardId)
    }
  }

  private onMutationError(errors) {
    console.error("SavedCreditCards.tsx", errors)
    this.setState({ isErrorModalOpen: true, isCommittingMutation: false })
  }
}

export const RemoveLink = styled.div`
  text-align: right;

  &:hover {
    cursor: pointer;
  }
`

const SpinnerContainer = styled.div`
  padding-right: 30px;
  position: relative;
`

export const SavedCreditCards: SFC<SavedCreditCardsProps> = props => {
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
