import { fireEvent, render, screen } from "@testing-library/react"
import {
  ArtworkFilterContextProps,
  ArtworkFilterContextProvider,
  useArtworkFilterContext,
} from "../../ArtworkFilterContext"
import { PriceRangeFilter, PriceRangeFilterProps } from "../PriceRangeFilter"
import { getENV } from "v2/Utils/getENV"

jest.mock("v2/Utils/Hooks/useMatchMedia", () => ({
  __internal__useMatchMedia: () => ({}),
}))
jest.mock("v2/Utils/getENV")
jest.mock("lodash/debounce", () => jest.fn(e => e))

describe("PriceRangeFilterNew", () => {
  let context: ArtworkFilterContextProps

  const renderPriceRangeFilter = (
    props: PriceRangeFilterProps = { expanded: true }
  ) => {
    return render(
      <ArtworkFilterContextProvider>
        <PriceRangeFilterTest {...props} />
      </ArtworkFilterContextProvider>
    )
  }

  const PriceRangeFilterTest = (props: PriceRangeFilterProps) => {
    context = useArtworkFilterContext()
    return <PriceRangeFilter {...props} />
  }

  const mockGetENV = getENV as jest.Mock

  beforeEach(() => {
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
