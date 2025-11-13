import { useComputeHref } from "Components/Pagination/useComputeHref"
import { renderHook } from "@testing-library/react"

const mockUseRouter = jest.fn()
const mockUseArtworkFilterContext = jest.fn()
const mockUseCurrentlySelectedFilters = jest.fn()

jest.mock("System/Hooks/useRouter", () => ({
  useRouter: () => mockUseRouter(),
}))

jest.mock("Components/ArtworkFilter/ArtworkFilterContext", () => ({
  useArtworkFilterContext: () => mockUseArtworkFilterContext(),
  useCurrentlySelectedFilters: () => mockUseCurrentlySelectedFilters(),
}))

jest.mock("Components/ArtworkFilter/Utils/urlBuilder", () => ({
  buildUrl: jest.fn(
    state => `/test-path?${new URLSearchParams(state).toString()}`
  ),
}))

describe("useComputeHref", () => {
  beforeEach(() => {
    jest.clearAllMocks()
    mockUseCurrentlySelectedFilters.mockReturnValue({})
  })

  describe("generic pagination (non-artwork filter)", () => {
    beforeEach(() => {
      mockUseArtworkFilterContext.mockReturnValue({
        mountedContext: null,
      })
    })

    it("should remove page parameter for page 1", () => {
      mockUseRouter.mockReturnValue({
        match: {
          location: {
            pathname: "/artists/artists-starting-with-d",
            query: { page: "2", sort: "name" },
          },
        },
      })

      const { result } = renderHook(() => useComputeHref())
      const computeHref = result.current
      const href = computeHref(1)

      expect(href).toBe("/artists/artists-starting-with-d?sort=name")
    })

    it("should include page parameter for page 2+", () => {
      mockUseRouter.mockReturnValue({
        match: {
          location: {
            pathname: "/artists/artists-starting-with-d",
            query: { sort: "name" },
          },
        },
      })

      const { result } = renderHook(() => useComputeHref())
      const computeHref = result.current
      const href = computeHref(3)

      expect(href).toBe("/artists/artists-starting-with-d?sort=name&page=3")
    })

    it("should return clean URL when no query params and page=1", () => {
      mockUseRouter.mockReturnValue({
        match: {
          location: {
            pathname: "/artists/artists-starting-with-d",
            query: {},
          },
        },
      })

      const { result } = renderHook(() => useComputeHref())
      const computeHref = result.current
      const href = computeHref(1)

      expect(href).toBe("/artists/artists-starting-with-d")
    })

    it("should preserve other query parameters", () => {
      mockUseRouter.mockReturnValue({
        match: {
          location: {
            pathname: "/artists/artists-starting-with-d",
            query: {
              sort: "name",
              utm_source: "google",
              filter: "paintings",
            },
          },
        },
      })

      const { result } = renderHook(() => useComputeHref())
      const computeHref = result.current
      const href = computeHref(2)

      expect(href).toContain("sort=name")
      expect(href).toContain("utm_source=google")
      expect(href).toContain("filter=paintings")
      expect(href).toContain("page=2")
    })

    it("should handle undefined location gracefully", () => {
      mockUseRouter.mockReturnValue({
        match: {
          location: null,
        },
      })

      const { result } = renderHook(() => useComputeHref())
      const computeHref = result.current
      const href = computeHref(1)

      expect(href).toBe("")
    })

    it("should handle location with undefined pathname", () => {
      mockUseRouter.mockReturnValue({
        match: {
          location: {
            pathname: undefined,
            query: { page: "2" },
          },
        },
      })

      const { result } = renderHook(() => useComputeHref())
      const computeHref = result.current
      const href = computeHref(1)

      expect(href).toBe("")
    })

    it("should handle location with undefined query", () => {
      mockUseRouter.mockReturnValue({
        match: {
          location: {
            pathname: "/artists/artists-starting-with-d",
            query: undefined,
          },
        },
      })

      const { result } = renderHook(() => useComputeHref())
      const computeHref = result.current
      const href = computeHref(1)

      expect(href).toBe("/artists/artists-starting-with-d")
    })
  })

  describe("artwork filter context", () => {
    beforeEach(() => {
      mockUseArtworkFilterContext.mockReturnValue({
        mountedContext: true,
      })
    })

    it("should use artwork filter URL building logic", () => {
      mockUseRouter.mockReturnValue({
        match: {
          location: {
            pathname: "/collect",
            query: {},
          },
        },
      })

      mockUseCurrentlySelectedFilters.mockReturnValue({
        medium: "painting",
      })

      const { result } = renderHook(() => useComputeHref())
      const computeHref = result.current
      const href = computeHref(2)

      // Should use the mocked buildUrl function
      expect(href).toContain("medium=painting")
      expect(href).toContain("page=2")
    })
  })
})
