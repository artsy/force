import { Box, Serif, Theme } from "@artsy/palette"
import { UserSettingsPayments_me } from "v2/__generated__/UserSettingsPayments_me.graphql"
import { UserSettingsPaymentsCreditCard } from "v2/__generated__/UserSettingsPaymentsCreditCard.graphql"
import { UserSettingsPaymentsQuery } from "v2/__generated__/UserSettingsPaymentsQuery.graphql"
import { SystemContext, SystemContextProps } from "v2/Artsy"
import { get } from "v2/Utils/get"

import { renderWithLoadProgress } from "v2/Artsy/Relay/renderWithLoadProgress"
import { SystemQueryRenderer as QueryRenderer } from "v2/Artsy/Relay/SystemQueryRenderer"
import React, { useContext } from "react"
import { RelayProp, createFragmentContainer, graphql } from "react-relay"
import { PaymentFormWrapper } from "./PaymentFormWrapper"
import { SavedCreditCards } from "./SavedCreditCards"

interface UserSettingsPaymentsProps extends SystemContextProps {
  relay?: RelayProp
  me: UserSettingsPayments_me
}

export class UserSettingsPayments extends React.Component<
  UserSettingsPaymentsProps
> {
  render() {
    const creditCardEdges = get(this.props, props => props.me.creditCards.edges)
    const creditCards = creditCardEdges.map(({ node: creditCard }) => {
      return creditCard
    })

    return (
      <Theme>
        <>
          {creditCards && creditCards.length ? (
            <Box maxWidth={542}>
              <SavedCreditCards
                creditCards={creditCards as UserSettingsPaymentsCreditCard[]}
                relay={this.props.relay}
                me={this.props.me}
              />
              <Serif size="6" pb={3} pt={2}>
                Add new card
              </Serif>
            </Box>
          ) : null}
          <PaymentFormWrapper relay={this.props.relay} me={this.props.me} />
        </>
      </Theme>
    )
  }
}

export type CreditCardType = UserSettingsPaymentsCreditCard

graphql`
  fragment UserSettingsPaymentsCreditCard on CreditCard {
    id
    internalID
    brand
    lastDigits
    expirationYear
    expirationMonth
    __typename
  }
`

export const UserSettingsPaymentsFragmentContainer = createFragmentContainer(
  UserSettingsPayments,
  {
    me: graphql`
      fragment UserSettingsPayments_me on Me {
        id
        internalID
        creditCards(first: 100)
          @connection(key: "UserSettingsPayments_creditCards", filters: []) {
          edges {
            node {
              ...UserSettingsPaymentsCreditCard @relay(mask: false)
            }
          }
        }
      }
    `,
  }
)

export const UserSettingsPaymentsQueryRenderer = () => {
  const { user, relayEnvironment } = useContext(SystemContext)
  if (!user) {
    return null
  }

  return (
    <QueryRenderer<UserSettingsPaymentsQuery>
      environment={relayEnvironment}
      variables={{}}
      query={graphql`
        query UserSettingsPaymentsQuery {
          me {
            ...UserSettingsPayments_me
          }
        }
      `}
      render={renderWithLoadProgress(UserSettingsPaymentsFragmentContainer)}
    />
  )
}
