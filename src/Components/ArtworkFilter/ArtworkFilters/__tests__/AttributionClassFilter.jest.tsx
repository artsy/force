import { mount } from "enzyme"
import {
  ArtworkFilterContextProps,
  ArtworkFilterContextProvider,
  useArtworkFilterContext,
} from "Components/ArtworkFilter/ArtworkFilterContext"
import {
  AttributionClassFilter,
  AttributionClassFilterProps,
} from "../AttributionClassFilter"

jest.mock("Utils/Hooks/useMatchMedia", () => ({
  __internal__useMatchMedia: () => ({}),
}))

describe("AttributionClassFilter", () => {
  let context: ArtworkFilterContextProps

  const getWrapper = (
    props: AttributionClassFilterProps = { expanded: true }
  ) => {
    return mount(
      <ArtworkFilterContextProvider>
        <AttributionClassFilterTest {...props} />
      </ArtworkFilterContextProvider>
    )
  }

  const AttributionClassFilterTest = (props: AttributionClassFilterProps) => {
    context = useArtworkFilterContext()
    return <AttributionClassFilter {...props} />
  }

  it("updates context on filter change", async () => {
    const wrapper = getWrapper() as any

    await wrapper.find("Checkbox").at(0).simulate("click")
    // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
    expect(context.filters.attributionClass).toEqual(["unique"])

    await wrapper.find("Checkbox").at(2).simulate("click")
    // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
    expect(context.filters.attributionClass).toEqual(["unique", "open edition"])
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
