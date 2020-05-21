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

  it("selects a color based on svg swatch click", () => {
    const wrapper = getWrapper()
    wrapper.find('[fill="#F7923A"]').simulate("click")
    expect(context.filters.color).toEqual("orange")
  })
})
