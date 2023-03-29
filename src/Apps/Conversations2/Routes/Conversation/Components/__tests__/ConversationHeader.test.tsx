import { graphql } from "relay-runtime"
import { fireEvent, screen } from "@testing-library/react"
import { setupTestWrapper } from "utils/test/setupTestWrapper"
import { ConversationHeader } from "../ConversationHeader"
import { ConversationHeaderTestQuery } from "__generated__/ConversationHeaderTestQuery.graphql"
import mockRouter from "next-router-mock"
import { MediaContextProvider } from "utils/responsive"
import { useTracking } from "react-tracking"

jest.mock("next/router", () => require("next-router-mock"))

jest.mock("next/config", () => () => ({
  publicRuntimeConfig: {
    NEXT_PUBLIC_VOLT_V1_URL: "homepage",
  },
}))

jest.mock("react-tracking")

describe("ConversationDetails", () => {
  let breakpoint: "md" | "sm"
  const onGoToConversations = jest.fn()
  const onGoToDetails = jest.fn()
  const mockTracking = useTracking as jest.Mock
  const trackEvent = jest.fn()

  const { renderWithRelay } = setupTestWrapper<ConversationHeaderTestQuery>({
    Component: ({ viewer }) => (
      <MediaContextProvider onlyMatch={[breakpoint]}>
        <ConversationHeader
          viewer={viewer!}
          onGoToConversations={onGoToConversations}
          onGoToDetails={onGoToDetails}
        />
      </MediaContextProvider>
    ),
    query: graphql`
      query ConversationHeaderTestQuery @relay_test_operation {
        viewer {
          ...ConversationHeader_viewer
            @arguments(conversationId: "conversation-id", sellerId: "123")
        }
      }
    `,
  })

  beforeEach(() => {
    jest.clearAllMocks()
    mockTracking.mockImplementation(() => ({ trackEvent }))

    mockRouter.query = { conversationId: "123" }
    breakpoint = "md"
  })

  it("renders", () => {
    renderWithRelay({
      Conversation: () => ({
        internalID: "conversation-id",
        from: { name: "Lidiane Taquehara" },
        createdAt: "Dec 07",
        unread: false,
        fromUser: {
          collectorProfile: {
            confirmedBuyerAt: "2022-12-07T21:03:20+00:00",
          },
        },
      }),
      ConversationItemType: () => ({
        __typename: "Artwork",
        title: "Demo title",
        slug: "demo-slug-42",
        date: "2022",
        artist: { name: "Edgar the doggo" },
        image: {
          url: "https://imamges.com/img.png",
        },
      }),
    })

    expect(screen.getByText("From Lidiane Taquehara")).toBeInTheDocument()
    expect(screen.getByAltText("Artwork image of Demo title")).toHaveAttribute(
      "src",
      "https://imamges.com/img.png"
    )
    expect(screen.getByText("Edgar the doggo")).toBeInTheDocument()
    expect(screen.getByText("Demo title")).toBeInTheDocument()
    expect(screen.getByText(", 2022")).toBeInTheDocument()
    expect(screen.getByText("View Artwork")).toBeInTheDocument()
    expect(screen.getByRole("link")).toHaveAttribute(
      "href",
      "homepage/artworks/demo-slug-42"
    )
  })

  it("tracks click on View Artwork", () => {
    renderWithRelay({
      ConversationItemType: () => ({ id: "mocked-artwork-id" }),
    })

    fireEvent.click(screen.getByText("View Artwork"))

    expect(trackEvent).toHaveBeenCalledTimes(1)
    expect(trackEvent.mock.calls[0][0]).toMatchObject({
      action: "Click",
      label: "View artwork",
      context_module: "conversations",
      artwork_id: "mocked-artwork-id",
    })
  })

  describe("sm breakpoint", () => {
    beforeEach(() => {
      breakpoint = "sm"
    })

    it("clicking collector's name goes to the conversations list", () => {
      renderWithRelay()

      fireEvent.click(screen.getByTestId("go-to-conversation-button"))

      expect(onGoToConversations).toHaveBeenCalledTimes(1)
    })

    it("clicking Review CTA goes to the conversation details", () => {
      renderWithRelay({
        ConversationItemType: () => ({ id: "mocked-artwork-id" }),
      })

      fireEvent.click(screen.getByText("Review"))

      expect(trackEvent).toHaveBeenCalledTimes(1)
      expect(trackEvent.mock.calls[0][0]).toMatchObject({
        action: "Click",
        label: "Review",
        context_module: "conversations",
        artwork_id: "mocked-artwork-id",
      })

      expect(onGoToDetails).toHaveBeenCalledTimes(1)
    })

    it("Review CTA is primary when there is a submitted order", () => {
      renderWithRelay({
        CommerceOrderConnectionWithTotalCount: () => ({
          edges: [{ node: { state: "SUBMITTED" } }],
        }),
      })

      expect(screen.getAllByRole("button")[1]).not.toHaveStyle(
        "background-color: transparent"
      )
    })

    it("Review CTA is secondary when the associated order needs no action from the partner", () => {
      renderWithRelay()

      expect(screen.getAllByRole("button")[1]).toHaveStyle(
        "background-color: transparent"
      )
    })

    it("clicking the artwork info goes to the conversation details", () => {
      renderWithRelay({
        ConversationItemType: () => ({
          id: "mocked-artwork-id",
          title: "Timeless Modern Prints",
        }),
      })

      fireEvent.click(screen.getByText("Timeless Modern Prints"))

      expect(trackEvent).toHaveBeenCalledTimes(1)
      expect(trackEvent.mock.calls[0][0]).toMatchObject({
        action: "Click",
        label: "View conversation artwork",
        context_module: "conversations",
        artwork_id: "mocked-artwork-id",
      })

      expect(onGoToDetails).toHaveBeenCalledTimes(1)
    })
  })
})
