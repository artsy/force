import { screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import {
  createArtworkFilterTestRenderer,
  currentArtworkFilterContext,
} from "Components/ArtworkFilter/ArtworkFilters/__tests__/Utils"
import { useArtworkFilterContext } from "Components/ArtworkFilter/ArtworkFilterContext"
import { AvailabilityFilter } from "Components/ArtworkFilter/ArtworkFilters/AvailabilityFilter"
import { useEffect } from "react"
import { __internal__useMatchMedia } from "Utils/Hooks/useMatchMedia"

jest.mock("Utils/Hooks/useMatchMedia")

const render = createArtworkFilterTestRenderer()

describe(AvailabilityFilter, () => {
  it("renders a for-sale toggle", () => {
    render(<AvailabilityFilter expanded />)
    expect(screen.getByText("Only works for sale")).toBeInTheDocument()
  })

  it("updates context on filter change", () => {
    render(<AvailabilityFilter expanded />)
    expect(currentArtworkFilterContext().filters?.forSale).toBeFalsy()

    userEvent.click(screen.getAllByRole("checkbox")[0])
    expect(currentArtworkFilterContext().filters?.forSale).toBeTruthy()

    userEvent.click(screen.getAllByRole("checkbox")[0])
    expect(currentArtworkFilterContext().filters?.forSale).toBeFalsy()
  })

  it("clears local input state after Clear All", () => {
    render(<AvailabilityFilter expanded />)
    userEvent.click(screen.getAllByRole("checkbox")[0])
    expect(currentArtworkFilterContext().filters?.forSale).toBeTruthy()

    userEvent.click(screen.getByText("Clear all"))

    expect(currentArtworkFilterContext().filters?.forSale).toBeFalsy()
  })

  describe("mobile-specific behavior", () => {
    beforeEach(() => {
      // Simulate the media query that checks for xs size and returns true
      ;(__internal__useMatchMedia as jest.Mock).mockImplementation(() => true)

      /*
       * A test component that simulates the usage of
       * the AvailabilityFilter inside ArtworkFilterMobileOverlay
       */
      const MobileVersionOfAvailabilityFilter = () => {
        const filterContext = useArtworkFilterContext()

        useEffect(() => {
          // on mount, initialize the staged filters
          filterContext.setShouldStageFilterChanges?.(true)
          if (filterContext.filters) {
            filterContext.setStagedFilters?.(filterContext.filters)
          }

          // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [])

        return <AvailabilityFilter expanded />
      }
      render(<MobileVersionOfAvailabilityFilter />)
    })

    afterEach(() => {
      jest.clearAllMocks()
    })

    it("stages the filter change instead of applying", () => {
      expect(currentArtworkFilterContext().filters?.forSale).toBeFalsy()

      userEvent.click(screen.getAllByRole("checkbox")[0])

      expect(currentArtworkFilterContext().filters?.forSale).toBeFalsy()
      expect(currentArtworkFilterContext().stagedFilters?.forSale).toBeTruthy()
    })

    it("displays a filter count inline", () => {
      expect(screen.getByText("Availability")).toBeInTheDocument()
      expect(screen.queryByText("Availability • 1")).not.toBeInTheDocument()

      userEvent.click(screen.getAllByRole("checkbox")[0])

      expect(screen.getByText("Availability • 1")).toBeInTheDocument()
    })
  })

  describe("the `expanded` prop", () => {
    it("hides the filter controls when not set", () => {
      render(<AvailabilityFilter />)
      expect(screen.queryAllByRole("checkbox").length).toBe(0)
    })

    it("hides the filter controls when `false`", () => {
      render(<AvailabilityFilter expanded={false} />)
      expect(screen.queryAllByRole("checkbox").length).toBe(0)
    })

    it("shows the filter controls when `true`", () => {
      render(<AvailabilityFilter expanded />)
      expect(screen.queryAllByRole("checkbox").length).not.toBe(0)
    })
  })
})
