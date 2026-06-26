import { screen } from "@testing-library/react"
import { useFlag } from "@unleash/proxy-client-react"
import { ConversationsProvider } from "Apps/Conversations/ConversationsContext"
import { ConversationPartnerOfferUpdate } from "Apps/Conversations/components/Message/ConversationPartnerOfferUpdate"
import { setupTestWrapperTL } from "DevTools/setupTestWrapperTL"
import { graphql } from "react-relay"

jest.unmock("react-relay")

const mockUseFlag = useFlag as jest.Mock

beforeEach(() => {
  mockUseFlag.mockImplementation(() => true)
})

const futureDate = () => {
  const date = new Date()
  date.setHours(date.getHours() + 1)
  return date.toISOString()
}

const pastDate = () => {
  const date = new Date()
  date.setHours(date.getHours() - 1)
  return date.toISOString()
}

const { renderWithRelay } = setupTestWrapperTL({
  Component: (props: any) => (
    <ConversationsProvider viewer={props.viewer}>
      <ConversationPartnerOfferUpdate conversation={props.me.conversation} />
    </ConversationsProvider>
  ),
  query: graphql`
    query ConversationPartnerOfferUpdate_Test_Query @relay_test_operation {
      me {
        conversation(id: "conversation-id") {
          ...ConversationPartnerOfferUpdate_conversation
        }
      }
      viewer {
        ...ConversationsContext_viewer
      }
    }
  `,
})

const Conversation = () => ({
  items: [
    {
      item: {
        __typename: "Artwork",
        internalID: "artwork-id",
      },
    },
  ],
})

const offerViewer = (offer: Record<string, unknown>) => () => ({
  me: {
    partnerOffersConnection: {
      edges: [
        {
          node: {
            internalID: "partner-offer-id",
            artworkId: "artwork-id",
            isAvailable: true,
            priceWithDiscount: { display: "$450" },
            endAt: futureDate(),
            ...offer,
          },
        },
      ],
    },
  },
})

const ConversationWithMatchingOrder =
  (buyerState = "SUBMITTED") =>
  () => ({
    ...Conversation(),
    collectorOrdersConnection: {
      edges: [
        {
          node: {
            buyerState,
            lineItems: [{ partnerOfferId: "partner-offer-id" }],
          },
        },
      ],
    },
  })

const ConversationWithNonMatchingOrder = () => ({
  ...Conversation(),
  collectorOrdersConnection: {
    edges: [
      {
        node: {
          buyerState: "SUBMITTED",
          lineItems: [{ partnerOfferId: "some-other-offer-id" }],
        },
      },
    ],
  },
})

describe("ConversationPartnerOfferUpdate", () => {
  it("renders the offer message with the discounted price", () => {
    renderWithRelay({ Conversation, Viewer: offerViewer({}) })

    expect(
      screen.getByText("You received an offer for $450"),
    ).toBeInTheDocument()
  })

  it("falls back to a generic message when there is no discounted price", () => {
    renderWithRelay({
      Conversation,
      Viewer: offerViewer({ priceWithDiscount: null }),
    })

    expect(screen.getByText("You received an offer")).toBeInTheDocument()
  })

  it("renders nothing when there is no offer for the artwork", () => {
    renderWithRelay({
      Conversation,
      Viewer: () => ({
        me: {
          partnerOffersConnection: { edges: [] },
        },
      }),
    })

    expect(screen.queryByText(/You received an offer/)).not.toBeInTheDocument()
  })

  it("renders an expired message when the offer has expired", () => {
    renderWithRelay({
      Conversation,
      Viewer: offerViewer({ endAt: pastDate() }),
    })

    expect(screen.getByText("Offer Expired")).toBeInTheDocument()
    expect(screen.queryByText(/You received an offer/)).not.toBeInTheDocument()
  })

  it("renders an expired message when the offer is unavailable", () => {
    renderWithRelay({
      Conversation,
      Viewer: offerViewer({ isAvailable: false }),
    })

    expect(screen.getByText("Offer Expired")).toBeInTheDocument()
    expect(screen.queryByText(/You received an offer/)).not.toBeInTheDocument()
  })

  it("still shows the offer when there is an order that does not match the partner offer", () => {
    renderWithRelay({
      Conversation: ConversationWithNonMatchingOrder,
      Viewer: offerViewer({}),
    })

    expect(
      screen.getByText("You received an offer for $450"),
    ).toBeInTheDocument()
    expect(
      screen.queryByText("You purchased this artwork"),
    ).not.toBeInTheDocument()
  })

  it("renders 'You purchased this artwork' when an order's line item matches the partner offer", () => {
    renderWithRelay({
      Conversation: ConversationWithMatchingOrder(),
      Viewer: offerViewer({}),
    })

    expect(screen.getByText("You purchased this artwork")).toBeInTheDocument()
    expect(screen.queryByText(/You received an offer/)).not.toBeInTheDocument()
  })

  it.each(["INCOMPLETE", "CANCELED"])(
    "still shows the offer when the matching order has buyerState %s",
    buyerState => {
      renderWithRelay({
        Conversation: ConversationWithMatchingOrder(buyerState),
        Viewer: offerViewer({}),
      })

      expect(
        screen.getByText("You received an offer for $450"),
      ).toBeInTheDocument()
      expect(
        screen.queryByText("You purchased this artwork"),
      ).not.toBeInTheDocument()
    },
  )

  it("renders nothing when the partner-offer-convo flag is off", () => {
    mockUseFlag.mockImplementation(() => false)

    renderWithRelay({ Conversation, Viewer: offerViewer({}) })

    expect(screen.queryByText(/You received an offer/)).not.toBeInTheDocument()
  })
})
