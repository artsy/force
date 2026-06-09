import { screen } from "@testing-library/react"
import { useFlag } from "@unleash/proxy-client-react"
import { ConversationsProvider } from "Apps/Conversations/ConversationsContext"
import { ConversationPartnerOfferCTA } from "Apps/Conversations/components/Message/ConversationPartnerOfferCTA"
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
      <ConversationPartnerOfferCTA artwork={props.artwork} />
    </ConversationsProvider>
  ),
  query: graphql`
    query ConversationPartnerOfferCTA_Test_Query @relay_test_operation {
      viewer {
        ...ConversationsContext_viewer
      }
      artwork(id: "artwork-id") {
        ...ConversationPartnerOfferCTA_artwork
      }
    }
  `,
})

const Artwork = () => ({
  internalID: "artwork-id",
  href: "/artwork/some-artwork",
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
    renderWithRelay({ Artwork, Viewer: offerViewer({}) })

    expect(screen.getByText("Offer Received for $450")).toBeInTheDocument()

    expect(screen.getByTestId("partnerOfferActionLink")).toHaveAttribute(
      "href",
      "/artwork/some-artwork?partner_offer_id=partner-offer-id",
    )
  })

  it("falls back to a generic message when there is no discounted price", () => {
    renderWithRelay({
      Artwork,
      Viewer: offerViewer({ priceWithDiscount: null }),
    })

    expect(screen.getByText("Offer Received")).toBeInTheDocument()
  })

  it("renders nothing when there is no offer for the artwork", () => {
    renderWithRelay({
      Artwork,
      Viewer: () => ({
        me: { partnerOffersConnection: { edges: [] } },
      }),
    })

    expect(
      screen.queryByTestId("partnerOfferActionLink"),
    ).not.toBeInTheDocument()
  })

  it("renders nothing when the offer has expired", () => {
    renderWithRelay({ Artwork, Viewer: offerViewer({ endAt: pastDate() }) })

    expect(
      screen.queryByTestId("partnerOfferActionLink"),
    ).not.toBeInTheDocument()
  })

  it("renders nothing when the offer is unavailable", () => {
    renderWithRelay({ Artwork, Viewer: offerViewer({ isAvailable: false }) })

    expect(
      screen.queryByTestId("partnerOfferActionLink"),
    ).not.toBeInTheDocument()
  })

  it("renders nothing when the partner-offer-convo flag is off", () => {
    mockUseFlag.mockImplementation(() => false)

    renderWithRelay({ Artwork, Viewer: offerViewer({}) })

    expect(
      screen.queryByTestId("partnerOfferActionLink"),
    ).not.toBeInTheDocument()
  })
})
