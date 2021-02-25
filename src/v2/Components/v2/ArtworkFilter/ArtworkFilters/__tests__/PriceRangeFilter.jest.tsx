import { Input } from "@artsy/palette"
import { mount } from "enzyme"
import React from "react"
import { flushPromiseQueue } from "v2/DevTools"
import {
  ArtworkFilterContextProps,
  ArtworkFilterContextProvider,
  useArtworkFilterContext,
} from "../../ArtworkFilterContext"
import { PriceRangeFilter } from "../PriceRangeFilter"

describe("PriceRangeFilter", () => {
  let context: ArtworkFilterContextProps

  const getWrapper = () => {
    return mount(
      <ArtworkFilterContextProvider>
        <PriceRangeFilterTest />
      </ArtworkFilterContextProvider>
    )
  }

  const PriceRangeFilterTest = () => {
    context = useArtworkFilterContext()
    return <PriceRangeFilter />
  }

  it("renders the options", () => {
    const wrapper = getWrapper()
    const options = wrapper.find("Radio")

    expect(options).toHaveLength(6)
  })

  it("updates the filter on select", async () => {
    const wrapper = getWrapper()
    const option = wrapper
      .find("Radio")
      .filterWhere(n => n.text() === "$25K – $50K")

    option.simulate("click")
    await flushPromiseQueue()

    expect(context.filters.priceRange).toEqual("25000-50000")
  })

  it("toggles the custom input", async () => {
    const wrapper = getWrapper()

    expect(wrapper.find(Input)).toHaveLength(0)

    wrapper
      .find("button")
      .filterWhere(n => n.text() === "Show custom price")
      .simulate("click")

    expect(
      wrapper.find("button").filterWhere(n => n.text() === "Hide custom price")
    ).toHaveLength(1)

    expect(wrapper.find(Input)).toHaveLength(2)
  })

  it("updates the input values when the radio selected option updates", async () => {
    const wrapper = getWrapper()
    const options = wrapper.find("Radio")

    wrapper
      .find("button")
      .filterWhere(n => n.text() === "Show custom price")
      .simulate("click")

    expect(wrapper.find(Input).first().html()).toContain('value="*"')
    expect(wrapper.find(Input).last().html()).toContain('value="*"')

    options.first().simulate("click")
    await flushPromiseQueue()

    expect(wrapper.find(Input).first().html()).toContain('value="50000"')
    expect(wrapper.find(Input).last().html()).toContain('value="*"')

    options.last().simulate("click")
    await flushPromiseQueue()

    expect(wrapper.find(Input).first().html()).toContain('value="0"')
    expect(wrapper.find(Input).last().html()).toContain('value="1000"')
  })

  // TODO: Unable to trigger this changes correctly
  it.skip("updates the filter when the custom input is applied", async () => {
    const wrapper = getWrapper()

    wrapper
      .find("button")
      .filterWhere(n => n.text() === "Show custom price")
      .simulate("click")

    wrapper
      .find(Input)
      .first()
      .find("input")
      .simulate("change", { currentTarget: { value: "400" } })

    wrapper
      .find(Input)
      .last()
      .find("input")
      .simulate("change", { currentTarget: { value: "7500" } })

    await flushPromiseQueue()

    wrapper.find("Button").last().simulate("click")
    await flushPromiseQueue()

    expect(context.filters.priceRange).toEqual("400-7500")
  })
})
