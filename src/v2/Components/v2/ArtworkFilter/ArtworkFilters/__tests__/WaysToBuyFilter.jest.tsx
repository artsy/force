import { mount } from "enzyme"
import React from "react"
import {
  ArtworkFilterContextProvider,
  useArtworkFilterContext,
} from "../../ArtworkFilterContext"
import { WaysToBuyFilter } from "../WaysToBuyFilter"

describe("WaysToBuyFilter", () => {
  let context

  const getWrapper = () => {
    return mount(
      <ArtworkFilterContextProvider>
        <WaysToBuyFilterFilterTest />
      </ArtworkFilterContextProvider>
    )
  }

  const WaysToBuyFilterFilterTest = () => {
    context = useArtworkFilterContext()
    return <WaysToBuyFilter />
  }

  it("updates context on filter change", done => {
    const wrapper = getWrapper()
    wrapper
      .find("Checkbox")
      .first()
      .simulate("click")

    setTimeout(() => {
      expect(context.filters.acquireable).toEqual(true)
      done()
    }, 0)
  })
})
