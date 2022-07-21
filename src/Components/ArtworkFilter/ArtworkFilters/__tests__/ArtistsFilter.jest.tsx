import { mount } from "enzyme"
import {
  Aggregations,
  ArtworkFilterContextProvider,
  useArtworkFilterContext,
} from "../../ArtworkFilterContext"
import { ArtistsFilter, ArtistsFilterProps } from "../ArtistsFilter"

jest.mock("Utils/Hooks/useMatchMedia", () => ({
  __internal__useMatchMedia: () => ({}),
}))

describe("ArtistsFilter", () => {
  let context

  const aggregations: Aggregations = [
    {
      slice: "ARTIST",
      counts: [
        { name: "Percy A", count: 10, value: "percy-a" },
        { name: "Percy B", count: 10, value: "percy-b" },
        { name: "Percy C", count: 10, value: "percy-c" },
        { name: "Percy D", count: 10, value: "percy-d" },
        { name: "Percy E", count: 10, value: "percy-e" },
        { name: "Percy F", count: 10, value: "percy-f" },
        { name: "Percy G", count: 10, value: "percy-g" },
      ],
    },
  ]

  const getWrapper = (
    contextProps = {},
    filterProps: ArtistsFilterProps = { expanded: true }
  ) => {
    return mount(
      <ArtworkFilterContextProvider {...contextProps}>
        <ArtistsFilterTest {...filterProps} />
      </ArtworkFilterContextProvider>
    )
  }

  const ArtistsFilterTest = (props: ArtistsFilterProps) => {
    context = useArtworkFilterContext()
    return <ArtistsFilter {...props} />
  }

  describe("artists", () => {
    it("renders artists", () => {
      const wrapper = getWrapper({
        counts: { followedArtists: 0 },
        aggregations,
      })
      expect(wrapper.find("Checkbox").last().text()).toContain("Percy F")
    })

    describe("show more", () => {
      const wrapper = getWrapper({
        counts: { followedArtists: 0 },
        aggregations,
      })

      it("renders the first 6 and includes a show more expand link", () => {
        expect(wrapper.text()).toContain("Percy F")
        expect(wrapper.text()).toContain("Show more")
        expect(wrapper.text()).not.toContain("Percy G")
      })

      it("reveals the rest of the list when 'Show more' is clicked, and can then hide the list again", () => {
        wrapper
          .findWhere(t => t.text() === "Show more")
          .first()
          .simulate("click")

        expect(wrapper.text()).toContain("Percy G")
        expect(wrapper.text()).toContain("Hide")

        wrapper
          .findWhere(t => t.text() === "Hide")
          .first()
          .simulate("click")

        expect(wrapper.text()).toContain("Show more")
        expect(wrapper.text()).not.toContain("Percy G")
      })
    })
  })

  describe("followed artists", () => {
    it("updates includeArtworksByFollowedArtists on filter change", () => {
      const wrapper = getWrapper({
        counts: { followedArtists: 5 },
        aggregations,
      })
      wrapper.find("Checkbox").first().simulate("click")

      expect(context.filters.includeArtworksByFollowedArtists).toEqual(true)
    })

    it("is disabled if there are no results", () => {
      const wrapper = getWrapper({
        counts: { followedArtists: 0 },
        aggregations,
      })
      expect(wrapper.find("Checkbox").first().props().disabled).toBeTruthy()
    })
  })

  describe("the `expanded` prop", () => {
    it("hides the filter controls when not set", () => {
      const wrapper = getWrapper({ aggregations }, {})
      expect(wrapper.find("Checkbox").length).toBe(0)
    })

    it("hides the filter controls when `false`", () => {
      const wrapper = getWrapper({ aggregations }, { expanded: false })
      expect(wrapper.find("Checkbox").length).toBe(0)
    })

    it("shows the filter controls when `true`", () => {
      const wrapper = getWrapper({ aggregations }, { expanded: true })
      expect(wrapper.find("Checkbox").length).not.toBe(0)
    })
  })
})
