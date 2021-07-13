import { BorderedRadio } from "@artsy/palette"
import { ShippingQuotes_Test_QueryResponse } from "v2/__generated__/ShippingQuotes_Test_Query.graphql"
import { BuyOrderWithArtaShippingDetails } from "v2/Apps/__tests__/Fixtures/Order"
import { renderRelayTree } from "v2/DevTools"
import React from "react"
import { graphql } from "react-relay"
import {
  shippingQuoteDescriptions,
  ShippingQuotesFragmentContainer,
} from "../ShippingQuotes"
import { cloneDeep, compact } from "lodash"

jest.unmock("react-relay")

const onSelect = jest.fn()

const render = (extraOrderProps?: ShippingQuotes_Test_QueryResponse["order"]) =>
  renderRelayTree({
    Component: (props: ShippingQuotes_Test_QueryResponse) => (
      <ShippingQuotesFragmentContainer
        shippingQuotes={compact(
          props.order?.lineItems?.edges?.[0]?.node?.shippingQuoteOptions?.edges
        )}
        selectedShippingQuoteId={"d8cfee28-8139-4391-8a8d-3010633e885b"}
        onSelect={onSelect}
      />
    ),
    mockData: {
      order: {
        ...BuyOrderWithArtaShippingDetails,
        ...extraOrderProps,
      },
    },
    query: graphql`
      query ShippingQuotes_Test_Query @raw_response_type {
        order: commerceOrder {
          lineItems {
            edges {
              node {
                shippingQuoteOptions {
                  edges {
                    ...ShippingQuotes_shippingQuotes
                  }
                }
              }
            }
          }
        }
      }
    `,
  })

describe("ShippingQuotes", () => {
  let page

  beforeEach(async () => {
    page = await render()
  })

  it("shows correct shipping quotes lendth", async () => {
    const shippingQuotes = page
      .find(`[data-test="shipping-quotes"]`)
      .find(BorderedRadio)

    expect(shippingQuotes).toHaveLength(5)
  })

  it("have selected quote", async () => {
    const selectedShippingQuote = page
      .find(`[data-test="shipping-quotes"]`)
      .find(BorderedRadio)
      .filterWhere(quote => quote.props().selected == true)

    expect(selectedShippingQuote.props().value).toEqual(
      "d8cfee28-8139-4391-8a8d-3010633e885b"
    )
  })

  it("each shipping quote contain name, price and description", async () => {
    const shippingQuotes = page
      .find(`[data-test="shipping-quotes"]`)
      .find(BorderedRadio)

    BuyOrderWithArtaShippingDetails.lineItems.edges[0].node.shippingQuoteOptions.edges.forEach(
      shippingQuote => {
        const quote = shippingQuotes
          .findWhere(shippingQuotesItem =>
            shippingQuotesItem
              .text()
              .startsWith(shippingQuote.node.name || shippingQuote.node.tier)
          )
          .first()

        expect(quote).toBeTruthy()

        const text = quote.text()

        expect(text).toContain(shippingQuote.node.price)
        expect(text).toContain(
          shippingQuoteDescriptions[
            (shippingQuote.node.name || shippingQuote.node.tier).toLowerCase()
          ]
        )
      }
    )
  })

  it("call onSelect callback on sellected quote change", async () => {
    const shippingQuotes = page
      .find(`[data-test="shipping-quotes"]`)
      .find(BorderedRadio)

    shippingQuotes.first().simulate("click")

    expect(onSelect).toBeCalledWith("1eb3ba19-643b-4101-b113-2eb4ef7e30b6")
  })

  it("does not render component if no shhipping quotes", async () => {
    let buyOrderWithoutArtaShippingDetails = cloneDeep(
      BuyOrderWithArtaShippingDetails
    ) as any

    buyOrderWithoutArtaShippingDetails.lineItems.edges[0].node.shippingQuoteOptions = null

    const page = await render(buyOrderWithoutArtaShippingDetails)

    expect(page.html()).toBe("")
  })
})
