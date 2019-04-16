import React from "react"
import renderTestComponent from "desktop/apps/auction/__tests__/utils/renderTestComponent"

const rewire = require("rewire")("../ArtistFilter")
const { ArtistFilter } = rewire.test

xdescribe("auction/components/artwork_browser/sidebar/ArtistFilter.test", () => {
  describe("<ArtistFilter />", () => {
    const BasicCheckbox = () => <div />

    const props = {
      allArtists: { id: 1 },
      artistIds: [1, 2, 3],
      artistsYouFollow: { id: 1 },
      aggregatedArtists: [{ id: 1 }, { id: 2 }, { id: 3 }],
      allArtistsSelected: false,
      includeArtworksByFollowedArtists: false,
      updateArtistParamsAction: x => x,
    }

    beforeEach(() => {
      rewire.__set__("BasicCheckbox", BasicCheckbox)
    })

    it("by default does not render a artists you follow checkbox", () => {
      const { wrapper } = renderTestComponent({
        Component: ArtistFilter,
        props,
      })

      wrapper
        .find(".auction-ArtistFilter__artists-you-follow")
        .length.should.eql(0)
    })

    it("renders an works by artists you follow checkbox if user", () => {
      const { wrapper } = renderTestComponent({
        Component: ArtistFilter,
        props: {
          ...props,
          user: { foo: "bar" },
        },
      })

      wrapper
        .find(".auction-ArtistFilter__artists-you-follow")
        .length.should.eql(1)
    })

    it("renders an Artists basic checkbox", () => {
      const { wrapper } = renderTestComponent({
        Component: ArtistFilter,
        props,
      })

      wrapper.html().should.containEql("Artists")
    })

    it("renders a list oc checkboxes based on number of aggregated artists", () => {
      const { wrapper } = renderTestComponent({
        Component: ArtistFilter,
        props,
      })

      wrapper.find(BasicCheckbox).length.should.eql(4)
    })
  })
})
