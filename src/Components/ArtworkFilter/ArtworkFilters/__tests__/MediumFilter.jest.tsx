import { mount } from "enzyme"
import {
  ArtworkFilterContextProvider,
  useArtworkFilterContext,
} from "../../ArtworkFilterContext"
import { MediumFilter, MediumFilterProps } from "../MediumFilter"

jest.mock("Utils/Hooks/useMatchMedia", () => ({
  __internal__useMatchMedia: () => ({}),
}))

describe("MediumFilter", () => {
  let context

  const getWrapper = (
    contextProps = {},
    filterProps: MediumFilterProps = { expanded: true }
  ) => {
    return mount(
      <ArtworkFilterContextProvider {...contextProps}>
        <MediumFilterTest {...filterProps} />
      </ArtworkFilterContextProvider>
    )
  }

  const MediumFilterTest = (props: MediumFilterProps) => {
    context = useArtworkFilterContext()
    return <MediumFilter {...props} />
  }

  it("shows custom mediums if aggregations passed to context", () => {
    const wrapper = getWrapper({
      aggregations: [
        {
          slice: "MEDIUM",
          counts: [
            {
              name: "Foo Medium",
              value: "foo-medium",
            },
          ],
        },
      ],
    })

    expect(wrapper.html()).toContain("Foo Medium")
    expect(wrapper.html()).not.toContain("Painting")
  })

  it("selects mediums", () => {
    const wrapper = getWrapper()
    wrapper.find("Checkbox").first().simulate("click")
    expect(context.filters.additionalGeneIDs).toEqual(["painting"])
  })

  describe("the `expanded` prop", () => {
    it("hides the filter controls when not set", () => {
      const wrapper = getWrapper({}, {})

      expect(wrapper.find("Checkbox").length).toBe(0)
    })

    it("hides the filter controls when `false`", () => {
      const wrapper = getWrapper({}, { expanded: false })

      expect(wrapper.find("Checkbox").length).toBe(0)
    })

    it("shows the filter controls when `true`", () => {
      const wrapper = getWrapper({}, { expanded: true })

      expect(wrapper.find("Checkbox").length).not.toBe(0)
    })
  })
})
