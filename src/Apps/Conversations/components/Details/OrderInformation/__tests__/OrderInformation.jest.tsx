import { screen } from "@testing-library/react"
import { ConversationOrderInformation } from "Apps/Conversations/components/Details/OrderInformation/ConversationOrderInformation"
import { setupTestWrapperTL } from "DevTools/setupTestWrapperTL"
import type { OrderInformationTestQuery } from "__generated__/OrderInformationTestQuery.graphql"
import { graphql } from "react-relay"

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

  it("does not render button for CANCELED state", async () => {
    renderWithRelay({
      CommerceOrder: () => ({
        code: "123345",
        state: "CANCELED",
        mode: "OFFER",
        lastOffer: {
          amount: 122000,
        },
      }),
    })
    expect(screen.getByText("Order Information")).toBeInTheDocument()
    expect(screen.queryByText("View Offer")).not.toBeInTheDocument()
  })

  it("does not render button for ABANDONED state", async () => {
    renderWithRelay({
      CommerceOrder: () => ({
        code: "123345",
        state: "ABANDONED",
        mode: "OFFER",
        lastOffer: {
          amount: 122000,
        },
      }),
    })
    expect(screen.getByText("Order Information")).toBeInTheDocument()
    expect(screen.queryByText("View Offer")).not.toBeInTheDocument()
  })
})
