import { mount } from "enzyme"
import React from "react"
import {
  ArtworkFilterContextProps,
  ArtworkFilterContextProvider,
  useArtworkFilterContext,
} from "v2/Components/ArtworkFilter/ArtworkFilterContext"
import { SizeFilter } from "../Components/AuctionFilters/SizeFilter"

jest.mock("v2/Utils/Hooks/useMatchMedia", () => ({
  useMatchMedia: () => ({}),
}))

describe("SizeFilter", () => {
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
    return <SizeFilter useFilterContext={useArtworkFilterContext} />
  }

  it("updates context on filter change", async () => {
    const wrapper = getWrapper() as any

    await wrapper.find("Checkbox").at(0).simulate("click")
    // @ts-expect-error STRICT_NULL_CHECK
    expect(context.filters.sizes).toEqual(["SMALL"])

    await wrapper.find("Checkbox").at(2).simulate("click")
    // @ts-expect-error STRICT_NULL_CHECK
    expect(context.filters.sizes).toEqual(["SMALL", "LARGE"])
  })
})
