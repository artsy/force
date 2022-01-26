import {
  Aggregation,
  SelectedFiltersCountsLabels,
  useArtworkFilterContext,
} from "v2/Components/ArtworkFilter/ArtworkFilterContext"
import { useFilterSelectResults } from "../useFilterSelectResults"

jest.mock("v2/Components/ArtworkFilter/ArtworkFilterContext", () => ({
  useArtworkFilterContext: jest.fn(),
  SelectedFiltersCountsLabels: { artistIDs: "artistIDs" },
}))
jest.mock("v2/Components/ArtworkFilter/Utils/useFilterLabelCountByKey", () => ({
  useFilterLabelCountByKey: () => 10,
}))

describe("useFilterSelectResults", () => {
  const mockUseArtworkFilterContext = useArtworkFilterContext as jest.Mock
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
  const currentlySelectedFilters = aggregations.map(agg => {
    const filterItem = agg.counts[0] as any
    filterItem.label = filterItem.name

    return {
      ...agg,
      counts: [filterItem],
    }
  })

  mockUseArtworkFilterContext.mockImplementation(() => {
    return {
      aggregations,
      setFilter: spy,
      currentlySelectedFilters: () => [currentlySelectedFilters],
    }
  })

  it("returns correct data and handles interactions", () => {
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
})
