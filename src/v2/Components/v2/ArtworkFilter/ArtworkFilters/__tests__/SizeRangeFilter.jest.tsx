import { mount } from "enzyme"
import React from "react"
import { act } from "react-dom/test-utils"
import {
  ArtworkFilterContextProvider,
  useArtworkFilterContext,
} from "../../ArtworkFilterContext"
import { SizeRangeFilter } from "../SizeRangeFilter"

describe("SizeRangeFilter", () => {
  let context

  const getWrapper = () => {
    return mount(
      <ArtworkFilterContextProvider>
        <SizeRangeFilterTest />
      </ArtworkFilterContextProvider>
    )
  }

  const SizeRangeFilterTest = () => {
    context = useArtworkFilterContext()
    return <SizeRangeFilter expanded />
  }

  it("height filter updates context on filter change", done => {
    const wrapper = getWrapper() as any
    act(() => {
      wrapper
        .find("LabeledRange")
        .first()
        .instance()
        .props.onAfterChange([20, 100])

      setTimeout(() => {
        expect(context.filters.height).toEqual("20-100")
        done()
      }, 0)
    })
  })

  it("width updates context on filter change", done => {
    const wrapper = getWrapper() as any
    act(() => {
      wrapper
        .find("LabeledRange")
        .last()
        .instance()
        .props.onAfterChange([20, 100])

      setTimeout(() => {
        expect(context.filters.width).toEqual("20-100")
        done()
      }, 0)
    })
  })
})
