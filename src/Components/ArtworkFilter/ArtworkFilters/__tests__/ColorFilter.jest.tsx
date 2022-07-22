import { mount } from "enzyme"
import {
  ArtworkFilterContextProvider,
  useArtworkFilterContext,
} from "../../ArtworkFilterContext"
import { ColorFilter, ColorFilterProps } from "../ColorFilter"

jest.mock("Utils/Hooks/useMatchMedia", () => ({
  __internal__useMatchMedia: () => ({}),
}))

describe("ColorFilter", () => {
  let context

  const getWrapper = (filterProps: ColorFilterProps = { expanded: true }) => {
    return mount(
      <ArtworkFilterContextProvider>
        <ColorFilterTest {...filterProps} />
      </ArtworkFilterContextProvider>
    )
  }

  const ColorFilterTest = (props: ColorFilterProps) => {
    context = useArtworkFilterContext()
    return <ColorFilter {...props} />
  }

  it("initially renders the primary colors", () => {
    const wrapper = getWrapper()

    expect(wrapper.find("Checkbox")).toHaveLength(6)
  })

  it("renders all the colors when 'Show more' is clicked", () => {
    const wrapper = getWrapper()

    wrapper
      .findWhere(t => t.text() === "Show more")
      .first()
      .simulate("click")

    expect(wrapper.find("Checkbox")).toHaveLength(10)
  })

  it("selects a color when clicked", () => {
    const wrapper = getWrapper()

    expect(context.filters.colors).toEqual([])

    wrapper.find("Checkbox").first().simulate("click")

    expect(context.filters.colors).toEqual(["red"])
  })

  it("selects multiple colors when clicked", () => {
    const wrapper = getWrapper()

    expect(context.filters.colors).toEqual([])

    wrapper.find("Checkbox").first().simulate("click")
    wrapper.find("Checkbox").last().simulate("click")

    expect(context.filters.colors).toEqual(["red", "purple"])
  })

  it("unselects a selected a color when clicked", () => {
    const wrapper = getWrapper()

    expect(context.filters.colors).toEqual([])

    wrapper.find("Checkbox").first().simulate("click")
    wrapper.find("Checkbox").last().simulate("click")

    expect(context.filters.colors).toEqual(["red", "purple"])

    wrapper.find("Checkbox").first().simulate("click")

    expect(context.filters.colors).toEqual(["purple"])
  })

  describe("the `expanded` prop", () => {
    it("hides the filter controls when not set", () => {
      const wrapper = getWrapper({})
      expect(wrapper.find("Checkbox").length).toBe(0)
    })

    it("hides the filter controls when `false`", () => {
      const wrapper = getWrapper({ expanded: false })
      expect(wrapper.find("Checkbox").length).toBe(0)
    })

    it("shows the filter controls when `true`", () => {
      const wrapper = getWrapper({ expanded: true })
      expect(wrapper.find("Checkbox").length).not.toBe(0)
    })
  })
})
