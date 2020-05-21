import { storiesOf } from "@storybook/react"
import { UserSettingsPaymentsFragmentContainer } from "v2/Components/Payment/UserSettingsPayments"
import { MockRelayRenderer } from "v2/DevTools"
import React from "react"
import { graphql } from "react-relay"

storiesOf("Components/Payment", module)
  .add("Payment Form - no credit cards", () => {
    return (
      <MockRelayRenderer
        Component={UserSettingsPaymentsFragmentContainer}
        mockResolvers={{
          Me: () => ({
            id: "1234",
            internalID: "abc1234",
            creditCards: {
              edges: [],
            },
          }),
        }}
        query={graphql`
          query PaymentNoCreditCardsQuery {
            me {
              ...UserSettingsPayments_me
            }
          }
        `}
      />
    )
  })
  .add("Payment Form - multiple credit cards", () => {
    return (
      <MockRelayRenderer
        Component={UserSettingsPaymentsFragmentContainer}
        mockResolvers={{
          Me: () => ({
            id: "1234",
            internalID: "1abc4556",
            creditCards: {
              edges: [
                {
                  id: "1234",
                  internalID: "abc1234",
                  brand: "Visa",
                  lastFourDigits: "1234",
                  expirationYear: "2020",
                  expirationMonth: "07",
                },
                {
                  id: "4567",
                  internalID: "abc4567",
                  brand: "Visa",
                  lastFourDigits: "4444",
                  expirationYear: "2022",
                  expirationMonth: "10",
                },
              ],
            },
          }),
        }}
        query={graphql`
          query PaymentMultipleCreditCardsQuery {
            me {
              ...UserSettingsPayments_me
            }
          }
        `}
      />
    )
  })
