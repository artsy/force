import { mount } from "enzyme"
import React from "react"
import {
  ArtworkFilterContextProvider,
  useArtworkFilterContext,
} from "../../ArtworkFilterContext"
import { MediumFilter } from "../MediumFilter"

describe("MediumFilter", () => {
  let context

  const getWrapper = (props = {}) => {
    return mount(
      <ArtworkFilterContextProvider {...props}>
        <MediumFilterTest />
      </ArtworkFilterContextProvider>
    )
  }

  const MediumFilterTest = () => {
    context = useArtworkFilterContext()
    return <MediumFilter />
  }

  it("shows custom mediums if aggregations passed to context", () => {
    const wrapper = getWrapper({
      aggregations: [
        {
          slice: "MEDIUM",
          counts: [
            {
              name: "Foo Medium",
              value: "foo-medium",
            },
          ],
        },
      ],
    })

    expect(wrapper.html()).toContain("Foo Medium")
    expect(wrapper.html()).not.toContain("Painting")
  })

  it("renders the standard mediums when there are no medium aggregations", () => {
    const wrapper = getWrapper({
      aggregations: [
        {
          slice: "MEDIUM",
          counts: [],
        },
      ],
    })
    expect(wrapper.html()).toContain("Painting")
  })

  it("selects mediums", done => {
    const wrapper = getWrapper()
    wrapper.find("Checkbox").first().simulate("click")

    setTimeout(() => {
      expect(context.filters.additionalGeneIDs).toEqual(["painting"])
      done()
    }, 0)
  })
})
