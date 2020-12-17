import { Breakpoint } from "@artsy/palette"
import { useTracking } from "v2/Artsy/Analytics/useTracking"
import {
  ArtworkFilter,
  BaseArtworkFilter,
} from "v2/Components/v2/ArtworkFilter"
import { MockBoot, renderRelayTree } from "v2/DevTools"
import { renderToString } from "v2/DevTools/__tests__/MockRelayRendererFixtures"
import React from "react"
import { ArtworkQueryFilter } from "../ArtworkQueryFilter"
import { ArtworkFilterFixture } from "./fixtures/ArtworkFilter.fixture"

jest.unmock("react-relay")
jest.mock("v2/Artsy/Analytics/useTracking")

describe("ArtworkFilter", () => {
  const getWrapper = async (
    breakpoint: Breakpoint = "lg",
    passedProps = {}
  ) => {
    return await renderRelayTree({
      Component: props => (
        <ArtworkFilter {...(props as any)} {...passedProps} />
      ),
      mockData: ArtworkFilterFixture,
      query: ArtworkQueryFilter,
      wrapper: children => {
        return <MockBoot breakpoint={breakpoint}>{children}</MockBoot>
      },
    })
  }

  const trackEvent = jest.fn()

  beforeEach(() => {
    ;(useTracking as jest.Mock).mockImplementation(() => {
      return {
        trackEvent,
      }
    })
  })

  describe("without any filtered artworks", () => {
    it("renders null", async () => {
      const props = {
        viewer: { filtered_artworks: null },
      } as any
      const filterComponent = <BaseArtworkFilter {...props} />
      expect(renderToString(filterComponent)).toBeFalsy()
    })
  })

  describe("desktop", () => {
    it("renders default UI items", async () => {
      const wrapper = await getWrapper()
      expect(wrapper.find("ArtworkFilterArtworkGrid").length).toEqual(1)
      expect(wrapper.find("SortFilter").length).toEqual(1)
      expect(wrapper.find("Pagination").length).toEqual(1)
    })

    it("triggers #onFilterClick on filter click, passing back the changed value and current filter state", async () => {
      const onFilterClick = jest.fn()
      const wrapper = await getWrapper("lg", {
        onFilterClick,
      })
      wrapper.find("WaysToBuyFilter").find("Checkbox").first().simulate("click")

      expect(onFilterClick).toHaveBeenCalledWith("acquireable", true, {
        acquireable: true,
        artistIDs: [],
        majorPeriods: [],
        page: 1,
        sizes: [],
        sort: "-decayed_merch",
      })
    })

    it("triggers #onBrickClick on brick click", async () => {
      const wrapper = await getWrapper()
      wrapper.find("ArtworkGridItemContainer a").first().simulate("click")

      expect(trackEvent).toHaveBeenCalledWith({
        action: "clickedMainArtworkGrid",
        context_module: "artworkGrid",
        context_page_owner_id: undefined,
        context_page_owner_slug: undefined,
        context_page_owner_type: "home",
        destination_page_owner_id: "5d041931e607c200127ef3c1",
        destination_page_owner_slug: "andy-warhol-kenny-burrell",
        destination_page_owner_type: "artwork",
        type: "thumbnail",
      })
    })

    it("triggers #onChange when filters change, passing back filter state", async () => {
      const onChange = jest.fn()
      const wrapper = await getWrapper("lg", {
        onChange,
      })
      wrapper.find("WaysToBuyFilter").find("Checkbox").first().simulate("click")

      expect(onChange).toHaveBeenCalledWith({
        acquireable: true,
        artistIDs: [],
        majorPeriods: [],
        page: 1,
        sizes: [],
        sort: "-decayed_merch",
      })
    })

    it("does not render sort if options not passed", async () => {
      const wrapper = await getWrapper("lg")
      expect(wrapper.find("SelectSmall").length).toEqual(0)
    })

    it("renders a sort filter if filters are passed in and updates filter state on change", async () => {
      const onChange = jest.fn()
      const wrapper = await getWrapper("lg", {
        onChange,
        sortOptions: [
          { text: "Default", value: "-decayed_merch" },
          { text: "Recently updated", value: "-partner_updated_at" },
        ],
      })

      wrapper.find("SelectSmall").find("option").at(1).simulate("change")

      expect(onChange).toHaveBeenCalledWith({
        artistIDs: [],
        majorPeriods: [],
        page: 1,
        sizes: [],
        sort: "-partner_updated_at",
      })
    })

    it("tracks clicks", async () => {
      const onFilterClick = jest.fn()
      const wrapper = await getWrapper("lg", {
        onFilterClick,
      })
      wrapper.find("WaysToBuyFilter").find("Checkbox").first().simulate("click")

      expect(trackEvent).toHaveBeenCalledWith({
        action: "commercialFilterParamsChanged",
        changed: { acquireable: true },
        context_module: "artworkGrid",
        context_owner_id: undefined,
        context_owner_slug: undefined,
        context_owner_type: "home",
        current: {
          acquireable: true,
          artistIDs: [],
          majorPeriods: [],
          page: 1,
          sizes: [],
          sort: "-decayed_merch",
        },
      })
    })
  })

  describe("mobile", () => {
    it("renders default UI items", async () => {
      const wrapper = await getWrapper("xs")
      expect(wrapper.find("ArtworkFilterArtworkGrid").length).toEqual(1)
      expect(wrapper.find("Button").text()).toEqual("FilterFilter") // svg icon + text
      expect(wrapper.find("FilterIcon").length).toEqual(1)
    })

    it("toggles mobile action sheet", async () => {
      const wrapper = await getWrapper("xs")
      wrapper.find("Button").simulate("click")
      const actionSheet = wrapper.find("ArtworkFilterMobileActionSheet")
      expect(actionSheet.length).toEqual(1)
      expect(document.body.style.overflowY).toEqual("hidden")
      actionSheet.find("Button").last().simulate("click")
      expect(wrapper.find("ArtworkFilterMobileActionSheet").length).toEqual(0)
      expect(document.body.style.overflowY).toEqual("visible")
    })
  })
})
