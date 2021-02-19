import { Box, Button, Theme } from "@artsy/palette"
import { SystemContextProps } from "v2/Artsy"

import React, { useState } from "react"
import { RelayProp, createFragmentContainer, graphql } from "react-relay"
import { SavedCreditCards } from "v2/Components/Payment/SavedCreditCards"
import { PaymentModal } from "v2/Components/Payment/PaymentModal"
import { PaymentSection_me } from "v2/__generated__/PaymentSection_me.graphql"
import { UserSettingsPaymentsCreditCard } from "v2/__generated__/UserSettingsPaymentsCreditCard.graphql"
import { loadStripe } from "@stripe/stripe-js"
import { Elements } from "@stripe/react-stripe-js"
import { data as sd } from "sharify"

interface PaymentSectionProps extends SystemContextProps {
  relay?: RelayProp
  me: PaymentSection_me
}

export const PaymentSection: React.FC<PaymentSectionProps> = props => {
  const creditCardEdges = props.me?.creditCards?.edges
  const creditCards = creditCardEdges.map(({ node: creditCard }) => {
    return creditCard
  })
  const [showPaymentModal, setShowPatymentModal] = useState(false)
  const stripePromise = loadStripe(sd.STRIPE_PUBLISHABLE_KEY)

  return (
    <Theme>
      <>
        {creditCards?.length ? (
          <Box maxWidth={542}>
            <SavedCreditCards
              creditCards={creditCards as UserSettingsPaymentsCreditCard[]}
              relay={props.relay}
              me={props.me}
            />
          </Box>
        ) : null}
        <Button onClick={() => setShowPatymentModal(true)}>Add new card</Button>
        <Elements stripe={stripePromise}>
          <PaymentModal
            show={showPaymentModal}
            closeModal={() => setShowPatymentModal(false)}
            relay={props.relay}
            me={props.me}
          />
        </Elements>
      </>
    </Theme>
  )
}

graphql`
  fragment PaymentSectionCreditCard on CreditCard {
    id
    internalID
    brand
    lastDigits
    expirationYear
    expirationMonth
    __typename
  }
`

export const PaymentSectionFragmentContainer = createFragmentContainer(
  PaymentSection,
  {
    me: graphql`
      fragment PaymentSection_me on Me {
        id
        internalID
        creditCards(first: 100)
          @connection(key: "PaymentSection_creditCards", filters: []) {
          edges {
            node {
              ...PaymentSectionCreditCard @relay(mask: false)
            }
          }
        }
      }
    `,
  }
)
