import { graphql } from "react-relay"
import { setupTestWrapper } from "v2/DevTools/setupTestWrapper"
import { Auction2AppFragmentContainer } from "../Auction2App"
import { Auction2AppTestQuery } from "v2/__generated__/Auction2AppTestQuery.graphql"

jest.unmock("react-relay")

jest.mock("v2/Apps/Auction2/Components/Auction2Meta", () => ({
  Auction2MetaFragmentContainer: () => null,
}))
jest.mock("v2/Components/ZendeskWrapper", () => ({
  ZendeskWrapper: () => null,
}))
jest.mock("v2/Components/FullBleedHeader", () => ({
  FullBleedHeader: () => null,
}))
jest.mock("v2/Apps/Auction2/Components/AuctionDetails/AuctionDetails", () => ({
  AuctionDetailsFragmentContainer: () => null,
}))
jest.mock("v2/Apps/Auction2/Components/AuctionActiveBids", () => ({
  AuctionActiveBidsRefetchContainer: () => null,
}))
jest.mock(
  "v2/Apps/Auction2/Components/AuctionWorksByFollowedArtistsRail",
  () => ({
    AuctionWorksByFollowedArtistsRailFragmentContainer: () => null,
  })
)
jest.mock("v2/Apps/Auction2/Components/AuctionBuyNowRail", () => ({
  AuctionBuyNowRailFragmentContainer: () => null,
}))
jest.mock("v2/Apps/Auction2/Components/AuctionArtworkFilter", () => ({
  AuctionArtworkFilterRefetchContainer: () => null,
}))

jest.mock("v2/Utils/getENV", () => ({
  getENV: () => ({
    AUCTION_ZENDESK_KEY: "foo",
  }),
}))

describe("Auction2App", () => {
  const { getWrapper } = setupTestWrapper<Auction2AppTestQuery>({
    Component: (props: any) => {
      return <Auction2AppFragmentContainer {...props} />
    },
    query: graphql`
      query Auction2AppTestQuery($input: FilterArtworksInput, $slug: String!) {
        me {
          ...Auction2App_me @arguments(saleID: $slug)
        }
        sale(id: $slug) @principalField {
          ...Auction2App_sale
        }
        viewer {
          ...Auction2App_viewer @arguments(input: $input, saleID: $slug)
        }
      }
    `,
    variables: {
      input: {},
      slug: "auction-slug",
    },
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

  describe("Tabs", () => {
    it("hides tab bar if conditions not met", () => {
      const wrapper = getWrapper({
        Me: () => ({
          showLotStandingsTab: null,
        }),
        Viewer: () => ({
          showFollowedArtistsTab: null,
        }),
        Sale: () => ({
          showBuyNowTab: null,
        }),
      })

      expect(wrapper.find("Tabs").exists()).toBeFalsy()
    })

    describe("ActiveBids", () => {
      it("shows tab", () => {
        const wrapper = getWrapper()
        wrapper.find("Tabs Clickable").at(0).simulate("click")
        expect(wrapper.text()).toContain("Your Active Bids")
        wrapper.update()
        expect(
          wrapper.find("AuctionActiveBidsRefetchContainer").exists()
        ).toBeTruthy()
      })

      it("hides tab", () => {
        const wrapper = getWrapper({
          Me: () => ({
            showLotStandingsTab: null,
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
        const wrapper = getWrapper()
        expect(wrapper.text()).toContain("Works By Artists You Follow")
        wrapper.find("Tabs Clickable").at(1).simulate("click")
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
        const wrapper = getWrapper()
        expect(wrapper.text()).toContain("Buy Now")
        wrapper.find("Tabs Clickable").at(2).simulate("click")
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
