import { screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { useArtworkFilterContext } from "Components/ArtworkFilter/ArtworkFilterContext"
import { FramedFilter } from "Components/ArtworkFilter/ArtworkFilters/FramedFilter"
import {
  createArtworkFilterTestRenderer,
  currentArtworkFilterContext,
} from "Components/ArtworkFilter/ArtworkFilters/__tests__/Utils"
import { __internal__useMatchMedia } from "Utils/Hooks/useMatchMedia"
import { useEffect } from "react"

jest.mock("Utils/Hooks/useMatchMedia")

const render = createArtworkFilterTestRenderer()

describe(FramedFilter, () => {
  it("renders a toggle", () => {
    render(<FramedFilter expanded />)
    expect(screen.getByText("Show only framed works")).toBeInTheDocument()
  })

  it("updates context on filter change", () => {
    render(<FramedFilter expanded />)
    expect(currentArtworkFilterContext().filters?.framed).toBeFalsy()

    userEvent.click(screen.getAllByRole("checkbox")[0])
    expect(currentArtworkFilterContext().filters?.framed).toBeTruthy()

    userEvent.click(screen.getAllByRole("checkbox")[0])
    expect(currentArtworkFilterContext().filters?.framed).toBeFalsy()
  })

  it("clears local input state after Clear All", () => {
    render(<FramedFilter expanded />)
    userEvent.click(screen.getAllByRole("checkbox")[0])
    expect(currentArtworkFilterContext().filters?.framed).toBeTruthy()

    userEvent.click(screen.getByText("Clear all"))

    expect(currentArtworkFilterContext().filters?.framed).toBeUndefined()
  })

  describe("mobile-specific behavior", () => {
    beforeEach(() => {
      // Simulate the media query that checks for xs size and returns true
      ;(__internal__useMatchMedia as jest.Mock).mockImplementation(() => true)

      /*
       * A test component that simulates the usage of
       * the FramedFilter inside ArtworkFilterMobileOverlay
       */
      const MobileVersionOfFramedFilter = () => {
        const filterContext = useArtworkFilterContext()

        // biome-ignore lint/correctness/useExhaustiveDependencies: ignored using `--suppress`
        useEffect(() => {
          // on mount, initialize the staged filters
          filterContext.setShouldStageFilterChanges?.(true)
          if (filterContext.filters) {
            filterContext.setStagedFilters?.(filterContext.filters)
          }
        }, [])

        return <FramedFilter expanded />
      }
      render(<MobileVersionOfFramedFilter />)
    })

    afterEach(() => {
      jest.clearAllMocks()
    })

    it("stages the filter change instead of applying", () => {
      expect(currentArtworkFilterContext().filters?.framed).toBeFalsy()

      userEvent.click(screen.getAllByRole("checkbox")[0])

      expect(currentArtworkFilterContext().filters?.framed).toBeFalsy()
      expect(currentArtworkFilterContext().stagedFilters?.framed).toBeTruthy()
    })

    it("displays a filter count inline", () => {
      expect(screen.getByText("Framed")).toBeInTheDocument()
      expect(screen.queryByText("Framed • 1")).not.toBeInTheDocument()

      userEvent.click(screen.getAllByRole("checkbox")[0])

      expect(screen.getByText("Framed • 1")).toBeInTheDocument()
    })
  })

  describe("the `expanded` prop", () => {
    it("hides the filter controls when not set", () => {
      render(<FramedFilter />)
      expect(screen.queryAllByRole("checkbox").length).toBe(0)
    })

    it("hides the filter controls when `false`", () => {
      render(<FramedFilter expanded={false} />)
      expect(screen.queryAllByRole("checkbox").length).toBe(0)
    })

    it("shows the filter controls when `true`", () => {
      render(<FramedFilter expanded />)
      expect(screen.queryAllByRole("checkbox").length).not.toBe(0)
    })
  })
})
