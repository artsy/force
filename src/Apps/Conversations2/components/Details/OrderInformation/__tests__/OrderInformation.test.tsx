import { graphql } from "relay-runtime"
import { screen } from "@testing-library/react"
import { setupTestWrapperTL } from "DevTools/setupTestWrapper"
import { OrderInformationTestQuery } from "__generated__/OrderInformationTestQuery.graphql"
import { OrderInformation } from "Apps/Conversations2/components/Details/OrderInformation/OrderInformation"

describe("OrderInformation", () => {
  const { renderWithRelay } = setupTestWrapperTL<OrderInformationTestQuery>({
    Component: ({ commerceOrder }) => {
      return <OrderInformation order={commerceOrder!} />
    },
    query: graphql`
      query OrderInformationTestQuery @relay_test_operation {
        commerceOrder(id: "conversation-id") {
          ...OrderInformation_order
        }
      }
    `,
  })

  it("renders", async () => {
    renderWithRelay({
      CommerceOrder: () => ({
        code: "123345",
        state: "APPROVED",
        mode: "OFFER",
        lastOffer: {
          amount: 122000,
        },
      }),
    })
    expect(screen.getByText("Order Information")).toBeInTheDocument()
    expect(screen.getByText("View Offer")).toBeInTheDocument()
    expect(screen.getByText("Order #123345")).toBeInTheDocument()
    expect(screen.getByText("122000")).toBeInTheDocument()
  })
})
