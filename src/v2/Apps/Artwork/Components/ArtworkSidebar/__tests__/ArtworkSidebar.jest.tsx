import { ArtworkSidebarFragmentContainer } from "v2/Apps/Artwork/Components/ArtworkSidebar"
import { ArtworkSidebarArtists } from "v2/Apps/Artwork/Components/ArtworkSidebar/ArtworkSidebarArtists"
import { ArtworkSidebarMetadata } from "v2/Apps/Artwork/Components/ArtworkSidebar/ArtworkSidebarMetadata"
import { graphql } from "react-relay"
import {
  setupTestWrapper,
  setupTestWrapperTL,
} from "v2/DevTools/setupTestWrapper"
import { screen } from "@testing-library/react"
import { useSystemContext } from "v2/System"
import { ArtworkSidebarBiddingClosedMessageFragmentContainer } from "../ArtworkSidebarBiddingClosedMessage"
import { Settings } from "luxon"

jest.unmock("react-relay")
jest.mock("../ArtworkSidebarClassification", () => ({
  ArtworkSidebarClassificationFragmentContainer: () => <div />,
}))
jest.mock("v2/System/Analytics/useTracking", () => ({
  useTracking: () => ({ trackEvent: jest.fn() }),
}))
jest.mock("v2/System/useSystemContext")

const mockUseSystemContext = useSystemContext as jest.Mock
let mockFeatureFlags

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
  beforeEach(() => {
    mockFeatureFlags = {
      featureFlags: {
        "artwork-page-create-alert": {
          flagEnabled: false,
        },
      },
    }

    mockUseSystemContext.mockImplementation(() => mockFeatureFlags)
  })

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

  describe("artwork-page-create-alert feature flag", () => {
    it("renders the create alert section when artwork-page-create-alert ff is enabled", () => {
      mockFeatureFlags = {
        featureFlags: {
          "artwork-page-create-alert": {
            flagEnabled: true,
          },
        },
      }

      mockUseSystemContext.mockImplementationOnce(() => mockFeatureFlags)

      renderWithRelay()

      expect(screen.queryByText(/Create Alert/i)).toBeInTheDocument()
      expect(
        screen.queryByText(/Be notified when a similar work is available/i)
      ).toBeInTheDocument()
    })

    it("does not render the create alert section when artwork-page-create-alert ff is disabled", () => {
      renderWithRelay()

      expect(screen.queryByText(/Create Alert/i)).not.toBeInTheDocument()
      expect(
        screen.queryByText(/Be notified when a similar work is available/i)
      ).not.toBeInTheDocument()
    })
  })
})
