import { fireEvent, render, screen } from "@testing-library/react"
import {
  type Aggregations,
  type ArtworkFilterContextProps,
  ArtworkFilterContextProvider,
  useArtworkFilterContext,
} from "Components/ArtworkFilter/ArtworkFilterContext"
import {
  PriceRangeFilter,
  type PriceRangeFilterProps,
  aggregationsToHistogram,
} from "Components/ArtworkFilter/ArtworkFilters/PriceRangeFilter"
import { getENV } from "Utils/getENV"

jest.mock("Utils/Hooks/useMatchMedia", () => ({
  __internal__useMatchMedia: () => ({}),
}))
jest.mock("Utils/getENV")

describe("PriceRangeFilterNew", () => {
  let context: ArtworkFilterContextProps

  const renderPriceRangeFilter = (
    props: PriceRangeFilterProps = { expanded: true },
    contextProps = {},
  ) => {
    return render(
      <ArtworkFilterContextProvider {...contextProps}>
        <PriceRangeFilterTest {...props} />
      </ArtworkFilterContextProvider>,
    )
  }

  const PriceRangeFilterTest = (props: PriceRangeFilterProps) => {
    context = useArtworkFilterContext()
    return <PriceRangeFilter {...props} />
  }

  const mockGetENV = getENV as jest.Mock

  beforeAll(() => {
    mockGetENV.mockImplementation((key: string) => {
      if (key === "IS_MOBILE") return false
      return true
    })
  })

  // FIXME: SWC_COMPILER_MIGRATION
  it.skip("updates the filter and min slider when the min custom input is changed", () => {
    renderPriceRangeFilter()

    const minSliderHandle = screen.queryAllByLabelText("Min price")[1]

    fireEvent.input(minSliderHandle, {
      target: { valueAsNumber: 10000 },
    })

    expect(context.filters?.priceRange).toEqual("10000-*")
    expect(minSliderHandle).toHaveValue("10000")
  })

  // FIXME: SWC_COMPILER_MIGRATION
  it.skip("updates the filter and max slider when the max custom input is changed", () => {
    renderPriceRangeFilter()

    const maxSliderHandle = screen.queryAllByLabelText("Max price")[1]

    fireEvent.input(maxSliderHandle, {
      target: { valueAsNumber: 35000 },
    })

    expect(context.filters?.priceRange).toEqual("*-35000")
    expect(maxSliderHandle).toHaveValue("35000")
  })

  // FIXME: SWC_COMPILER_MIGRATION
  it.skip("updates the filter and sliders when the custom inputs are changed", () => {
    renderPriceRangeFilter()

    const minSliderHandle = screen.queryAllByLabelText("Min price")[1]
    const maxSliderHandle = screen.queryAllByLabelText("Max price")[1]

    fireEvent.input(minSliderHandle, {
      target: { valueAsNumber: 10000 },
    })
    fireEvent.input(maxSliderHandle, {
      target: { valueAsNumber: 35000 },
    })

    expect(context.filters?.priceRange).toEqual("10000-35000")
    expect(minSliderHandle).toHaveValue("10000")
    expect(maxSliderHandle).toHaveValue("35000")
  })

  // FIXME: SWC_COMPILER_MIGRATION
  it.skip("do not apply price restrictions when the custom inputs are empty", () => {
    renderPriceRangeFilter()

    fireEvent.input(screen.queryAllByLabelText("Min price")[1], {
      target: { valueAsNumber: 10000 },
    })
    fireEvent.input(screen.queryAllByLabelText("Max price")[1], {
      target: { valueAsNumber: 35000 },
    })

    expect(context.filters?.priceRange).toEqual("10000-35000")

    fireEvent.input(screen.queryAllByLabelText("Min price")[1], {
      target: { valueAsNumber: null },
    })
    fireEvent.input(screen.queryAllByLabelText("Max price")[1], {
      target: { valueAsNumber: null },
    })

    expect(context.filters?.priceRange).toEqual("*-0")
  })

  it("should display histogram when some bars are filled", () => {
    renderPriceRangeFilter(undefined, { aggregations })

    expect(screen.getByTestId("PriceFilterHistogram")).toBeInTheDocument()
  })

  it("should hide histogram when all bars are empty", () => {
    const emptyBarsAggregations: Aggregations = [
      {
        slice: "SIMPLE_PRICE_HISTOGRAM",
        counts: [
          {
            name: "0",
            value: "0",
            count: 0,
          },
          {
            name: "50000",
            value: "50000",
            count: 0,
          },
          {
            name: "2000",
            value: "2000",
            count: 0,
          },
        ],
      },
    ]
    renderPriceRangeFilter(undefined, { aggregations: emptyBarsAggregations })

    expect(screen.queryByTestId("PriceFilterHistogram")).not.toBeInTheDocument()
  })

  describe("expanded prop", () => {
    it("renders collapsed when not set", () => {
      renderPriceRangeFilter({})

      const button = screen.getByRole("button", {
        name: "Price",
        expanded: false,
      })
      expect(button).toHaveAttribute("aria-expanded", "false")
    })

    it("renders collapsed when false", () => {
      renderPriceRangeFilter({
        expanded: false,
      })

      const button = screen.getByRole("button", {
        name: "Price",
        expanded: false,
      })
      expect(button).toHaveAttribute("aria-expanded", "false")
    })

    it("renders expanded when true", () => {
      renderPriceRangeFilter({
        expanded: true,
      })

      const button = screen.getByRole("button", {
        name: "Price",
        expanded: true,
      })
      expect(button).toHaveAttribute("aria-expanded", "true")

      expect(screen.queryAllByLabelText("Min price")[0]).toBeInTheDocument()
      expect(screen.queryAllByLabelText("Max price")[0]).toBeInTheDocument()
    })
  })
})

describe("aggregationsToHistogram", () => {
  it("should return empty array if there is no aggregation", () => {
    const result = aggregationsToHistogram([
      {
        slice: "MAJOR_PERIOD",
        counts: [
          {
            name: "0",
            value: "0",
            count: 1445,
          },
        ],
      },
    ])

    expect(result).toEqual([])
  })

  it("should return sorted bars", () => {
    const result = aggregationsToHistogram(aggregations)

    expect(result).toEqual([
      {
        count: 1445,
        value: 0,
      },
      {
        count: 133,
        value: 2000,
      },
      {
        count: 750,
        value: 50000,
      },
    ])
  })
})

const aggregations: Aggregations = [
  {
    slice: "SIMPLE_PRICE_HISTOGRAM",
    counts: [
      {
        name: "0",
        value: "0",
        count: 1445,
      },
      {
        name: "50000",
        value: "50000",
        count: 750,
      },
      {
        name: "2000",
        value: "2000",
        count: 133,
      },
    ],
  },
]
