import { fireEvent, screen } from "@testing-library/react"
import { setupTestWrapperTL } from "DevTools/setupTestWrapper"
import { ReviewOrderButton } from "Apps/Conversations/components/Details/OrderInformation/ReviewOrderButton"
import { ReviewOrderButtonTestQuery } from "__generated__/ReviewOrderButtonTestQuery.graphql"
import { useTracking } from "react-tracking"
import { graphql } from "react-relay"

jest.unmock("react-relay")
jest.mock("react-tracking")

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

describe("ReviewOrderButton", () => {
  const mockTracking = useTracking as jest.Mock
  const trackEvent = jest.fn()

  const expectedTrackingData = {
    action: "Click",
    context_module: "conversations",
    artwork_id: "mocked-artwork-id",
  }

  const { renderWithRelay } = setupTestWrapperTL<ReviewOrderButtonTestQuery>({
    Component: ({ commerceOrder }) => (
      <ReviewOrderButton order={commerceOrder!} />
    ),
    query: graphql`
      query ReviewOrderButtonTestQuery @relay_test_operation {
        commerceOrder(id: "1234") {
          ...ReviewOrderButton_order
        }
      }
    `,
  })

  beforeEach(() => {
    jest.clearAllMocks()
    mockTracking.mockImplementation(() => ({ trackEvent }))
  })

  it("renders Review Offer button given an Offer from the Collector", () => {
    renderWithRelay({
      CommerceOrder: () => ({
        state: "SUBMITTED",
        mode: "OFFER",
        lastOffer: offer,
        lineItems: {
          edges: [{ node: { artwork: { id: "mocked-artwork-id" } } }],
        },
      }),
    })

    expect(screen.getByText("Review Offer")).toBeInTheDocument()
    expect(screen.getByRole("button")).not.toHaveStyle(`
      background-color: transparent
    `)

    fireEvent.click(screen.getByText("Review Offer"))

    expect(trackEvent).toHaveBeenCalledTimes(1)
    expect(trackEvent.mock.calls[0][0]).toMatchObject({
      label: "Review Offer",
      ...expectedTrackingData,
    })
  })

  it("renders Review Counteroffer button given a counteroffer from the Collector", () => {
    renderWithRelay({
      CommerceOrder: () => ({
        state: "SUBMITTED",
        mode: "OFFER",
        lastOffer: collectorCounterOffer,
        lineItems: {
          edges: [{ node: { artwork: { id: "mocked-artwork-id" } } }],
        },
      }),
    })

    expect(screen.getByText("Review Counteroffer")).toBeInTheDocument()
    expect(screen.getByRole("button")).not.toHaveStyle(`
      background-color: transparent
    `)

    fireEvent.click(screen.getByText("Review Counteroffer"))

    expect(trackEvent).toHaveBeenCalledTimes(1)
    expect(trackEvent.mock.calls[0][0]).toMatchObject({
      label: "Review Counteroffer",
      ...expectedTrackingData,
    })
  })

  it("renders Review Counteroffer button given a counteroffer from the Partner", () => {
    renderWithRelay({
      CommerceOrder: () => ({
        state: "SUBMITTED",
        mode: "OFFER",
        lastOffer: partnerCounterOffer,
        lineItems: {
          edges: [{ node: { artwork: { id: "mocked-artwork-id" } } }],
        },
      }),
    })

    expect(screen.getByText("View Offer")).toBeInTheDocument()
    expect(screen.getByRole("button")).toHaveStyle(`
      background-color: transparent
    `)

    fireEvent.click(screen.getByText("View Offer"))

    expect(trackEvent).toHaveBeenCalledTimes(1)
    expect(trackEvent.mock.calls[0][0]).toMatchObject({
      label: "View Offer",
      ...expectedTrackingData,
    })
  })

  it("renders View Offer button given APPROVED Offer", () => {
    renderWithRelay({
      CommerceOrder: () => ({
        state: "APPROVED",
        mode: "OFFER",
        lastOffer: offer,
        lineItems: {
          edges: [{ node: { artwork: { id: "mocked-artwork-id" } } }],
        },
      }),
    })

    expect(screen.getByText("View Offer")).toBeInTheDocument()
    expect(screen.getByRole("button")).toHaveStyle(`
      background-color: transparent
    `)

    fireEvent.click(screen.getByText("View Offer"))

    expect(trackEvent).toHaveBeenCalledTimes(1)
    expect(trackEvent.mock.calls[0][0]).toMatchObject({
      label: "View Offer",
      ...expectedTrackingData,
    })
  })

  it("renders Review Order button given SUBMITTED Order", () => {
    renderWithRelay({
      CommerceOrder: () => ({
        state: "SUBMITTED",
        mode: "BUY",
        __typename: "CommerceBuyOrder",
        lineItems: {
          edges: [{ node: { artwork: { id: "mocked-artwork-id" } } }],
        },
      }),
    })

    expect(screen.getByText("Review Order")).toBeInTheDocument()
    expect(screen.getByRole("button")).not.toHaveStyle(`
      background-color: transparent
    `)

    fireEvent.click(screen.getByText("Review Order"))

    expect(trackEvent).toHaveBeenCalledTimes(1)
    expect(trackEvent.mock.calls[0][0]).toMatchObject({
      label: "Review Order",
      ...expectedTrackingData,
    })
  })

  it("renders View Order button given APPROVED Order", () => {
    renderWithRelay({
      CommerceOrder: () => ({
        state: "APPROVED",
        mode: "BUY",
        __typename: "CommerceBuyOrder",
        lineItems: {
          edges: [{ node: { artwork: { id: "mocked-artwork-id" } } }],
        },
      }),
    })

    expect(screen.getByText("View Order")).toBeInTheDocument()
    expect(screen.getByRole("button")).toHaveStyle(`
      background-color: transparent
    `)

    fireEvent.click(screen.getByText("View Order"))

    expect(trackEvent).toHaveBeenCalledTimes(1)
    expect(trackEvent.mock.calls[0][0]).toMatchObject({
      label: "View Order",
      ...expectedTrackingData,
    })
  })

  it("button takes to the order page", () => {
    renderWithRelay({
      CommerceOrder: () => ({
        id: "mocked-order-id",
        state: "APPROVED",
        mode: "BUY",
        __typename: "CommerceBuyOrder",
      }),
    })

    expect(screen.getByRole("link")).toHaveAttribute(
      "href",
      "/orders/mocked-order-id/status?backToConversationId=conversation-id"
    )
  })
})

const offer = {
  from: { __typename: "CommerceUser" },
  offerAmountChanged: false,
}

const collectorCounterOffer = {
  from: { __typename: "CommerceUser" },
  offerAmountChanged: true,
}

const partnerCounterOffer = {
  from: { __typename: "CommercePartner" },
  offerAmountChanged: true,
}
