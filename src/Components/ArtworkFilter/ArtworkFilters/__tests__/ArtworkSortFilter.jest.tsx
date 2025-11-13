import {
  ArtworkFilterContextProvider,
  useArtworkFilterContext,
} from "Components/ArtworkFilter/ArtworkFilterContext"
import { ArtworkSortFilter } from "Components/ArtworkFilter/ArtworkFilters/ArtworkSortFilter"
import { fireEvent, render, screen } from "@testing-library/react"

describe("ArtworkSortFilter", () => {
  let context

  const getWrapper = () => {
    return render(
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
    return <ArtworkSortFilter />
  }

  it("updates context on filter change", () => {
    getWrapper()
    const select = screen.getByRole("combobox")
    fireEvent.change(select, { target: { value: "bar" } })
    expect(context.filters.sort).toEqual("bar")
  })
})
