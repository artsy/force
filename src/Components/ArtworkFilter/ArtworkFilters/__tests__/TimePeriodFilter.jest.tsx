import { mount } from "enzyme"
import {
  ArtworkFilterContextProvider,
  useArtworkFilterContext,
} from "../../ArtworkFilterContext"
import { TimePeriodFilter, TimePeriodFilterProps } from "../TimePeriodFilter"

jest.mock("Utils/Hooks/useMatchMedia", () => ({
  __internal__useMatchMedia: () => ({}),
}))

describe("TimePeriodFilter", () => {
  let context

  const aggregations = [
    {
      slice: "MAJOR_PERIOD",
      counts: [
        {
          name: "2000",
          value: "2000-period",
        },
        {
          name: "Late 19th Century",
          value: "foo-period",
        },
        {
          name: "18th Century & Earlier",
          value: "bar-period",
        },
      ],
    },
  ]

  const getWrapper = (
    contextProps = {},
    filterProps: TimePeriodFilterProps = { expanded: true }
  ) => {
    return mount(
      <ArtworkFilterContextProvider {...contextProps}>
        <TimePeriodFilterFilterTest {...filterProps} />
      </ArtworkFilterContextProvider>
    )
  }

  const TimePeriodFilterFilterTest = (props: TimePeriodFilterProps) => {
    context = useArtworkFilterContext()
    return <TimePeriodFilter {...props} />
  }

  it("shows specific time periods if aggregations passed to context", () => {
    const wrapper = getWrapper({ aggregations })

    expect(wrapper.html()).toContain("Late 19th Century")
    expect(wrapper.html()).toContain("18th Century &amp; Earlier")
    expect(wrapper.html()).toContain("2000s")
    expect(wrapper.html()).not.toContain("2010")
  })

  it("doesn't render if there are no periods", () => {
    const wrapper = getWrapper({
      aggregations: [
        {
          slice: "MAJOR_PERIOD",
          counts: [],
        },
      ],
    })

    expect(wrapper.html()).not.toBeTruthy()
  })

  it("updates context on filter change", () => {
    const wrapper = getWrapper()
    wrapper.find("Checkbox").first().simulate("click")

    expect(context.filters.majorPeriods).toEqual(["2020"])
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
