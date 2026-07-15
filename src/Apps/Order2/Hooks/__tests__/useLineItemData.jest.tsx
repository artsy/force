import type { Order2OrderSummaryArtwork } from "Apps/Order2/Components/Order2OrderSummary"
import { useLineItemData } from "Apps/Order2/Hooks/useLineItemData"
import { setupTestWrapperTL } from "DevTools/setupTestWrapperTL"
import type { useLineItemDataTestQuery } from "__generated__/useLineItemDataTestQuery.graphql"
import { graphql } from "react-relay"

jest.unmock("react-relay")

let result: Order2OrderSummaryArtwork | undefined

const TestComponent = (props: any) => {
  result = useLineItemData(props.me.order.lineItems[0])
  return null
}

const { renderWithRelay } = setupTestWrapperTL<useLineItemDataTestQuery>({
  Component: TestComponent,
  query: graphql`
    query useLineItemDataTestQuery @relay_test_operation {
      me {
        order(id: "order-id") {
          lineItems {
            ...useLineItemData_lineItem
          }
        }
      }
    }
  `,
})

beforeEach(() => {
  result = undefined
})

describe("useLineItemData", () => {
  it("sources price and dimensions from the line item's EditionSet, not the parent Artwork", () => {
    renderWithRelay({
      LineItem: () => ({
        artworkOrEditionSet: {
          __typename: "EditionSet",
          price: "$1,200",
          dimensions: { in: "5 x 5 in", cm: "12 x 12 cm" },
        },
      }),
    })

    expect(result?.listPriceDisplay).toEqual("$1,200")
    expect(result?.dimensionsLabel).toEqual("5 x 5 in | 12 x 12 cm")
  })

  it("sources price and dimensions from the line item's Artwork when there is no edition set", () => {
    renderWithRelay({
      LineItem: () => ({
        artworkOrEditionSet: {
          __typename: "Artwork",
          price: "$500",
          dimensions: { in: "10 x 10 in", cm: "25 x 25 cm" },
        },
      }),
    })

    expect(result?.listPriceDisplay).toEqual("$500")
    expect(result?.dimensionsLabel).toEqual("10 x 10 in | 25 x 25 cm")
  })

  it("falls back to 'Not publicly listed' when there is no price", () => {
    renderWithRelay({
      LineItem: () => ({
        artworkOrEditionSet: {
          __typename: "Artwork",
          price: null,
        },
      }),
    })

    expect(result?.listPriceDisplay).toEqual("Not publicly listed")
  })
})
