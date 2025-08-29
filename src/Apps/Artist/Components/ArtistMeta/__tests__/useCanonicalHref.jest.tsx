import { renderHook } from "@testing-library/react-hooks"
import { VALID_MEDIUM_FILTERS, useCanonicalHref } from "../useCanonicalHref"

const mockLocation = { query: {}, search: "" }

jest.mock("System/Hooks/useRouter", () => ({
  useRouter: () => ({
    match: {
      location: mockLocation,
    },
  }),
}))

describe("useCanonicalHref", () => {
  beforeEach(() => {
    mockLocation.query = {}
    mockLocation.search = ""
  })

  it("returns base href when not in SEO experiment", () => {
    mockLocation.query = { additional_gene_ids: ["prints"] }
    const { result } = renderHook(() =>
      useCanonicalHref({
        isInSeoExperiment: false,
        href: "/artist/picasso",
      }),
    )
    expect(result.current).toBe("/artist/picasso")
  })

  it("returns base href when no medium filter", () => {
    mockLocation.query = {}
    const { result } = renderHook(() =>
      useCanonicalHref({
        isInSeoExperiment: true,
        href: "/artist/picasso",
      }),
    )
    expect(result.current).toBe("/artist/picasso")
  })

  it("returns base href when medium filter is invalid", () => {
    mockLocation.query = { additional_gene_ids: ["invalid-medium"] }
    const { result } = renderHook(() =>
      useCanonicalHref({
        isInSeoExperiment: true,
        href: "/artist/picasso",
      }),
    )
    expect(result.current).toBe("/artist/picasso")
  })

  it("returns base href when multiple medium filters", () => {
    mockLocation.query = { additional_gene_ids: ["prints", "sculpture"] }
    const { result } = renderHook(() =>
      useCanonicalHref({
        isInSeoExperiment: true,
        href: "/artist/picasso",
      }),
    )
    expect(result.current).toBe("/artist/picasso")
  })

  it.each(VALID_MEDIUM_FILTERS)(
    "returns URL with medium filter for valid medium: %s",
    medium => {
      mockLocation.query = { additional_gene_ids: [medium] }
      const { result } = renderHook(() =>
        useCanonicalHref({
          isInSeoExperiment: true,
          href: "/artist/picasso",
        }),
      )
      expect(result.current).toBe(
        `/artist/picasso?additional_gene_ids[0]=${medium}`,
      )
    },
  )

  it("handles empty array of medium filters", () => {
    mockLocation.query = { additional_gene_ids: [] }
    const { result } = renderHook(() =>
      useCanonicalHref({
        isInSeoExperiment: true,
        href: "/artist/picasso",
      }),
    )
    expect(result.current).toBe("/artist/picasso")
  })

  it("handles null/undefined medium filters", () => {
    mockLocation.query = { additional_gene_ids: null }
    const { result } = renderHook(() =>
      useCanonicalHref({
        isInSeoExperiment: true,
        href: "/artist/picasso",
      }),
    )
    expect(result.current).toBe("/artist/picasso")
  })

  describe("page parameter handling", () => {
    it("includes page parameter when page > 1", () => {
      mockLocation.query = { page: "3" }
      mockLocation.search = "?page=3"

      const { result } = renderHook(() =>
        useCanonicalHref({
          isInSeoExperiment: false,
          href: "/artist/picasso",
        }),
      )
      expect(result.current).toBe("/artist/picasso?page=3")
    })

    it("does not include page parameter when page = 1", () => {
      mockLocation.query = { page: "1" }
      mockLocation.search = "?page=1"

      const { result } = renderHook(() =>
        useCanonicalHref({
          isInSeoExperiment: false,
          href: "/artist/picasso",
        }),
      )
      expect(result.current).toBe("/artist/picasso")
    })

    it("includes both medium filter and page parameter", () => {
      mockLocation.query = { additional_gene_ids: ["prints"], page: "2" }
      mockLocation.search = "?additional_gene_ids[0]=prints&page=2"

      const { result } = renderHook(() =>
        useCanonicalHref({
          isInSeoExperiment: true,
          href: "/artist/picasso",
        }),
      )
      expect(result.current).toBe(
        "/artist/picasso?additional_gene_ids[0]=prints&page=2",
      )
    })

    it("includes page parameter but not invalid medium filter", () => {
      mockLocation.query = { additional_gene_ids: ["invalid"], page: "2" }
      mockLocation.search = "?additional_gene_ids[0]=invalid&page=2"

      const { result } = renderHook(() =>
        useCanonicalHref({
          isInSeoExperiment: true,
          href: "/artist/picasso",
        }),
      )
      expect(result.current).toBe("/artist/picasso?page=2")
    })

    it("includes page parameter but not medium filter when not in SEO experiment", () => {
      mockLocation.query = { additional_gene_ids: ["prints"], page: "2" }
      mockLocation.search = "?additional_gene_ids[0]=prints&page=2"

      const { result } = renderHook(() =>
        useCanonicalHref({
          isInSeoExperiment: false,
          href: "/artist/picasso",
        }),
      )
      expect(result.current).toBe("/artist/picasso?page=2")
    })
  })
})
