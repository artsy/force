import { graphql } from "react-relay"
import { screen } from "@testing-library/react"
import { setupTestWrapperTL } from "DevTools/setupTestWrapper"
import { OrderInformationTestQuery } from "__generated__/OrderInformationTestQuery.graphql"
import { ConversationOrderInformation } from "Apps/Conversations/components/Details/OrderInformation/ConversationOrderInformation"

jest.unmock("react-relay")

jest.mock("System/Hooks/useRouter", () => ({
  useRouter: () => ({
    match: {
      location: {
        query: {},
      },
      params: {
        conversationId: "conversation-id",
      },
    },
  }),
}))

describe("OrderInformation", () => {
  const { renderWithRelay } = setupTestWrapperTL<OrderInformationTestQuery>({
    Component: ({ commerceOrder }) => {
      return <ConversationOrderInformation order={commerceOrder!} />
    },
    query: graphql`
      query OrderInformationTestQuery @relay_test_operation {
        commerceOrder(id: "conversation-id") {
          ...ConversationOrderInformation_order
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
