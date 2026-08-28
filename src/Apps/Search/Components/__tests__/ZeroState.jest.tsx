import { render, screen, waitFor } from "@testing-library/react"
import { ZeroState } from "Apps/Search/Components/ZeroState"
import {
  useArtworkFilterContext,
  useCurrentlySelectedFilters,
} from "Components/ArtworkFilter/ArtworkFilterContext"
import { fetchArtworkFilterSuggestions } from "Components/ArtworkFilter/Utils/fetchArtworkFilterSuggestions"
import { useFlag } from "@unleash/proxy-client-react"
import { useRouter } from "System/Hooks/useRouter"

jest.mock("@unleash/proxy-client-react", () => ({ useFlag: jest.fn() }))
jest.mock("Apps/Search/Components/SendFeedback", () => ({
  SendFeedback: () => null,
}))
jest.mock("Components/ArtworkFilter/ArtworkFilterContext", () => ({
  useArtworkFilterContext: jest.fn(),
  useCurrentlySelectedFilters: jest.fn(),
}))
jest.mock(
  "Components/ArtworkFilter/Utils/fetchArtworkFilterSuggestions",
  () => ({
    fetchArtworkFilterSuggestions: jest.fn(),
  }),
)
jest.mock("System/Hooks/useSystemContext", () => {
  const relayEnvironment = {}
  return { useSystemContext: () => ({ relayEnvironment }) }
})
jest.mock("System/Hooks/useRouter", () => ({ useRouter: jest.fn() }))

const mockSetFilters = jest.fn()
const mockPush = jest.fn()

const setContext = (overrides = {}) => {
  ;(useArtworkFilterContext as jest.Mock).mockReturnValue({
    hasFilters: true,
    filters: {},
    setFilters: mockSetFilters,
    ...overrides,
  })
}

const setSelectedFilters = (filters: object) => {
  ;(useCurrentlySelectedFilters as jest.Mock).mockReturnValue(filters)
}

const suggestion = (filters: object) => {
  return { keyword: null, fellOpen: false, dropped: [], filters }
}

describe("ZeroState", () => {
  beforeEach(() => {
    jest.clearAllMocks()
    ;(useFlag as jest.Mock).mockReturnValue(true)
    ;(useRouter as jest.Mock).mockReturnValue({ router: { push: mockPush } })
    setContext()
    // The search term itself lives in the filter state on every search page
    setSelectedFilters({ term: "works under 3000", page: 1 })
    ;(fetchArtworkFilterSuggestions as jest.Mock).mockResolvedValue(null)
  })

  it("shows the term that found nothing when not interpreting", () => {
    ;(useFlag as jest.Mock).mockReturnValue(false)
    setContext({ hasFilters: false })

    render(<ZeroState term="works under 3000" />)

    expect(screen.getByText(/works under 3000/)).toBeInTheDocument()
  })

  it("shows a spinner while interpreting, not the zero state", () => {
    render(<ZeroState term="works under 3000" />)

    // Announcing "no results" and then replacing it reads worse than waiting
    expect(screen.getByTestId("zeroStateInterpreting")).toBeInTheDocument()
    expect(screen.queryByText(/No results found/)).not.toBeInTheDocument()
  })

  it("treats the search term itself as not a user-applied filter", async () => {
    // `term`, `page` and `sort` are always present on a search page, so the
    // context's own hasFilters is always true here
    ;(fetchArtworkFilterSuggestions as jest.Mock).mockResolvedValue(
      suggestion({ priceRange: "*-3000" }),
    )

    render(<ZeroState term="works under 3000" />)

    await waitFor(() => {
      expect(fetchArtworkFilterSuggestions).toHaveBeenCalled()
    })
  })

  describe("interpreting the term", () => {
    it("applies the suggested filters", async () => {
      ;(fetchArtworkFilterSuggestions as jest.Mock).mockResolvedValue(
        suggestion({ priceRange: "*-3000" }),
      )

      render(<ZeroState term="works under 3000" />)

      await waitFor(() => {
        expect(mockSetFilters).toHaveBeenCalledWith(
          expect.objectContaining({ priceRange: "*-3000" }),
        )
      })
    })

    it("keeps the filters the user already had", async () => {
      ;(fetchArtworkFilterSuggestions as jest.Mock).mockResolvedValue(
        suggestion({ priceRange: "*-3000" }),
      )

      render(<ZeroState term="works under 3000" />)

      await waitFor(() => {
        expect(mockSetFilters).toHaveBeenCalledWith(
          expect.objectContaining({ page: 1 }),
        )
      })
    })

    it("asks only once per term", async () => {
      ;(fetchArtworkFilterSuggestions as jest.Mock).mockResolvedValue(
        suggestion({ priceRange: "*-3000" }),
      )

      const { rerender } = render(<ZeroState term="works under 3000" />)
      rerender(<ZeroState term="works under 3000" />)

      await waitFor(() => {
        expect(fetchArtworkFilterSuggestions).toHaveBeenCalledTimes(1)
      })
    })
  })

  describe("leaves the zero state alone", () => {
    it("when the feature flag is off", () => {
      ;(useFlag as jest.Mock).mockReturnValue(false)
      setContext({ hasFilters: false })

      render(<ZeroState term="works under 3000" />)

      expect(fetchArtworkFilterSuggestions).not.toHaveBeenCalled()
      expect(
        screen.getByText(/Try checking for spelling errors/),
      ).toBeInTheDocument()
    })

    it("when the parse fell open", async () => {
      ;(fetchArtworkFilterSuggestions as jest.Mock).mockResolvedValue({
        ...suggestion({ priceRange: "*-3000" }),
        fellOpen: true,
      })

      render(<ZeroState term="asdfghjkl" />)

      await waitFor(() => {
        expect(fetchArtworkFilterSuggestions).toHaveBeenCalled()
      })
      expect(mockSetFilters).not.toHaveBeenCalled()
    })

    it("when the request fails or times out", async () => {
      ;(fetchArtworkFilterSuggestions as jest.Mock).mockResolvedValue(null)

      render(<ZeroState term="works under 3000" />)

      await waitFor(() => {
        expect(fetchArtworkFilterSuggestions).toHaveBeenCalled()
      })
      expect(mockSetFilters).not.toHaveBeenCalled()
    })

    it("when nothing usable came back", async () => {
      ;(fetchArtworkFilterSuggestions as jest.Mock).mockResolvedValue(
        suggestion({}),
      )

      render(<ZeroState term="works under 3000" />)

      await waitFor(() => {
        expect(fetchArtworkFilterSuggestions).toHaveBeenCalled()
      })
      expect(mockSetFilters).not.toHaveBeenCalled()
    })

    it("when the user set the filters themselves", () => {
      // Their filters, not ours, are why this is empty
      setSelectedFilters({ term: "warhol", page: 1, priceRange: "*-5000" })

      render(<ZeroState term="warhol" />)

      expect(fetchArtworkFilterSuggestions).not.toHaveBeenCalled()
      expect(screen.getByText(/Try removing some filters/)).toBeInTheDocument()
    })
  })

  describe("when the whole search came back empty", () => {
    // Outside the artworks route there is no ArtworkFilter provider, so there
    // is no grid to fill — send them to the filtered collect page instead
    beforeEach(() => {
      setContext({ setFilters: undefined, hasFilters: false })
      setSelectedFilters({})
    })

    it("redirects to the filtered collect page", async () => {
      ;(fetchArtworkFilterSuggestions as jest.Mock).mockResolvedValue(
        suggestion({ priceRange: "*-3000" }),
      )

      render(<ZeroState term="french paintings under 3000" />)

      await waitFor(() => {
        expect(mockPush).toHaveBeenCalledWith(
          expect.stringContaining("/collect"),
        )
      })
      expect(mockPush.mock.calls[0][0]).toContain("price_range")
    })

    it("stays put when nothing usable came back", async () => {
      ;(fetchArtworkFilterSuggestions as jest.Mock).mockResolvedValue(
        suggestion({}),
      )

      render(<ZeroState term="asdfghjkl" />)

      await waitFor(() => {
        expect(fetchArtworkFilterSuggestions).toHaveBeenCalled()
      })
      expect(mockPush).not.toHaveBeenCalled()
    })
  })
})
