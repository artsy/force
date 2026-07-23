import { screen } from "@testing-library/react"
import { useFlag } from "@unleash/proxy-client-react"
import { ConversationsProvider } from "Apps/Conversations/ConversationsContext"
import { ConversationCTA } from "Apps/Conversations/components/ConversationCTA/ConversationCTA"
import { setupTestWrapperTL } from "DevTools/setupTestWrapperTL"
import { useSystemContext as baseUseSystemContext } from "System/Hooks/useSystemContext"
import { graphql } from "react-relay"
import { useTracking } from "react-tracking"

jest.unmock("react-relay")
jest.mock("react-tracking")
jest.mock("System/Hooks/useSystemContext")

const mockUseFlag = useFlag as jest.Mock

describe("ConversationCTA", () => {
  const { renderWithRelay } = setupTestWrapperTL({
    Component: (props: any) => (
      <ConversationsProvider conversation={props.me.conversation}>
        <ConversationCTA conversation={props.me.conversation} />
      </ConversationsProvider>
    ),
    query: graphql`
      query ConversationCTA_Test_Query @relay_test_operation {
        me {
          conversation(id: "1234") {
            ...ConversationsContext_conversation
            ...ConversationCTA_conversation
          }
        }
      }
    `,
  })

  // Merges a collector partner offer onto a conversation mock, so the provider
  // (which now reads offers from the conversation) sees it.
  const withOffer =
    (
      conversationThunk: () => Record<string, unknown>,
      offerOverrides: Record<string, unknown> = {},
    ) =>
    () => {
      const futureTime = new Date()
      futureTime.setHours(futureTime.getHours() + 1)

      return {
        ...conversationThunk(),
        collectorPartnerOffersConnection: {
          edges: [
            {
              node: {
                internalID: "partner-offer-id",
                artworkId: "artwork-id",
                endAt: futureTime.toISOString(),
                isAvailable: true,
                ...offerOverrides,
              },
            },
          ],
        },
      }
    }

  const mockuseTracking = useTracking as jest.Mock
  const trackingSpy = jest.fn()
  const useSystemContext = baseUseSystemContext as jest.Mock

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
      screen.getByText("Congratulations! Offer Accepted"),
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
      screen.getByText("Offer Accepted - Confirm total"),
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
      screen.getByText("Counteroffer Received - Confirm Total"),
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

  describe("with an active order and an open partner offer", () => {
    const mockConversationWithOrderAndOffer = () => ({
      internalID: "internal-test-id",
      activeOrders: {
        edges: [{ node: { buyerAction: "OFFER_RECEIVED" } }],
      },
      activeOrderCTA: {
        edges: [
          { node: { internalID: "order-id", buyerAction: "OFFER_RECEIVED" } },
        ],
      },
      items: [
        {
          liveArtwork: {
            __typename: "Artwork",
            internalID: "artwork-id",
            isAcquireable: true,
            published: true,
          },
        },
      ],
    })

    describe("with the partner-offer-convo flag on", () => {
      beforeEach(() => {
        mockUseFlag.mockImplementation(() => true)
      })

      it("hides the order offer CTA when there is an open partner offer", () => {
        renderWithRelay({
          Conversation: withOffer(mockConversationWithOrderAndOffer),
        })

        expect(screen.queryByText("Offer Received")).not.toBeInTheDocument()
      })
    })

    describe("with the partner-offer-convo flag off", () => {
      beforeEach(() => {
        mockUseFlag.mockImplementation(() => false)
      })

      it("shows the order offer CTA when the flag is off", () => {
        renderWithRelay({
          Conversation: withOffer(mockConversationWithOrderAndOffer),
        })

        expect(screen.queryByText("Offer Received")).toBeInTheDocument()
      })
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
      pastTime.setHours(pastTime.getHours() - 1)

      renderWithRelay({
        Conversation: withOffer(
          mockConversationWithArtwork({
            internalID: "artwork-id",
            isAcquireable: false,
          }),
          { endAt: pastTime.toISOString() },
        ),
      })

      expect(screen.queryByText("Purchase")).not.toBeInTheDocument()
      expect(screen.queryByText("Make an Offer")).not.toBeInTheDocument()
    })

    // The `collectorPartnerOffersConnection` query fetches both `BULK` (sent via the
    // partner dashboard's send-offer tool) and `PERSONALIZED` offer types.
    // Force can't distinguish between the two once fetched, so both should
    // behave identically here.
    describe.each([
      ["a personalized partner offer"],
      ["a bulk offer (send offer)"],
    ])("with %s", () => {
      describe("with the partner-offer-convo flag on", () => {
        beforeEach(() => {
          mockUseFlag.mockImplementation(() => true)
        })

        it("hides the transaction buttons when there is an active offer", () => {
          renderWithRelay({
            Conversation: withOffer(
              mockConversationWithArtwork({
                internalID: "artwork-id",
                isAcquireable: true,
                isOfferable: true,
              }),
            ),
          })

          expect(screen.queryByText("Purchase")).not.toBeInTheDocument()
          expect(screen.queryByText("Make an Offer")).not.toBeInTheDocument()
        })

        it("falls back to showing the transaction buttons once the offer expires", () => {
          const pastTime = new Date()
          pastTime.setHours(pastTime.getHours() - 1)

          renderWithRelay({
            Conversation: withOffer(
              mockConversationWithArtwork({
                internalID: "artwork-id",
                isAcquireable: true,
                isOfferable: true,
              }),
              { endAt: pastTime.toISOString() },
            ),
          })

          expect(screen.queryByText("Purchase")).toBeInTheDocument()
          expect(screen.queryByText("Make an Offer")).toBeInTheDocument()
        })
      })

      describe("with the partner-offer-convo flag off", () => {
        beforeEach(() => {
          mockUseFlag.mockImplementation(() => false)
        })

        it("ignores the offer and shows the normal transaction buttons", () => {
          renderWithRelay({
            Conversation: withOffer(
              mockConversationWithArtwork({
                internalID: "artwork-id",
                isAcquireable: true,
              }),
            ),
          })
          expect(screen.queryByText("Purchase")).toBeInTheDocument()
        })
      })
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
