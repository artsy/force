import { mount } from "enzyme"
import {
  ArtworkFilterContextProvider,
  useArtworkFilterContext,
} from "../../ArtworkFilterContext"
import { ColorFilter, ColorFilterProps } from "../ColorFilter"

jest.mock("v2/Utils/Hooks/useMatchMedia", () => ({
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

  it("selects a color when clicked", () => {
    const wrapper = getWrapper()

    expect(context.filters.colors).toEqual([])

    wrapper.find("Checkbox").first().simulate("click")

    expect(context.filters.colors).toEqual(["black-and-white"])
  })

  it("selects multiple colors when clicked", () => {
    const wrapper = getWrapper()

    expect(context.filters.colors).toEqual([])

    wrapper.find("Checkbox").first().simulate("click")
    wrapper.find("Checkbox").last().simulate("click")

    expect(context.filters.colors).toEqual(["black-and-white", "violet"])
  })

  it("unselects a selected a color when clicked", () => {
    const wrapper = getWrapper()

    expect(context.filters.colors).toEqual([])

    wrapper.find("Checkbox").first().simulate("click")
    wrapper.find("Checkbox").last().simulate("click")

    expect(context.filters.colors).toEqual(["black-and-white", "violet"])

    wrapper.find("Checkbox").first().simulate("click")

    expect(context.filters.colors).toEqual(["violet"])
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
