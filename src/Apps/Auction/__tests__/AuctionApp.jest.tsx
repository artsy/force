import { graphql } from "react-relay"
import { setupTestWrapper } from "DevTools/setupTestWrapper"
import { AuctionAppFragmentContainer } from "Apps/Auction/AuctionApp"
import { AuctionAppTestQuery } from "__generated__/AuctionAppTestQuery.graphql"
import { useAuctionTracking } from "Apps/Auction/Hooks/useAuctionTracking"
import { flushPromiseQueue } from "DevTools/flushPromiseQueue"
import { getENV } from "Utils/getENV"
import { MockBoot } from "DevTools/MockBoot"

jest.unmock("react-relay")
jest.mock("Apps/Auction/Hooks/useAuctionTracking")

jest.mock("Apps/Auction/Components/AuctionMeta", () => ({
  AuctionMetaFragmentContainer: () => null,
}))

jest.mock("Components/SalesforceWrapper", () => ({
  SalesforceWrapper: () => null,
}))

jest.mock("Components/FullBleedHeader/FullBleedHeader", () => ({
  FullBleedHeader: () => null,
}))

jest.mock("Apps/Auction/Components/AuctionDetails/AuctionDetails", () => ({
  AuctionDetailsFragmentContainer: () => null,
}))

jest.mock("Apps/Auction/Components/AuctionActiveBids", () => ({
  AuctionActiveBidsRefetchContainer: () => null,
}))

jest.mock("Apps/Auction/Components/AuctionWorksByFollowedArtistsRail", () => ({
  AuctionWorksByFollowedArtistsRailFragmentContainer: () => null,
}))

jest.mock("Apps/Auction/Components/AuctionBuyNowRail", () => ({
  AuctionBuyNowRailFragmentContainer: () => null,
}))

jest.mock("Apps/Auction/Components/AuctionAssociatedSale", () => ({
  AuctionAssociatedSaleFragmentContainer: () => null,
}))

jest.mock("Apps/Auction/Components/AuctionArtworkFilter", () => ({
  AuctionArtworkFilterRefetchContainer: () => null,
}))

jest.mock("Utils/getENV")

describe("AuctionApp", () => {
  const mockUseAuctionTracking = useAuctionTracking as jest.Mock
  const mockGetENV = getENV as jest.Mock
  let breakpoint

  const { getWrapper } = setupTestWrapper<AuctionAppTestQuery>({
    Component: (props: any) => {
      return (
        <MockBoot breakpoint={breakpoint}>
          <AuctionAppFragmentContainer {...props} />
        </MockBoot>
      )
    },
    query: graphql`
      query AuctionAppTestQuery($input: FilterArtworksInput, $slug: String!) {
        me {
          ...AuctionApp_me @arguments(saleID: $slug)
        }
        sale(id: $slug) @principalField {
          ...AuctionApp_sale
        }
        viewer {
          ...AuctionApp_viewer @arguments(input: $input, saleID: $slug)
        }
      }
    `,
    variables: {
      input: {},
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

    getWrapper()

    await flushPromiseQueue()
    expect(spy).toHaveBeenCalled()
  })

  it("embeds Salesforce widget", () => {
    mockGetENV.mockImplementation(() => ({ SALESFORCE_CHAT_ENABLED: true }))
    const { wrapper } = getWrapper()
    expect(wrapper.find("SalesforceWrapper").exists()).toBeFalsy()
  })

  it("does not embed Salesforce widget on mobile", () => {
    breakpoint = "xs"
    mockGetENV.mockImplementation(() => ({ SALESFORCE_CHAT_ENABLED: true }))
    const { wrapper } = getWrapper()
    expect(wrapper.find("SalesforceWrapper").exists()).toBeFalsy()
  })

  it("shows header if coverImage", () => {
    const { wrapper } = getWrapper()
    expect(wrapper.find("FullBleedHeader").exists()).toBeTruthy()
  })

  it("hides header if no cover image", () => {
    const { wrapper } = getWrapper({
      Sale: () => ({
        coverImage: null,
      }),
    })
    expect(wrapper.find("FullBleedHeader").exists()).toBeFalsy()
  })

  it("renders auction details", () => {
    const { wrapper } = getWrapper()
    expect(
      wrapper.find("AuctionDetailsFragmentContainer").exists()
    ).toBeTruthy()
  })

  describe("explanatory banner for cascading", () => {
    it("includes banner when cascading is enabled", () => {
      const { wrapper } = getWrapper({
        Sale: () => ({
          cascadingEndTimeIntervalMinutes: 1,
        }),
      })

      expect(wrapper.text()).toContain(
        "Closing times may be extended due to last-minute competitive bidding"
      )
    })

    it("hides banner when cascading is disabled", () => {
      const { wrapper } = getWrapper({
        Sale: () => ({
          cascadingEndTimeIntervalMinutes: null,
        }),
      })

      expect(wrapper.text()).not.toContain(
        "Closing times may be extended due to last-minute competitive bidding"
      )
    })
  })

  describe("Tabs", () => {
    it("hides tab bar if conditions not met", () => {
      const { wrapper } = getWrapper({
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

      expect(wrapper.find("Tabs").exists()).toBeFalsy()
    })

    describe("Associated Sale", () => {
      it("shows tab", () => {
        const { wrapper } = getWrapper()
        wrapper.find("Tabs Clickable").at(0).simulate("click")
        wrapper.update()
        expect(
          wrapper.find("AuctionAssociatedSaleFragmentContainer").exists()
        ).toBeTruthy()
      })

      it("hides tab", () => {
        const { wrapper } = getWrapper({
          Sale: () => ({
            showAssociatedSale: null,
          }),
        })
        expect(
          wrapper.find("AuctionAssociatedSaleFragmentContainer").exists()
        ).toBeFalsy()
      })
    })

    describe("ActiveBids", () => {
      it("shows tab", () => {
        const { wrapper } = getWrapper({
          Me: () => ({
            showActiveBids: [1],
          }),
          Sale: () => ({
            isClosed: false,
          }),
        })
        wrapper.find("Tabs Clickable").at(1).simulate("click")
        expect(wrapper.text()).toContain("Your Active Bids")
        wrapper.update()
        expect(
          wrapper.find("AuctionActiveBidsRefetchContainer").exists()
        ).toBeTruthy()
      })

      it("hides tab", () => {
        const { wrapper } = getWrapper({
          Me: () => ({
            showActiveBids: null,
          }),
        })
        expect(wrapper.text()).not.toContain("Your Active Bids")
        expect(
          wrapper.find("AuctionActiveBidsRefetchContainer").exists()
        ).toBeFalsy()
      })
    })

    describe("Works by artists you follow", () => {
      it("shows tab", () => {
        const { wrapper } = getWrapper({
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
        expect(wrapper.text()).toContain("Works By Artists You Follow")
        wrapper.find("Tabs Clickable").at(2).simulate("click")
        wrapper.update()
        expect(
          wrapper
            .find("AuctionWorksByFollowedArtistsRailFragmentContainer")
            .exists()
        ).toBeTruthy()
      })

      it("hides tab", () => {
        const { wrapper } = getWrapper({
          Viewer: () => ({
            showFollowedArtistsTab: null,
          }),
        })
        expect(wrapper.text()).not.toContain("Works By Artists You Follow")
        expect(
          wrapper
            .find("AuctionWorksByFollowedArtistsRailFragmentContainer")
            .exists()
        ).toBeFalsy()
      })
    })

    describe("Buy now tab", () => {
      it("shows tab", () => {
        const { wrapper } = getWrapper({
          Sale: () => ({
            showBuyNowTab: true,
            isClosed: false,
          }),
          Me: () => ({
            showActiveBids: [1],
          }),
        })
        expect(wrapper.text()).toContain("Buy Now")
        wrapper.find("Tabs Clickable").at(3).simulate("click")
        wrapper.update()
        expect(
          wrapper.find("AuctionBuyNowRailFragmentContainer").exists()
        ).toBeTruthy()
      })

      it("hides tab", () => {
        const { wrapper } = getWrapper({
          Sale: () => ({
            showBuyNowTab: null,
          }),
        })
        expect(wrapper.text()).not.toContain("Buy Now")
        expect(
          wrapper.find("AuctionBuyNowRailFragmentContainer").exists()
        ).toBeFalsy()
      })
    })
  })

  describe("preview sales", () => {
    it("does not show message if there are eligible sale artworks", () => {
      const { wrapper } = getWrapper({
        Sale: () => ({
          status: "preview",
          eligibleSaleArtworksCount: 1,
        }),
      })
      expect(wrapper.text()).not.toContain(
        "Registration for this auction is currently open"
      )
      expect(wrapper.find("AuctionArtworkFilterRefetchContainer").length).toBe(
        1
      )
    })

    it("shows message", () => {
      const { wrapper } = getWrapper({
        Sale: () => ({
          status: "preview",
          eligibleSaleArtworksCount: 0,
        }),
      })
      expect(wrapper.text()).toContain(
        "Registration for this auction is currently open"
      )
      expect(wrapper.text()).toContain("Auction lots will be published soon.")
      expect(wrapper.find("AuctionArtworkFilterRefetchContainer").length).toBe(
        0
      )
    })

    it("renders the auction rail", () => {
      const { wrapper } = getWrapper({
        Sale: () => ({
          status: "preview",
          eligibleSaleArtworksCount: 0,
        }),
      })
      expect(wrapper.find("AuctionCurrentAuctionsRail").length).toBe(1)
    })

    it("does not render the auction rail", () => {
      const { wrapper } = getWrapper({
        Sale: () => ({}),
      })
      expect(wrapper.find("AuctionCurrentAuctionsRail").length).toBe(0)
    })
  })
})
