import { ContextModule } from "@artsy/cohesion"
import { screen } from "@testing-library/react"
import { Order2OrderSummary } from "Apps/Order2/Components/Order2OrderSummary"
import { setupTestWrapperTL } from "DevTools/setupTestWrapperTL"
import type { Order2OrderSummaryTestQuery } from "__generated__/Order2OrderSummaryTestQuery.graphql"
import { Text } from "@artsy/palette"
import { graphql } from "react-relay"

jest.unmock("react-relay")

const checkoutTracking = {
  clickedOrderArtworkImage: jest.fn(),
  clickedBuyerProtection: jest.fn(),
} as any

const artwork = {
  artworkInternalID: "artwork-id",
  artistNames: "Pablo Picasso",
  title: "Guernica",
  date: "1937",
  listPriceDisplay: "$1,000.00",
  attributionClassLabel: "Unique work",
  dimensionsLabel: "10 × 20 in",
  imageURL: "https://example.com/image.jpg",
}

const { renderWithRelay } = setupTestWrapperTL<Order2OrderSummaryTestQuery>({
  Component: (props: any) => {
    const order = props.me?.order

    if (!order) {
      return null
    }

    return (
      <Order2OrderSummary
        order={order}
        header="Offer summary"
        contextModule={ContextModule.ordersRespond}
        checkoutTracking={checkoutTracking}
        artworkPath="/artwork/guernica"
        artwork={artwork}
        limitedTimeOffer={<Text>Gallery offer line</Text>}
      >
        <Text>Submit button slot</Text>
      </Order2OrderSummary>
    )
  },
  query: graphql`
    query Order2OrderSummaryTestQuery @relay_test_operation {
      me {
        order(id: "order-id") {
          ...Order2OrderSummary_order
        }
      }
    }
  `,
})

describe("Order2OrderSummary", () => {
  it("renders the title and artwork metadata", () => {
    renderWithRelay()

    expect(screen.getByText("Offer summary")).toBeInTheDocument()
    expect(screen.getByText("Pablo Picasso")).toBeInTheDocument()
    expect(screen.getByText("Guernica, 1937")).toBeInTheDocument()
    expect(screen.getByText("List price: $1,000.00")).toBeInTheDocument()
    expect(screen.getByText("Unique work")).toBeInTheDocument()
    expect(screen.getByText("10 × 20 in")).toBeInTheDocument()
  })

  it("renders the buyer guarantee message", () => {
    renderWithRelay()

    expect(
      screen.getByText("Artsy’s Buyer Guarantee", { exact: false }),
    ).toBeInTheDocument()
  })

  it("renders the limitedTimeOffer slot", () => {
    renderWithRelay()

    expect(screen.getByText("Gallery offer line")).toBeInTheDocument()
  })

  it("renders children below the summary", () => {
    renderWithRelay()

    expect(screen.getByText("Submit button slot")).toBeInTheDocument()
  })
})
