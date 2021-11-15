import { Box, Button, Text } from "@artsy/palette"
import { SystemContextProps } from "v2/System"

import { useState } from "react"
import * as React from "react"
import { RelayProp, createFragmentContainer, graphql } from "react-relay"
import { SavedCreditCards } from "v2/Components/Payment/SavedCreditCards"
import { PaymentSectionCreditCard } from "v2/__generated__/PaymentSectionCreditCard.graphql"
import { PaymentModal } from "v2/Components/Payment/PaymentModal"
import { PaymentSection_me } from "v2/__generated__/PaymentSection_me.graphql"
import { loadStripe } from "@stripe/stripe-js"
import { Elements } from "@stripe/react-stripe-js"
import { data as sd } from "sharify"

interface PaymentSectionProps extends SystemContextProps {
  relay?: RelayProp
  me: PaymentSection_me
}

export const PaymentSection: React.FC<PaymentSectionProps> = props => {
  const creditCardEdges = props.me?.creditCards?.edges ?? []
  // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
  const creditCards = creditCardEdges.map(({ node: creditCard }) => {
    return creditCard
  })
  const [showPaymentModal, setShowPaymentModal] = useState(false)
  const stripePromise = loadStripe(sd.STRIPE_PUBLISHABLE_KEY)
  return (
    <>
      <Text variant={["sm", "lg"]} mt={4} mb={[2, 4]}>
        {creditCards.length ? "Saved Cards" : "No Saved Cards"}
      </Text>

      {creditCards?.length ? (
        <Box maxWidth={["100%", "75%"]}>
          <SavedCreditCards
            creditCards={creditCards as CreditCardType[]}
            relay={props.relay}
            me={props.me}
          />
        </Box>
      ) : (
        <Text mb={2} color="black60" variant="sm">
          Please add a payment card for a faster checkout experience in future.
        </Text>
      )}
      <Button
        mt={2}
        variant="secondaryOutline"
        onClick={() => setShowPaymentModal(true)}
      >
        Add new card
      </Button>
      <Elements stripe={stripePromise}>
        <PaymentModal
          show={showPaymentModal}
          closeModal={() => setShowPaymentModal(false)}
          relay={props?.relay!}
          me={props.me}
        />
      </Elements>
    </>
  )
}

export type CreditCardType = PaymentSectionCreditCard

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
