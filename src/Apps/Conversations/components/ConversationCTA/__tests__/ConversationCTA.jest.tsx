import { graphql } from "react-relay"
import { setupTestWrapperTL } from "DevTools/setupTestWrapper"
import { useTracking } from "react-tracking"
import { useSystemContext as baseUseSystemContext } from "System/Hooks/useSystemContext"
import { screen, fireEvent, waitFor } from "@testing-library/react"
import { ConversationCTA } from "Apps/Conversations/components/ConversationCTA/ConversationCTA"
import { ConversationsProvider } from "Apps/Conversations/ConversationsContext"

jest.unmock("react-relay")
jest.mock("react-tracking")
jest.mock("System/Hooks/useSystemContext")

describe("ConversationCTA", () => {
  const { renderWithRelay } = setupTestWrapperTL({
    Component: (props: any) => (
      <ConversationsProvider viewer={props.viewer}>
        <ConversationCTA conversation={props.me.conversation} />
      </ConversationsProvider>
    ),
    query: graphql`
      query ConversationCTA_Test_Query @relay_test_operation {
        me {
          conversation(id: "1234") {
            ...ConversationCTA_conversation
          }
        }
        viewer {
          ...ConversationsContext_viewer
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
      return {}
    })
  })

  it("renders the correct CTA when an offer has been received", () => {
    renderWithRelay({
      Conversation: () => ({
        activeOrders: {
          edges: [{ node: { buyerAction: "OFFER_RECEIVED" } }],
        },
        activeOrderCTA: {
          edges: [
            {
              node: {
                internalID: "foo",
              },
            },
          ],
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

  it("clicking the review offer CTA opens the order modal", async () => {
    renderWithRelay({
      Conversation: () => ({
        activeOrders: {
          edges: [{ node: { buyerAction: "OFFER_RECEIVED" } }],
        },
      }),
    })

    fireEvent.click(screen.getByText("Offer Received"))

    await waitFor(() => {
      expect(screen.getByTestId("orderModal")).toBeInTheDocument()
    })
  })

  describe("With no active orders", () => {
    const mockConversationWithArtwork = artwork => () => ({
      internalID: "internal-test-id",
      activeOrderCTA: null,
      items: [
        { liveArtwork: { __typename: "Artwork", ...artwork, published: true } },
      ],
    })

    it("renders a message about buyer guarantee", () => {
      renderWithRelay({
        Conversation: () => ({ activeOrderCTA: null }),
      })

      const link = screen.getByText("The Artsy Guarantee")
      expect(link).toBeInTheDocument()
      expect(link).toHaveAttribute("href", "/buyer-guarantee")
    })

    it("renders Purchase button on BN-only artworks", () => {
      renderWithRelay({
        Conversation: mockConversationWithArtwork({ isAcquireable: true }),
      })

      expect(screen.queryByText("Purchase")).toBeInTheDocument()
      expect(screen.queryByText("Make an Offer")).not.toBeInTheDocument()
    })

    it("does not purchase button on orders with an expired partner offer", () => {
      const pastTime = new Date()
      pastTime.setSeconds(pastTime.getSeconds() + 1)

      renderWithRelay({
        Conversation: mockConversationWithArtwork({
          internalID: "artwork-id",
          isAcquireable: false,
        }),
        Viewer: () => ({
          me: {
            partnerOffersConnection: {
              edges: [
                {
                  node: {
                    internalID: "partner-offer-id",
                    artworkId: "artwork-id",
                    endAt: pastTime.toISOString(),
                  },
                },
              ],
            },
          },
        }),
      })
      jest.advanceTimersByTime(1010)

      expect(screen.queryByText("Purchase")).not.toBeInTheDocument()
      expect(screen.queryByText("Make an Offer")).not.toBeInTheDocument()
    })
    it("renders purchase button on orders with an active partner offer", () => {
      const futureTime = new Date()
      futureTime.setHours(futureTime.getHours() + 1)

      renderWithRelay({
        Conversation: mockConversationWithArtwork({
          internalID: "artwork-id",
          isAcquireable: false,
        }),
        Viewer: () => ({
          me: {
            partnerOffersConnection: {
              edges: [
                {
                  node: {
                    internalID: "partner-offer-id",
                    artworkId: "artwork-id",
                    endAt: futureTime.toISOString(),
                  },
                },
              ],
            },
          },
        }),
      })

      expect(screen.queryByText("Purchase")).toBeInTheDocument()
      expect(screen.queryByText("Make an Offer")).not.toBeInTheDocument()
    })

    it("renders Make Offer button on MO-only artworks", () => {
      renderWithRelay({
        Conversation: mockConversationWithArtwork({ isOfferable: true }),
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
          isAcquireable: true,
          isOfferable: true,
        }),
      })

      expect(screen.queryByText("Purchase")).toBeInTheDocument()
      expect(screen.queryByText("Make an Offer")).toBeInTheDocument()
    })
  })
})
