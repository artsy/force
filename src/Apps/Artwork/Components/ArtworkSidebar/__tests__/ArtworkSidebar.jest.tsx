import { ArtworkSidebarFragmentContainer } from "Apps/Artwork/Components/ArtworkSidebar"
import { ArtworkSidebarArtists } from "Apps/Artwork/Components/ArtworkSidebar/ArtworkSidebarArtists"
import { ArtworkSidebarMetadata } from "Apps/Artwork/Components/ArtworkSidebar/ArtworkSidebarMetadata"
import { graphql } from "react-relay"
import { setupTestWrapper, setupTestWrapperTL } from "DevTools/setupTestWrapper"
import { screen } from "@testing-library/react"
import { ArtworkSidebarBiddingClosedMessageFragmentContainer } from "../ArtworkSidebarBiddingClosedMessage"
import { Settings } from "luxon"

jest.unmock("react-relay")
jest.mock("../ArtworkSidebarClassification", () => ({
  ArtworkSidebarClassificationFragmentContainer: () => <div />,
}))
jest.mock("System/Analytics/useTracking", () => ({
  useTracking: () => ({ trackEvent: jest.fn() }),
}))

const ARTWORKSIDEBAR_TEST_QUERY = graphql`
  query ArtworkSidebar_Test_Query @relay_test_operation {
    artwork(id: "josef-albers-homage-to-the-square-85") {
      ...ArtworkSidebar_artwork
    }
    me {
      ...ArtworkSidebar_me
    }
  }
`

const { getWrapper } = setupTestWrapper({
  Component: ArtworkSidebarFragmentContainer,
  query: ARTWORKSIDEBAR_TEST_QUERY,
})

const { renderWithRelay } = setupTestWrapperTL({
  Component: ArtworkSidebarFragmentContainer,
  query: ARTWORKSIDEBAR_TEST_QUERY,
})

describe("ArtworkSidebar", () => {
  it("renders ArtworkSidebarArtists component", () => {
    const wrapper = getWrapper()
    expect(wrapper.find(ArtworkSidebarArtists).length).toBe(1)
  })

  it("renders Metadata component", () => {
    const wrapper = getWrapper()
    expect(wrapper.find(ArtworkSidebarMetadata).length).toBe(1)
  })

  describe("bidding closed", () => {
    it("shows bidding closed when endAt is in the past and lot has not been extended", () => {
      const wrapper = getWrapper({
        SaleArtwork: () => ({
          extendedBiddingEndAt: null,
          endAt: "2022-03-12T12:33:37.000Z",
        }),
        Artwork: () => ({
          is_in_auction: true,
        }),
      })
      expect(
        wrapper.find(ArtworkSidebarBiddingClosedMessageFragmentContainer).length
      ).toBe(1)
    })
    it("shows bidding closed when endAt and extendedBiddingEndAt are in the past", () => {
      const wrapper = getWrapper({
        SaleArtwork: () => ({
          extendedBiddingEndAt: "2022-03-12T12:35:37.000Z",
          endAt: "2022-03-12T12:33:37.000Z",
        }),
        Artwork: () => ({
          is_in_auction: true,
        }),
      })
      expect(
        wrapper.find(ArtworkSidebarBiddingClosedMessageFragmentContainer).length
      ).toBe(1)
    })
    it("does not show bidding closed when endAt is in the past and extendedBiddingEndAt is in the future", () => {
      Settings.now = jest.fn(() =>
        new Date("2022-03-12T12:33:37.000Z").getTime()
      )
      const wrapper = getWrapper({
        SaleArtwork: () => ({
          extendedBiddingEndAt: "2022-03-12T12:34:37.000Z",
          endAt: "2022-03-12T12:32:37.000Z",
          endedAt: null,
        }),
        Artwork: () => ({
          is_in_auction: true,
        }),
        Sale: () => ({
          isClosed: false,
        }),
      })
      expect(
        wrapper.find(ArtworkSidebarBiddingClosedMessageFragmentContainer).length
      ).toBe(0)
    })
  })

  it("renders the create alert section", () => {
    renderWithRelay()

    expect(screen.queryByText(/Create Alert/i)).toBeInTheDocument()
    expect(
      screen.queryByText(/Be notified when a similar work is available/i)
    ).toBeInTheDocument()
  })

  it("hide the create alert section if there are no associated artists", () => {
    renderWithRelay({
      Artwork: () => ({
        artists: [],
      }),
    })

    const button = screen.queryByText(/Create Alert/i)
    const description = screen.queryByText(
      /Be notified when a similar work is available/i
    )

    expect(button).not.toBeInTheDocument()
    expect(description).not.toBeInTheDocument()
  })

  it("hide the create alert section for bidding closed artworks if there are no associated artists", () => {
    renderWithRelay({
      Artwork: () => ({
        is_in_auction: true,
        artists: [],
      }),
      Sale: () => ({
        isClosed: true,
      }),
    })

    const button = screen.queryByText(/Create Alert/i)
    const description = screen.queryByText(
      /Be notified when a similar work is available/i
    )

    expect(button).not.toBeInTheDocument()
    expect(description).not.toBeInTheDocument()
  })
})
