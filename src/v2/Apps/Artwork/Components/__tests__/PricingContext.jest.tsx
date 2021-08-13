import { Link, QuestionCircleIcon } from "@artsy/palette"
import { BarChart } from "@artsy/palette-charts"
import {
  PricingContextTestQueryRawResponse,
  PricingContextTestQueryResponse,
} from "v2/__generated__/PricingContextTestQuery.graphql"
import { mockTracking } from "v2/System/Analytics"
import { renderRelayTree } from "v2/DevTools"
import { mount } from "enzyme"
import React from "react"
import { graphql } from "react-relay"
import Waypoint from "react-waypoint"
import {
  PricingContext,
  PricingContextFragmentContainer,
} from "../PricingContext"
import { flushPromiseQueue } from "v2/DevTools"

jest.unmock("react-tracking")
jest.unmock("react-relay")

// @ts-expect-error STRICT_NULL_CHECK
const mockPricingContext: PricingContextTestQueryRawResponse["artwork"]["pricingContext"] = {
  appliedFiltersDisplay: "Price ranges of small mocks by David Sheldrick",
  appliedFilters: {
    category: "PAINTING",
    dimension: "SMALL",
  },
  bins: [
    {
      maxPrice: "$88",
      maxPriceCents: 8855,
      minPrice: "$9",
      minPriceCents: 900,
      numArtworks: 67,
    },
    {
      maxPrice: "$168",
      maxPriceCents: 16810,
      minPrice: "$88",
      minPriceCents: 8855,
      numArtworks: 1,
    },
    {
      maxPrice: "$247",
      maxPriceCents: 24765,
      minPrice: "$168",
      minPriceCents: 16810,
      numArtworks: 0,
    },
    {
      maxPrice: "$327",
      maxPriceCents: 32720,
      minPrice: "$247",
      minPriceCents: 24765,
      numArtworks: 17,
    },
  ],
}

const mockArtwork: PricingContextTestQueryRawResponse["artwork"] = {
  artists: [{ id: "asfwef", slug: "andy-warhol" }],
  category: "Photography",
  id: "abc124",
  listPrice: {
    __typename: "Money",
    minor: 23455,
  },
  pricingContext: mockPricingContext,
}

describe("PricingContext", () => {
  function getWrapper(
    mockData: PricingContextTestQueryRawResponse = {
      // @ts-expect-error STRICT_NULL_CHECK
      artwork: {
        ...mockArtwork,
      },
    }
  ) {
    return renderRelayTree({
      Component: (props: PricingContextTestQueryResponse) => (
        <div>
          {/* @ts-expect-error STRICT_NULL_CHECK */}
          <PricingContextFragmentContainer {...props} />
        </div>
      ),
      mockData: mockData as PricingContextTestQueryRawResponse,
      query: graphql`
        query PricingContextTestQuery @raw_response_type {
          artwork(id: "unused") {
            ...PricingContext_artwork
          }
        }
      `,
    })
  }

  it("renders if there is data present", async () => {
    const wrapper = await getWrapper()
    expect(wrapper.text()).toContain("Browse works in this category")
    expect(wrapper.text()).toContain(
      "Price ranges of small mocks by David Sheldrick"
    )
  })

  it("renders as null if no data present", async () => {
    const wrapper = await getWrapper({
      artwork: {
        ...mockArtwork,
        pricingContext: null,
      },
    })
    expect(wrapper.text()).not.toContain(
      "Price ranges of small mocks by David Sheldrick"
    )
  })

  it("renders pricing context question mark icon and informational modal", async () => {
    const wrapper = await getWrapper()
    expect(wrapper.find(QuestionCircleIcon).length).toEqual(1)
    wrapper.find(QuestionCircleIcon).at(0).simulate("click")

    await flushPromiseQueue()

    expect(wrapper.text()).toContain(
      "This feature aims to provide insight into the range of prices for an artist's works and allow buyers to discover other available works by the artist at different price points."
    )
  })

  it("displays $0 as the minimum price label if the minimum price is null", async () => {
    const wrapper = await getWrapper()
    expect(wrapper.text()).not.toContain("null")
    expect(wrapper.text()).toContain("$0")
  })

  it("displays '1 work' not '0 works' in highlight label if there are zero artworks for the highlighted bin", async () => {
    const wrapper = await getWrapper()
    const highlightedBar = wrapper.find("Bar").at(2)

    highlightedBar.simulate("mouseenter")
    expect(wrapper.text()).not.toContain("0 works")
    expect(wrapper.text()).toContain("1 work")
  })

  it("displays 'work' singular not 'works' plural in label when there is only 1 artwork in a bin", async () => {
    const wrapper = await getWrapper()
    const secondBar = wrapper.find("Bar").at(1)

    secondBar.simulate("mouseenter")
    expect(wrapper.text()).not.toContain("1 works")
    expect(wrapper.text()).toContain("1 work")
  })

  it("uses the max when list price is a range", async () => {
    const wrapper = await getWrapper({
      artwork: {
        ...mockArtwork,
        listPrice: {
          __typename: "PriceRange",
          minPrice: {
            minor: 15500,
          },
          maxPrice: {
            minor: 25500,
          },
        },
      },
    })

    expect(wrapper.find("HighlightLabel").text()).toMatchInlineSnapshot(
      `"$247+This work"`
    )
  })

  it("Puts the artwork in the first bin when the price is smaller than the first bin's min price", async () => {
    const wrapper = await getWrapper({
      artwork: {
        ...mockArtwork,
        // @ts-expect-error STRICT_NULL_CHECK
        pricingContext: {
          ...mockArtwork.pricingContext,
          bins: [
            {
              maxPrice: "$247",
              maxPriceCents: 24765,
              minPrice: "$168",
              minPriceCents: 16810,
              numArtworks: 0,
            },
            {
              maxPrice: "$327",
              maxPriceCents: 32720,
              minPrice: "$247",
              minPriceCents: 24765,
              numArtworks: 17,
            },
          ],
        },
        listPrice: {
          __typename: "PriceRange",
          minPrice: {
            minor: 15500,
          },
          maxPrice: {
            minor: 15500,
          },
        },
      },
    })

    expect(wrapper.find(BarChart).props().bars[0].label).toMatchInlineSnapshot(`
Object {
  "description": "1 work",
  "title": "$0–$247",
}
`)
  })

  it("Puts the artwork in the last bin when the price is larger than the last bin's max price", async () => {
    const wrapper = await getWrapper({
      artwork: {
        ...mockArtwork,
        // @ts-expect-error STRICT_NULL_CHECK
        pricingContext: {
          ...mockArtwork.pricingContext,
          bins: [
            {
              maxPrice: "$247",
              maxPriceCents: 24765,
              minPrice: "$168",
              minPriceCents: 16810,
              numArtworks: 17,
            },
            {
              maxPrice: "$327",
              maxPriceCents: 32720,
              minPrice: "$247",
              minPriceCents: 24765,
              numArtworks: 0,
            },
          ],
        },
        listPrice: {
          __typename: "PriceRange",
          minPrice: {
            minor: 32721,
          },
          maxPrice: {
            minor: 32721,
          },
        },
      },
    })

    expect(wrapper.find(BarChart).props().bars[1].label).toMatchInlineSnapshot(`
Object {
  "description": "1 work",
  "title": "$247+",
}
`)
  })

  describe("Analytics", () => {
    it("Tracks impressions", () => {
      const { Component, dispatch } = mockTracking(PricingContext)
      const component = mount(<Component artwork={mockArtwork as any} />)
      component.find(Waypoint).getElement().props.onEnter()

      expect(dispatch).toBeCalledWith({
        action_type: "Impression",
        context_module: "Price Context",
        subject: "Histogram Bar",
        type: "Chart",
        flow: "Artwork Price Context",
      })
    })

    it("tracks hovers on histogram bars", () => {
      const { Component, dispatch } = mockTracking(PricingContext)
      const component = mount(<Component artwork={mockArtwork as any} />)
      component.find("Bar").at(0).simulate("mouseOver")
      expect(dispatch).toBeCalledWith({
        context_module: "Price Context",
        action_type: "Hover",
        subject: "Histogram Bar",
        flow: "Artwork Price Context",
        type: "Chart",
      })
      expect(dispatch).toHaveBeenCalledTimes(1)
    })

    it("tracks clicks on 'Browse works in this category' link", () => {
      const { Component, dispatch } = mockTracking(PricingContext)
      const component = mount(<Component artwork={mockArtwork as any} />)
      component.find(Link).at(0).simulate("click")

      expect(dispatch).toBeCalledWith({
        context_module: "Price Context",
        action_type: "Click",
        subject: "Browse works in this category",
        flow: "Artwork Price Context",
        type: "Chart",
      })
      expect(dispatch).toHaveBeenCalledTimes(1)
    })
  })
})
