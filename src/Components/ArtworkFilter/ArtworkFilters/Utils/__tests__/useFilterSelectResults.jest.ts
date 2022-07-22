import {
  Aggregation,
  SelectedFiltersCountsLabels,
  useArtworkFilterContext,
  useCurrentlySelectedFilters,
} from "Components/ArtworkFilter/ArtworkFilterContext"
import { useFilterSelectResults } from "../useFilterSelectResults"

jest.mock("Components/ArtworkFilter/ArtworkFilterContext", () => ({
  useArtworkFilterContext: jest.fn(),
  useCurrentlySelectedFilters: jest.fn(),
  SelectedFiltersCountsLabels: { artistIDs: "artistIDs" },
}))
jest.mock("Components/ArtworkFilter/Utils/useFilterLabelCountByKey", () => ({
  useFilterLabelCountByKey: () => 10,
}))

describe("useFilterSelectResults", () => {
  const mockUseArtworkFilterContext = useArtworkFilterContext as jest.Mock
  const mockUseCurrentlySelectedFilters = useCurrentlySelectedFilters as jest.Mock

  const spy = jest.fn()
  const aggregations: Aggregation[] = [
    {
      slice: "ARTIST",
      counts: [
        {
          count: 10,
          value: "value",
          name: "Name",
        },
      ],
    },
  ]

  mockUseArtworkFilterContext.mockImplementation(() => {
    return {
      aggregations,
      setFilter: spy,
    }
  })

  it("returns correct data and handles interactions", () => {
    mockUseCurrentlySelectedFilters.mockImplementation(() => ({
      artistIDs: [],
    }))

    const {
      handleFilterSelectChange,
      items,
      labelWithCount,
    } = useFilterSelectResults({
      facetName: "artistIDs",
      filtersCountKey: SelectedFiltersCountsLabels.artistIDs,
      label: "Artists",
      slice: "ARTIST",
    })

    expect(items).toStrictEqual([
      { count: 10, label: "Name", name: "Name", value: "value" },
    ])
    expect(labelWithCount).toBe("Artists10")
    handleFilterSelectChange({ selectedItems: items } as any)
    expect(spy).toHaveBeenCalled()
  })

  it("return correct selected items", () => {
    mockUseCurrentlySelectedFilters.mockImplementation(() => ({
      artistIDs: ["value"],
    }))

    const { selectedItems } = useFilterSelectResults({
      facetName: "artistIDs",
      filtersCountKey: SelectedFiltersCountsLabels.artistIDs,
      label: "Artists",
      slice: "ARTIST",
    })

    expect(selectedItems).toEqual([
      {
        count: 10,
        value: "value",
        name: "Name",
        label: "Name",
      },
    ])
  })
})
