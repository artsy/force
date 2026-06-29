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
      <ConversationsProvider>
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
      }
    `,
  })

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
    const futureTime = new Date()
    futureTime.setHours(futureTime.getHours() + 1)

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
      partnerOffersConnection: {
        edges: [
          {
            node: {
              internalID: "partner-offer-id",
              endAt: futureTime.toISOString(),
              isAvailable: true,
            },
          },
        ],
      },
    })

    describe("with the partner-offer-convo flag on", () => {
      beforeEach(() => {
        mockUseFlag.mockImplementation(() => true)
      })

      it("hides the order offer CTA when there is an open partner offer", () => {
        renderWithRelay({
          Conversation: mockConversationWithOrderAndOffer,
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
          Conversation: mockConversationWithOrderAndOffer,
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
      const expiredTime = new Date()
      expiredTime.setHours(expiredTime.getHours() - 1)

      renderWithRelay({
        Conversation: () => ({
          ...mockConversationWithArtwork({
            internalID: "artwork-id",
            isAcquireable: false,
          })(),
          partnerOffersConnection: {
            edges: [
              {
                node: {
                  internalID: "partner-offer-id",
                  endAt: expiredTime.toISOString(),
                  isAvailable: true,
                },
              },
            ],
          },
        }),
      })

      expect(screen.queryByText("Purchase")).not.toBeInTheDocument()
      expect(screen.queryByText("Make an Offer")).not.toBeInTheDocument()
    })

    const conversationWithActiveOffer = artwork => () => {
      const futureTime = new Date()
      futureTime.setHours(futureTime.getHours() + 1)

      return {
        ...mockConversationWithArtwork(artwork)(),
        partnerOffersConnection: {
          edges: [
            {
              node: {
                internalID: "partner-offer-id",
                endAt: futureTime.toISOString(),
                isAvailable: true,
              },
            },
          ],
        },
      }
    }

    describe("with the partner-offer-convo flag on", () => {
      beforeEach(() => {
        mockUseFlag.mockImplementation(() => true)
      })

      it("hides the transaction buttons when there is an active partner offer", () => {
        renderWithRelay({
          Conversation: conversationWithActiveOffer({
            internalID: "artwork-id",
            isAcquireable: true,
          }),
        })

        expect(screen.queryByText("Purchase")).not.toBeInTheDocument()
        expect(screen.queryByText("Make an Offer")).not.toBeInTheDocument()
      })
    })

    describe("with the partner-offer-convo flag off", () => {
      beforeEach(() => {
        mockUseFlag.mockImplementation(() => false)
      })

      it("ignores the partner offer and shows the normal transaction buttons", () => {
        renderWithRelay({
          Conversation: conversationWithActiveOffer({
            internalID: "artwork-id",
            isAcquireable: true,
          }),
        })
        expect(screen.queryByText("Purchase")).toBeInTheDocument()
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
