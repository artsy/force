import { useArtworkFilterContext } from "Components/ArtworkFilter/ArtworkFilterContext"
import {
  createArtworkFilterTestRenderer,
  currentArtworkFilterContext,
} from "Components/ArtworkFilter/ArtworkFilters/__tests__/Utils"
import { SignedFilter } from "Components/ArtworkFilter/ArtworkFilters/SignedFilter"
import { __internal__useMatchMedia } from "Utils/Hooks/useMatchMedia"
import { screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { useEffect } from "react"

jest.mock("Utils/Hooks/useMatchMedia")

const render = createArtworkFilterTestRenderer()

describe(SignedFilter, () => {
  it("renders a signed toggle", () => {
    render(<SignedFilter expanded />)
    expect(screen.getByText("Show only signed works")).toBeInTheDocument()
  })

  it("updates context on filter change", () => {
    render(<SignedFilter expanded />)
    expect(currentArtworkFilterContext().filters?.signed).toBeFalsy()

    userEvent.click(screen.getAllByRole("checkbox")[0])
    expect(currentArtworkFilterContext().filters?.signed).toBeTruthy()

    userEvent.click(screen.getAllByRole("checkbox")[0])
    expect(currentArtworkFilterContext().filters?.signed).toBeFalsy()
  })

  it("clears local input state after Clear All", () => {
    render(<SignedFilter expanded />)
    userEvent.click(screen.getAllByRole("checkbox")[0])
    expect(currentArtworkFilterContext().filters?.signed).toBeTruthy()

    userEvent.click(screen.getByText("Clear all"))

    expect(currentArtworkFilterContext().filters?.signed).toBeUndefined()
  })

  describe("mobile-specific behavior", () => {
    beforeEach(() => {
      // Simulate the media query that checks for xs size and returns true
      ;(__internal__useMatchMedia as jest.Mock).mockImplementation(() => true)

      /*
       * A test component that simulates the usage of
       * the SignedFilter inside ArtworkFilterMobileOverlay
       */
      const MobileVersionOfSignedFilter = () => {
        const filterContext = useArtworkFilterContext()

        // biome-ignore lint/correctness/useExhaustiveDependencies: Test filter staging setup should only run on mount
        useEffect(() => {
          // on mount, initialize the staged filters
          filterContext.setShouldStageFilterChanges?.(true)
          if (filterContext.filters) {
            filterContext.setStagedFilters?.(filterContext.filters)
          }
        }, [])

        return <SignedFilter expanded />
      }
      render(<MobileVersionOfSignedFilter />)
    })

    afterEach(() => {
      jest.clearAllMocks()
    })

    it("stages the filter change instead of applying", () => {
      expect(currentArtworkFilterContext().filters?.signed).toBeFalsy()

      userEvent.click(screen.getAllByRole("checkbox")[0])

      expect(currentArtworkFilterContext().filters?.signed).toBeFalsy()
      expect(currentArtworkFilterContext().stagedFilters?.signed).toBeTruthy()
    })

    it("displays a filter count inline", () => {
      expect(screen.getByText("Signed")).toBeInTheDocument()
      expect(screen.queryByText("Signed • 1")).not.toBeInTheDocument()

      userEvent.click(screen.getAllByRole("checkbox")[0])

      expect(screen.getByText("Signed • 1")).toBeInTheDocument()
    })
  })

  describe("the `expanded` prop", () => {
    it("hides the filter controls when not set", () => {
      render(<SignedFilter />)
      expect(screen.queryAllByRole("checkbox").length).toBe(0)
    })

    it("hides the filter controls when `false`", () => {
      render(<SignedFilter expanded={false} />)
      expect(screen.queryAllByRole("checkbox").length).toBe(0)
    })

    it("shows the filter controls when `true`", () => {
      render(<SignedFilter expanded />)
      expect(screen.queryAllByRole("checkbox").length).not.toBe(0)
    })
  })
})
