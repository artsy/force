import { ConsignRouteFixture } from "v2/Apps/__tests__/Fixtures/Artist/Routes/ConsignRouteFixture"
import { SystemContextProvider } from "v2/Artsy"
import { useTracking } from "v2/Artsy/Analytics/useTracking"
import { MockBoot, renderRelayTree } from "v2/DevTools"
import { cloneDeep } from "lodash"
import React from "react"
import { graphql } from "relay-runtime"
import { ConsignRouteFragmentContainer } from "../index"

import { ConsignRoute_Test_QueryRawResponse } from "v2/__generated__/ConsignRoute_Test_Query.graphql"

jest.unmock("react-relay")
jest.mock("v2/Artsy/Analytics/useTracking")

describe("ConsignRoute", () => {
  const trackEvent = jest.fn()

  const getWrapper = async (
    response: ConsignRoute_Test_QueryRawResponse = ConsignRouteFixture
  ) => {
    return await renderRelayTree({
      Component: ({ artist, artworksByInternalID }) => {
        return (
          <SystemContextProvider>
            <MockBoot user={{ type: "Admin" }}>
              <ConsignRouteFragmentContainer artist={artist} />
            </MockBoot>
          </SystemContextProvider>
        )
      },
      query: graphql`
        query ConsignRoute_Test_Query($artistID: String!) @raw_response_type {
          artist(id: $artistID) {
            ...Consign_artist

            targetSupply {
              isInMicrofunnel
            }
          }
        }
      `,
      variables: {
        artistID: "alex-katz",
      },
      mockData: response,
    })
  }

  beforeEach(() => {
    const mockTracking = useTracking as jest.Mock
    mockTracking.mockImplementation(() => {
      return {
        trackEvent,
      }
    })
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  describe("ArtistConsignHeader", () => {
    it("displays artist name in header", async () => {
      const wrapper = await getWrapper()
      expect(wrapper.find("ArtistConsignHeader").text()).toContain("Alex Katz")
    })

    it("displays two images in header", async () => {
      const wrapper = await getWrapper()
      expect(
        wrapper.find("ArtistConsignHeader").find("ResponsiveImage").length
      ).toEqual(2)
    })

    it("links out to consign page", async () => {
      const wrapper = await getWrapper()
      expect(
        wrapper
          .find("ArtistConsignHeader")
          .find("RouterLink")
          .html()
      ).toContain(
        `href="/consign/submission?contextPath=%2Fartist%2Falex-katz%2Fconsign&amp;subject=Request%20a%20price%20estimate"`
      )
    })

    it("tracks event", async () => {
      const wrapper = await getWrapper()
      wrapper
        .find("ArtistConsignHeader")
        .find("RouterLink")
        .simulate("click")
      expect(trackEvent).toHaveBeenCalledWith({
        action_type: "Click",
        context_module: "Sell Works by",
        flow: "Consignments",
        subject: "Request a price estimate",
      })
    })
  })

  describe("ArtistConsignRecentlySold", () => {
    it("returns null if no recently sold images", async () => {
      const artistWithoutArtworks = cloneDeep(ConsignRouteFixture) as any
      artistWithoutArtworks.artist.targetSupply.microfunnel.artworks = null
      const wrapper = await getWrapper(artistWithoutArtworks)
      expect(wrapper.find("ArtistConsignRecentlySold")).toEqual({})
    })

    it("includes artist name in recently sold", async () => {
      const wrapper = await getWrapper()
      expect(
        wrapper
          .find("ArtistConsignRecentlySold")
          .find("Subheader")
          .text()
      ).toContain("Alex Katz")
      expect(wrapper.find("ArtistConsignRecentlySold").text()).toContain(
        "Alex Katz"
      )
    })

    it("displays recently sold artworks", async () => {
      const wrapper = await getWrapper()
      expect(
        wrapper.find("ArtistConsignRecentlySold").find("FillwidthItem").length
      ).toEqual(4)
    })

    it("appends displays sold for <price> to artwork brick", async () => {
      const wrapper = await getWrapper()
      const html = wrapper.find("ArtistConsignRecentlySold").html()
      const prices = ["$5,000", "$8,500", "$1,300"]
      prices.forEach(price => {
        expect(html).toContain(`Sold for ${price}`)
      })
    })
  })

  describe("ArtistConsignPageViews", () => {
    it("includes artist name in pageview title", async () => {
      const wrapper = await getWrapper()
      expect(wrapper.find("ArtistConsignPageViews").text()).toContain(
        "Alex Katz"
      )
    })

    it("includes pageviews in header", async () => {
      const wrapper = await getWrapper()
      expect(wrapper.find("ArtistConsignPageViews").text()).toContain("3,500")
    })

    it("includes unique visitors in header", async () => {
      const wrapper = await getWrapper()
      expect(wrapper.find("ArtistConsignPageViews").text()).toContain("1,200")
    })
  })

  describe("ArtistConsignMarketTrends", () => {
    it("includes highest realized price in stat", async () => {
      const wrapper = await getWrapper()
      expect(wrapper.find("ArtistConsignMarketTrends").text()).toContain(
        "$4.17M"
      )
    })

    it("includes sell-through rate in stat", async () => {
      const wrapper = await getWrapper()
      expect(wrapper.find("ArtistConsignMarketTrends").text()).toContain("79%")
    })

    it("includes realized price in stat", async () => {
      const wrapper = await getWrapper()
      expect(wrapper.find("ArtistConsignMarketTrends").text()).toContain("177%")
    })

    it("includes button that links out to auction results", async () => {
      const wrapper = await getWrapper()
      expect(
        wrapper
          .find("ArtistConsignMarketTrends")
          .find("RouterLink")
          .html()
      ).toContain(`href="/artist/alex-katz/auction-results"`)
    })

    it("tracks event", async () => {
      const wrapper = await getWrapper()
      wrapper
        .find("ArtistConsignMarketTrends")
        .find("RouterLink")
        .simulate("click")
      expect(trackEvent).toHaveBeenCalledWith({
        action_type: "Click",
        subject: "Explore Auction Results",
      })
    })
  })

  describe("ArtistConsignHowtoSell", () => {
    it("includes button that links out to request estimate", async () => {
      const wrapper = await getWrapper()
      expect(
        wrapper
          .find("ArtistConsignHowtoSell")
          .find("RouterLink")
          .html()
      ).toContain(
        `href="/consign/submission?contextPath=%2Fartist%2Falex-katz%2Fconsign&amp;subject=Request%20a%20price%20estimate"`
      )
    })

    it("tracks event", async () => {
      const wrapper = await getWrapper()
      wrapper
        .find("ArtistConsignHowtoSell")
        .find("RouterLink")
        .simulate("click")
      expect(trackEvent).toHaveBeenCalledWith({
        action_type: "Click",
        context_module: "How to sell your collection with Artsy",
        flow: "Consignments",
        subject: "Request a price estimate",
      })
    })
  })

  describe("ArtistConsignFAQ", () => {
    it("includes link and contact", async () => {
      const wrapper = await getWrapper()
      expect(wrapper.find("ArtistConsignFAQ").html()).toContain(
        "mailto:consign@artsty.net"
      )
    })

    it("tracks event", async () => {
      const wrapper = await getWrapper()
      wrapper
        .find("ArtistConsignFAQ")
        .find("[data-test='submitOnFAQ']")
        .simulate("click")
      expect(trackEvent).toHaveBeenCalledWith({
        action_type: "Click",
        context_module: "FAQ",
        subject: "submit works you’re interested in selling here",
      })
    })
  })

  describe("ArtistConsignSellArt", () => {
    it("includes button that links out to request estimate", async () => {
      const wrapper = await getWrapper()
      expect(
        wrapper
          .find("ArtistConsignSellArt")
          .find("RouterLink")
          .html()
      ).toContain(
        `href="/consign/submission?contextPath=%2Fartist%2Falex-katz%2Fconsign&amp;subject=Request%20a%20price%20estimate"`
      )
    })

    it("tracks event", async () => {
      const wrapper = await getWrapper()
      wrapper
        .find("ArtistConsignSellArt")
        .find("RouterLink")
        .simulate("click")
      expect(trackEvent).toHaveBeenCalledWith({
        action_type: "Click",
        context_module: "Sell Art From Your Collection",
        flow: "Consignments",
        subject: "Request a price estimate",
      })
    })
  })
})
