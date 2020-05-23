import { mount } from "enzyme"
import "jest-styled-components"
import React from "react"
import renderer from "react-test-renderer"
import MarketInsights from "../MarketInsights"
import { MarketInsightsArtists } from "./Fixtures/Artists.fixture"

describe("MarketInsights", () => {
  describe("snapshots", () => {
    it("renders correctly", () => {
      const marketInsights = renderer
        .create(<MarketInsights artist={MarketInsightsArtists[0] as any} />)
        .toJSON()
      expect(marketInsights).toMatchSnapshot()
    })
  })

  describe("unit", () => {
    it("renders market data if present", () => {
      const component = mount(
        <MarketInsights artist={MarketInsightsArtists[0] as any} />
      )
      expect(component.text()).toMatch("$63m auction record")
      expect(component.text()).toMatch("Represented by blue chip galleries")
      expect(component.text()).toMatch("Collected by major museums")
      expect(component.text()).toMatch(
        "Generated using partial data. Tell us what you think."
      )
    })

    it("renders nothing if no market data", () => {
      const component = mount(
        <MarketInsights artist={MarketInsightsArtists[1] as any} />
      )
      expect(component.html()).toBe(null)
    })

    describe("#renderGalleryCategory", () => {
      it("prints single results", () => {
        const component = mount(
          <MarketInsights artist={MarketInsightsArtists[0] as any} />
        )
        const {
          props: { children },
        } = (component.instance() as any).renderGalleryCategory("blue-chip", 1)

        expect(children[0]).toMatch("Represented by a blue chip gallery")
      })

      it("prints plural results", () => {
        const component = mount(
          <MarketInsights artist={MarketInsightsArtists[0] as any} />
        )
        const {
          props: { children },
        } = (component.instance() as any).renderGalleryCategory(
          "top-emerging",
          2
        )

        expect(children[0]).toMatch("Represented by top emerging galleries")
      })
    })
  })
})
