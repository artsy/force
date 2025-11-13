import {
  type AuctionResultsFilterContextProps,
  AuctionResultsFilterContextProvider,
  useAuctionResultsFilterContext,
} from "Apps/Artist/Routes/AuctionResults/AuctionResultsFilterContext"
import { SizeFilter } from "Apps/Artist/Routes/AuctionResults/Components/AuctionFilters/SizeFilter"
import { fireEvent, render, screen } from "@testing-library/react"

jest.mock("Utils/Hooks/useMatchMedia", () => ({
  __internal__useMatchMedia: () => ({}),
}))

describe("SizeFilter", () => {
  let context: AuctionResultsFilterContextProps

  const getWrapper = () => {
    return render(
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
    getWrapper()

    const checkboxes = screen.getAllByRole("checkbox")

    fireEvent.click(checkboxes[0])
    expect(context.filters?.sizes).toEqual(["SMALL"])

    fireEvent.click(checkboxes[2])
    expect(context.filters?.sizes).toEqual(["SMALL", "LARGE"])
  })
})
