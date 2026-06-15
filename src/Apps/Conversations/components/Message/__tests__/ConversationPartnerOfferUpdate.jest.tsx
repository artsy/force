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
      <ConversationPartnerOfferUpdate artwork={props.artwork} />
    </ConversationsProvider>
  ),
  query: graphql`
    query ConversationPartnerOfferUpdate_Test_Query @relay_test_operation {
      viewer {
        ...ConversationsContext_viewer
      }
      artwork(id: "artwork-id") {
        ...ConversationPartnerOfferUpdate_artwork
      }
    }
  `,
})

const Artwork = () => ({
  internalID: "artwork-id",
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

describe("ConversationPartnerOfferUpdate", () => {
  it("renders the offer message with the discounted price", () => {
    renderWithRelay({ Artwork, Viewer: offerViewer({}) })

    expect(
      screen.getByText("You received an offer for $450"),
    ).toBeInTheDocument()
  })

  it("falls back to a generic message when there is no discounted price", () => {
    renderWithRelay({
      Artwork,
      Viewer: offerViewer({ priceWithDiscount: null }),
    })

    expect(screen.getByText("You received an offer")).toBeInTheDocument()
  })

  it("renders nothing when there is no offer for the artwork", () => {
    renderWithRelay({
      Artwork,
      Viewer: () => ({
        me: { partnerOffersConnection: { edges: [] } },
      }),
    })

    expect(screen.queryByText(/You received an offer/)).not.toBeInTheDocument()
  })

  it("renders an expired message when the offer has expired", () => {
    renderWithRelay({ Artwork, Viewer: offerViewer({ endAt: pastDate() }) })

    expect(screen.getByText("Offer Expired")).toBeInTheDocument()
    expect(screen.queryByText(/You received an offer/)).not.toBeInTheDocument()
  })

  it("renders an expired message when the offer is unavailable", () => {
    renderWithRelay({ Artwork, Viewer: offerViewer({ isAvailable: false }) })

    expect(screen.getByText("Offer Expired")).toBeInTheDocument()
    expect(screen.queryByText(/You received an offer/)).not.toBeInTheDocument()
  })

  it("renders nothing when the partner-offer-convo flag is off", () => {
    mockUseFlag.mockImplementation(() => false)

    renderWithRelay({ Artwork, Viewer: offerViewer({}) })

    expect(screen.queryByText(/You received an offer/)).not.toBeInTheDocument()
  })
})
