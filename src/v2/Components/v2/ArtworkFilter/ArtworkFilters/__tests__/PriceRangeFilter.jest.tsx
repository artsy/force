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

    expect(options).toHaveLength(7)
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

    wrapper.find("Radio").last().simulate("click")
    await flushPromiseQueue()
    wrapper.update()

    expect(wrapper.find(Input)).toHaveLength(2)
    expect(wrapper.find("Button").last().text()).toEqual("Set price")
  })

  it("updates the input values when the radio selected option updates", async () => {
    const wrapper = getWrapper()
    const options = wrapper.find("Radio")

    const showCustomPrice = async () => {
      options.last().simulate("click")
      await flushPromiseQueue()
      wrapper.update()
    }

    await showCustomPrice()

    expect(wrapper.find(Input).first().html()).toContain('value="*"')
    expect(wrapper.find(Input).last().html()).toContain('value="*"')

    options.first().simulate("click")
    await showCustomPrice()

    expect(wrapper.find(Input).first().html()).toContain('value="50000"')
    expect(wrapper.find(Input).last().html()).toContain('value="*"')

    options.at(1).simulate("click")
    await showCustomPrice()

    expect(wrapper.find(Input).first().html()).toContain('value="25000"')
    expect(wrapper.find(Input).last().html()).toContain('value="50000"')
  })

  it("updates the filter when the custom input is applied", async () => {
    const wrapper = getWrapper()

    wrapper.find("Radio").last().simulate("click")
    await flushPromiseQueue()
    wrapper.update()

    wrapper.find(Input).first().find("input").prop("onChange")({
      currentTarget: { value: "400" },
    } as any)

    wrapper.find(Input).last().find("input").prop("onChange")({
      currentTarget: { value: "7500" },
    } as any)

    wrapper.update()
    wrapper.find("Button").last().simulate("click")

    expect(context.filters.priceRange).toEqual("400-7500")
  })

  it("deleting the min sets a wildcard value", async () => {
    const wrapper = getWrapper()

    wrapper.find("Radio").last().simulate("click")
    await flushPromiseQueue()
    wrapper.update()

    wrapper.find(Input).first().find("input").prop("onChange")({
      currentTarget: { value: "400" },
    } as any)

    wrapper.update()
    wrapper.find("Button").last().prop("onClick")({} as any)

    expect(context.filters.priceRange).toEqual("400-*")

    wrapper.find(Input).first().find("input").prop("onChange")({
      currentTarget: { value: "" },
    } as any)

    wrapper.update()
    wrapper.find("Button").last().prop("onClick")({} as any)

    expect(context.filters.priceRange).toEqual("*-*")
  })
})
