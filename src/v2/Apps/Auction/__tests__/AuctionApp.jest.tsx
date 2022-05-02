import { graphql } from "react-relay"
import { setupTestWrapper } from "v2/DevTools/setupTestWrapper"
import { AuctionAppFragmentContainer } from "../AuctionApp"
import { AuctionAppTestQuery } from "v2/__generated__/AuctionAppTestQuery.graphql"
import { useAuctionTracking } from "../Hooks/useAuctionTracking"
import { flushPromiseQueue } from "v2/DevTools"

jest.unmock("react-relay")
jest.mock("v2/Apps/Auction/Hooks/useAuctionTracking")

jest.mock("v2/Apps/Auction/Components/AuctionMeta", () => ({
  AuctionMetaFragmentContainer: () => null,
}))

jest.mock("v2/Components/ZendeskWrapper", () => ({
  ZendeskWrapper: () => null,
}))

jest.mock("v2/Components/FullBleedHeader", () => ({
  FullBleedHeader: () => null,
}))

jest.mock("v2/Apps/Auction/Components/AuctionDetails/AuctionDetails", () => ({
  AuctionDetailsFragmentContainer: () => null,
}))

jest.mock("v2/Apps/Auction/Components/AuctionActiveBids", () => ({
  AuctionActiveBidsRefetchContainer: () => null,
}))

jest.mock(
  "v2/Apps/Auction/Components/AuctionWorksByFollowedArtistsRail",
  () => ({
    AuctionWorksByFollowedArtistsRailFragmentContainer: () => null,
  })
)

jest.mock("v2/Apps/Auction/Components/AuctionBuyNowRail", () => ({
  AuctionBuyNowRailFragmentContainer: () => null,
}))

jest.mock("v2/Apps/Auction/Components/AuctionAssociatedSale", () => ({
  AuctionAssociatedSaleFragmentContainer: () => null,
}))

jest.mock("v2/Apps/Auction/Components/AuctionArtworkFilter", () => ({
  AuctionArtworkFilterRefetchContainer: () => null,
}))

jest.mock("v2/Utils/getENV", () => ({
  getENV: () => ({
    AUCTION_ZENDESK_KEY: "foo",
  }),
}))

describe("AuctionApp", () => {
  const mockUseAuctionTracking = useAuctionTracking as jest.Mock

  const { getWrapper } = setupTestWrapper<AuctionAppTestQuery>({
    Component: (props: any) => {
      return <AuctionAppFragmentContainer {...props} />
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

  beforeEach(() => {
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

  it("embeds ZenDesk widget", () => {
    const wrapper = getWrapper()
    expect(wrapper.find("ZendeskWrapper").exists()).toBeTruthy()
  })

  it("shows header if coverImage", () => {
    const wrapper = getWrapper()
    expect(wrapper.find("FullBleedHeader").exists()).toBeTruthy()
  })

  it("hides header if no cover image", () => {
    const wrapper = getWrapper({
      Sale: () => ({
        coverImage: null,
      }),
    })
    expect(wrapper.find("FullBleedHeader").exists()).toBeFalsy()
  })

  it("renders auction details", () => {
    const wrapper = getWrapper()
    expect(
      wrapper.find("AuctionDetailsFragmentContainer").exists()
    ).toBeTruthy()
  })

  describe("explanatory banner for cascading", () => {
    it("includes banner when cascading is enabled", () => {
      const wrapper = getWrapper({
        Sale: () => ({
          cascadingEndTimeIntervalMinutes: 1,
        }),
      })
      expect(wrapper.find("CascadingEndTimesBanner").exists()).toBeTruthy()
    })

    it("hides banner when cascading is disabled", () => {
      const wrapper = getWrapper({
        Sale: () => ({
          cascadingEndTimeIntervalMinutes: null,
        }),
      })
      expect(wrapper.find("CascadingEndTimesBanner").exists()).toBeFalsy()
    })
  })

  describe("explanatory banner for extended end times", () => {
    it("includes banner when extended end times are enabled", () => {
      const wrapper = getWrapper({
        Sale: () => ({
          cascadingEndTimeIntervalMinutes: 1,
          extendedBiddingIntervalMinutes: 2,
        }),
      })
      expect(wrapper.text()).toContain(
        "Closing times may be extended due to last minute competitive bidding"
      )
    })

    it("hides banner when extended and cascading bidding are disabled", () => {
      const wrapper = getWrapper({
        Sale: () => ({
          cascadingEndTimeIntervalMinutes: null,
          extendedBiddingIntervalMinutes: null,
        }),
      })
      expect(wrapper.find("CascadingEndTimesBanner").exists()).toBeFalsy()
      expect(wrapper.text()).not.toContain(
        "Closing times may be extended due to last minute competitive bidding"
      )
    })

    it("shows the cascading bidding are when cascading is enabled but popcorn is disabled", () => {
      const wrapper = getWrapper({
        Sale: () => ({
          cascadingEndTimeIntervalMinutes: 1,
          extendedBiddingIntervalMinutes: null,
        }),
      })
      expect(wrapper.find("CascadingEndTimesBanner").exists()).toBeTruthy()
      expect(wrapper.text()).not.toContain(
        "Closing times may be extended due to last minute competitive bidding"
      )
    })
  })

  describe("Tabs", () => {
    it("hides tab bar if conditions not met", () => {
      const wrapper = getWrapper({
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
        const wrapper = getWrapper()
        wrapper.find("Tabs Clickable").at(0).simulate("click")
        wrapper.update()
        expect(
          wrapper.find("AuctionAssociatedSaleFragmentContainer").exists()
        ).toBeTruthy()
      })

      it("hides tab", () => {
        const wrapper = getWrapper({
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
        const wrapper = getWrapper({
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
        const wrapper = getWrapper({
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
        const wrapper = getWrapper({
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
        const wrapper = getWrapper({
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
        const wrapper = getWrapper({
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
        const wrapper = getWrapper({
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
})
