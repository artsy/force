import {
  ArtworkFilterContextProvider,
  initialArtworkFilterState,
  useArtworkFilterContext,
} from "Components/ArtworkFilter/ArtworkFilterContext"
import { ArtworkFilterMobileOverlay } from "Components/ArtworkFilter/ArtworkFilterMobileOverlay"
import { ArtworkFilters } from "Components/ArtworkFilter/ArtworkFilters"
import { fireEvent, render, screen } from "@testing-library/react"
import { useTracking } from "react-tracking"

jest.mock("Utils/Hooks/useMatchMedia", () => ({
  __internal__useMatchMedia: () => ({ sm: true }),
}))
jest.mock("react-tracking")
jest.mock("System/Hooks/useRouter", () => ({
  useRouter: () => ({
    match: {
      location: { query: {}, pathname: "" },
    },
  }),
}))

describe("ArtworkFilterMobileOverlay", () => {
  let context
  let spy
  const trackEvent = jest.fn()

  beforeAll(() => {
    ;(useTracking as jest.Mock).mockImplementation(() => {
      return {
        trackEvent,
      }
    })
  })

  const getWrapper = (props = {}) => {
    return render(
      <ArtworkFilterContextProvider {...props}>
        <ArtworkFilterMobileOverlayTest />
      </ArtworkFilterContextProvider>,
    )
  }

  const ArtworkFilterMobileOverlayTest = () => {
    context = useArtworkFilterContext()
    spy = jest.fn()

    return (
      <ArtworkFilterMobileOverlay onClose={spy}>
        <ArtworkFilters />
      </ArtworkFilterMobileOverlay>
    )
  }

  it("contains correct UI elements", () => {
    getWrapper()

    expect(screen.getByText("Cancel")).toBeInTheDocument()
    expect(screen.getByText("Filter")).toBeInTheDocument()
    expect(screen.getByText("Show Results")).toBeInTheDocument()
  })

  it("resets staged filters to defaults on `Reset` button click", () => {
    getWrapper({
      filters: {
        ...initialArtworkFilterState,
        page: 20,
      },
    })

    fireEvent.click(screen.getByText("Clear all"))

    expect(context.stagedFilters).toEqual({
      ...initialArtworkFilterState,
      reset: true,
    })
  })

  it("doesn't call onClose callback on `Apply` button click because it's disabled", () => {
    getWrapper()
    fireEvent.click(screen.getByText("Show Results"))
    expect(spy).not.toHaveBeenCalled()
  })

  it("renders children content", () => {
    getWrapper()
    expect(screen.getByText("Keyword Search")).toBeInTheDocument()
  })

  it("mutates staged filter state instead of 'real' filter state", () => {
    getWrapper()

    // Find and click the first available checkbox
    const checkboxes = screen.getAllByRole("checkbox")
    if (checkboxes.length > 0) {
      fireEvent.click(checkboxes[0])
    }

    // Just verify that staged filters are different from regular filters
    expect(context.stagedFilters).not.toEqual(context.filters)
  })

  describe("`Apply` button", () => {
    it("is disabled before selecting filter and enabled after that", () => {
      getWrapper()

      const showResultsButton = screen.getByText("Show Results")

      // Check initial disabled state - look for disabled prop on the actual button element
      const button = showResultsButton.closest("button")
      expect(button).toHaveProperty("disabled", true)

      // Click a checkbox to enable the button
      const checkboxes = screen.getAllByRole("checkbox")
      if (checkboxes.length > 0) {
        fireEvent.click(checkboxes[0])
      }

      expect(button).toHaveProperty("disabled", false)
    })
  })
})
