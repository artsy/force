import { fireEvent, render, screen } from "@testing-library/react"
import {
  Aggregations,
  ArtworkFilterContextProps,
  ArtworkFilterContextProvider,
  useArtworkFilterContext,
} from "../../ArtworkFilterContext"
import { getENV } from "v2/Utils/getENV"
import {
  convertToFilterFormatRange,
  getBarsFromAggregations,
  getValue,
  parseRange,
  PriceRangeFilterNew,
  PriceRangeFilterNewProps,
} from "../PriceRangeFilterNew"

jest.mock("v2/Utils/Hooks/useMatchMedia", () => ({
  __internal__useMatchMedia: () => ({}),
}))
jest.mock("v2/Utils/getENV")
jest.mock("lodash/debounce", () => jest.fn(e => e))

describe("PriceRangeFilterNew", () => {
  let context: ArtworkFilterContextProps

  const renderPriceRangeFilter = (
    props: PriceRangeFilterNewProps = { expanded: true },
    contextProps = {}
  ) => {
    return render(
      <ArtworkFilterContextProvider {...contextProps}>
        <PriceRangeFilterTest {...props} />
      </ArtworkFilterContextProvider>
    )
  }

  const PriceRangeFilterTest = (props: PriceRangeFilterNewProps) => {
    context = useArtworkFilterContext()
    return <PriceRangeFilterNew {...props} />
  }

  const mockGetENV = getENV as jest.Mock

  beforeAll(() => {
    mockGetENV.mockImplementation(() => {
      return true
    })
  })

  it("updates the filter and min slider when the min custom input is changed", () => {
    renderPriceRangeFilter()

    const minSliderHandle = screen.queryByLabelText("Min price slider handle")

    fireEvent.change(screen.getByLabelText("Min price"), {
      target: { value: "10000" },
    })

    expect(context.filters?.priceRange).toEqual("10000-*")
    expect(minSliderHandle).toHaveAttribute("aria-valuenow", "10000")
  })

  it("updates the filter and max slider when the max custom input is changed", () => {
    renderPriceRangeFilter()

    const maxSliderHandle = screen.queryByLabelText("Max price slider handle")

    fireEvent.change(screen.getByLabelText("Max price"), {
      target: { value: "35000" },
    })

    expect(context.filters?.priceRange).toEqual("*-35000")
    expect(maxSliderHandle).toHaveAttribute("aria-valuenow", "35000")
  })

  it("updates the filter and sliders when the custom inputs are changed", () => {
    renderPriceRangeFilter()

    const minSliderHandle = screen.queryByLabelText("Min price slider handle")
    const maxSliderHandle = screen.queryByLabelText("Max price slider handle")

    fireEvent.change(screen.getByLabelText("Min price"), {
      target: { value: "10000" },
    })
    fireEvent.change(screen.getByLabelText("Max price"), {
      target: { value: "35000" },
    })

    expect(context.filters?.priceRange).toEqual("10000-35000")
    expect(minSliderHandle).toHaveAttribute("aria-valuenow", "10000")
    expect(maxSliderHandle).toHaveAttribute("aria-valuenow", "35000")
  })

  it("do not apply price restrictions when the custom inputs are empty", () => {
    renderPriceRangeFilter()

    fireEvent.change(screen.getByLabelText("Min price"), {
      target: { value: "10000" },
    })
    fireEvent.change(screen.getByLabelText("Max price"), {
      target: { value: "35000" },
    })

    expect(context.filters?.priceRange).toEqual("10000-35000")

    fireEvent.change(screen.getByLabelText("Min price"), {
      target: { value: "" },
    })
    fireEvent.change(screen.getByLabelText("Max price"), {
      target: { value: "" },
    })

    expect(context.filters?.priceRange).toEqual("*-*")
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

  describe("the `expanded` prop", () => {
    it("hides the filter controls when not set", () => {
      renderPriceRangeFilter({})

      const minSliderHandle = screen.queryByLabelText("Min price slider handle")
      const maxSliderHandle = screen.queryByLabelText("Min price slider handle")

      expect(screen.queryByLabelText("Min price")).not.toBeInTheDocument()
      expect(screen.queryByLabelText("Max price")).not.toBeInTheDocument()

      expect(minSliderHandle).not.toBeInTheDocument()
      expect(maxSliderHandle).not.toBeInTheDocument()
    })

    it("hides the filter controls when `false`", () => {
      renderPriceRangeFilter({
        expanded: false,
      })

      const minSliderHandle = screen.queryByLabelText("Min price slider handle")
      const maxSliderHandle = screen.queryByLabelText("Min price slider handle")

      expect(screen.queryByLabelText("Min price")).not.toBeInTheDocument()
      expect(screen.queryByLabelText("Max price")).not.toBeInTheDocument()

      expect(minSliderHandle).not.toBeInTheDocument()
      expect(maxSliderHandle).not.toBeInTheDocument()
    })

    it("shows the filter controls when `true`", () => {
      renderPriceRangeFilter({
        expanded: true,
      })

      const minSliderHandle = screen.queryByLabelText("Min price slider handle")
      const maxSliderHandle = screen.queryByLabelText("Min price slider handle")

      expect(screen.queryByLabelText("Min price")).toBeInTheDocument()
      expect(screen.queryByLabelText("Max price")).toBeInTheDocument()

      expect(minSliderHandle).toBeInTheDocument()
      expect(maxSliderHandle).toBeInTheDocument()
    })
  })
})

describe("convertToFilterFormatRange", () => {
  it("should return passed values", () => {
    expect(convertToFilterFormatRange([10, 20])).toEqual([10, 20])
    expect(convertToFilterFormatRange([1000, 2000])).toEqual([1000, 2000])
    expect(convertToFilterFormatRange([35000, 60000])).toEqual([35000, 60000])
  })

  it("should return default range value for min if min slider value is passed", () => {
    expect(convertToFilterFormatRange([0, 20])).toEqual(["*", 20])
  })

  it("should return default range value for max if max slider value is passed", () => {
    expect(convertToFilterFormatRange([10, 50000])).toEqual([10, "*"])
  })

  it("should return default range value if min and max slider values are passed", () => {
    expect(convertToFilterFormatRange([0, 50000])).toEqual(["*", "*"])
  })
})

describe("getValue", () => {
  it("should return passed values", () => {
    expect(getValue(10)).toBe(10)
    expect(getValue(15000)).toBe(15000)
    expect(getValue(60000)).toBe(60000)
  })

  it("should return empty string when default range value is passed", () => {
    expect(getValue("*")).toBe("")
  })

  it("should return empty string when 0 is passed", () => {
    expect(getValue(0)).toBe("")
  })
})

describe("parseRange", () => {
  it("should correctly parse range when valid range is passed", () => {
    expect(parseRange("5-10")).toEqual([5, 10])
  })

  it("should return numeric values", () => {
    expect(parseRange("5.5-10.789")).toEqual([5, 10])
  })

  it("should correctly parse range when default range values are passed", () => {
    expect(parseRange("*-5")).toEqual(["*", 5])
    expect(parseRange("5-*")).toEqual([5, "*"])
    expect(parseRange("*-*")).toEqual(["*", "*"])
  })
})

describe("getBarsFromAggregations", () => {
  it("should return empty array if there is no aggregation", () => {
    const result = getBarsFromAggregations([
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
    const result = getBarsFromAggregations(aggregations)

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
