import { mount } from "enzyme"
import React from "react"
import {
  ArtworkFilterContextProvider,
  useArtworkFilterContext,
} from "../../ArtworkFilterContext"
import { ColorFilter } from "../ColorFilter"

describe("ColorFilter", () => {
  let context

  const getWrapper = () => {
    return mount(
      <ArtworkFilterContextProvider>
        <ColorFilterTest />
      </ArtworkFilterContextProvider>
    )
  }

  const ColorFilterTest = () => {
    context = useArtworkFilterContext()
    return <ColorFilter expanded />
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
})
