import { screen } from "@testing-library/react"
import { Order2RespondOfferDetails } from "Apps/Order2/Routes/Respond/Components/Order2RespondOfferDetails"
import { Order2RespondContextProvider } from "Apps/Order2/Routes/Respond/RespondContext/Order2RespondContext"
import { setupTestWrapperTL } from "DevTools/setupTestWrapperTL"
import type { Order2RespondOfferDetailsTestQuery } from "__generated__/Order2RespondOfferDetailsTestQuery.graphql"
import { graphql } from "react-relay"

jest.unmock("react-relay")

const { renderWithRelay } =
  setupTestWrapperTL<Order2RespondOfferDetailsTestQuery>({
    Component: (props: any) => {
      const order = props.me?.order

      if (!order) {
        return null
      }

      return (
        <Order2RespondContextProvider order={order}>
          <Order2RespondOfferDetails order={order} />
        </Order2RespondContextProvider>
      )
    },
    query: graphql`
      query Order2RespondOfferDetailsTestQuery @relay_test_operation {
        me {
          order(id: "order-id") {
            ...Order2RespondContext_order
            ...Order2RespondOfferDetails_order
          }
        }
      }
    `,
  })

describe("Order2RespondOfferDetails", () => {
  it("renders the gallery offer heading and the offer amount", () => {
    renderWithRelay({
      Order: () => ({ mode: "OFFER" }),
      Offer: () => ({ amount: { display: "$1,500.00" } }),
    })

    expect(screen.getByText("Gallery offer")).toBeInTheDocument()
    expect(screen.getByText("$1,500.00")).toBeInTheDocument()
  })

  it("renders the pricing breakdown", () => {
    renderWithRelay({
      Order: () => ({ mode: "OFFER" }),
    })

    expect(screen.getByText(/may apply at import/i)).toBeInTheDocument()
  })
})
