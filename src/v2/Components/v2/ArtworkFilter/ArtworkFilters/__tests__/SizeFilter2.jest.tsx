import { Input } from "@artsy/palette"
import { mount, ReactWrapper } from "enzyme"
import React from "react"
import {
  ArtworkFilterContextProps,
  ArtworkFilterContextProvider,
  useArtworkFilterContext,
} from "v2/Components/v2/ArtworkFilter/ArtworkFilterContext"
import { SizeFilter2, SizeFilter2Props } from "../SizeFilter2"

describe("SizeFilter2", () => {
  let context: ArtworkFilterContextProps

  const getWrapper = (props: SizeFilter2Props = { expanded: true }) => {
    return mount(
      <ArtworkFilterContextProvider>
        <SizeFilterTest {...props} />
      </ArtworkFilterContextProvider>
    )
  }

  const SizeFilterTest = (props: SizeFilter2Props) => {
    context = useArtworkFilterContext()
    return <SizeFilter2 {...props} />
  }

  const simulateTyping = (
    wrapper: ReactWrapper,
    name: string,
    text: string
  ) => {
    const nameInput = wrapper.find(`input[name='${name}']`)
    // @ts-ignore
    nameInput.getDOMNode().value = text
    nameInput.simulate("change")
  }

  it("updates context on filter change", async () => {
    const wrapper = getWrapper() as any

    await wrapper.find("Checkbox").at(0).simulate("click")
    expect(context.filters.sizes).toEqual(["SMALL"])

    await wrapper.find("Checkbox").at(2).simulate("click")
    expect(context.filters.sizes).toEqual(["SMALL", "LARGE"])
  })

  it("toggles custom input render", async () => {
    const wrapper = getWrapper()

    expect(wrapper.find(Input)).toHaveLength(0)
    expect(wrapper.text()).not.toContain("Height")
    expect(wrapper.text()).not.toContain("Width")

    wrapper
      .find("button")
      .filterWhere(n => n.text() === "Show custom size")
      .simulate("click")

    expect(
      wrapper.find("button").filterWhere(n => n.text() === "Hide custom size")
    ).toHaveLength(1)

    expect(wrapper.find(Input)).toHaveLength(4)
    expect(wrapper.text()).toContain("Height")
    expect(wrapper.text()).toContain("Width")
  })

  it("updates the filter values", async () => {
    const wrapper = getWrapper()

    await wrapper.find("Checkbox").at(0).simulate("click")
    expect(context.filters.sizes).toEqual(["SMALL"])

    wrapper
      .find("button")
      .filterWhere(n => n.text() === "Show custom size")
      .simulate("click")

    simulateTyping(wrapper, "height_min", "12")
    simulateTyping(wrapper, "height_max", "16")
    simulateTyping(wrapper, "width_min", "12")
    simulateTyping(wrapper, "width_max", "16")

    await wrapper
      .find("button")
      .filterWhere(n => n.text() === "Set size")
      .simulate("click")
    expect(context.filters.sizes).toEqual([])
    // assert conversion from centimeters to inches
    expect(context.filters.height).toEqual("4.72-6.3")
    expect(context.filters.width).toEqual("4.72-6.3")
  })

  it("updates the filter values when only one dimension is added", async () => {
    const wrapper = getWrapper()

    wrapper
      .find("button")
      .filterWhere(n => n.text() === "Show custom size")
      .simulate("click")

    simulateTyping(wrapper, "height_min", "12")
    simulateTyping(wrapper, "height_max", "24")

    await wrapper
      .find("button")
      .filterWhere(n => n.text() === "Set size")
      .simulate("click")
    expect(context.filters.sizes).toEqual([])
    // assert conversion centimeters to inches
    expect(context.filters.height).toEqual("4.72-9.45")
    expect(context.filters.width).toEqual("*-*")
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

  it("stages the filter changes", async () => {
    const wrapper = getWrapper()
    context.setShouldStageFilterChanges(true)

    wrapper
      .find("button")
      .filterWhere(n => n.text() === "Show custom size")
      .simulate("click")

    simulateTyping(wrapper, "height_min", "12")
    simulateTyping(wrapper, "height_max", "16")
    simulateTyping(wrapper, "width_min", "12")
    simulateTyping(wrapper, "width_max", "16")

    expect(context.stagedFilters.height).toEqual("12-16")
    expect(context.stagedFilters.width).toEqual("12-16")
  })
})
