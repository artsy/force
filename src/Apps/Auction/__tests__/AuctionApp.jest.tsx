import { AuctionAppFragmentContainer } from "Apps/Auction/AuctionApp"
import { useAuctionTracking } from "Apps/Auction/Hooks/useAuctionTracking"
import { MockBoot } from "DevTools/MockBoot"
import { flushPromiseQueue } from "DevTools/flushPromiseQueue"
import { setupTestWrapperTL } from "DevTools/setupTestWrapperTL"
import { screen, fireEvent } from "@testing-library/react"
import { getENV } from "Utils/getENV"
import type { AuctionAppJestQuery } from "__generated__/AuctionAppJestQuery.graphql"
import { graphql } from "react-relay"

jest.unmock("react-relay")
jest.mock("Apps/Auction/Hooks/useAuctionTracking")

jest.mock("Apps/Auction/Components/AuctionMeta", () => ({
  AuctionMetaFragmentContainer: () => null,
}))

jest.mock("Components/SalesforceWrapper", () => ({
  SalesforceWrapper: () => null,
}))

jest.mock("Components/FullBleedHeader/FullBleedHeader", () => ({
  FullBleedHeader: () => <div>FullBleedHeader</div>,
}))

jest.mock("Apps/Auction/Components/AuctionDetails/AuctionDetails", () => ({
  AuctionDetailsFragmentContainer: () => (
    <div>AuctionDetailsFragmentContainer</div>
  ),
}))

jest.mock("Apps/Auction/Components/AuctionActiveBids", () => ({
  AuctionActiveBidsRefetchContainer: () => (
    <div>AuctionActiveBidsRefetchContainer</div>
  ),
}))

jest.mock("Apps/Auction/Components/AuctionWorksByFollowedArtistsRail", () => ({
  AuctionWorksByFollowedArtistsRailFragmentContainer: () => (
    <div>AuctionWorksByFollowedArtistsRailFragmentContainer</div>
  ),
}))

jest.mock("Apps/Auction/Components/AuctionBuyNowRail", () => ({
  AuctionBuyNowRailFragmentContainer: () => (
    <div>AuctionBuyNowRailFragmentContainer</div>
  ),
}))

jest.mock("Apps/Auction/Components/AuctionAssociatedSale", () => ({
  AuctionAssociatedSaleFragmentContainer: () => (
    <div>AuctionAssociatedSaleFragmentContainer</div>
  ),
}))

jest.mock("Apps/Auction/Components/AuctionArtworkFilter", () => ({
  AuctionArtworkFilterQueryRenderer: () => (
    <div>AuctionArtworkFilterQueryRenderer</div>
  ),
}))

jest.mock("Apps/Auction/Components/AuctionCurrentAuctionsRail", () => ({
  AuctionCurrentAuctionsRailFragmentContainer: () => (
    <div>AuctionCurrentAuctionsRail</div>
  ),
}))

jest.mock("Utils/getENV")

describe("AuctionApp", () => {
  const mockUseAuctionTracking = useAuctionTracking as jest.Mock
  const mockGetENV = getENV as jest.Mock
  let breakpoint

  const { renderWithRelay } = setupTestWrapperTL<AuctionAppJestQuery>({
    Component: (props: any) => {
      return (
        <MockBoot breakpoint={breakpoint}>
          <AuctionAppFragmentContainer {...props} />
        </MockBoot>
      )
    },
    query: graphql`
      query AuctionAppJestQuery($slug: String!) {
        me {
          ...AuctionApp_me @arguments(saleID: $slug)
        }
        sale(id: $slug) @principalField {
          ...AuctionApp_sale
        }
        viewer {
          ...AuctionApp_viewer @arguments(saleID: $slug, isLoggedIn: true)
        }
      }
    `,
    variables: {
      slug: "auction-slug",
    },
  })

  beforeAll(() => {
    breakpoint = "lg"
    mockUseAuctionTracking.mockImplementation(() => ({
      tracking: {
        auctionPageView: jest.fn(),
      },
    }))
  })

  it("tracks page view", async () => {
    const spy = jest.fn()

    mockUseAuctionTracking.mockImplementation(() => ({
      tracking: {
        auctionPageView: spy,
      },
    }))

    renderWithRelay()

    await flushPromiseQueue()
    expect(spy).toHaveBeenCalled()
  })

  it("shows header if coverImage", () => {
    renderWithRelay()
    expect(screen.getByText("FullBleedHeader")).toBeInTheDocument()
  })

  it("hides header if no cover image", () => {
    renderWithRelay({
      Sale: () => ({
        coverImage: null,
      }),
    })
    expect(screen.queryByText("FullBleedHeader")).not.toBeInTheDocument()
  })

  it("renders auction details", () => {
    renderWithRelay()
    expect(
      screen.getByText("AuctionDetailsFragmentContainer"),
    ).toBeInTheDocument()
  })

  describe("explanatory banner for cascading", () => {
    it("includes banner when cascading is enabled", () => {
      renderWithRelay({
        Sale: () => ({
          cascadingEndTimeIntervalMinutes: 1,
          isClosed: false,
        }),
      })

      expect(
        screen.getByText((content, element) =>
          content.includes(
            "Closing times may be extended due to last-minute competitive bidding",
          ),
        ),
      ).toBeInTheDocument()
    })

    it("hides banner when cascading is disabled", () => {
      renderWithRelay({
        Sale: () => ({
          cascadingEndTimeIntervalMinutes: null,
        }),
      })

      expect(
        screen.queryByText(
          "Closing times may be extended due to last-minute competitive bidding",
        ),
      ).not.toBeInTheDocument()
    })
  })

  describe("Tabs", () => {
    it("hides tab bar if conditions not met", () => {
      renderWithRelay({
        Me: () => ({
          showActiveBids: null,
        }),
        Viewer: () => ({
          showFollowedArtistsTab: null,
        }),
        Sale: () => ({
          showAssociatedSale: null,
          showBuyNowTab: null,
        }),
      })

      expect(screen.queryByRole("tablist")).not.toBeInTheDocument()
    })

    describe("Associated Sale", () => {
      it("shows tab", () => {
        renderWithRelay()
        const tabs = screen.getAllByRole("button")
        fireEvent.click(tabs[0])
        expect(
          screen.getByText("AuctionAssociatedSaleFragmentContainer"),
        ).toBeInTheDocument()
      })

      it("hides tab", () => {
        renderWithRelay({
          Sale: () => ({
            showAssociatedSale: null,
          }),
        })
        expect(
          screen.queryByText("AuctionAssociatedSaleFragmentContainer"),
        ).not.toBeInTheDocument()
      })
    })

    describe("ActiveBids", () => {
      it("shows tab", () => {
        renderWithRelay({
          Me: () => ({
            showActiveBids: [1],
          }),
          Sale: () => ({
            isClosed: false,
          }),
        })
        expect(screen.getByText("Your Active Bids")).toBeInTheDocument()
        fireEvent.click(screen.getByText("Your Active Bids"))
        expect(
          screen.getByText("AuctionActiveBidsRefetchContainer"),
        ).toBeInTheDocument()
      })

      it("hides tab", () => {
        renderWithRelay({
          Me: () => ({
            showActiveBids: null,
          }),
        })
        expect(screen.queryByText("Your Active Bids")).not.toBeInTheDocument()
        expect(
          screen.queryByText("AuctionActiveBidsRefetchContainer"),
        ).not.toBeInTheDocument()
      })
    })

    describe("Works by artists you follow", () => {
      it("shows tab", () => {
        renderWithRelay({
          Me: () => ({
            showActiveBids: [1],
          }),
          Sale: () => ({
            showBuyNowTab: true,
            isClosed: false,
          }),
          Viewer: () => ({
            showFollowedArtistsTab: {
              edges: [1],
            },
          }),
        })
        expect(
          screen.getByText("Works By Artists You Follow"),
        ).toBeInTheDocument()
        fireEvent.click(screen.getByText("Works By Artists You Follow"))
        expect(
          screen.getByText(
            "AuctionWorksByFollowedArtistsRailFragmentContainer",
          ),
        ).toBeInTheDocument()
      })

      it("hides tab", () => {
        renderWithRelay({
          Viewer: () => ({
            showFollowedArtistsTab: null,
          }),
        })
        expect(
          screen.queryByText("Works By Artists You Follow"),
        ).not.toBeInTheDocument()
        expect(
          screen.queryByText(
            "AuctionWorksByFollowedArtistsRailFragmentContainer",
          ),
        ).not.toBeInTheDocument()
      })
    })

    describe("Buy now tab", () => {
      it("shows tab", () => {
        renderWithRelay({
          Sale: () => ({
            showBuyNowTab: true,
            isClosed: false,
          }),
          Me: () => ({
            showActiveBids: [1],
          }),
        })
        expect(screen.getByText("Inquire")).toBeInTheDocument()
        fireEvent.click(screen.getByText("Inquire"))
        expect(
          screen.getByText("AuctionBuyNowRailFragmentContainer"),
        ).toBeInTheDocument()
      })

      it("hides tab", () => {
        renderWithRelay({
          Sale: () => ({
            showBuyNowTab: null,
          }),
        })
        expect(screen.queryByText("Inquire")).not.toBeInTheDocument()
        expect(
          screen.queryByText("AuctionBuyNowRailFragmentContainer"),
        ).not.toBeInTheDocument()
      })
    })
  })

  describe("preview sales", () => {
    it("does not show message if there are eligible sale artworks", () => {
      renderWithRelay({
        Sale: () => ({
          status: "preview",
          eligibleSaleArtworksCount: 1,
        }),
      })
      expect(
        screen.queryByText("Registration for this auction is currently open"),
      ).not.toBeInTheDocument()
      expect(
        screen.getByText("AuctionArtworkFilterQueryRenderer"),
      ).toBeInTheDocument()
    })

    it("shows message", () => {
      renderWithRelay({
        Sale: () => ({
          status: "preview",
          eligibleSaleArtworksCount: 0,
        }),
      })
      expect(
        screen.getByText("Registration for this auction is currently open"),
      ).toBeInTheDocument()
      expect(
        screen.getByText("Auction lots will be published soon."),
      ).toBeInTheDocument()
      expect(
        screen.queryByText("AuctionArtworkFilterRefetchContainer"),
      ).not.toBeInTheDocument()
    })

    it("renders the auction rail", () => {
      renderWithRelay({
        Sale: () => ({
          status: "preview",
          eligibleSaleArtworksCount: 0,
        }),
      })
      expect(screen.getByText("AuctionCurrentAuctionsRail")).toBeInTheDocument()
    })

    it("does not render the auction rail", () => {
      renderWithRelay({
        Sale: () => ({}),
      })
      expect(
        screen.queryByText("AuctionCurrentAuctionsRail"),
      ).not.toBeInTheDocument()
    })
  })

  describe("salesforce widget", () => {
    it("embeds Salesforce widget", () => {
      mockGetENV.mockImplementation(() => ({
        SALESFORCE_MESSAGE_ENABLED: true,
      }))
      renderWithRelay()
      expect(screen.queryByText("SalesforceWrapper")).not.toBeInTheDocument()
    })

    it("does not embed Salesforce widget on mobile", () => {
      breakpoint = "xs"
      mockGetENV.mockImplementation(() => ({
        SALESFORCE_MESSAGE_ENABLED: true,
      }))
      renderWithRelay()
      expect(screen.queryByText("SalesforceWrapper")).not.toBeInTheDocument()
    })
  })
})
