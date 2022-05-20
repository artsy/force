import { graphql } from "react-relay"
import { setupTestWrapperTL } from "v2/DevTools/setupTestWrapper"
import { screen, within, fireEvent, waitFor } from "@testing-library/react"
import { SubmittedOrderModalFragmentContainer } from ".."

jest.unmock("react-relay")

const mockedResolver = {
  Me: () => ({
    orders: {
      edges: [
        {
          node: {
            stateExpiresAt: "Feb 28",
            lineItems: { edges: [{ node: { artwork: { slug: "424242" } } }] },
          },
        },
      ],
    },
  }),
}

describe("SubmittedOrderModal", () => {
  const { renderWithRelay } = setupTestWrapperTL({
    Component: ({ me }: any) => (
      <SubmittedOrderModalFragmentContainer slug="424242" me={me} />
    ),
    query: graphql`
      query SubmittedOrderModal_Test_Query {
        me {
          ...SubmittedOrderModal_me
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
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument()
    )
  })
})
