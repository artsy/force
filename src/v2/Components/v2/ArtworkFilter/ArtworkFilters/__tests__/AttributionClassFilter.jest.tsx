import { mount } from "enzyme"
import React from "react"
import {
  ArtworkFilterContextProps,
  ArtworkFilterContextProvider,
  useArtworkFilterContext,
} from "v2/Components/v2/ArtworkFilter/ArtworkFilterContext"
import { AttributionClassFilter } from "../AttributionClassFilter"

describe("AttributionClassFilter", () => {
  let context: ArtworkFilterContextProps

  const getWrapper = () => {
    return mount(
      <ArtworkFilterContextProvider>
        <AttributionClassFilterTest />
      </ArtworkFilterContextProvider>
    )
  }

  const AttributionClassFilterTest = () => {
    context = useArtworkFilterContext()
    return <AttributionClassFilter />
  }

  it("updates context on filter change", async () => {
    const wrapper = getWrapper() as any

    await wrapper.find("Checkbox").at(0).simulate("click")
    expect(context.filters.attributionClass).toEqual(["unique"])

    await wrapper.find("Checkbox").at(2).simulate("click")
    expect(context.filters.attributionClass).toEqual(["unique", "open edition"])
  })
})
