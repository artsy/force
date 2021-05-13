import { mount } from "enzyme"
import React from "react"
import {
  ArtworkFilterContextProps,
  ArtworkFilterContextProvider,
  useArtworkFilterContext,
} from "v2/Components/ArtworkFilter/ArtworkFilterContext"
import { SizeFilter, SizeFilterProps } from "../SizeFilter"

describe("SizeFilter", () => {
  let context: ArtworkFilterContextProps

  const getWrapper = (props: SizeFilterProps = { expanded: true }) => {
    return mount(
      <ArtworkFilterContextProvider>
        <SizeFilterTest {...props} />
      </ArtworkFilterContextProvider>
    )
  }

  const SizeFilterTest = (props: SizeFilterProps) => {
    context = useArtworkFilterContext()
    return <SizeFilter {...props} />
  }

  it("updates context on filter change", async () => {
    const wrapper = getWrapper() as any

    await wrapper.find("Checkbox").at(0).simulate("click")
    // @ts-expect-error STRICT_NULL_CHECK
    expect(context.filters.sizes).toEqual(["SMALL"])

    await wrapper.find("Checkbox").at(2).simulate("click")
    // @ts-expect-error STRICT_NULL_CHECK
    expect(context.filters.sizes).toEqual(["SMALL", "LARGE"])
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
