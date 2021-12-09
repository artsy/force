import { graphql } from "react-relay"
import { setupTestWrapperTL } from "v2/DevTools/setupTestWrapper"
import { ConversationCTAFragmentContainer } from "../ConversationCTA"
import { useTracking } from "react-tracking"
import { useSystemContext as baseUseSystemContext } from "v2/System/useSystemContext"
import { screen, fireEvent } from "@testing-library/react"

jest.unmock("react-relay")
jest.mock("react-tracking")
jest.mock("v2/System/useSystemContext")

describe("ConversationCTA", () => {
  const openInquiryModalFn = jest.fn()
  const openOrderModal = jest.fn()
  const { renderWithRelay } = setupTestWrapperTL({
    Component: (props: any) => {
      return (
        <ConversationCTAFragmentContainer
          conversation={props.me.conversation}
          openInquiryModal={openInquiryModalFn}
          openOrderModal={openOrderModal}
        />
      )
    },
    query: graphql`
      query ConversationCTA_Test_Query @relay_test_operation {
        me {
          conversation(id: "1234") {
            ...ConversationCTA_conversation
          }
        }
      }
    `,
  })

  const mockuseTracking = useTracking as jest.Mock
  const trackingSpy = jest.fn()
  let useSystemContext = baseUseSystemContext as jest.Mock

  beforeEach(() => {
    mockuseTracking.mockImplementation(() => ({
      trackEvent: trackingSpy,
    }))

    useSystemContext.mockImplementation(() => {
      return {
        mediator: {
          on: jest.fn(),
          off: jest.fn(),
        },
      }
    })
  })

  afterEach(() => {
    jest.resetAllMocks()
  })

  it("renders the correct CTA when an offer has been received", () => {
    renderWithRelay({
      Conversation: () => ({
        activeOrders: {
          edges: [{ node: { buyerAction: "OFFER_RECEIVED" } }],
        },
      }),
    })

    expect(screen.getByText("Offer Received")).toBeInTheDocument()
  })

  it("renders the correct CTA when payment has failed", () => {
    renderWithRelay({
      Conversation: () => ({
        activeOrders: {
          edges: [{ node: { buyerAction: "PAYMENT_FAILED" } }],
        },
      }),
    })

    expect(screen.getByText("Payment Failed")).toBeInTheDocument()
  })

  it("renders the correct CTA when offer is accepted", () => {
    renderWithRelay({
      Conversation: () => ({
        activeOrders: {
          edges: [{ node: { buyerAction: "OFFER_ACCEPTED" } }],
        },
      }),
    })

    expect(
      screen.getByText("Congratulations! Offer Accepted")
    ).toBeInTheDocument()
  })

  it("renders the correct CTA when offer is accepted but confirmation is needed", () => {
    renderWithRelay({
      Conversation: () => ({
        activeOrders: {
          edges: [{ node: { buyerAction: "OFFER_ACCEPTED_CONFIRM_NEEDED" } }],
        },
      }),
    })

    expect(
      screen.getByText("Offer Accepted - Confirm total")
    ).toBeInTheDocument()
  })

  it("renders the correct CTA when offer is received but confirmation is needed", () => {
    renderWithRelay({
      Conversation: () => ({
        activeOrders: {
          edges: [{ node: { buyerAction: "OFFER_RECEIVED_CONFIRM_NEEDED" } }],
        },
      }),
    })

    expect(
      screen.getByText("Counteroffer Received - Confirm Total")
    ).toBeInTheDocument()
  })

  it("renders the correct CTA when a provisional offer is accepted", () => {
    renderWithRelay({
      Conversation: () => ({
        activeOrders: {
          edges: [{ node: { buyerAction: "PROVISIONAL_OFFER_ACCEPTED" } }],
        },
      }),
    })

    expect(screen.getByText("Offer Accepted")).toBeInTheDocument()
  })

  it("doesn't render the cta when there is no active offer", () => {
    renderWithRelay({
      Conversation: () => ({
        activeOrders: {},
      }),
    })

    expect(screen.queryAllByText(/.+/g)).toStrictEqual([])
  })

  it("clicking the review offer CTA opens the order modal", () => {
    renderWithRelay({
      Conversation: () => ({
        activeOrders: {
          edges: [{ node: { buyerAction: "OFFER_RECEIVED" } }],
        },
      }),
    })
    fireEvent.click(screen.getByText("Offer Received"))

    expect(openOrderModal).toHaveBeenCalledTimes(1)
  })
})
