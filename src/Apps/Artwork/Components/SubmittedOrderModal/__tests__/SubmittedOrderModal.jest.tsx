import { fireEvent, screen, waitFor, within } from "@testing-library/react"
import { setupTestWrapperTL } from "DevTools/setupTestWrapperTL"
import { graphql } from "react-relay"
import { SubmittedOrderModalFragmentContainer } from ".."

jest.unmock("react-relay")

const mockedResolver = {
  CommerceOrder: () => ({
    stateExpiresAt: "Feb 28",
    impulseConversationId: null,
  }),
}

const mockedResolverWithConversation = {
  CommerceOrder: () => ({
    stateExpiresAt: "Sept 10",
    impulseConversationId: "12345",
  }),
}

describe("SubmittedOrderModal", () => {
  const { renderWithRelay } = setupTestWrapperTL({
    Component: ({ submittedOrder }: any) => {
      return (
        <SubmittedOrderModalFragmentContainer submittedOrder={submittedOrder} />
      )
    },
    query: graphql`
      query SubmittedOrderModal_Test_Query @relay_test_operation {
        submittedOrder: commerceOrder(id: "some-id") {
          ...SubmittedOrderModal_submittedOrder
        }
      }
    `,
  })

  it("displays the right elements", async () => {
    renderWithRelay(mockedResolver)

    const expected = {
      title: "Thank you, your offer has been submitted",
      description:
        "The seller will respond to your offer by Feb 28. Keep in mind making an offer doesn’t guarantee you the work.",
      inboxText: "Negotiation with the gallery will continue in the Inbox.",
    }

    expect(await screen.findByText(expected.title)).toBeInTheDocument()
    expect(await screen.findByText(expected.description)).toBeInTheDocument()
    expect(await screen.findByText(expected.inboxText)).toBeInTheDocument()

    const button = await screen.findByRole("link")
    expect(button).toHaveAttribute("href", "/user/conversations")
    expect(within(button).getByText("Go to Inbox")).toBeInTheDocument()
  })

  it("close button closes modal", async () => {
    renderWithRelay(mockedResolver)

    expect(await screen.findByRole("dialog")).toBeInTheDocument()

    fireEvent.click(screen.getByLabelText("Close"))

    await waitFor(() =>
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument(),
    )
  })

  it("links to proper conversation when conversation id is present", async () => {
    renderWithRelay(mockedResolverWithConversation)

    const button = await screen.findByRole("link")
    expect(button).toHaveAttribute("href", "/user/conversations/12345")
    expect(within(button).getByText("Go to Inbox")).toBeInTheDocument()
  })
})
