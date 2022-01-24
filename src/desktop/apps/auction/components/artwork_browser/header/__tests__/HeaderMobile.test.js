import renderTestComponent from "desktop/apps/auction/__tests__/utils/renderTestComponent"
import HeaderMobile from "desktop/apps/auction/components/artwork_browser/header/HeaderMobile"
import sinon from "sinon"

const rewire = require("rewire")("../../../../actions/artworkBrowser")

describe.skip("auction/components/artwork_browser/header/HeaderMobile.test", () => {
  describe("<HeaderMobile />", () => {
    it("default sort is Default", () => {
      const { wrapper } = renderTestComponent({
        Component: HeaderMobile,
      })

      wrapper
        .find("select")
        .find("option")
        .first()
        .html()
        .should.containEql("Default")
    })

    it("calls updateSort on select change", () => {
      const { wrapper } = renderTestComponent({
        Component: HeaderMobile,
      })

      const { store } = wrapper.props()
      const updateSort = "bidder_positions_count"

      const auctionQueries = {
        saleArtworksConnection: {
          aggregations: [
            {
              slice: "ARTIST",
              counts: 10,
            },
            {
              slice: "MEDIUM",
              counts: 13,
            },
          ],
          counts: 10,
          edges: [
            {
              node: {
                artwork: {
                  _id: "foo",
                },
              },
            },
          ],
        },
      }

      const resetRewire = rewire.__set__(
        "metaphysics",
        sinon.stub().returns(Promise.resolve(auctionQueries))
      )

      wrapper.find("select").simulate("change", {
        target: {
          value: updateSort,
        },
      })

      store.getState().artworkBrowser.filterParams.sort.should.eql(updateSort)
      resetRewire()
    })
  })
})
