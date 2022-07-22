import { mount } from "enzyme"
import {
  ArtworkFilterContextProvider,
  useArtworkFilterContext,
} from "../../ArtworkFilterContext"
import { WaysToBuyFilter, WaysToBuyFilterProps } from "../WaysToBuyFilter"

jest.mock("Utils/Hooks/useMatchMedia", () => ({
  __internal__useMatchMedia: () => ({}),
}))

describe("WaysToBuyFilter", () => {
  let context

  const getWrapper = (props: WaysToBuyFilterProps = { expanded: true }) => {
    return mount(
      <ArtworkFilterContextProvider>
        <WaysToBuyFilterFilterTest {...props} />
      </ArtworkFilterContextProvider>
    )
  }

  const WaysToBuyFilterFilterTest = (props: WaysToBuyFilterProps) => {
    context = useArtworkFilterContext()
    return <WaysToBuyFilter {...props} />
  }

  it("updates context on filter change", () => {
    const wrapper = getWrapper()
    wrapper.find("Checkbox").first().simulate("click")

    expect(context.filters.acquireable).toEqual(true)
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
