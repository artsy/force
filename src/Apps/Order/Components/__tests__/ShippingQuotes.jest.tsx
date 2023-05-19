import { BorderedRadio } from "@artsy/palette"
import { ShippingQuotes_Test_Query$data } from "__generated__/ShippingQuotes_Test_Query.graphql"
import { BuyOrderWithArtaShippingDetails } from "Apps/__tests__/Fixtures/Order"
import { renderRelayTree } from "DevTools/renderRelayTree"
import { graphql } from "react-relay"
import {
  shippingQuoteDescriptions,
  shippingQuoteDisplayNames,
  ShippingQuotesFragmentContainer,
} from "Apps/Order/Components/ShippingQuotes"
import { cloneDeep, compact } from "lodash"
import { ReactWrapper } from "enzyme"

jest.unmock("react-relay")

const onSelect = jest.fn()

const render = (extraOrderProps?: ShippingQuotes_Test_Query$data["order"]) =>
  renderRelayTree({
    Component: (props: ShippingQuotes_Test_Query$data) => (
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
      query ShippingQuotes_Test_Query @raw_response_type @relay_test_operation {
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

  it("auto selects the first shipping quote", async () => {
    const shippingQuotes = page
      .find(`[data-test="shipping-quotes"]`)
      .find(BorderedRadio)

    // The id of the lowest cost shipping option in BuyOrderWithArtaShippingDetails mocked data
    expect(shippingQuotes.first().props().value).toEqual(
      "4a8f8080-23d3-4c0e-9811-7a41a9df6933"
    )
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
              .startsWith(
                shippingQuoteDisplayNames[shippingQuote.node.typeName]
              )
          )
          .first()

        expect(quote).toBeTruthy()

        const text = quote.text()

        expect(text).toContain(shippingQuote.node.price)
        expect(text).toContain(
          shippingQuoteDescriptions[shippingQuote.node.typeName]
        )
      }
    )
  })

  it("quotes are in ascending order by price", async () => {
    const shippingQuotes = page
      .find(`[data-test="shipping-quotes"]`)
      .find(BorderedRadio)

    const ascendingPrices = ["$1.00", "$2.00", "$3.00", "$4.00", "$5.00"]

    shippingQuotes.forEach((node: ReactWrapper, index: number) => {
      expect(node.find(`Text[data-test="quotePrice"]`).text()).toContain(
        ascendingPrices[index]
      )
    })
  })

  it("call onSelect callback on sellected quote change", async () => {
    const shippingQuotes = page
      .find(`[data-test="shipping-quotes"]`)
      .find(BorderedRadio)

    shippingQuotes.first().simulate("click")

    expect(onSelect).toBeCalledWith("4a8f8080-23d3-4c0e-9811-7a41a9df6933")
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
