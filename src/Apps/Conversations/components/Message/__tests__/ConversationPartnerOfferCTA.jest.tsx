import { screen } from "@testing-library/react"
import { THEME } from "@artsy/palette"
import { useFlag } from "@unleash/proxy-client-react"
import { ConversationsProvider } from "Apps/Conversations/ConversationsContext"
import { ConversationPartnerOfferCTA } from "Apps/Conversations/components/Message/ConversationPartnerOfferCTA"
import { setupTestWrapperTL } from "DevTools/setupTestWrapperTL"
import { DateTime, Settings } from "luxon"
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
      <ConversationPartnerOfferCTA conversation={props.me.conversation} />
    </ConversationsProvider>
  ),
  query: graphql`
    query ConversationPartnerOfferCTA_Test_Query @relay_test_operation {
      me {
        conversation(id: "conversation-id") {
          ...ConversationPartnerOfferCTA_conversation
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
        href: "/artwork/some-artwork",
      },
    },
  ],
  activeOrders: { edges: [] },
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

describe("ConversationPartnerOfferCTA", () => {
  it("renders the offer bar linking to the artwork with the partner offer id", () => {
    renderWithRelay({ Conversation, Viewer: offerViewer({}) })

    expect(screen.getByText("Offer received for $450")).toBeInTheDocument()

    expect(screen.getByTestId("partnerOfferActionLink")).toHaveAttribute(
      "href",
      expect.stringMatching(
        /^\/artwork\/some-artwork\?partner_offer_id=partner-offer-id&conversation_id=.+$/,
      ),
    )
  })

  it("falls back to a generic message when there is no discounted price", () => {
    renderWithRelay({
      Conversation,
      Viewer: offerViewer({ priceWithDiscount: null }),
    })

    expect(screen.getByText("Offer received")).toBeInTheDocument()
  })

  it("renders nothing when there is no offer for the artwork", () => {
    renderWithRelay({
      Conversation,
      Viewer: () => ({
        me: { partnerOffersConnection: { edges: [] } },
      }),
    })

    expect(
      screen.queryByTestId("partnerOfferActionLink"),
    ).not.toBeInTheDocument()
  })

  it("renders nothing when the offer has expired", () => {
    renderWithRelay({
      Conversation,
      Viewer: offerViewer({ endAt: pastDate() }),
    })

    expect(
      screen.queryByTestId("partnerOfferActionLink"),
    ).not.toBeInTheDocument()
  })

  it("renders nothing when the offer is unavailable", () => {
    renderWithRelay({
      Conversation,
      Viewer: offerViewer({ isAvailable: false }),
    })

    expect(
      screen.queryByTestId("partnerOfferActionLink"),
    ).not.toBeInTheDocument()
  })

  it("renders nothing when there is an active order", () => {
    renderWithRelay({
      Conversation: () => ({
        ...Conversation(),
        activeOrders: {
          edges: [{ node: { internalID: "order-id" } }],
        },
      }),
      Viewer: offerViewer({}),
    })

    expect(
      screen.queryByTestId("partnerOfferActionLink"),
    ).not.toBeInTheDocument()
  })

  describe("expiry countdown", () => {
    const NOW = DateTime.fromISO("2026-01-01T00:00:00.000Z").toMillis()

    beforeEach(() => {
      Settings.now = () => NOW
    })

    afterEach(() => {
      Settings.now = () => Date.now()
    })

    it("shows the time remaining when the offer expires in more than a day", () => {
      const endAt = DateTime.fromMillis(NOW).plus({ days: 3 }).toISO() as string

      renderWithRelay({ Conversation, Viewer: offerViewer({ endAt }) })

      expect(screen.getByText("Expires in 3 days")).toBeInTheDocument()
      expect(screen.getByText("Expires in 3 days")).toHaveStyle({
        color: THEME.colors.blue100,
      })
    })

    it("shows minutes and turns red when the offer expires in under an hour", () => {
      const endAt = DateTime.fromMillis(NOW)
        .plus({ minutes: 30 })
        .toISO() as string

      renderWithRelay({ Conversation, Viewer: offerViewer({ endAt }) })

      expect(screen.getByText("Expires in 30 minutes")).toBeInTheDocument()
      expect(screen.getByText("Expires in 30 minutes")).toHaveStyle({
        color: THEME.colors.red100,
      })
    })
  })

  it("renders nothing when the partner-offer-convo flag is off", () => {
    mockUseFlag.mockImplementation(() => false)

    renderWithRelay({ Conversation, Viewer: offerViewer({}) })

    expect(
      screen.queryByTestId("partnerOfferActionLink"),
    ).not.toBeInTheDocument()
  })
})
