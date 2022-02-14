import { graphql } from "react-relay"
import { setupTestWrapperTL } from "v2/DevTools/setupTestWrapper"
import { screen, within, fireEvent, waitFor } from "@testing-library/react"
import { SubmittedOrderModalFragmentContainer } from ".."

jest.unmock("react-relay")

const mockedResolver = {
  CommerceOrderConnectionWithTotalCount: () => ({
    edges: [{ node: { mode: "OFFER", stateExpiresAt: "Feb 28" } }],
  }),
}

describe("SubmittedOrderModal", () => {
  const { renderWithRelay } = setupTestWrapperTL({
    Component: ({ me }: any) => (
      <SubmittedOrderModalFragmentContainer
        order={me.conversation.orderConnection.edges[0].node}
      />
    ),
    query: graphql`
      query SubmittedOrderModal_Test_Query {
        me {
          conversation(id: "test-id") {
            orderConnection(first: 10) {
              edges {
                node {
                  ...SubmittedOrderModal_order
                }
              }
            }
          }
        }
      }
    `,
  })

  it("displays the right elements", async () => {
    renderWithRelay(mockedResolver)

    const expected = {
      title: "Your offer has been submitted",
      description:
        "The seller will respond to your offer by Feb 28. Keep in mind making an offer doesn’t guarantee you the work.",
      inboxText: "Negotiation with the gallery will continue in the Inbox.",
    }

    await waitFor(() => {
      expect(screen.getByText(expected.title)).toBeInTheDocument()
      expect(screen.getByText(expected.description)).toBeInTheDocument()
      expect(screen.getByText(expected.inboxText)).toBeInTheDocument()

      const button = screen.getByRole("link")
      expect(button).toHaveAttribute("href", "/user/conversations")
      expect(within(button).getByText("Go to Inbox")).toBeInTheDocument()
    })
  })

  it("close button closes modal", async () => {
    renderWithRelay(mockedResolver)

    await waitFor(() =>
      expect(screen.queryByRole("dialog")).toBeInTheDocument()
    )

    fireEvent.click(screen.getByLabelText("Close"))

    await waitFor(() =>
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument()
    )
  })
})
