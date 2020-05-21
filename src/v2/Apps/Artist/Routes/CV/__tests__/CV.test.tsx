import { CVFixture } from "v2/Apps/__tests__/Fixtures/Artist/Routes/CVFixture"
import { CVRouteFragmentContainer as CVRoute } from "v2/Apps/Artist/Routes/CV"
import { MockBoot, renderRelayTree } from "v2/DevTools"
import { ReactWrapper } from "enzyme"
import React from "react"
import { graphql } from "react-relay"
import { Breakpoint } from "v2/Utils/Responsive"
import { CVItem } from "../CVItem"

jest.unmock("react-relay")

describe("CV Route", () => {
  let wrapper: ReactWrapper

  const getWrapper = async (breakpoint: Breakpoint = "xl") => {
    return await renderRelayTree({
      Component: CVRoute,
      query: graphql`
        query CV_Test_Query($artistID: String!) @raw_response_type {
          viewer {
            ...CV_viewer
          }
        }
      `,
      mockData: CVFixture,
      variables: {
        artistID: "pablo-picasso",
      },
      wrapper: children => (
        <MockBoot breakpoint={breakpoint}>{children}</MockBoot>
      ),
    })
  }

  describe("general behavior", () => {
    beforeAll(async () => {
      wrapper = await getWrapper()
    })

    it("renders proper elements", () => {
      expect(wrapper.find("CVItem").length).toBe(3)
      expect(wrapper.find("Button").length).toBe(3)
    })

    it("renders correct sections", () => {
      const html = wrapper.html()
      expect(html).toContain("Solo shows")
      expect(html).toContain("Group shows")
      expect(html).toContain("Fair booths")
    })

    it("renders correct number of items per section", () => {
      const getRowsAt = index =>
        wrapper
          .find("CVItem")
          .at(index)
          .find("ShowEntry")

      expect(getRowsAt(0).length).toBe(10)
      expect(getRowsAt(1).length).toBe(10)
      expect(getRowsAt(2).length).toBe(10)
    })

    it("renders correct button labels", () => {
      const getButtonAt = index => wrapper.find("Button").at(index)
      expect(getButtonAt(0).text()).toBe("Show more")
      expect(getButtonAt(1).text()).toBe("Show more")
      expect(getButtonAt(2).text()).toBe("Show more")
    })

    it("renders correct list items", () => {
      const getShowAt = index => wrapper.find("ShowEntry").at(index)
      expect(getShowAt(0).text()).toContain("Picasso Prints,  Wada Garou Tokyo")
      expect(getShowAt(10).text()).toContain(
        "2018 Larsen Art Auction,  Larsen Gallery, Scottsdale"
      )
    })

    it("calls loadMore on button click", () => {
      const spy = spyOn(
        wrapper
          .find("CVItem")
          .at(0)
          .instance() as CVItem,
        "loadMore"
      )
      const button = wrapper.find("Button").at(0)
      button.simulate("click")
      expect(spy).toHaveBeenCalled()
    })
  })
})
