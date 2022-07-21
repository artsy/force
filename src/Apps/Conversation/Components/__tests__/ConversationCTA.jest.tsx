import { graphql } from "react-relay"
import { setupTestWrapperTL } from "DevTools/setupTestWrapper"
import { ConversationCTAFragmentContainer } from "../ConversationCTA"
import { useTracking } from "react-tracking"
import { useSystemContext as baseUseSystemContext } from "System/useSystemContext"
import { screen, fireEvent } from "@testing-library/react"

jest.unmock("react-relay")
jest.mock("react-tracking")
jest.mock("System/useSystemContext")

describe("ConversationCTA", () => {
  const openInquiryModalFn = jest.fn()
  const openOrderModal = jest.fn()
  const { renderWithRelay } = setupTestWrapperTL({
    Component: (props: any) => (
      <ConversationCTAFragmentContainer
        conversation={props.me.conversation}
        openInquiryModal={openInquiryModalFn}
        openOrderModal={openOrderModal}
      />
    ),
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

  beforeAll(() => {
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

  // FIXME: Unpend test. Relay 10 upgrade
  it.skip("doesn't render the cta when there is no active offer", () => {
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

  describe("With no active orders", () => {
    const mockConversationWithArtwork = artwork => () => ({
      internalID: "internal-test-id",
      activeOrders: null,
      items: [{ liveArtwork: { __typename: "Artwork", ...artwork } }],
    })

    beforeAll(() => {
      ;(useSystemContext as jest.Mock).mockImplementation(() => ({
        featureFlags: { "conversational-buy-now": { flagEnabled: true } },
      }))
    })

    it("renders a message about buyer guarantee", () => {
      renderWithRelay({
        Conversation: () => ({ activeOrders: null }),
      })

      const link = screen.getByText("The Artsy Guarantee")
      expect(link).toBeInTheDocument()
      expect(link).toHaveAttribute("href", "/buyer-guarantee")
    })

    it("renders Purchase button on BN-only artworks", () => {
      renderWithRelay({
        Conversation: mockConversationWithArtwork({ is_acquireable: true }),
      })

      expect(screen.queryByText("Purchase")).toBeInTheDocument()
      expect(screen.queryByText("Make an Offer")).not.toBeInTheDocument()
    })

    it("renders Make Offer button on MO-only artworks", () => {
      renderWithRelay({
        Conversation: mockConversationWithArtwork({ is_offerable: true }),
      })

      expect(screen.queryByText("Purchase")).not.toBeInTheDocument()
      expect(screen.queryByText("Make an Offer")).toBeInTheDocument()
    })

    it("renders Make Offer button on offerable-from-inquiry artworks", () => {
      renderWithRelay({
        Conversation: mockConversationWithArtwork({
          isOfferableFromInquiry: true,
        }),
      })

      expect(screen.queryByText("Purchase")).not.toBeInTheDocument()
      expect(screen.queryByText("Make an Offer")).toBeInTheDocument()
    })

    it("renders both Purchase and Make Offer buttons on BNMO artworks", () => {
      renderWithRelay({
        Conversation: mockConversationWithArtwork({
          is_acquireable: true,
          is_offerable: true,
        }),
      })

      expect(screen.queryByText("Purchase")).toBeInTheDocument()
      expect(screen.queryByText("Make an Offer")).toBeInTheDocument()
    })
  })
})
