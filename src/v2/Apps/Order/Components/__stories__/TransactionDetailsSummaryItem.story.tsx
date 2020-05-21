import { Flex } from "@artsy/palette"
import { TransactionDetailsSummaryItem_order } from "v2/__generated__/TransactionDetailsSummaryItem_order.graphql"
import { mockResolver } from "v2/Apps/__tests__/Fixtures/Order"
import { MockRelayRenderer } from "v2/DevTools"
import React from "react"
import { graphql } from "react-relay"
import { storiesOf } from "storybook/storiesOf"
import { ExtractProps } from "v2/Utils/ExtractProps"
import { Section } from "v2/Utils/Section"
import { TransactionDetailsSummaryItemFragmentContainer as TransactionDetailsSummaryItem } from "../TransactionDetailsSummaryItem"

const order: TransactionDetailsSummaryItem_order = {
  " $refType": null,
  __typename: "CommerceBuyOrder",
  mode: "BUY",
  itemsTotal: "£3,024.89",
  totalListPrice: "£3,024.89",
  shippingTotal: "£132.32",
  shippingTotalCents: 13232,
  taxTotal: "£232.23",
  taxTotalCents: 23223,
  buyerTotal: "£1,200,823.33",
}

const orderQuery = graphql`
  query TransactionDetailsSummaryItemStoryQuery {
    order: commerceOrder(id: "foo") {
      ...TransactionDetailsSummaryItem_order
    }
  }
`

const render = (
  extraOrderProps?: Partial<TransactionDetailsSummaryItem_order>,
  extraComponentProps?: Partial<
    ExtractProps<typeof TransactionDetailsSummaryItem>
  >
) => (
    <MockRelayRenderer
      Component={(props: any) => (
        <TransactionDetailsSummaryItem {...extraComponentProps} {...props} />
      )}
      mockResolvers={mockResolver({
        ...order,
        ...extraOrderProps,
      })}
      query={orderQuery}
    />
  )

storiesOf("Apps/Order/Components", module).add(
  "TransactionDetailsSummary",
  () => {
    return (
      <>
        <Section title="Transaction Summary">
          <Flex width={280} flexDirection="column">
            {render()}
          </Flex>
        </Section>
        <Section title="Offer Transaction Summary">
          <Flex width={280} flexDirection="column">
            {render({
              __typename: "CommerceOfferOrder",
              mode: "OFFER",
              myLastOffer: {
                internalID: "2345",
                amount: "$102489",
                amountCents: 102489,
                shippingTotal: "$200",
                shippingTotalCents: 20000,
                taxTotal: "$100",
                taxTotalCents: 10000,
                buyerTotal: "$102789",
                buyerTotalCents: 10278900,
                fromParticipant: "BUYER",
                note: "This is a note!",
              },
            })}
          </Flex>
        </Section>
        <Section title="Transaction Summary (offer override)">
          <Flex width={280} flexDirection="column">
            {render(
              {
                __typename: "CommerceOfferOrder",
                mode: "OFFER",
                myLastOffer: {
                  internalID: "2345",
                  amount: "$102489",
                  amountCents: 102489,
                  shippingTotal: "$200",
                  shippingTotalCents: 20000,
                  taxTotal: "$100",
                  taxTotalCents: 10000,
                  buyerTotal: "$102789",
                  buyerTotalCents: 10278900,
                  fromParticipant: "BUYER",
                  note: "This is a note!",
                },
              },
              { offerOverride: "£123.00" }
            )}
          </Flex>
        </Section>
        <Section title="Transaction Summary (using last submitted offer)">
          <Flex width={280} flexDirection="column">
            {render(
              {
                __typename: "CommerceOfferOrder",
                mode: "OFFER",
                lastOffer: {
                  internalID: "2345",
                  amount: "$102489",
                  amountCents: 102489,
                  shippingTotal: "$200",
                  shippingTotalCents: 20000,
                  taxTotal: "$100",
                  taxTotalCents: 10000,
                  buyerTotal: "$102789",
                  buyerTotalCents: 10278900,
                  fromParticipant: "BUYER",
                  note: "This is a note!",
                },
              },
              { useLastSubmittedOffer: true }
            )}
          </Flex>
        </Section>
        <Section title="Transaction Summary (seller offer)">
          <Flex width={280} flexDirection="column">
            {render(
              {
                __typename: "CommerceOfferOrder",
                mode: "OFFER",
                lastOffer: {
                  internalID: "2345",
                  amount: "$102489",
                  amountCents: 102489,
                  shippingTotal: "$200",
                  shippingTotalCents: 20000,
                  taxTotal: "$100",
                  taxTotalCents: 10000,
                  buyerTotal: "$102789",
                  buyerTotalCents: 10278900,
                  fromParticipant: "SELLER",
                  note: "This is a note!",
                },
              },
              { useLastSubmittedOffer: true }
            )}
          </Flex>
        </Section>
        <Section title="Transaction Summary (last offer context)">
          <Flex width={280} flexDirection="column">
            {render(
              {
                __typename: "CommerceOfferOrder",
                mode: "OFFER",
                lastOffer: {
                  internalID: "2345",
                  amount: "$102",
                  amountCents: 102489,
                  shippingTotal: "$200",
                  shippingTotalCents: 20000,
                  taxTotal: "$100",
                  taxTotalCents: 10000,
                  buyerTotal: "$102789",
                  buyerTotalCents: 10278900,
                  fromParticipant: "SELLER",
                  note: "This is a note!",
                },
                myLastOffer: {
                  internalID: "23456",
                  amount: "$100",
                  amountCents: 102489,
                  shippingTotal: "$200",
                  shippingTotalCents: 20000,
                  taxTotal: "$100",
                  taxTotalCents: 10000,
                  buyerTotal: "$102789",
                  buyerTotalCents: 10278900,
                  fromParticipant: "BUYER",
                  note: "This is a note!",
                },
              },
              { offerContextPrice: "LAST_OFFER" }
            )}
          </Flex>
        </Section>
      </>
    )
  }
)
