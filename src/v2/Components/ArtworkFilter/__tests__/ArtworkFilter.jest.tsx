import { Breakpoint } from "@artsy/palette"
import { useTracking } from "v2/System/Analytics/useTracking"
import { ArtworkFilter, BaseArtworkFilter } from "v2/Components/ArtworkFilter"
import { MockBoot, renderRelayTree } from "v2/DevTools"
import { renderToString } from "v2/DevTools/__tests__/MockRelayRendererFixtures"
import React from "react"
import { ArtworkQueryFilter } from "../ArtworkQueryFilter"
import { ArtworkFilterFixture } from "./fixtures/ArtworkFilter.fixture"
import { Pagination } from "v2/Components/Pagination"
import { initialArtworkFilterState } from "../ArtworkFilterContext"

jest.unmock("react-relay")
jest.mock("v2/System/Analytics/useTracking")
jest.mock("v2/Components/Pagination/useComputeHref")
jest.mock("v2/Utils/Hooks/useMatchMedia", () => ({
  useMatchMedia: () => ({}),
}))

describe("ArtworkFilter", () => {
  const getWrapper = async (
    breakpoint: Breakpoint = "lg",
    passedProps = {}
  ) => {
    return await renderRelayTree({
      Component: props => (
        <ArtworkFilter {...(props as any)} {...passedProps} />
      ),
      query: ArtworkQueryFilter,
      mockData: ArtworkFilterFixture,
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

  describe("tracks clicks", () => {
    it("on filter", async () => {
      const onFilterClick = jest.fn()
      const wrapper = await getWrapper("lg", {
        onFilterClick,
      })

      wrapper.find("WaysToBuyFilter").find("Checkbox").first().simulate("click")

      expect(trackEvent).toHaveBeenCalledWith(
        expect.objectContaining({
          action: "commercialFilterParamsChanged",
          context_module: "artworkGrid",
          context_owner_id: undefined,
          context_owner_slug: undefined,
          context_owner_type: "home",
          // `current` and `changed` are sent as
          // JSON blobs, and verified below
        })
      )

      const { current, changed } = trackEvent.mock.calls[0][0]

      expect(JSON.parse(current)).toMatchObject({
        ...initialArtworkFilterState,
        acquireable: true,
      })

      expect(JSON.parse(changed)).toMatchObject({
        acquireable: true,
      })
    })

    it("on page change", async () => {
      const wrapper = await getWrapper()

      wrapper.find("Page a").at(2).simulate("click", { button: 0 })

      expect(trackEvent).toHaveBeenCalledWith(
        expect.objectContaining({
          action: "clickedChangePage",
          context_module: "artworkGrid",
          context_page_owner_id: undefined,
          context_page_owner_slug: undefined,
          context_page_owner_type: "home",
          page_current: 1,
          page_changed: 3,
        })
      )
    })
  })

  describe("desktop", () => {
    it("renders default UI items", async () => {
      const wrapper = await getWrapper()
      expect(wrapper.find("ArtworkFilterArtworkGrid").length).toEqual(1)
      expect(wrapper.find("SortFilter").length).toEqual(1)
      expect(wrapper.find(Pagination).length).toEqual(1)
    })

    it("triggers #onFilterClick on filter click, passing back the changed value and current filter state", async () => {
      const onFilterClick = jest.fn()
      const wrapper = await getWrapper("lg", {
        onFilterClick,
      })

      wrapper.find("WaysToBuyFilter").find("Checkbox").first().simulate("click")

      expect(onFilterClick).toHaveBeenCalledWith("acquireable", true, {
        ...initialArtworkFilterState,
        acquireable: true,
      })
    })

    it("triggers #onBrickClick on brick click", async () => {
      const wrapper = await getWrapper()
      wrapper.find("ArtworkGridItem a").first().simulate("click")

      expect(trackEvent).toHaveBeenCalledWith({
        action: "clickedMainArtworkGrid",
        context_module: "artworkGrid",
        context_page_owner_id: undefined,
        context_page_owner_slug: undefined,
        context_page_owner_type: "home",
        destination_page_owner_id: "5d041931e607c200127ef3c1",
        destination_page_owner_slug: "andy-warhol-kenny-burrell",
        destination_page_owner_type: "artwork",
        position: 0,
        sort: "-decayed_merch",
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
        ...initialArtworkFilterState,
        acquireable: true,
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
          { value: "-decayed_merch", text: "Default" },
          { value: "-partner_updated_at", text: "Recently updated" },
        ],
      })

      wrapper.find("Select").find("option").at(1).simulate("change")

      expect(onChange).toHaveBeenCalledWith({
        ...initialArtworkFilterState,
        sort: "-partner_updated_at",
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
      expect(wrapper.find("FiltersWithScrollIntoView").length).toEqual(0)
      wrapper.find("Button").simulate("click")
      const actionSheet = wrapper.find("ArtworkFilterMobileActionSheet")
      expect(actionSheet.length).toEqual(1)
      expect(wrapper.find("FiltersWithScrollIntoView").length).toEqual(1)
      expect(document.body.style.overflowY).toEqual("hidden")

      wrapper.find("WaysToBuyFilter").find("Checkbox").first().simulate("click")
      actionSheet.find("Button").last().simulate("click")

      expect(wrapper.find("ArtworkFilterMobileActionSheet").length).toEqual(0)
      expect(document.body.style.overflowY).toEqual("visible")
    })
  })
})
