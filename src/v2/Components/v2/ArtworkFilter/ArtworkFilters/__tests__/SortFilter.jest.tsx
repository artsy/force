import { mount } from "enzyme"
import React from "react"
import {
  ArtworkFilterContextProvider,
  useArtworkFilterContext,
} from "../../ArtworkFilterContext"
import { SortFilter } from "../SortFilter"

describe("SortFilter", () => {
  let context

  const getWrapper = () => {
    return mount(
      <ArtworkFilterContextProvider
        sortOptions={[
          {
            value: "foo",
            text: "foo",
          },
          {
            value: "bar",
            text: "bar",
          },
        ]}
      >
        <SortFilterFilterTest />
      </ArtworkFilterContextProvider>
    )
  }

  const SortFilterFilterTest = () => {
    context = useArtworkFilterContext()
    return <SortFilter />
  }

  it("updates context on filter change", done => {
    const wrapper = getWrapper()
    wrapper
      .find("SelectSmall")
      .find("option")
      .at(1)
      .simulate("change")

    setTimeout(() => {
      expect(context.filters.sort).toEqual("bar")
      done()
    }, 0)
  })
})
