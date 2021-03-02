import { Input } from "@artsy/palette"
import { mount, ReactWrapper } from "enzyme"
import React from "react"
import {
  ArtworkFilterContextProps,
  ArtworkFilterContextProvider,
  useArtworkFilterContext,
} from "v2/Components/v2/ArtworkFilter/ArtworkFilterContext"
import { SizeFilter2 } from "../SizeFilter2"

describe("SizeFilter2", () => {
  let context: ArtworkFilterContextProps

  const getWrapper = () => {
    return mount(
      <ArtworkFilterContextProvider>
        <SizeFilterTest />
      </ArtworkFilterContextProvider>
    )
  }

  const SizeFilterTest = () => {
    context = useArtworkFilterContext()
    return <SizeFilter2 />
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
    expect(context.filters.height).toEqual("12-16")
    expect(context.filters.width).toEqual("12-16")
  })
})
