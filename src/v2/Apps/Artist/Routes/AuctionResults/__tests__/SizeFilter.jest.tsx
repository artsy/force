import { mount } from "enzyme"
import React from "react"
import {
  AuctionResultsFilterContextProps,
  AuctionResultsFilterContextProvider,
  useAuctionResultsFilterContext,
} from "../AuctionResultsFilterContext"
import { SizeFilter } from "../Components/AuctionFilters/SizeFilter"

jest.mock("v2/Utils/Hooks/useMatchMedia", () => ({
  useMatchMedia: () => ({}),
}))

describe("SizeFilter", () => {
  let context: AuctionResultsFilterContextProps

  const getWrapper = () => {
    return mount(
      <AuctionResultsFilterContextProvider>
        <SizeFilterTest />
      </AuctionResultsFilterContextProvider>
    )
  }

  const SizeFilterTest = () => {
    context = useAuctionResultsFilterContext()
    return <SizeFilter />
  }

  it("updates context on filter change", async () => {
    const wrapper = getWrapper() as any

    await wrapper.find("Checkbox").at(0).simulate("click")
    expect(context.filters?.sizes).toEqual(["SMALL"])

    await wrapper.find("Checkbox").at(2).simulate("click")
    expect(context.filters?.sizes).toEqual(["SMALL", "LARGE"])
  })
})
